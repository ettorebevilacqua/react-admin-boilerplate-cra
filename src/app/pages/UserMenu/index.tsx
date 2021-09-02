import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import UI Generator

export function UserMenu() {
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
      <span>SMART SERVICE xS</span>
    </>
  );
}
