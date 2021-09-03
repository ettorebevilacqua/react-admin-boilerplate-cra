// DEBUG: root Slice
// import { Repo } from 'types/Repo';
import { useInjectReducer } from 'utils/redux-injectors';
// import { UserAuthState, RepoErrorType } from './types';

import createCrudSlice from './crudSlice';
import createViewSlice from './viewSlice';
import createActionsSlice from './actionsSlice';
import { userSlice } from './userSlice';

import providers from '../data';
const { questionProvider, providersView, emailProvider, moduliProvider, questionModuliProvider } = providers;

export const questionViewSlice = createViewSlice('getQuestion', providersView.getQuestion);

export const questionActionlSlice = createActionsSlice('questionEmail', [
  { name: 'sendEmail', action: emailProvider.save },
]);

export const questionSlice = createCrudSlice({
  name: 'question',
  provider: questionProvider,
  queryProvider: questionModuliProvider.provider,
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
});

export const questionModuliSlice = createCrudSlice({
  name: 'questionModuliSlice',
  provider: questionModuliProvider,
  queryProvider: questionModuliProvider.provider,
});

export const { actions: userAuthActions, reducer } = userSlice;

export const useUserAuthSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  // useInjectReducer({ key: moduliSlice.name, reducer: moduliSlice.reducer });
  /* useInjectReducer({
    key: questionSlice.providerSlice.name,
    reducer: questionSlice.providerSlice.reducer,
  }); */
  //  useInjectSaga({ key: userSlice.name, saga: userAuthSaga });
  return { actions: userSlice.actions };
};
