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

import { setGetObj, compose } from 'utils/functional';
import store from 'store/configureStore';

function createActionsSlice(name, actionsProviders) {
  const sliceName = name + 'Slice';

  const getThunk = ({ name, action }) =>
    createAsyncThunk(name + '/action/', async (payload, thunkAPI) => {
      const [data, error] = await handlePromise(action(payload));
      return error ? thunkAPI.rejectWithValue(error.data) : { ...data };
    });

  const thunkGetter = (acc, thunk) => {
    acc[thunk.name] = getThunk(thunk);
    return acc;
  };

  const thunks = actionsProviders.reduce(thunkGetter, {});

  const thunksMapper = (mapper, accMapper) => {
    const keys = Object.keys(thunks);
    const reducerMapper = (acc, actionName, index) =>
      mapper(acc, actionName, thunks[actionName], index);

    return accMapper !== undefined
      ? keys.reduce(reducerMapper, accMapper)
      : keys.map((actionName, index) => mapper(thunks[actionName], index));
  };

  const actionsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      clearState: state => initialState,
    },
    extraReducers: builder =>
      thunksMapper(_thunk =>
        asyncStateReducer(builder)(_thunk, { storeKey: 'saved' }),
      ),
  });

  const dataSelector = state => {
    const cond = !state || !state[sliceName] ? initialState : state[sliceName];
    return cond;
  };

  const selectData = createSelector([dataSelector], dataState => dataState);
  // const selectItem = createSelector([dataGetSelector], state => state);

  const mapStateToProps = mapStateToPropsCreator(selectData, {});
  const mapDispatchToProps = dispatch => {
    const dispacher = _thunk => payload => dispatch(_thunk.action(payload));
    const createActions = (acc, actionName, _thunk) =>
      setGetObj(acc, actionName, dispacher(_thunk));

    return {
      actions: {
        clearState: () => dispatch(actionsSlice.clearState()),
        ...thunksMapper(createActions, {}),
      },
    };
  };

  return {
    name: actionsSlice.name,
    providers: thunks,
    actions: mapDispatchToProps(store.dispatch).actions,
    mapToProps: {
      state: mapStateToProps,
      dispatch: mapDispatchToProps,
    },
    selects: {
      dataSelector: selectData,
    },
    slice: actionsSlice,
    initialState,
  };
}

export default createActionsSlice; // createCrudSlice;
