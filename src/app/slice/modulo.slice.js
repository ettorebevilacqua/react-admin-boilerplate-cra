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

const getIndex = (list, id, index) => (id ? list.findIndex(el => el._id === id) : index);

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
  catchError: null,
  saved: { data: null, ...loadingSState },
  ...loadingSState,
};

const setStateModulo = (state, newModulo) => {
  return { ...state, modulo: { ...state.modulo, ...newModulo } };
};

const upDateDomanda = (state, payload) => {
  if (!state || !state.modulo || !state.modulo.domande) return state;
  const { domanda, id, index } = payload;
  const idxDomanda = getIndexDomanda(state, id, index);
  const moduloRow = { ...state.modulo };
  const domande = moduloRow.domande.map(el => ({ ...el }));
  if (!domande[idxDomanda] || !domande[idxDomanda].risposte) return state;
  const _risposte = [...domande[idxDomanda].risposte];
  if (!_risposte || !_risposte.map) return state;
  const risposte = _risposte.map(el => ({ ...el }));
  const domandaNew = { ...domanda, risposte };
  domande[idxDomanda] = domandaNew;
  const modulo = { ...moduloRow, domande };
  const newState = { ...state, modulo };
  return newState;
};

const changeRisposta = (state, payload) => {
  if (!state || !state.modulo || !state.modulo.domande) return state;
  const { domandaId, idxDomanda, rispostaId, idxRisposta, risposte } = payload;
  const domandeRow = getDomande(state);
  const domande = domandeRow.map(el => ({ ...el }));
  const _idxDomanda = getIndexDomanda(state, domandaId, idxDomanda);
  if (!domande || !domande[_idxDomanda] || !domande[_idxDomanda].risposte || !risposte || !risposte.map) return state;

  const domanda = { ...domande[_idxDomanda] };
  const _idxRisposta = getIndex(domanda.risposte, rispostaId, idxRisposta);
  if (!domanda.risposte[_idxRisposta] || !risposte[_idxRisposta]) return state;

  // const risposteOld = domanda.risposte.map(el => ({ ...el }));
  // const risposta = { ...risposte[_idxRisposta] };
  // const newRipsosta = { ...val };

  // risposte[_idxRisposta] = newRipsosta;
  const newDomanda = { ...domanda, risposte };
  const modulo = { ...state.modulo, domande };
  modulo.domande[_idxDomanda] = newDomanda;
  const newState = { ...state, modulo };
  return newState;
};

const changeCorrelata = (state, payload) => {
  const { domandaId, idxDomanda, rispostaId, idxRisposta, val } = payload;
  const domandeRow = getDomande(state);
  const domande = domandeRow.map(el => ({ ...el }));
  const _idxDomanda = getIndexDomanda(state, domandaId, idxDomanda);
  if (!domande || !domande[_idxDomanda] || !domande[_idxDomanda].risposte) return state;

  const domanda = { ...domande[_idxDomanda] };
  const _idxRisposta = getIndex(domanda.risposte, rispostaId, idxRisposta);
  if (!domanda.risposte[_idxRisposta]) return state;

  const risposte = domanda.risposte.map(el => ({ ...el }));
  const risposta = { ...risposte[_idxRisposta] };
  const newRipsosta = { ...risposta, correlata: val };

  risposte[_idxRisposta] = newRipsosta;
  const newDomanda = { ...domanda, risposte };
  domande[idxDomanda] = newDomanda;
  const modulo = { ...state.modulo, domande };
  modulo.domande[_idxDomanda] = newDomanda;
  const newState = { ...state, modulo };
  return newState;
};

