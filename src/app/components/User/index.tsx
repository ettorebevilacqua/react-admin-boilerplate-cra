import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import UI Generator
import { Link, ThemeProvider, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { LayoutProvider } from './LayoutContext';
import Themes from './themes';
import Layout from './Layout';

import MenuCard from './menuCard';
import Plane from './section/plane';
import Indagini from './section/indagini';
import Indagine from './section/indagine';

import Forms from './forms';

const buttonData = [
  { name: 'Verifica degli apprendiimenti', link: '/app/user/indagini' },
  { name: 'Customer satisfaction', link: '/app/user/indagini' },
  { name: 'gestione docenti e professionisti' /*, link: '/app/crm'*/ },
  { name: 'Servizio 4' /*, link: ''*/ },
];

export default function UserComp() {
  return (
    <>
      <Helmet titleTemplate="%s - React Boilerplate" defaultTitle="Smart">
        <meta name="description" content="Smart service" />
      </Helmet>
      <LayoutProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />

          <Layout>
            <Switch>
              <Route
                exact
                path="/app/user/home"
                component={() => <MenuCard items={buttonData} />}
              />
              <Route
                exact
                path="/app/user/indagini"
                component={() => <Indagini />}
              />
              <Route
                exact
                path="/app/user/indagine"
                component={() => <Indagine />}
              />
              <Route path="/app/user/forms" component={() => <Forms />} />
              <Route
                exact
                path="/app/user/verifyr"
                component={() => <MenuCard items={buttonData} />}
              />
              <Route exact path="/app/user/plane" component={() => <Plane />} />
              <Redirect from="/app/user" to="/app/user/home" exact />
            </Switch>
          </Layout>
        </ThemeProvider>
      </LayoutProvider>

      {/* data.content && <ContentEx /> */}
    </>
  );
}
