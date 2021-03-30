// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
// import 'proxy-polyfill';
import * as React from 'react';

// mport dataProviderFactory from './dataProvider';
// import fakeServerFactory from './fakeServer';
// import jsonServerProvider from 'ra-data-json-server';
import { LocalStorageDataProviderParams } from 'ra-data-local-storage';

import App from './App';
import localStorageDataProvider from 'ra-data-local-storage';
import generateData from 'data-generator-retail';
const genData: any = generateData();
const data = { defaultData: genData } as LocalStorageDataProviderParams;

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const dataProvider = localStorageDataProvider(data);

/**
 * This demo can work with either a fake REST server, or a fake GraphQL server.
 *
 * To avoid bundling both libraries, the dataProvider and fake server factories
 * use the import() function, so they are asynchronous.
 */
/* const prepareDataProvider = async () => {
  const restoreFetch = await fakeServerFactory(
    process.env.REACT_APP_DATA_PROVIDER || '',
  );
  const dataProvider = await dataProviderFactory(
    process.env.REACT_APP_DATA_PROVIDER || '',
  );
  return { dataProvider, restoreFetch };
};

const restoreFetch = await fakeServerFactory(
  process.env.REACT_APP_DATA_PROVIDER || '',
);
*/

const AdminApp = () => (
  <App dataProvider={dataProvider} onUnmount={() => null} />
);

export default AdminApp;