const deleteDomanda = (state, payload) => {
  const { domandaId, idxDomanda } = payload;
  const domandeRow = getDomande(state);
  const domande = domandeRow.map(el => ({ ...el }));
  const _idxDomanda = getIndexDomanda(state, domandaId, idxDomanda);
  if (!domande || !domande[_idxDomanda] || !domande[_idxDomanda].risposte) return state;
  const newDomande = domande.filter((el, idx) => idx !== _idxDomanda);
  const modulo = { ...state.modulo, domande: newDomande };
  const newState = { ...state, modulo };
  return newState;
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
    changeCorrelata: (state, { payload }) => changeCorrelata(state, payload),
    changeRisposta: (state, { payload }) => changeRisposta(state, payload),
    domandaCommand: (state, { payload }) => setStateModulo(state, payload),
    deleteDomanda: (state, { payload }) => deleteDomanda(state, payload),
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

// export const { clearState, mustAuth } = moduloSlice.actions;

const dataSelector = state => {
  const cond = !state || !state[moduloSlice.name] ? initialState : state[moduloSlice.name];
  return cond;
};

export const getDomandeState = state => !state || !state[moduloSlice.name] || !state[moduloSlice.name].modulo.domande;
// selector for todos

const dataSelectDomande = state => {
  const cond =
    !state || !state[moduloSlice.name] || !state[moduloSlice.name].modulo || !state[moduloSlice.name].modulo.domande
      ? null
      : state[moduloSlice.name].modulo.domande;
  return cond ? cond.map(el => ({ ...el })) : cond;
};

const domandeGetter = (domande, domandaId, index) => {
  const idxDomanda = !domande ? -1 : getIndex(domande, domandaId, index);
  if (idxDomanda < 0 || !domande[idxDomanda]) return null;
  return { ...domande[idxDomanda] };
};

const dataSelectDomanda = (state, domandaId, index) => {
  const domande = dataSelectDomande(state);
  if (!domande) return null;
  const domanda = domandeGetter(domande, domandaId, index);
  if (!domanda) return null;
  const risposte =
    !domanda.risposte || !domanda.risposte.map ? domanda.risposte : domanda.risposte.map(el => ({ ...el }));
  const newDomanda = { ...domanda, risposte };
  return newDomanda;
};

const selectDomande = createSelector([dataSelectDomande], domande => {
  const out = [...domande];
  return out;
});

export const selectModulo = createSelector([dataSelector], dataState => ({ ...dataState.modulo }));
export const selectLoading = createSelector([dataSelector], crudState => crudState.isFetching);
export const selectError = createSelector([dataSelector], crudState => crudState.error);
export const selectSaved = createSelector([dataSelector], crudState => crudState.saved);
export const selectState = createSelector([dataSelector], crudState => crudState);

// selector for filtered todos
/* const selectDomanda = createSelector([dataSelector], state => (domandaId, index) => {
  if (index === undefined || index === null || !state) return null;
  const moduloState =
    !state || !state[moduloSlice.name] || !state[moduloSlice.name].modulo ? null : state[moduloSlice.name.modulo];
  if (!moduloState || !moduloState.domande) return false;
  const modulo = { ...moduloState };
  const domande = modulo.map(el => ({ ...el }));
  const idxDomanda = !domande ? -1 : getIndex(domande, domandaId, index);
  if (idxDomanda < 0 || !domande[idxDomanda]) return null;
  return domande[idxDomanda];
}); */

const domandeSelectGetter = (domandaId, index) => domande => {
  const idxDomanda = !domande ? -1 : getIndex(domande, domandaId, index);
  if (idxDomanda < 0 || !domande[idxDomanda]) return null;
  return domande[idxDomanda];
};

const selectDomanda = (domandaId, index) =>
  createSelector(
    [
      dataSelectDomande,
      state => {
        const _domande = dataSelectDomande(state);
        return _domande;
      },
    ],
    domandeSelectGetter(domandaId, index),
  );
export const actions = moduloSlice.actions;
export const selector = {
  selectModulo,
  selectLoading,
  selectError,
  selectSaved,
  selectState,
  selectDomande,
  dataSelectDomande,
  dataSelectDomanda,
  selectDomanda,
};
