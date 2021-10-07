import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import { storeManager } from '@data-provider/core';
// import counterReducer from './counter';

const rootReducer = (history: History) =>
  combineReducers({
    //   count: counterReducer,
    router: connectRouter(history),
  });

export interface State {
  //  count: number;
  router: RouterState;
}

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    dataProvider: storeManager.reducer,
  });

export default createRootReducer;
