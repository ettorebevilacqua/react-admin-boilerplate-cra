import React, { createContext } from 'react';
import { Helmet } from 'react-helmet-async'; // Import UI Generator
import { Link, Typography } from '@material-ui/core';

import { createStore, createOrderedMap } from '@ui-schema/ui-schema';

import userSchema from './schemas/user';
import { FormMaker } from './components/formMaker';

const makerApi = createContext(null);

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
  const [schema /* setSchema */] = React.useState(createOrderedMap(userSchema));

  const onChange = React.useCallback(store => setStore(store), [setStore]);

  return (
    <React.Fragment>
      <FormMaker storeName="smart_users" schemaObj={userSchema} onChange={onChange} />

      <Typography component={'p'} variant={'body1'} style={{ marginTop: 24, marginBottom: 24 }}>
        This form saves the values onChange in the browsers <code>localStorage</code> and restores it at component
        mount, code in{' '}
        <Link href={'https://github.com/ui-schema/demo-cra/blob/master/src/Schema/UserSettings.js'}>
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
