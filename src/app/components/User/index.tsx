// DEBUG: User Router

/**
 * react route for state and history management : https://blog.logrocket.com/react-router-with-redux-navigation-state/
 *
 *
 *
 */

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

import {
  ModuliForm,
  QuestionToForm,
  QuestionList,
  GuestQuestionForm,
} from './forms/';

import { IndaginiList } from './forms/question';

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

export const GuestRoute = () => (
  <>
    {helmetRender()}
    <LayoutProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/guest/compile/:token" component={GuestQuestionForm} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </LayoutProvider>
  </>
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
                component={() => <IndaginiList />}
              />
              <Route
                exact
                path="/app/user/indaginiMenu"
                component={() => <IndaginiMenu />}
              />
              <Route
                exact
                path="/app/user/moduli"
                component={() => <ModuliForm />}
              />
              <Route
                exact
                path="/app/user/indagini_question/:id"
                component={() => <IndaginiQuestion />}
              />
              <Route
                exact
                path="/app/user/indagini_invio/:idquestion/"
                component={QuestionToForm}
              />
              <Route
                exact
                path="/app/user/indagini_edit/:id"
                component={QuestionToForm}
              />
              <Route
                exact
                path="/app/user/indagini/list"
                component={QuestionList}
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
