/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/

auth with provate route
https://ui.dev/react-router-v5-protected-routes-authentication/

*/

import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { empityModulo, newDomanda } from 'app/services/question/moduliModel';
// import { mapStateToPropsCreator } from './helperSlice';
import store from 'store/configureStore';
import { moduliProvider } from '../data';
import { handlePromise } from 'utils/functional';
const dispatch = store.dispatch;

const getModuloOnState = state => state.modulo;
const getDomande = state => state.modulo.domande;

const getIndexDomanda = (state, id, index) => (id ? state.modulo.domande.findIndex(el => el._id === id) : index);
export const getDomanda = (state, id, index) => {
  const idxDomanda = getIndexDomanda(state, id, index);
  const domande = getDomande(state);
  return !domande[idxDomanda] ? null : domande[idxDomanda];
};

export const saveModulo = createAsyncThunk('moduloSlice/save', async (payload, thunkAPI) => {
  const state = thunkAPI.getState().moduloSlice;
  const modulo = { ...getModuloOnState(state) };
  const id = modulo.id;
  const [data, error] = !id
    ? await handlePromise(moduliProvider.create(modulo))
    : modulo._deleted
    ? await handlePromise(moduliProvider.delete(id))
    : await handlePromise(moduliProvider.save(id, modulo));
  error && thunkAPI.rejectWithValue(error ? error || error : null);
  return error ? Promise.reject(error) : Promise.resolve({ ...data });
});

export const getModulo = createAsyncThunk('moduloSlice/get', async (payload, thunkAPI) => {
  const id = payload;
  const [data, error] = await handlePromise(moduliProvider.get(id));
  return error ? thunkAPI.rejectWithValue(error.data) : data;
});

const loadingSState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const initialState = {
  modulo: empityModulo,
  saved: { data: null, ...loadingSState },
  ...loadingSState,
};

const setStateModulo = (state, newModulo) => {
  return { ...state, modulo: { ...state.modulo, ...newModulo } };
};

const upDateDomanda = (state, payload) => {
  const { domanda, id, index } = payload;
  const idxDomanda = getIndexDomanda(state, id, index);
  if (idxDomanda < 0) return state;
  state.modulo.domande[idxDomanda] = domanda;
  return state;
};

export const moduloSlice = createSlice({
  name: 'moduloSlice',
  initialState,
  reducers: {
    clearState: () => initialState,
    addDomanda: state => setStateModulo(state, { domande: [...state.modulo.domande, newDomanda] }),
    upDateDomanda: (state, { payload }) => {
      return upDateDomanda(state, payload);
    },
    setModulo: (state, { payload }) => setStateModulo(state, payload),
    domandaCommand: (state, { payload }) => setStateModulo(state, payload),
  },
  extraReducers: builder => {
    builder.addCase(getModulo.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.modulo = payload;
    });

    builder.addCase(getModulo.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = payload;
    });

    builder.addCase(getModulo.pending, (state, { payload }) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(saveModulo.fulfilled, (state, { payload }) => {
      state.saved.isFetching = false;
      state.saved.isSuccess = true;
      state.saved.isError = false;
      state.saved.error = null;
      state.saved.data = payload;
    });

    builder.addCase(saveModulo.rejected, (state, { payload }) => {
      state.saved.isFetching = false;
      state.saved.isSuccess = false;
      state.saved.isError = true;
      state.saved.data = null;
      state.saved.error = payload;
    });

    builder.addCase(saveModulo.pending, (state, { payload }) => {
      state.saved.isFetching = true;
      state.saved.isSuccess = false;
      state.saved.isError = false;
      state.saved.error = null;
      state.saved.data = null;
    });
  },
});

export const { clearState, mustAuth } = moduloSlice.actions;

const dataSelector = state => {
  const cond = !state || !state[moduloSlice.name] ? initialState : state[moduloSlice.name];
  return cond;
};

export const selectModulo = createSelector([dataSelector], dataState => dataState.modulo);
export const selectLoading = createSelector([dataSelector], crudState => crudState.isFetching);
export const selectError = createSelector([dataSelector], crudState => crudState.error);
export const selectSaved = createSelector([dataSelector], crudState => crudState.saved);
export const selectState = createSelector([dataSelector], crudState => crudState);
export const actions = moduloSlice.actions;
export const selector = {
  selectModulo,
  selectLoading,
  selectError,
  selectSaved,
  selectState,
};
