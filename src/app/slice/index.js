// DEBUG: root Slice
import * as React from 'react';
// import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userAuthSaga } from './saga';
// import { UserAuthState, RepoErrorType } from './types';

import createCrudSlice from './crudSlice';
import { userSlice } from './userSlice';
import createViewSlice from './viewSlice';
import { moduliSlice } from './moduliSlice';

import providers from '../data';
const { questionProvider, providersView } = providers;

export const questionViewSlice = createViewSlice(
  'getQuestion',
  providersView.getQuestion,
);

export const questionSlice = createCrudSlice({
  name: 'question',
  provider: questionProvider,
  queryProvider: providersView.getQuestion,
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
