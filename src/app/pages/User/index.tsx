import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import UI Generator
import { Link, Typography } from '@material-ui/core';

import UserComp from '../../components/User/';

export function UserPage() {
  return (
    <>
      <Helmet>
        <title>Forms Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <UserComp />
    </>
  );
}
