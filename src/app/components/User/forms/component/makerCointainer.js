import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import Button from '@material-ui/core/Button';
import store from 'store/configureStore';

export function makeContainer(Component, sliceProvider, loadCallBack) {
  const { slice, mapToProps } = sliceProvider;
  const { state: mapStateToProps, dispatch: mapDispatchToProps } = mapToProps;

  const Container = props => {
    const stateLoad = props.formProp.stateLoad;
    React.useEffect(() => {
      loadCallBack(props?.match.params);
    }, []);
    const renderLoading = msg => <h2>Loading</h2>;
    const rendereError = () => (
      <>
        <div>
          <h2>Errrore nel Caricamento</h2>
        </div>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => props.history.push('/')}
        >
          Torna Indietro
        </Button>
      </>
    );
    const renderComp = () => (
      <Component queryValue={props?.match.params} {...props} />
    );
    return props.formProp.stateLoad.isFetching
      ? renderLoading()
      : props.formProp.stateLoad.isError
      ? rendereError()
      : (props.formProp.stateLoad.isSuccess && renderComp()) || (
          <div> init x {JSON.stringify(stateLoad)} </div>
        );
  };
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  const NewContainer = compose(withConnect)(Container);

  const Loader = props => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    const id = props?.match?.params?.id;

    return <NewContainer {...props} />;
  };

  return Loader;
}
