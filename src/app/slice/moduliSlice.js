/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { moduliProvider } from '../data';

export const readModuli = createAsyncThunk(
  'moduli/all',
  async (payload, thunkAPI) => {
    try {
      let data = await moduliProvider.list().read();

      return { ...data };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const initialState = {
  data: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const buildCaseDefault = builder => thunk => {
  builder.addCase(thunk.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.isSuccess = true;
    state.data = payload;
  });
  builder.addCase(thunk.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.isError = true;
    state.errorMessage = payload.message;
  });
  builder.addCase(thunk.pending, (state, { payload }) => {
    state.isFetching = true;
  });
};

export const moduliSlice = createSlice({
  name: 'moduliSlice',
  initialState,
  reducers: {
    clearState: state => initialState,
  },
  extraReducers: builder => {
    const autoBuild = buildCaseDefault(builder);
    autoBuild(readModuli);
  },
});

export const { clearState } = moduliSlice.actions;

export const dataSelector = state => {
  debugger;
  const cond = !state || !state.moduliSlice ? initialState : state.moduliSlice;
  return cond;
};
