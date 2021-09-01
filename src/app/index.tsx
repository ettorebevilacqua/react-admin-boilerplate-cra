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
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import store from '../store/configureStore';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import {
  initUser,
  mapStateToPropsUser,
  userSelector,
} from 'app/slice/userSlice';
import { RootState } from 'types';
import { UserAuthState } from 'app/slice/types';

import LoadingOverlay from 'app/components/Layout/LoadingOverlay';

import { AppHome } from './app';
import AdminApp from './admin';
import { Login } from 'app/admin/layout';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { useUserAuthSlice } from 'app/slice';
import { GuestRoute } from './components/User';

const Protected = () => <h3>Protected</h3>;
const isGuest = () => window.location.pathname === '/guest';
function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return !isAuthenticated && isGuest() ? (
    <Login />
  ) : (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated === true ? children : <Login />;
      }}
    />
  );
}

const AppRoute = ({ isAuthenticated }) => (
  <>
    {isAuthenticated && (
      <>
        <PrivateRoute
          path="/app"
          component={AppHome}
          isAuthenticated={isAuthenticated}
        >
          <Route exact path="/admin" component={AdminApp} />

          <Route component={NotFoundPage} />
        </PrivateRoute>
        <Route exact path="/" component={HomePage}>
          <Redirect from="/" to="/app/user" />
        </Route>
      </>
    )}
  </>
);
initUser(store); // check if user is logged with present token
function AppBody(props: any) {
  const xxx = useSelector((state: RootState) => {
    // console.log('state', state.userAuth);
    return state.userAuth || undefined;
  });
  const {
    id,
    mustAuth,
    isAuth,
    isSuccess,
    isFetching,
    isError,
  } = xxx as UserAuthState;
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    // console.log('check auth isError ', isError);
  }, [xxx]);

  const renderRouting = isGuest => (
    <LoadingOverlay active={isFetching} spinner text="Loading...">
      <BrowserRouter>
        <Switch>
          {isGuest ? (
            <Route exact path="/guest" component={GuestRoute} />
          ) : (
            <AppRoute isAuthenticated={!!id && !mustAuth && !isError} />
          )}
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

  return isGuest()
    ? renderRouting(true)
    : !isAuth || isError
    ? renderLogin()
    : !isFetching && !id && !mustAuth
    ? renderBlankPage()
    : renderRouting(false);
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
    </React.Fragment>
  );
}
