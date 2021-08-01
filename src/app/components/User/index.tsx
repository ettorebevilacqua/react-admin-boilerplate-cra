// DEBUG: User Router
import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import UI Generator
import { Link, ThemeProvider, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { LayoutProvider } from './LayoutContext';
import Themes from './themes';
import Layout from './Layout';

import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
// import configureStore, { history } from './store/configureStore';

import {
  AuthContext,
  DataProviderContext,
  TranslationProvider,
  Notification,
  Admin,
  Resource,
  DataProvider,
} from 'react-admin';

import createAdminStore from './store/creatAdminStore';
// import restProvider from 'ra-data-simple-rest';
import localStorageDataProvider from 'ra-data-local-storage';
import { LocalStorageDataProviderParams } from 'ra-data-local-storage';
import { createHashHistory } from 'history';

import { Login } from '../../admin/layout';

import MenuCard from './menuCard';
import Plane from './section/plane';
import Indagini from './section/indagini';
import IndaginiMenu from './section/indagini/menuIndagini';
import IndaginiQuestion from './section/indagini/IndaginiQuestion';
import Indagine from './section/indagine';
import Question from './forms/question';
import { QuestionToForm } from './forms/';

const genData: any = []; // generateData();
const data = { defaultData: genData } as LocalStorageDataProviderParams;
const dataProvider = localStorageDataProvider(data);
const history = createHashHistory();

const buttonData = [
  { name: 'Verifica degli apprendiimenti', link: '/app/user/indagini' },
  { name: 'Customer satisfaction', link: '/app/user/indaginiMenu' },
  {
    name: 'gestione docenti e professionisti',
    link: '/#/risorse',
    hardLink: true,
  },
  { name: 'Servizio 4' /*, link: ''*/ },
];

const helmetRender = () => (
  <Helmet titleTemplate="%s - Smart" defaultTitle="Smart">
    <meta name="description" content="Smart service" />
  </Helmet>
);

export default function UserComp() {
  return (
    <>
      {helmetRender()}
      <LayoutProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />

          <Layout>
            {' '}
            {/* place ConnectedRouter under Provider */}
            <Switch>
              <Route
                exact
                path="/app/user/"
                component={() => <IndaginiMenu />}
              />
              <Route
                exact
                path="/app/user/indagini"
                component={() => <Indagini />}
              />
              <Route
                exact
                path="/app/user/indaginiMenu"
                component={() => <IndaginiMenu />}
              />
              <Route
                exact
                path="/app/user/question"
                component={() => <Question />}
              />
              <Route
                exact
                path="/app/user/indagini_question/:id"
                component={() => <IndaginiQuestion />}
              />
              <Route
                exact
                path="/app/user/indagini_invio/:idmodulo/:idcorso"
                component={QuestionToForm}
              />
              <Route
                exact
                path="/app/user/indagine"
                component={() => <Indagine />}
              />
              <Route
                exact
                path="/app/user/verifyr"
                component={() => <MenuCard items={buttonData} />}
              />
              <Route exact path="/app/user/plane" component={() => <Plane />} />
              <Redirect from="/app/user" to="/app/user" exact />
            </Switch>
          </Layout>
        </ThemeProvider>
      </LayoutProvider>

      {/* data.content && <ContentEx /> */}
    </>
  );
}
