import React from 'react';

import { widgets } from '@ui-schema/ds-material';

// Import UI Generator
import {
  UIGenerator, // main component
  isInvalid, // for validity checking
  createEmptyStore,
  createStore, // for initial data-store creation
  createMap,
  createOrderedMap,
  prependKey, // for deep immutables
} from '@ui-schema/ui-schema';
import { storeUpdater } from '@ui-schema/ui-schema/UIStore/storeUpdater';
import { Select, SelectMulti } from '@ui-schema/ds-material/Widgets/Select';
import {
  schema,
  TipoSchema,
  schemaCustomer,
  TipoSchemaCustomer,
} from './schema';

// styles
import useStyles from './styles';
import { Card } from '@material-ui/core';
import { isImmutable } from 'immutable';
import queryString from 'query-string';

import getResource from '../../../../data/adminProvider';
import { withRouter } from 'react-router';
import { FormikTest } from './formik';
import { useSelector, useDispatch } from 'react-redux';
import { readModuli, dataSelector } from 'app/slice/moduliSlice';
// getResource('corsi').then(resp => console.log('ss', resp));

const values = {};
const listValues = [];

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Question(props) {
  var classes = useStyles();
  const { data, isFetching, isError } = useSelector(dataSelector);
  const [store, setStore] = React.useState(() => createEmptyStore('object'));
  const [storeQ, setStoreQ] = React.useState(() =>
    createStore(createOrderedMap(listValues)),
  );

  const [showValidity, setShowValidity] = React.useState(false);

  const qryLocation = queryString.parse(props.location.search);
  const currentSchema = 'isCustomer' in qryLocation ? schemaCustomer : schema;
  const currentTipoSchema =
    'isCustomer' in qryLocation ? TipoSchemaCustomer : TipoSchema;

  // Create a state with the data, transforming into immutable on first mount

  // or create empty store, based on the schema type:
  // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));

  const onChange = React.useCallback(
    (storeKeys, scopes, updater, deleteOnEmpty, type) => {
      setStore(storeUpdater(storeKeys, scopes, updater, deleteOnEmpty, type));
    },
    [setStore],
  );

  return (
    <div className={classes.root}>
      {isFetching ? <h2>Loading</h2> : <FormikTest />}
    </div>
  );
}

export default withRouter(Question);
