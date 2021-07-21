/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 * 
 * for route read 
 * 
  https://stackoverflow.com/questions/56711663/react-router-v5-0-nested-routes
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { AppHome } from './app';
import AdminApp from './admin';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

// import { ThemeProvider } from 'styles/theme/ThemeProvider';

export function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/app" component={AppHome} />
          <Route exact path="/admin" component={AdminApp} />
          <Redirect from="/" to="/app/home" exact />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}
