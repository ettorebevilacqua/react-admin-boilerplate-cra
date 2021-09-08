// DEBUG: index /app/data
import './config';
import * as userProviderFrom from './usersProvider';
import { defaultProvider } from './defaultProvider';
import { queryViews, providersView } from './viewProvider';
import schemas from './schema';

export const moduliProvider = defaultProvider('moduli', '/moduli', schemas.moduli, ['axios', 'moduli']);
export const moduloProvider = defaultProvider('modulo', '/moduli', schemas.moduli, ['axios', 'modulo']);

export const questionProvider = defaultProvider('questions', '/questions', schemas.questionSchemas, [
  'axios',
  'questions',
]);

export const emailProvider = defaultProvider('emailProvider', '/questions/sendEmail', schemas.question, [
  'axios',
  'emailProvider',
]);

export const questionModuliProvider = defaultProvider('questionModuli', '/moduli/question', schemas.question, [
  'axios',
  'questionModuli',
]);

/*

export const moduliProvider = new Axios({
  id: 'moduli/all',
  url: '/moduli',
  tags: ['moduli', 'need-auth'],
});



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
const dataApi = {
  userProvider: userProviderFrom,
  moduliProvider,
  moduloProvider,
  questionModuliProvider,
  providersView,
  queryViews,
  questionProvider,
  emailProvider,
};
export const userProvider = userProviderFrom;
export default dataApi;
