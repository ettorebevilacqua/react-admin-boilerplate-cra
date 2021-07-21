/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataApi from '../data';

/* export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ email, password }, thunkAPI) => {

    try {
      const response = await dataApi:
      console.log('data', data);

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        return { ...data, username: name, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
*/
export const loginUser = createAsyncThunk(
  'users/login',
  async (payload, thunkAPI) => {
    const { username, password } = payload;
    try {
      let data = await dataApi.userProvider.login(username, password);
      console.log('response', data);
      //  localStorage.setItem('token', data.token);
      return { ...data };
    } catch (e) {
      console.log('Error', e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async (payload, thunkAPI) => {
    const { id } = payload;
    try {
      let data = await dataApi.userProvider.getUser(id);
      console.log('data', data);
      return { ...data };
    } catch (e) {
      console.log('Error', e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const initialState = {
  username: '',
  email: '',
  user: null,
  id: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    clearState: state => initialState,
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    /*  [signupUser.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.user.email;
      state.username = payload.user.name;
    },
    [signupUser.pending]: state => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },*/
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.username;
      state.id = payload.user.id;
      state.user = payload.user;
      state.tokens = payload.tokens;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    builder.addCase(loginUser.pending, (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = true;
    });
    /* [fetchUserBytoken.pending as any]: state => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled as any]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.username = payload.name;
    },
    [fetchUserBytoken.rejected as any]: state => {
      console.log('fetchUserBytoken');
      state.isFetching = false;
      state.isError = true;
    }, */
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = state => state.userAuth || initialState;
