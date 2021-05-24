import { providers } from '@data-provider/core';

/*
Set baseUrl option for all providers created by the Axios addon,
which automatically adds the "axios" tag to all instances.
setta tutti i providers di tag axio con quel url
*/
providers.getByTag('axios').config({
  baseUrl: 'http://localhost:3100',
});

/*
  Set auth headers for all providers containing tag "need-auth",
  which has been added using options to each desired instance
  */
providers.getByTag('need-auth').config({
  headers: {
    Authorization: 'Bearer foo-token',
  },
});

/*
  Clean the cache of all selectors
  */
providers.getByTag('selector').cleanDependenciesCache();
