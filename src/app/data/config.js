import { providers } from '@data-provider/core';
import { Axios } from '@data-provider/axios';
/*
Set baseUrl option for all providers created by the Axios addon,
which automatically adds the "axios" tag to all instances.
setta tutti i providers di tag axio con quel url
*/
providers.getByTag('axios').config({
  baseUrl: 'http://localhost:3010/v1',
});

/*
  Set auth headers for all providers containing tag "need-auth",
  which has been added using options to each desired instance
  */
providers.getByTag('axios').config({
  headers: {
    Authorization: 'Bearer ',
  },
});

/*
  Clean the cache of all selectors
  */
providers.getByTag('selector').cleanDependenciesCache();

providers.getByTag('axios').onNewProvider(provider => {
  console.log(`Added new api provider with id: ${provider.id}`);
});
