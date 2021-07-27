import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import Button from '@material-ui/core/Button';

export function makeContainer(
  Component,
  slice,
  load,
  mapStateToProps,
  mapDispatchToProps,
) {
  const Container = props => {
    const { data, saved, stateLoad, actions } = { ...props };
    const id = props?.match?.params?.id;
    !data && !stateLoad.isFetching && !stateLoad.isErrror && actions.load(id);
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
    return props.stateLoad.isFetching
      ? renderLoading()
      : props.stateLoad.isError
      ? rendereError()
      : props.stateLoad.isSuccess && renderComp();
  };
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  const NewContainer = compose(withConnect)(Container);

  const Loader = props => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return <NewContainer {...props} />;
  };

  return Loader;
}
