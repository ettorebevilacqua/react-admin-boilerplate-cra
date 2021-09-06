import store from 'store/configureStore';
import { createSlice, createSelector } from '@reduxjs/toolkit';

const dispatch = store.dispatch;
const initialState = {
  menuList: [{ link: 'aaaa', label: 'bbbb' }],
  isSidebarOpened: false,
};

export const layoutSlice = createSlice({
  name: 'layoutSlice',
  initialState,
  reducers: {
    menuList: (state, { payload }) => ({ ...state, menuList: payload }),
    toggleSideBar: state => ({ ...state, isSidebarOpened: !state.isSidebarOpened }),
  },
});

export const menuListSelector = state =>
  !state || !state.layoutSlice || !state.layoutSlice.menuList ? initialState.menuList : state.layoutSlice.menuList;

export const isSidebarOpenedSelector = state =>
  !state || !state.layoutSlice || !state.layoutSlice.isSidebarOpened
    ? initialState.isSidebarOpened
    : state.layoutSlice.isSidebarOpened;

export const selectMenuList = createSelector([menuListSelector], state => state.menuList);
export const setMenuList = menuList => dispatch(layoutSlice.menuList(menuList));
export const setIsSidebarOpened = () => dispatch(layoutSlice.toggleSideBar());
