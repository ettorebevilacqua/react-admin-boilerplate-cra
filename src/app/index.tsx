/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { AppHome } from './app';
import AdminApp from './admin';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

// import { ThemeProvider } from 'styles/theme/ThemeProvider';

export function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={AppHome} />
          <Route exact path="/" component={AdminApp} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}
