/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer({
      //  [DATA_PROVIDER_NAMESPACE]: storeManager.reducer,
    } as any),
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  // storeManager.setStore(store, DATA_PROVIDER_NAMESPACE);
  return store;
}

const store = configureAppStore();

export default store;
