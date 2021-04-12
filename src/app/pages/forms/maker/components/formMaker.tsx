import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import UI Generator
import { Link, Typography } from '@material-ui/core';

import { widgets } from '@ui-schema/ds-material';
import {
  UIGenerator, // main component
  isInvalid, // for validity checking
  createEmptyStore,
  createStore, // for initial data-store creation
  createMap,
  createOrderedMap, // for deep immutables
  storeUpdater,
  StoreSchemaType,
} from '@ui-schema/ui-schema';

import { browserT } from '../../t';

export function FormMaker(props: any) {
  const { storeName, schemaObj, onChange, ...otherProps } = props;
  // Create a state with the data, transforming into immutable on first mount
  const [store, setStore] = React.useState(() => {
    let data = false;
    try {
      data = JSON.parse(window.localStorage.getItem(storeName) as string);
    } catch (e) {
      // not existing user_settings
    }
    return createStore(createOrderedMap(typeof data === 'object' ? data : {}));
  });

  // or create empty store, based on the schema type:
  // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));
  const [schema /* setSchema */] = React.useState(
    createOrderedMap(schemaObj) as StoreSchemaType,
  );

  const onChange2 = React.useCallback(
    (storeKeys, scopes, updater, deleteOnEmpty, type) => {
      setStore(prevStore => {
        const newStore = storeUpdater(
          storeKeys,
          scopes,
          updater,
          deleteOnEmpty,
          type,
        )(prevStore);

        // if using a big schema this can be performance problematic!
        // if using strings, throttle the `toJS` operation!
        window.localStorage.setItem(
          'user_settings',
          JSON.stringify(newStore.valuesToJS()),
        );
        onChange(newStore, prevStore);

        return newStore;
      });
    },
    [setStore],
  );

  return (
    <React.Fragment>
      <UIGenerator
        schema={schema}
        store={store}
        onChange={onChange2}
        widgets={widgets}
        t={browserT}
      >
        {/*
              add children that should be under the schema editor,
              they can use the context of the editor for working
          */}
      </UIGenerator>
    </React.Fragment>
  );
}
