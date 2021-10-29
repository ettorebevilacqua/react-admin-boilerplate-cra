// DEBUG: index /app/data
import './config';
import * as userProviderFrom from './usersProvider';
import { defaultProvider } from './defaultProvider';
import { queryViews, providersView } from './viewProvider';
import schemas from './schema';

export const moduliProvider = defaultProvider('moduli', '/moduli', schemas.moduli, ['axios', 'moduli']);
export const moduliProviderSave = defaultProvider('moduliSave', '/moduli', schemas.moduli, ['axios', 'moduli']);
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

export const corsiProvider = defaultProvider('corsi', '/corsi', schemas.corsi, ['axios', 'corsi']);
export const docentiProvider = defaultProvider('docenti', '/docenti', schemas.docenti, ['axios', 'docenti']);
export const ambitiProvider = defaultProvider('ambiti', '/ambiti', schemas.docenti, ['axios', 'ambiti']);
export const listsProvider = defaultProvider('lists', '/lists', schemas.docenti, ['axios', 'ambiti']);

const dataApi = {
  userProvider: userProviderFrom,
  moduliProvider,
  moduliProviderSave,
  moduloProvider,
  corsiProvider,
  questionModuliProvider,
  providersView,
  queryViews,
  questionProvider,
  emailProvider,
  docentiProvider,
  ambitiProvider,
  listsProvider,
};

export const userProvider = userProviderFrom;
export default dataApi;
