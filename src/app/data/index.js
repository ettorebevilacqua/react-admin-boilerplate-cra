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

export const questionFullProvider = defaultProvider(
  'questionsWithModulo',
  '/questions/withModulo',
  schemas.questionSchemas,
  ['axios', 'questions'],
);

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
export const entiProvider = defaultProvider('enti', '/enti', schemas.docenti, ['axios', 'enti']);
export const listsProvider = defaultProvider('lists', '/lists', schemas.docenti, ['axios', 'ambiti']);
export const docentiActivityProvider = defaultProvider('docentiActivity', '/docenti/activity', schemas.docenti, [
  'axios',
  'docentiActivity',
]);
export const guestProvider = defaultProvider('guest', '/guest', schemas.docenti, ['axios', 'guest']);

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
  entiProvider,
  listsProvider,
  docentiActivityProvider,
  guestProvider,
  questionFullProvider,
};

export const userProvider = userProviderFrom;
export default dataApi;
