// DEBUG: root Slice
import * as React from 'react';
// import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userAuthSaga } from './saga';
// import { UserAuthState, RepoErrorType } from './types';

import createCrudSlice from './crudSlice';
import createViewSlice from './viewSlice';
import createActionsSlice from './actionsSlice';
import { userSlice } from './userSlice';

import { moduliSlice } from './moduliSlice';

import providers from '../data';
const { questionProvider, providersView, emailProvider } = providers;

export const questionViewSlice = createViewSlice(
  'getQuestion',
  providersView.getQuestion,
);

export const questionActionlSlice = createActionsSlice('questionEmail', [
  { name: 'sendEmail', action: emailProvider.create },
]);

export const questionSlice = createCrudSlice({
  name: 'question',
  provider: questionProvider,
  queryProvider: providersView.getQuestion,
  actionsSlice: { questionActionlSlice },
});

export const { actions: userAuthActions, reducer } = userSlice;

export const useUserAuthSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  useInjectReducer({ key: moduliSlice.name, reducer: moduliSlice.reducer });
  /* useInjectReducer({
    key: questionSlice.providerSlice.name,
    reducer: questionSlice.providerSlice.reducer,
  }); */
  //  useInjectSaga({ key: userSlice.name, saga: userAuthSaga });
  return { actions: userSlice.actions };
};
