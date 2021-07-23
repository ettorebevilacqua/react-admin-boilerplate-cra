import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

const initialState = {
  isModuliShow: true,
};

export const userCompSlice = createSlice({
  name: 'userCompSlice',
  initialState,
  reducers: {
    toggleModuliShow: (state, { payload }) => {
      debugger;
      state.isModuliShow = payload;
      return state;
    },
  },
});

export const { toggleModuliShow } = userCompSlice.actions;

export const userCompSelector = state =>
  !state || !state.userCompSlice ? initialState : state.userCompSlice;

export const useUserCompSlice = () => {
  useInjectReducer({ key: userCompSlice.name, reducer: userCompSlice.reducer });
  //  useInjectSaga({ key: userSlice.name, saga: userAuthSaga });
  return { actions: userCompSlice.actions };
};
