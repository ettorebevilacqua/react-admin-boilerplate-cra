import React from 'react';
import { widgets } from '@ui-schema/ds-material';

// Import UI Generator
import {
  UIGenerator, // main component
  isInvalid, // for validity checking
  createEmptyStore,
  createStore, // for initial data-store creation
  createMap,
  createOrderedMap, // for deep immutables
} from '@ui-schema/ui-schema';
import { storeUpdater } from '@ui-schema/ui-schema/UIStore/storeUpdater';

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

export const Editor = () => {
  // Create a state with the data, transforming into immutable on first mount
  const [store, setStore] = React.useState(() =>
    createStore(createOrderedMap(values)),
  );

  // or create empty store, based on the schema type:
  // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));

  const onChange = React.useCallback(
    (storeKeys, scopes, updater, deleteOnEmpty, type) => {
      setStore(storeUpdater(storeKeys, scopes, updater, deleteOnEmpty, type));
    },
    [setStore],
  );

  return (
    <UIGenerator
      schema={schema}
      store={store}
      onChange={onChange}
      widgets={widgets}
    />
  );
};

// export default Editor;
