import React from 'react';
import useLoader from 'app/components/User/hooks/loader';
import Button from '@material-ui/core/Button';
import LoadingOverlay from 'app/components/Layout/LoadingOverlay';
import { useHistory } from 'react-router-dom';
// import useLoader from 'app/components/User/hooks/loader';

export type PropsLoader = {
  Component: any;
  slice: any;
  actionPayload?: string | object | null;
  values?: any;
};

export default function LoadSliceData({ slice, actionPayload, Component, values, ...rest }: PropsLoader) {
  const selector = useLoader(slice, actionPayload, values);
  const { data, isFetching, saved, isError, errorMessage } = selector || {};
  const history = useHistory();

  const rendereError = () => (
    <div style={{ margin: 'auto', width: '85%' }}>
      <h2>Errore nel Caricamento</h2>
      <p> {errorMessage}</p>
      <div>
        <Button color="primary" variant="contained" fullWidth onClick={() => history.push('/app/user')}>
          Torna Indietro
        </Button>
      </div>
    </div>
  );

  if (isError) {
    return rendereError;
  }
  const renderComp = () => {
    return <Component data={data} {...rest} />;
  };

  return (
    <LoadingOverlay active={isFetching || !selector} spinner text="Loading...">
      {!isFetching && !data ? isError && rendereError() : (data || Component) && renderComp()}
    </LoadingOverlay>
  );
}
