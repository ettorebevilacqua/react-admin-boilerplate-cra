import * as React from 'react';
import { useEffect } from 'react';
import { Admin, Resource, DataProvider } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import { createHashHistory } from 'history';
// import { routerMiddleware, connectRouter } from 'connected-react-router';

import visitors from './forms/visitors';
import Enti from './forms/enti';

const i18nProvider = polyglotI18nProvider(locale => {
  if (locale === 'fr') {
    return import('./i18n/fr').then(messages => messages.default);
  }

  // Always fallback on english
  return englishMessages;
}, 'en');

interface AppProps {
  onUnmount?: () => void;
  dataProvider: DataProvider;
}

const AdminApp = ({ onUnmount, dataProvider }: AppProps) => {
  useEffect(() => onUnmount, [onUnmount]);

  return (
    <Admin
      title=""
      dataProvider={dataProvider}
      customReducers={{ theme: themeReducer }}
      customRoutes={customRoutes}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
      history={createHashHistory()}
      disableTelemetry
    >
      <Resource name="customers" {...visitors} />
      <Resource name="enti" {...Enti} />
    </Admin>
  );
};

export default AdminApp;
