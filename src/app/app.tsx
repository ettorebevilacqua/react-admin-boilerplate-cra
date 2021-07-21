/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from '../store/configureStore';

import { useSelector, useDispatch } from 'react-redux';
import { initUser, userSelector, clearState } from 'app/slice/userSlice';

import { HomePage } from './pages/HomePage/Loadable';
import { FormsPage } from './pages/forms/Loadable';

import { UserPage } from './pages/User/Loadable';
import { UserMenu } from './pages/UserMenu/Loadable';
// import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { Login } from 'app/admin/layout';
import dataApi from './data';

// dataApi.userProvider.login('ettore@bevilacqua.com1', 'password1').then(data=>alert(data));

const store = configureAppStore();
initUser(store); // check if user is logged with present token

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const helmetContext = {};

function AppBody(props: any) {
  const { isFetching, isSuccess, isError } = useSelector(userSelector);
  return isFetching ? (
    <h2>Loading</h2>
  ) : !isSuccess ? (
    <Login />
  ) : (
    <BrowserRouter>
      <Switch>
        <Route exact path="/app/home" component={HomePage} />
        <Route path="/app/user" component={UserPage} />
        <Route path="/app/forms" component={FormsPage} />
        <Redirect from="/app" to="/app/userMenu" exact />
      </Switch>
    </BrowserRouter>
  );
}

export function AppHome(props: any) {
  const { i18n } = useTranslation();
  return (
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="Smart"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Smart service" />
        </Helmet>
        <AppBody {...props} />
        <GlobalStyle />
      </HelmetProvider>
    </Provider>
  );
}
