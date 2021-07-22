import './config';
import { Axios } from '@data-provider/axios';
import { providers, Selector } from '@data-provider/core';
import * as userProviderFrom from './usersProvider';
import { defaultProvider } from './defaultProvider';

export const moduliProvider = defaultProvider('moduli/all', '/moduli', [
  'axios',
  'moduli',
]);
/*

export const moduliProvider = new Axios({
  id: 'moduli/all',
  url: '/moduli',
  tags: ['moduli', 'need-auth'],
});

export const moduloProvider = new Axios({
  id: 'moduli/id',
  url: '/moduli/:id',
  tags: ['moduli', 'need-auth'],
});
debugger;
export const moduliQuery = new Selector(
  moduliProvider,
  (queryValue, reesults) =>
    !queryValue ? reesults : reesults.filter(queryValue),
  {
    id: 'moduli-filtered',
    tags: ['axios', 'moduli'],
    initialState: {
      data: [],
    },
     config: {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }, 
  },
);
*/
const dataApi = { userProvider: userProviderFrom, moduliProvider };
export const userProvider = userProviderFrom;
export default dataApi;
