/**
 * index.tsx

  auth with provate route
  https://ui.dev/react-router-v5-protected-routes-authentication/

 */
// DEBUG: App Root
import * as React from 'react';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Switch, Route, Redirect } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { UserPage } from './pages/User/Loadable';
// import { ThemeProvider } from 'styles/theme/ThemeProvider';

// BOOKROOT: ROOT App

// dataApi.userProvider.login('ettore@bevilacqua.com1', 'password1').then(data=>alert(data));

export function AppHome(props: any) {
  return (
    <>
      <Switch>
        <Route path="/app/user" component={UserPage} />

        <Redirect from="/app" to="/app/user" />
        <Route component={NotFoundPage} />
        <GlobalStyle />
      </Switch>
    </>
  );
}
