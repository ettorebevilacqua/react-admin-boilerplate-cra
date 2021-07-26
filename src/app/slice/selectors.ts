import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

export const initialState = {
  username: '',
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.userAuth || initialState;

export const selectUsername = createSelector(
  [selectDomain],
  userAuthState => userAuthState.username,
);
/*
export const selectLoading = createSelector(
  [selectDomain],
  userAuthState => userAuthState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  userAuthState => userAuthState.error,
);

export const selectRepos = createSelector(
  [selectDomain],
  userAuthState => userAuthState.repositories,
);
*/
