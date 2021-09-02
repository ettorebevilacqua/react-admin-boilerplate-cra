import React from 'react';

import { widgets } from '@ui-schema/ds-material';
import useStyles from './styles';

// Import UI Generator
import {
  UIGenerator,
  createStore,
  createOrderedMap, // for deep immutables
} from '@ui-schema/ui-schema';
import { storeUpdater } from '@ui-schema/ui-schema/UIStore/storeUpdater';

// import { todosFiltered } from './../../data/db';

const schema = createOrderedMap({
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
    },
    comment: {
      type: 'string',
      widget: 'Text',
      view: {
        rows: 3,
      },
    },
    accept_privacy: {
      type: 'boolean',
    },
  },
  required: ['accept_privacy'],
});

const values = {};

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Indagine(props) {
  var classes = useStyles();
  // Create a state with the data, transforming into immutable on first mount
  const [store, setStore] = React.useState(() =>
    createStore(createOrderedMap(values)),
  );

  // const todosProvider = todosFiltered.query({ completed: showCompleted });
  // const todos = useData(todosProvider);
  const loaded = true; //useLoaded(todosProvider);

  // or create empty store, based on the schema type:
  // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));

  const onChange = React.useCallback(
    (storeKeys, scopes, updater, deleteOnEmpty, type) => {
      setStore(storeUpdater(storeKeys, scopes, updater, deleteOnEmpty, type));
    },
    [setStore],
  );

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <pre>{JSON.stringify(values)}</pre>
      </div>
      <UIGenerator
        schema={schema}
        store={store}
        onChange={onChange}
        widgets={widgets}
      />
    </>
  );
}

export default Indagine;
