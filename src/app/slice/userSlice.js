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
const getInfoUser = data => {
  const userId = data && data.user && data.user.id;
  const token =
    data && data.tokens && data.tokens.access && data.tokens.access.token;
  return { userId, token };
};

export const loginUser = createAsyncThunk(
  'users/login',
  async (payload, thunkAPI) => {
    const { username, password } = payload;
    try {
      let data = await dataApi.userProvider.login(username, password);
      const userId = data && data.user && data.user.id;
      const token =
        data && data.tokens && data.tokens.access && data.tokens.access.token;
      if (!userId || !token) {
        return thunkAPI.rejectWithValue({ message: 'bad data' });
      }
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      return { ...data };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (payload, thunkAPI) => {
    const { id } = payload;
    debugger;
    const tokenLocal = localStorage.getItem('token');
    const userIdLocal = localStorage.getItem('userId');
    tokenLocal && dataApi.userProvider.authBear(tokenLocal);

    try {
      let data = await dataApi.userProvider.getUser(id);
      debugger;

      if (!tokenLocal || !userIdLocal) {
        const { userId, token } = getInfoUser(data);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        dataApi.userProvider.configWithAuth(data);
      }

      return { ...data };
    } catch (e) {
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

const setUserState = (state, payload) => {
  const user = payload.user || payload;
  state.email = user.email;
  state.username = user.username;
  state.id = user.id;
  state.user = user;
  // state.tokens = payload.tokens || null;
  state.isFetching = false;
  state.isSuccess = true;
  return state;
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
    builder.addCase(loginUser.fulfilled, (state, { payload }) =>
      setUserState(state, payload),
    );

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

    builder.addCase(fetchUserById.pending, (state, { payload }) => {
      state.isFetching = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) =>
      setUserState(state, payload),
    );
    builder.addCase(fetchUserById.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    /* builder.addCase(fetchUserById.pending, (state, { payload }) => {
      
    }); */

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
let _GlobalStore = null;
export function initUser(store) {
  _GlobalStore = store;
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (token && userId) {
    store.dispatch(fetchUserById({ id: userId }));
  }
}

export function logOut() {
  _GlobalStore.dispatch(userSlice.actions.clearState());
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

export const { clearState } = userSlice.actions;

export const userSelector = state => state.userAuth || initialState;
