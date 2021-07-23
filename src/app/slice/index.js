import { PayloadAction } from '@reduxjs/toolkit';
import * as React from 'react';
// import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userAuthSaga } from './saga';
// import { UserAuthState, RepoErrorType } from './types';
import { userSlice } from './userSlice';
import { moduliSlice } from './moduliSlice';

export const initialState = {
  username: '',
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const { actions: userAuthActions, reducer } = userSlice;

export const useUserAuthSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  useInjectReducer({ key: moduliSlice.name, reducer: moduliSlice.reducer });
  //  useInjectSaga({ key: userSlice.name, saga: userAuthSaga });
  return { actions: userSlice.actions };
};
