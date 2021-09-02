import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import UI Generator

import { Example1 } from './maker';
import { LayoutForms } from './layout';

import { Editor } from './app/store';

const RouteForms = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/app/forms/render" component={Editor} />
      <Route exact path="/app/forms/dash" component={Example1} />
      <Redirect from="/app/forms" to="/app/forms/render" exact />
    </Switch>
  </BrowserRouter>
);

export function FormsPage() {
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
      <LayoutForms content={<RouteForms />} />
    </>
  );
}
