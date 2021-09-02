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

import Risorse from './forms/risorse';
import Qualifiche from './forms/qualifiche';
import Corsi from './forms/corsi';
import Ambiti from './forms/ambiti';
import Indagini from './forms/indagini';
import lists from './forms/lists';

import {} from '../../mock';

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

const risorsaTipoResource = {
  resource: 'risorsaTipo',
  source: 'tipo',
  label: 'Tipologie risorsa',
};

const fieldsGridRisorsaTipo = {
  hideId: false,
  sourceList: [{ type: 'text', ...risorsaTipoResource }],
};

const risorsaTipo = {
  ...lists(risorsaTipoResource, fieldsGridRisorsaTipo),
};

const risorsaTipoFgiuridiche = {
  resource: 'fgiuridiche',
  source: 'tipo',
  label: 'Forme Giuridiche',
};

const fieldsGridFgiuridiche = {
  hideId: false,
  sourceList: [{ type: 'text', ...risorsaTipoFgiuridiche }],
};

const risorsaFgiuridiche = {
  ...lists(risorsaTipoResource, fieldsGridFgiuridiche),
};

const risorsaModqualifica = {
  resource: 'modqualifica',
  source: 'modalita',
  label: 'Modalità qualifica',
};

const fieldsGridModqualifica = {
  hideId: false,
  sourceList: [{ type: 'text', ...risorsaModqualifica }],
};

const modqualifica = {
  ...lists(risorsaModqualifica, fieldsGridModqualifica),
};

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
      <Resource name="risorse" {...Risorse} />
      <Resource name="qualifiche" {...Qualifiche} />
      <Resource name="corsi" {...Corsi} />
      <Resource name="indagini" {...Indagini} />
      <Resource name="ambiti" {...Ambiti} />
      <Resource name="fgiuridiche" {...risorsaFgiuridiche} />
      <Resource name="risorsaTipo" {...risorsaTipo} />
      <Resource name="modqualifica" {...modqualifica} />
    </Admin>
  );
};

export default AdminApp;
