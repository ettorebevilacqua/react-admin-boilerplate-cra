import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import UI Generator
import { Link, ThemeProvider, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { LayoutProvider } from './LayoutContext';
import Themes from './themes';
import Layout from './Layout';

export default function UserComp({ children }) {
  return (
    <>
      <LayoutProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </LayoutProvider>

      {/* data.content && <ContentEx /> */}
    </>
  );
}
