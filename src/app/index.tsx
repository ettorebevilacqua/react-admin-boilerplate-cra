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

import { AppHome } from './app';
import AdminApp from './admin';
import { Login } from 'app/admin/layout';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { useUserAuthSlice } from 'app/slice';

initUser(store); // check if user is logged with present token
const MyComp = () => <h3>my comp</h3>;
const Public = () => (
  <>
    <h3>Public</h3>
    <Route path="/guest/:token" component={MyComp} />
  </>
);

const Protected = () => <h3>Protected</h3>;

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log('xxxxx', isAuthenticated);
        return isAuthenticated === true ? children : <Login />;
      }}
    />
  );
}

const AppRoute = ({ isAuthenticated }) => (
  <>
    <Route path="/guest" component={Public} />
    <PrivateRoute path="/app" isAuthenticated={isAuthenticated}>
      <Switch>
        <Route path="/app" component={AppHome} />
        <Route exact path="/admin" component={AdminApp} />

        <Route component={NotFoundPage} />
      </Switch>
    </PrivateRoute>
    <Route exact path="/" component={HomePage}>
      <Redirect from="/" to="/app/user" />
    </Route>
  </>
);

function AppBody(props: any) {
  const { actions } = useUserAuthSlice(); // start up slices
  const {
    id,
    isFetching,
    mustAuth,
    isSuccess,
    isError,
  } = props.formProp.stateLoad;

  React.useEffect(() => {
    console.log('check auth ', isFetching, mustAuth, id);
  }, [props.formProp.stateLoad]);

  return !isFetching && !id && !mustAuth ? (
    <h3>start</h3>
  ) : isFetching ? (
    <h2>Loading</h2>
  ) : (
    <BrowserRouter>
      <Switch>
        <AppRoute isAuthenticated={!!id && !mustAuth} />
      </Switch>
    </BrowserRouter>
  );
}

// const { mapStateToProps, mapDispatchToProps } = mapToPropsUser;
const withConnect = connect(mapStateToPropsUser);
const AppBodyConnected = compose(withConnect)(AppBody);

const helmetContext = {};

export function App() {
  const { i18n } = useTranslation();
  return (
    <React.Fragment>
      <Provider store={store}>
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
