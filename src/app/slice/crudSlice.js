/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
*/

// DEBUG: Crud Slice
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { initialState, asyncStateReducer, handlePromise } from './helperSlice';
import store from 'store/configureStore';

const init = store =>
  function createCrudSlice(options) {
    const { name, provider, queryProvider, actionsSlice } = options;
    const clearProvider = () => {
      provider && provider?.provider?.cleanCache();
      gueryProvider && gueryProvider?.provider?.cleanCache();
    };

    const clearStateAndProvider = () => {
      clearProvider();
      return initialState;
    };

    const readProvider = createAsyncThunk(
      name + '/all',
      async (payload, thunkAPI) => {
        const [data, error] = await handlePromise(provider.list().read());
        return error ? thunkAPI.rejectWithValue(error.data) : { ...data };
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
          return Promise.resolve({ ...data });
        } catch (e) {
          return Promise.reject(thunkAPI.rejectWithValue(e));
        }
      },
    );

    const getProvider = createAsyncThunk(
      name + '/get',
      async (payload, thunkAPI) => {
        const id = payload;
        const [data, error] = await handlePromise(provider.get(id));
        return error ? thunkAPI.rejectWithValue(error.data) : { ...data };
      },
    );

    const gueryProvider = createAsyncThunk(
      name + '/query',
      async (payload, thunkAPI) => {
        const [data, error] = await handlePromise(
          (queryProvider || provider).query({ queryString: payload }).read(),
        );
        return error ? thunkAPI.rejectWithValue(error.data) : data;
      },
    );

    const sliceName = name + 'Slice';

    const providerSlice = createSlice({
      name: sliceName,
      initialState,
      reducers: {
        clearState: () => initialState,
        reset: () => clearStateAndProvider(),
        clearStateAndProvider: () => clearStateAndProvider(),
        clearProvider,
      },
      extraReducers: builder => {
        // const autoBuild = buildCaseDefault(builder);
        const autoBuild = asyncStateReducer(builder);
        autoBuild(readProvider, { dataname: 'data' });
        autoBuild(saveProvider, { storeKey: 'saved' });
        autoBuild(gueryProvider, { dataname: 'data' });
      },
    });

    const { clearState, reset } = providerSlice.actions;

    const dataSelector = state => {
      const cond =
        !state || !state[sliceName] ? initialState : state[sliceName];
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

    const selectData = createSelector([dataSelector], dataState => dataState);
    const selectItem = createSelector([dataGetSelector], state => state);

    // container props must pass id
    const mapStateToProps = (state, ownProps) => {
      // ownProps would look like { "id" : 123 }
      const { id } = ownProps || {};
      const select = id ? selectItem(id)(state) : selectData(state);
      const { data, saved, ...stateLoad } = select;
      return {
        formProp: {
          id,
          data,
          saved,
          stateLoad,
          meta: { schema: provider.schemas },
        },
      };
    };

    const mapDispatchToProps = dispatch => {
      const base = {
        clearState: () => dispatch(clearState()),
        reset: () => dispatch(reset()),
        load: id => {
          dispatch(readProvider(id));
        },
        save: id => dispatch(saveProvider(id)),
        get: id => {
          dispatch(getProvider(id));
        },
        query: (queryString, refresh) => {
          if (refresh) {
            (queryProvider || provider.provider).cleanCache();
            dispatch(clearState());
          }

          setTimeout(() => dispatch(gueryProvider(queryString)), 10);
        },
        clearStateAndProvider: () => {
          dispatch(clearStateAndProvider());
        },
        clearProvider: () => {
          dispatch(clearProvider());
        },
      };

      const reducerOther = (acc, slice) => ({ ...acc, ...slice.actions });
      const otherActions = !actionsSlice
        ? {}
        : actionsSlice.reduce(reducerOther, {});

      const actions = { ...base, ...otherActions };
      return {
        actions,
      };
    };

    return {
      name: providerSlice.name,
      providers: {
        readProvider,
        saveProvider,
        getProvider,
      },
      actions: mapDispatchToProps(store.dispatch).actions,
      actionsSlice,
      mapToProps: {
        state: mapStateToProps,
        dispatch: mapDispatchToProps,
      },
      selects: {
        dataSelector: selectData,
        dataGetSelector,
        selectItem,
      },
      slice: providerSlice,
      initialState,
    };
  };

export default init(store); // createCrudSlice;
