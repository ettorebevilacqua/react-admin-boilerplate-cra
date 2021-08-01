import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import {
  initialState,
  asyncStateReducer,
  handlePromise,
  mapStateToPropsCreator,
  mapDispatchToPropsCreator,
} from './helperSlice';

import store from 'store/configureStore';

const init = store =>
  function createViewSlice(name, provider) {
    const sliceName = name + 'Slice';

    const gueryProvider = createAsyncThunk(
      name + '/query',
      async (payload, thunkAPI) => {
        const [data, error] = await handlePromise(
          provider.query({ queryString: payload }).read(),
        );
        return error ? thunkAPI.rejectWithValue(error.data) : { ...data };
      },
    );

    const viewsSlice = createSlice({
      name: sliceName,
      initialState,
      reducers: {
        clearState: state => initialState,
      },
      extraReducers: builder => {
        const autoBuild = asyncStateReducer(builder);
        autoBuild(gueryProvider, { dataname: 'data' });
      },
    });

    const { clearState } = viewsSlice.actions;

    const dataSelector = state => {
      const cond =
        !state || !state[sliceName] ? initialState : state[sliceName];
      return cond;
    };

    const selectData = createSelector([dataSelector], dataState => dataState);
    // const selectItem = createSelector([dataGetSelector], state => state);

    debugger;
    const mapStateToProps = mapStateToPropsCreator(selectData, {});
    const mapDispatchToProps = mapDispatchToPropsCreator(
      store.dispatch,
      clearState,
      { gueryProvider },
    );

    return {
      name: viewsSlice.name,
      providers: {
        gueryProvider,
      },
      actions: mapDispatchToProps.actions,
      mapToProps: {
        state: mapStateToProps,
        dispatch: mapDispatchToProps,
      },
      selects: {
        dataSelector: selectData,
      },
      slice: viewsSlice,
      initialState,
    };
  };

export default init(store); // createCrudSlice;
