import * as React from 'react';
// import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userAuthSaga } from './saga';
// import { UserAuthState, RepoErrorType } from './types';

import createCrudSlice from './crudSlice';
import { userSlice } from './userSlice';
import { moduliSlice } from './moduliSlice';

import { questionProvider } from '../data';

const empityParteipante = { nome: '', email: '', telefono: '' };
const indagineEmpity = {
  titolo: '',
  idcorso: '',
  titoloModulo: '',
  idmodulo: '',
  docenti: '',
  NumPartecipanti: '',
  partecipanti: [empityParteipante],
};

const questionSlice = createCrudSlice('question', questionProvider);

export const { actions: userAuthActions, reducer } = userSlice;

export const useUserAuthSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  useInjectReducer({ key: moduliSlice.name, reducer: moduliSlice.reducer });
  useInjectReducer({ key: moduliSlice.name, reducer: moduliSlice.reducer });
  //  useInjectSaga({ key: userSlice.name, saga: userAuthSaga });
  return { actions: userSlice.actions };
};
