import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function FormsPage() {
  return (
    <>
      <Helmet>
        <title>Forms Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>Forms container</span>
    </>
  );
}
