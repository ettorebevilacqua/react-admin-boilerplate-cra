/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { moduliProvider } from '../data';

export const initialState = {
  data: null,
  saved: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const buildCaseDefault = builder => (thunk, param = {}) => {
  const { dataname, storeKey } = param;

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
  builder.addCase(thunk.pending, (state, { payload }) => {
    const stateKey = storeKey ? state[storeKey] : state;
    stateKey.isFetching = true;
  });
};

function createCrudSlice(name, provider) {
  const readProvider = createAsyncThunk(
    name + '/all',
    async (payload, thunkAPI) => {
      try {
        let data = await provider.list().read();

        return { ...data };
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    },
  );

  const saveProvider = createAsyncThunk(
    name + '/save',
    async (payload, thunkAPI) => {
      const id = payload.id;
      try {
        let data = !id
          ? await provider.create(payload)
          : payload._deleted
          ? await provider.delete(id)
          : await provider.save(id, payload);

        return { ...data };
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    },
  );

  const sliceName = name + 'Slice';

  const providerSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      clearState: state => initialState,
    },
    extraReducers: builder => {
      const autoBuild = buildCaseDefault(builder);
      autoBuild(readProvider, { dataname: 'data' });
      autoBuild(saveProvider, { storeKey: 'saved' });
    },
  });

  const { clearState } = providerSlice.actions;
  const dataSelector = state => {
    const cond = !state || !state[sliceName] ? initialState : state[sliceName];
    return cond;
  };

  const dataGetSelector = id => state => {
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

  return {
    readProvider,
    saveProvider,
    providerSlice,
    clearState,
    dataSelector,
    dataGetSelector,
    initialState,
  };
}

export default createCrudSlice;
