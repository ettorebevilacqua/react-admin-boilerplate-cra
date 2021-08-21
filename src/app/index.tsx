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

import {
  initUser,
  mapStateToPropsUser,
  userSelector,
} from 'app/slice/userSlice';

import LoadingOverlay from 'app/components/Layout/LoadingOverlay';

import { AppHome } from './app';
import AdminApp from './admin';
import { Login } from 'app/admin/layout';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { useUserAuthSlice } from 'app/slice';
import { GuestRoute } from './components/User';

const Protected = () => <h3>Protected</h3>;

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return !isAuthenticated && window.location.pathname !== '/guest' ? (
    <Login />
  ) : (
    <Route
      {...rest}
      render={({ location }) => {
        debugger;
        return isAuthenticated === true ? children : <p>ccccc</p>;
      }}
    />
  );
}

const AppRoute = ({ isAuthenticated }) => (
  <>
    <Route exact path="/guest" component={GuestRoute} />
    <PrivateRoute
      path="/app"
      component={AppHome}
      isAuthenticated={isAuthenticated}
    >
      <Route exact path="/admin" component={AdminApp} />

      <Route component={NotFoundPage} />
      <Route exact path="/" component={HomePage}>
        <Redirect from="/" to="/app/user" />
      </Route>
    </PrivateRoute>
  </>
);

function AppBody(props: any) {
  const {
    id,
    isFetching,
    mustAuth,
    isSuccess,
    isError,
  } = props.formProp.stateLoad;

  React.useEffect(() => {
    initUser(store); // check if user is logged with present token
  }, []);

  React.useEffect(() => {
    // console.log('check auth ', isFetching, mustAuth, id);
  }, [props.formProp.stateLoad]);

  return !isFetching && !id && !mustAuth ? (
    <h3>start</h3>
  ) : (
    <LoadingOverlay active={isFetching} spinner text="Loading...">
      <BrowserRouter>
        <Switch>
          <AppRoute isAuthenticated={!!id && !mustAuth} />
        </Switch>
      </BrowserRouter>
    </LoadingOverlay>
  );
}

// const { mapStateToProps, mapDispatchToProps } = mapToPropsUser;
const withConnect = connect(mapStateToPropsUser);
const AppBodyConnected = compose(withConnect)(AppBody);

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
          <AppBodyConnected />
        </HelmetProvider>
      </Provider>
    </React.Fragment>
  );
}
