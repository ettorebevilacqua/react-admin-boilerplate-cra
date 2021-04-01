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
} from '@ui-schema/ui-schema';

import { browserT } from '../t';

// Minimal Schema, transformed from JS-Object into deep immutable
const schema1 = {
  type: 'object',
  title: 'headline',
  properties: {
    call_count: {
      type: 'number',
      minimum: 2,
      maximum: 10,
      view: {
        sizeMd: 3,
      },
    },
    privacy: {
      type: 'boolean',
      default: true,
      view: {
        sizeMd: 12,
      },
    },
    spam: {
      type: 'boolean',
      view: {
        sizeMd: 12,
      },
    },
    accepted: {
      type: 'boolean',
      view: {
        sizeMd: 12,
      },
    },
    type: {
      type: 'string',
      widget: 'Select',
      default: 'customer',
      view: {
        sizeMd: 3,
      },
      enum: ['customer', 'supplier', 'buyer', 'business', 'partner'],
    },
  },
  required: ['call_count', 'type'],
};

const Editor = () => {
  // Create a state with the data, transforming into immutable on first mount
  const [store, setStore] = React.useState(() => {
    let data = false;
    try {
      data = JSON.parse(window.localStorage.getItem('user_settings') as string);
    } catch (e) {
      // not existing user_settings
    }
    return createStore(createOrderedMap(typeof data === 'object' ? data : {}));
  });

  // or create empty store, based on the schema type:
  // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));
  const [schema /* setSchema */] = React.useState(createOrderedMap(schema1));

  const onChange = React.useCallback(
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
        onChange={onChange}
        widgets={widgets}
        showValidity={true}
        t={browserT}
      >
        {/*
              add children that should be under the schema editor,
              they can use the context of the editor for working
          */}
      </UIGenerator>

      <Typography
        component={'p'}
        variant={'body1'}
        style={{ marginTop: 24, marginBottom: 24 }}
      >
        This form saves the values onChange in the browsers{' '}
        <code>localStorage</code> and restores it at component mount, code in{' '}
        <Link
          href={
            'https://github.com/ui-schema/demo-cra/blob/master/src/Schema/UserSettings.js'
          }
        >
          src/Schema/UserSettings.js
        </Link>
      </Typography>
    </React.Fragment>
  );
};

export function Example1() {
  return (
    <>
      <Helmet>
        <title>Forms container </title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>Forms container example1 xx</span>
      <Editor />
    </>
  );
}
