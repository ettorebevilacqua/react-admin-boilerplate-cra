import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import UI Generator
import { Link, Typography } from '@material-ui/core';

import MenuUser from '../../components/User/menuCard';

// import {User} from '../../components/User'
const CompA = () => <div>comp a</div>;
const CompB = () => <div>comp b</div>;

const RouteForms = () => (
  <BrowserRouter>
    <Switch>
      Editor
      <Route exact path="/app/user/verifyr" component={CompA} />
      <Route exact path="/app/user/plane" component={CompB} />
      <Redirect from="/app/user" to="/app/forms/plan" exact />
    </Switch>
  </BrowserRouter>
);

export function UserPage() {
  return (
    <>
      <Helmet>
        <title>Forms Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <span>User xS</span>
      <MenuUser />
    </>
  );
}
