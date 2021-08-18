import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { injectReducer, injectSaga } from 'redux-injectors';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoadingOverlay from 'app/components/Layout/LoadingOverlay';
import { handlePromise } from '../../helper';
import { initial } from 'lodash';

export function makeContainer(
  Component,
  sliceProvider,
  loadCallBack,
  initialState,
) {
  const { slice, mapToProps } = sliceProvider;
  const { state: mapStateToProps, dispatch: mapDispatchToProps } = mapToProps;

  const Container = props => {
    const [firstTime, setFirstTime] = React.useState(true);
    const toProps = { ...props };
    toProps.actions.reload = () =>
      loadCallBack(props?.match?.params, history, props?.location);
    const {
      formProp: { stateLoad, saved, data },
      actions,
    } = props;
    const history = useHistory();
    React.useEffect(() => {
      setFirstTime(false);
      loadCallBack(props?.match?.params, history, props?.location);
    }, []);

    React.useEffect(() => {
      saved &&
        saved.isSuccess &&
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

    const rendereError = () => (
      <>
        <h2>Errrore nel Caricamento</h2>
        <p> {stateLoad.errorMessage}</p>
        <div>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => props.history.push('/app/user')}
          >
            Torna Indietro
          </Button>
        </div>
      </>
    );
    const renderComp = state => (
      <Component
        queryValue={props?.match.params}
        onSubmit={onSubmit}
        {...toProps}
      />
    );

    return stateLoad.isError ? (
      rendereError()
    ) : (
      <div>
        <LoadingOverlay active={stateLoad.isFetching} spinner text="Loading...">
          {!stateLoad.isFetching && !data
            ? rendereError()
            : !firstTime && renderComp()}
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
    debugger;
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
  sliceProvider.actions.clearState();
  return makeContainer(
    Component,
    sliceProvider,
    loadCallBack,
    sliceProvider.initialState,
  );
}
