// DEBUG: root Slice
// import { Repo } from 'types/Repo';
import { useInjectReducer } from 'utils/redux-injectors';
// import { UserAuthState, RepoErrorType } from './types';

import createCrudSlice from './crudSlice';
import createViewSlice from './viewSlice';
import createActionsSlice from './actionsSlice';
import { userSlice } from './userSlice';
import { layoutSlice } from './layoutSlice';

import providers from '../data';
const {
  questionProvider,
  providersView,
  emailProvider,
  moduliProvider,
  moduliProviderSave,
  moduloProvider,
  questionModuliProvider,
  corsiProvider,
  docentiProvider,
  ambitiProvider,
  listsProvider,
  guestProvider,
} = providers;

export const questionViewSlice = createViewSlice('getQuestion', providersView.getQuestion);

export const questionActionlSlice = createActionsSlice('questionEmail', [
  { name: 'sendEmail', action: emailProvider.save },
]);

export const questionSlice = createCrudSlice({
  name: 'question',
  provider: questionProvider,
  queryProvider: questionProvider.provider,
  actionsSlice: [questionActionlSlice],
});

export const questionSlice2 = createCrudSlice({
  name: 'question2',
  provider: questionProvider,
  queryProvider: providersView.getQuestion,
  actionsSlice: [questionActionlSlice],
});

export const moduliSliceCrud = createCrudSlice({
  name: 'moduliSliceCrud',
  provider: moduliProvider,
  queryProvider: moduliProvider.provider,
});

export const moduliSliceCrudSave = createCrudSlice({
  name: 'moduliSliceCrudSave',
  provider: moduliProviderSave,
  queryProvider: moduliProviderSave.provider,
});

export const moduloSliceCrud = createCrudSlice({
  name: 'moduloSliceCrud',
  provider: moduloProvider,
  queryProvider: moduloProvider.provider,
});

export const questionModuliSlice = createCrudSlice({
  name: 'questionModuliSlice',
  provider: questionModuliProvider,
  queryProvider: questionModuliProvider.provider,
});

export const corsiSlice = createCrudSlice({
  name: 'corsiSlice',
  provider: corsiProvider,
  queryProvider: corsiProvider.provider,
});

export const docentiSlice = createCrudSlice({
  name: 'docentiSlice',
  provider: docentiProvider,
  queryProvider: docentiProvider.provider,
});

export const ambitiSlice = createCrudSlice({
  name: 'ambitiSlice',
  provider: ambitiProvider,
  queryProvider: ambitiProvider.provider,
});

export const listsSlice = createCrudSlice({
  name: 'listsSlice',
  provider: listsProvider,
  queryProvider: listsProvider.provider,
});

export const guestSlice = createCrudSlice({
  name: 'guestSlice',
  provider: guestProvider,
  queryProvider: guestProvider.provider,
});

export const { actions: userAuthActions, reducer } = userSlice;

export const useUserAuthSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  useInjectReducer({ key: layoutSlice.name, reducer: layoutSlice.reducer });
  useInjectReducer({ key: listsSlice.name, reducer: listsSlice.slice.reducer });
  useInjectReducer({ key: moduliSliceCrud.name, reducer: moduliSliceCrud.slice.reducer });
  useInjectReducer({ key: moduloSliceCrud.name, reducer: moduloSliceCrud.slice.reducer });
  useInjectReducer({ key: questionModuliSlice.name, reducer: questionModuliSlice.slice.reducer });
  useInjectReducer({ key: questionSlice.name, reducer: questionSlice.slice.reducer });
  useInjectReducer({ key: questionViewSlice.name, reducer: questionViewSlice.slice.reducer });
  useInjectReducer({ key: moduliSliceCrudSave.name, reducer: moduliSliceCrudSave.slice.reducer });
  // useInjectReducer({ key: moduliSlice.name, reducer: moduliSlice.reducer });
  /* useInjectReducer({
    key: questionSlice.providerSlice.name,
    reducer: questionSlice.providerSlice.reducer,
  }); */
  //  useInjectSaga({ key: userSlice.name, saga: userAuthSaga });
  return { actions: userSlice.actions };
};
