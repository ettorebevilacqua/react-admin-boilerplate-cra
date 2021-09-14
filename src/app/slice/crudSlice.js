/*
https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
*/

// DEBUG: Crud Slice
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { initialState, asyncStateReducer, handlePromise } from './helperSlice';
import store from 'store/configureStore';

const init = store =>
  function createCrudSlice(options) {
    const storeProv = {
      query: null,
    };
    const { name, provider, queryProvider, actionsSlice } = options;
    const clearProvider = () => {
      storeProv && storeProv.query && storeProv.query.cleanCache();
      /*  provider && provider.cleanCache && provider.cleanCache();
      queryProvider && queryProvider.cleanCache && queryProvider.cleanCache();
      provider && provider?.provider?.cleanCache();
      queryProvider && queryProvider?.provider?.cleanCache();
      */
    };

    const clearStateAndProvider = () => {
      clearProvider();
      return initialState;
    };

    const readProvider = createAsyncThunk(name + '/all', async (payload, thunkAPI) => {
      storeProv.query = (queryProvider || provider).query({ queryString: payload });
      const [data, error] = await handlePromise(provider.list().read());
      return error ? thunkAPI.rejectWithValue(error.data) : { ...data };
    });

    const saveProvider = createAsyncThunk(name + '/save', async (payload, thunkAPI) => {
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
    });

    const getProvider = createAsyncThunk(name + '/get', async (payload, thunkAPI) => {
      const id = payload;
      const [data, error] = await handlePromise(provider.get(id));
      return error ? thunkAPI.rejectWithValue(error.data) : data;
    });

    const gueryProvider = createAsyncThunk(name + '/query', async (payload, thunkAPI) => {
      storeProv.query = (queryProvider || provider).query({ queryString: payload });

      const [data, error] = await handlePromise(storeProv.query.read());
      return error ? thunkAPI.rejectWithValue(error.data) : data;
    });

    const sliceName = name + 'Slice';

    const providerSlice = createSlice({
      name: sliceName,
      initialState,
      reducers: {
        clearState: () => initialState,
        reset: state => clearStateAndProvider(),
        clearStateAndProvider: () => clearStateAndProvider(),
        clearProvider,
        dataBack: (state, { payload }) => ({ ...initialState, isSuccess: true, data: payload }),
        dataBackParent: (state, { payload }) => {
          return { ...initialState, isSuccess: true, parent: payload };
        },
      },
      extraReducers: builder => {
        // const autoBuild = buildCaseDefault(builder);
        const autoBuild = asyncStateReducer(builder);
        autoBuild(readProvider, { dataname: 'data' });
        autoBuild(getProvider, { dataname: 'data' });
        autoBuild(saveProvider, { storeKey: 'saved' });
        autoBuild(gueryProvider, { dataname: 'data' });
      },
    });

    const { clearState, reset, dataBack, dataBackParent } = providerSlice.actions;

    const dataSelector = state => {
      const cond = !state || !state[sliceName] ? initialState : state[sliceName];
      return cond;
    };

    const dataGetSelector = id => state => {
      const cond =
        !state || !state.moduliSlice || !state.moduliSlice.data || !state.moduliSlice.data.results
          ? null
          : id
          ? state.moduliSlice.data.results
          : state.moduliSlice.data.results.filter(item => item.id === id);
      const isFetching =
        !state || !state[sliceName] || !state[sliceName].isFetching ? false : state[sliceName].isFetching;

      return { isFetching, data: cond };
    };

    const selectLoading = createSelector([dataSelector], crudState => crudState.loading);
    const selectError = createSelector([dataSelector], crudState => crudState.error);
    const selectData = createSelector([dataSelector], crudState => crudState.data);

    const selectState = createSelector([dataSelector], dataState => dataState);
    const selectDataItem = createSelector([dataSelector], dataState => dataState);
    const selectItem = createSelector([dataGetSelector], state => state);

    // container props must pass id
    const mapStateToProps = (state, ownProps) => {
      // ownProps would look like { "id" : 123 }
      const { id } = ownProps || {};
      const select = id ? selectItem(id)(state) : selectState(state);
      const { data, parent, saved, ...stateLoad } = select;
      return {
        formProp: {
          id,
          data,
          parent,
          saved,
          stateLoad,
          selectDataItem,
          selectLoading,
          selectError,
          selectData,
          selectItem,
          meta: { schema: provider.schemas },
        },
      };
    };

    const mapDispatchToProps = dispatch => {
      const base = {
        clearState: () => dispatch(clearState()),
        dataBack: data => dispatch(dataBack(data)),
        dataBackParent: parent => dispatch(dataBackParent(parent)),
        load: (id, refresh) => {
          if (refresh) {
            dispatch(reset());
          }
          dispatch(readProvider(id));
        },
        save: id => dispatch(saveProvider(id)),
        get: (id, refresh) => {
          if (refresh) {
            dispatch(reset());
          }
          dispatch(getProvider(id));
        },
        query: (queryString, refresh) => {
          if (refresh) {
            dispatch(reset());
          }

          dispatch(gueryProvider(queryString));
        },
        reset: () => {
          dispatch && dispatch(reset());
        },
        clearStateAndProvider2: () => {
          dispatch(reset());
        },
        clearProvider: () => {
          dispatch(reset());
        },
      };

      const reducerOther = (acc, slice) => ({ ...acc, ...slice.actions });
      const otherActions = !actionsSlice ? {} : actionsSlice.reduce(reducerOther, {});

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
        selectLoading,
        selectError,
        selectData,
        dataGetSelector,
        selectItem,
      },
      slice: providerSlice,
      initialState,
    };
  };

export default init(store); // createCrudSlice;
