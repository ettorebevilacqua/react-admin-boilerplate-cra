/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/

auth with provate route
https://ui.dev/react-router-v5-protected-routes-authentication/

*/

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { userProvider } from '../data';
import dataApi from '../data';
import { mapStateToPropsCreator } from './helperSlice';

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
  const token = data && data.tokens && data.tokens.access && data.tokens.access.token;
  return { userId, token };
};

export const loginUser = createAsyncThunk('users/login', async (payload, thunkAPI) => {
  const { username, password } = payload;
  try {
    let data = await dataApi.userProvider.login(username, password);
    const userId = data && data.user && data.user.id;
    const token = data && data.tokens && data.tokens.access && data.tokens.access.token;
    if (!userId || !token) {
      return thunkAPI.rejectWithValue({ message: 'bad data' });
    }
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    userProvider.authBear(token);
    window.location.href = window.location.href;
    return { ...data };
  } catch (e) {
    return thunkAPI.rejectWithValue(e.data || e);
  }
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (payload, thunkAPI) => {
  const { id } = payload;
  const tokenLocal = localStorage.getItem('token');
  const userIdLocal = localStorage.getItem('userId');
  tokenLocal && dataApi.userProvider.authBear(tokenLocal);

  try {
    let data = await dataApi.userProvider.getUser(id);

    if (!tokenLocal || !userIdLocal) {
      const { userId, token } = getInfoUser(data);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    }

    return { ...data };
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState = {
  username: '',
  email: '',
  user: null,
  id: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  mustAuth: false,
  isAuth: false,
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
  state.mustAuth = false;
  state.isAuth = true;
  state.errorMessage = '';
  state.isError = false;
  return state;
};

export const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    clearState: () => initialState,
    clearStateLogOut: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return { ...initialState, mustAuth: true };
    },
    mustAuth: state => {
      state.mustAuth = true;
    },
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
    builder.addCase(loginUser.fulfilled, (state, { payload }) => setUserState(state, payload));

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
      state.isAuth = false;
    });

    builder.addCase(loginUser.pending, state => {
      state.isFetching = true;
    });

    builder.addCase(fetchUserById.pending, state => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isAuth = false;
      state.isError = false;
      state.errorMessage = '';
      state.id = '';
    });
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => setUserState(state, payload));
    builder.addCase(fetchUserById.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isAuth = false;
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
export const { clearState, mustAuth } = userSlice.actions;
export function initUser(store) {
  _GlobalStore = store;
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (token && userId) {
    store.dispatch(fetchUserById({ id: userId }));
  } else store.dispatch(mustAuth());
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  _GlobalStore.dispatch(userSlice.actions.clearStateLogOut());
}

export const authToken = localStorage.getItem('token');

export const userSelector = state => (!state || !state.userAuth ? initialState : state.userAuth);

const selectData = createSelector([userSelector], dataState => dataState);
export const mapStateToPropsUser = mapStateToPropsCreator(selectData, {});
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      clearStateAction: () => dispatch(userSlice.clearState()),
      clearStateLogOut: () => dispatch(userSlice.clearStateLogOut()),
    },
  };
};
export const mapToPropsUser = {
  state: mapStateToPropsUser,
  dispatch: mapDispatchToProps,
};
