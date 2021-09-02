import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/redux-injectors';
import Button from '@material-ui/core/Button';
import LoadingOverlay from 'app/components/Layout/LoadingOverlay';
import { handlePromise } from '../../helper';

export function makeContainer(
  Component,
  sliceProvider,
  loadCallBack,
  initialState,
) {
  const { slice, mapToProps } = sliceProvider;
  const { state: mapStateToProps, dispatch: mapDispatchToProps } = mapToProps;

  const Container = props => {
    const history = useHistory();
    const toProps = { ...props };
    toProps.actions.reload = () =>
      !stateLoad.isFetching &&
      loadCallBack(props?.match?.params, history, props?.location, stateLoad);

    const {
      formProp: { stateLoad, saved, data },
      actions,
    } = props;

    React.useEffect(() => {
      !stateLoad.isSuccess &&
        !stateLoad.isFetching &&
        !stateLoad.isError &&
        !data &&
        loadCallBack(props?.match?.params, history, props?.location);
    }, []);

    React.useEffect(() => {
      !!saved &&
        saved.isSuccess &&
        !stateLoad.isFetching &&
        !stateLoad.isError &&
        loadCallBack(props?.match?.params, history, props?.location, saved);
    }, [saved]);

    const onSubmit = async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm, ...subMitMethods },
    ) => {
      const [saved, error] =
        actions && actions.save
          ? await handlePromise(actions.save(values))
          : [];
      console.log('form is  submitted', saved);
      // TODO: MANAGE ERROR
      /* if (error) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
        resetForm(values);
        return;
      }
      */
      setSubmitting(true);
      setTimeout(async () => {
        // it will set formik.isDirty to false // it will also keep new values
        resetForm({ values });
      }, 100);

      setStatus({ success: true });
    };

    const saveData = async valToSave => {
      return actions && actions.save
        ? actions.save(valToSave)
        : new Promise(() => [null, 'error save not found']);
    };

    const rendereError = () => (
      <>
        <h2>Errrore nel Caricamento</h2>
        <p> {stateLoad.errorMessage}</p>
        <div>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => history.push('/app/user')}
          >
            Torna Indietro
          </Button>
        </div>
      </>
    );
    const renderComp = state => (
      <Component
        queryValue={props?.match?.params || {}}
        onSubmit={onSubmit}
        saveData={saveData}
        {...toProps}
      />
    );

    return stateLoad.isError ? (
      rendereError()
    ) : (
      <div>
        <LoadingOverlay active={stateLoad.isFetching} spinner text="Loading...">
          {!stateLoad.isFetching && !data
            ? stateLoad.isError && rendereError()
            : renderComp()}
        </LoadingOverlay>
      </div>
    );
  };

  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  const NewContainer = compose(withConnect)(Container);

  // for dynamic load useHook
  const InjectedComp = ({ sliceDef }) => {
    useInjectReducer({
      key: sliceDef.slice.name,
      reducer: sliceDef.slice.reducer,
    });
    return <></>;
  };

  const Loader = props => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    const hasMoreActions = !!sliceProvider?.actionsSlice?.map;
    return (
      <>
        {hasMoreActions &&
          sliceProvider.actionsSlice.map(sliceDef => (
            <InjectedComp sliceDef={sliceDef} />
          ))}
        <NewContainer {...props} />
      </>
    );
  };

  // Calling the function using the array with apply()
  // compose(injected)(Loader);
  // compose.apply(null, injected)(Loader);

  return Loader; // sliceProvider.actionsSlice ? LoaderTwo : LoaderOne;
}

export function makeContainerRefreshed(Component, sliceProvider, loadCallBack) {
  sliceProvider.actions.reset();
  return makeContainer(
    Component,
    sliceProvider,
    loadCallBack,
    sliceProvider.initialState,
  );
}
