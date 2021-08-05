import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoadingOverlay from 'app/components/Layout/LoadingOverlay';
import { handlePromise } from '../../helper';

export function makeContainer(Component, sliceProvider, loadCallBack) {
  const { slice, mapToProps } = sliceProvider;
  const { state: mapStateToProps, dispatch: mapDispatchToProps } = mapToProps;

  const Container = props => {
    const toProps = { ...props };
    const {
      formProp: { stateLoad, saved, data },
      actions,
    } = props;
    const history = useHistory();
    React.useEffect(() => {
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
      debugger;
      const [saved, error] = await handlePromise(actions.save(values));
      console.log('form is  submitted', saved);
      if (error) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
        resetForm(values);
        return;
      }
      setSubmitting(true);
      setTimeout(async () => {
        // it will set formik.isDirty to false // it will also keep new values
        resetForm({ values });
      }, 100);

      setStatus({ success: true });
    };

    const linkToErrorOnLoad = () => (
      <div>
        <h2>Errrore nel Caricamento</h2>
        <p>
          <Link to="/">Ricarica qui </Link>
        </p>
      </div>
    );

    const rendereError = () => (
      <>
        <div>
          <h2>Errrore nel Caricamento</h2>
          <p>
            <Link to="/" />
          </p>
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
          {!stateLoad.isFetching && !data ? rendereError() : renderComp()}
        </LoadingOverlay>
      </div>
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
