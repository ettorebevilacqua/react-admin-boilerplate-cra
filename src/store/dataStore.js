import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { storeManager } from '@data-provider/core';

const DATA_PROVIDER_STORE = 'data';

export function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
  });

  return rootReducer;
}

const dataStore = createStore(
  combineReducers({
    [DATA_PROVIDER_STORE]: storeManager.reducer,
  }),
  window &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
);

storeManager.setStore(dataStore, DATA_PROVIDER_STORE);

export default dataStore;
