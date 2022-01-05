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
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import Themes from 'app/components/User/themes';
import Layout from 'app/components/User/Layout';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { initUser } from 'app/slice/userSlice';
import { RootState } from 'types';
import { UserAuthState } from 'app/slice/types';

import LoadingOverlay from 'app/components/Layout/LoadingOverlay';

import { AppHome } from './app';
import Login from 'app/components/Layout/Login';
// import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { GuestPage } from './pages/guest/Loadable';
import { useUserAuthSlice } from 'app/slice';
import { EnteForm } from 'app/components/User/section/plane/ente';

const isGuest = () => window.location.pathname.indexOf('/guest') === 0;
const isRegister = () => window.location.pathname.indexOf('/register/ente') === 0;
function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return !isAuthenticated && isGuest() ? (
    <Login />
  ) : (
    <Route
      {...rest}
      render={(...args) => {
        return isAuthenticated === true ? children : <Login />;
      }}
    />
  );
}

const AppRoute = ({ isAuthenticated }) => (
  <>
    {isAuthenticated && (
      <>
        <PrivateRoute path="/app" isAuthenticated={isAuthenticated}>
          <AppHome />
        </PrivateRoute>
        <Route exact path="/" component={HomePage}>
          <Redirect from="/" to="/app/user" />
        </Route>
      </>
    )}
  </>
);

initUser(store); // check if user is logged with present token
function AppBody() {
  const xxx = useSelector((state: RootState) => {
    // console.log('state', state.userAuth);
    return state.userAuth || undefined;
  });
  const { id, mustAuth, isAuth, isFetching, isError } = xxx as UserAuthState;
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    // console.log('check auth isError ', isError);
  }, [xxx]);

  const renderRouting = () => (
    <LoadingOverlay active={isFetching} spinner text="Loading...">
      <BrowserRouter>
        <Switch>
          <Layout>
            {isGuest() ? (
              <Route exact path="/guest/:token" component={GuestPage} />
            ) : isRegister() ? (
              <Route exact path="/register/ente" component={EnteForm} />
            ) : (
              <AppRoute isAuthenticated={!!id && !mustAuth && !isError} />
            )}
          </Layout>
        </Switch>
      </BrowserRouter>
    </LoadingOverlay>
  );

  const renderBlankPage = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'linear-gradient( #19005ee4, rgba(255,255,255,0.4)), url(https://source.unsplash.com/random/1600x900)',
      }}
    >
      {' '}
    </div>
  );

  const renderLogin = () => (
    <LoadingOverlay active={isFetching} spinner text="Loading...">
      {' '}
      <Login />
    </LoadingOverlay>
  );

  const isPubblic = isGuest() || isRegister();

  return isPubblic
    ? renderRouting()
    : !isAuth || isError
    ? renderLogin()
    : !isFetching && !id && !mustAuth
    ? renderBlankPage()
    : renderRouting();
}

const helmetContext = {};

const StartSlices = () => {
  useUserAuthSlice(); // start up slices
  return <></>;
};

export function App() {
  const { i18n } = useTranslation();
  return (
    <React.Fragment>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />{' '}
        <Provider store={store}>
          <StartSlices />
          <HelmetProvider context={helmetContext}>
            <Helmet
              titleTemplate="%s - React Boilerplate"
              defaultTitle="Smart"
              htmlAttributes={{ lang: i18n.language }}
            >
              <meta name="description" content="Smart service" />
            </Helmet>

            <AppBody />
          </HelmetProvider>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}
