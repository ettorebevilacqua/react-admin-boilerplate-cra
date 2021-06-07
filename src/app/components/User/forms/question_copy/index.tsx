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

import getResource from '../../data/adminProvider';
import { withRouter } from 'react-router';

import Forms from './forms';

// getResource('corsi').then(resp => console.log('ss', resp));

const values = {};
const listValues = [];

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Question(props) {
  var classes = useStyles();
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

  /* SLIDE

  {
    "type": "number",
    "widget": "NumberSlider",
    "minimum": 1,
    "maximum": 10,
    "view": {
      "marks": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "marksLabel": "",
      "tooltip": "on",
      "sizeXs": 8,
      "sizeMd": 6
    }
  }
*/

  const onChangeForms = React.useCallback(
    (storeKeys, scopes, updater, deleteOnEmpty, type) => {
      setStore(prevStore => {
        const newStore = storeUpdater(
          storeKeys,
          scopes,
          updater,
          deleteOnEmpty,
          type,
        )(prevStore);
        const newValue = newStore.getIn(prependKey(storeKeys, 'values'));
        //  const newValue = newStore.getIn(prependKey(storeKeys, 'toJS'));
        console.log('xxxx', storeKeys, store.valuesToJS());
        /*const newValue = newStore.getIn(prependKey(storeKeys, 'values'))
        const prevValue = prevStore.getIn(prependKey(storeKeys, 'values'))
        console.log(
            isImmutable(newValue) ? newValue.toJS() : newValue,
            isImmutable(prevValue) ? prevValue.toJS() : prevValue,
            storeKeys.toJS(),
            deleteOnEmpty, type,
        )*/
        return newStore;
      });
    },
    [setStore],
  );

  return (
    <div className={classes.root}>
      <Forms store={store} onChange={onChangeForms} />

      <Card className={classes.card}>
        <button
          disabled={!!isInvalid(store.getValidity())}
          onClick={() => {
            const str = JSON.stringify(store.valuesToJS());
            localStorage.setItem('formQuestion', str);

            /* if (!isInvalid(store.getValidity())) {
              // when not invalid, post to an API
              fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                // here the immutable store is converted back to JS-Object and then to JSON
                body: JSON.stringify(store.valuesToJS()),
              })
                .then(r => r.json())
                .then(answer => console.log(answer))
                .catch(err => console.error(err));

            } */
          }}
        >
          Salva
        </button>
      </Card>
    </div>
  );
}

export default withRouter(Question);
