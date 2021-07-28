import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import Button from '@material-ui/core/Button';
import store from 'store/configureStore';

export function makeContainer(
  Component,
  slice,
  load,
  mapStateToProps,
  mapDispatchToProps,
) {
  const Container = props => {
    const { data, saved, stateLoad, actions } = { ...props };
    React.useEffect(() => {
      const id = props?.match?.params?.id;
      load(id);
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
    const renderComp = () => <Component {...props} />;
    return props.formProp.stateLoad.isFetching
      ? renderLoading()
      : props.formProp.stateLoad.isError
      ? rendereError()
      : props.formProp.stateLoad.isSuccess && renderComp();
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
