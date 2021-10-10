/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
// REVIEW: TODO|FIXME|FIX|BUG|UGLY|HACK|NOTE|IDEA|REVIEW|DEBUG|OPTIMIZE
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'primereact/resources/themes//md-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { App } from 'app';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
// const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
/* openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}); */

ReactDOM.render(<App />, MOUNT_NODE);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
