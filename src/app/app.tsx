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
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from '../store/configureStore';
// import { ThemeProvider } from 'styles/theme/ThemeProvider';

const store = configureAppStore();

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

export function AppHome(props: any) {
  const { i18n } = useTranslation();
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>
        <Route path="/home" component={HomePage} />
        <GlobalStyle />
      </HelmetProvider>
    </Provider>
  );
}
