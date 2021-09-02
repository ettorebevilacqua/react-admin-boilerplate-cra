/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { moduliProvider } from '../data';

import { handlePromise } from 'utils/functional';

export const readModuli = createAsyncThunk(
  'moduli/all',
  async (payload, thunkAPI) => {
    const [data, error] = await handlePromise(moduliProvider.list().read());
    return error ? thunkAPI.rejectWithValue(error.data) : { ...data };
  },
);

export const saveModulo = createAsyncThunk(
  'moduli/save',
  async (payload, thunkAPI) => {
    const id = payload.id;
    try {
      let data = !id
        ? await moduliProvider.create(payload)
        : payload._deleted
        ? await moduliProvider.delete(id)
        : await moduliProvider.save(id, payload);

      return { ...data };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const initialState = {
  data: null,
  saved: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const buildCaseDefault = builder => (thunk, { dataname, storeKey } = {}) => {
  builder.addCase(thunk.fulfilled, (state, { payload }) => {
    const stateKey = storeKey ? state[storeKey] : state;
    stateKey.isFetching = false;
    stateKey.isSuccess = true;
    if (dataname) {
      stateKey[dataname || 'data'] = payload;
    }
  });
  builder.addCase(thunk.rejected, (state, { payload }) => {
    const stateKey = storeKey ? state[storeKey] : state;
    stateKey.isFetching = false;
    stateKey.isError = true;
    stateKey.errorMessage = payload.message;
  });
  builder.addCase(thunk.pending, state => {
    const stateKey = storeKey ? state[storeKey] : state;
    stateKey.isFetching = true;
  });
};

export const moduliSlice = createSlice({
  name: 'moduliSlice',
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: builder => {
    const autoBuild = buildCaseDefault(builder);
    autoBuild(readModuli, { dataname: 'data' });
    autoBuild(saveModulo, { storeKey: 'saved' });
  },
});

export const { clearState } = moduliSlice.actions;

export const dataSelector = state => {
  const cond = !state || !state.moduliSlice ? initialState : state.moduliSlice;
  return cond;
};
export const dataGetSelector = id => state => {
  const cond =
    !state ||
    !state.moduliSlice ||
    !state.moduliSlice.data ||
    !state.moduliSlice.data.results
      ? null
      : id
      ? state.moduliSlice.data.results
      : state.moduliSlice.data.results.filter(item => item.id === id);
  const isFetching =
    !state || !state.moduliSlice || !state.moduliSlice.isFetching
      ? false
      : state.moduliSlice.isFetching;

  return { isFetching, data: cond };
};
