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
} from './helperSlice';

import { setGetObj, mapOrReduceOnKeys } from 'utils/functional';
import store from 'store/configureStore';

function createActionsSlice(name, actionsProviders) {
  const sliceName = name + 'Slice';

  const getThunk = ({ name, action }) =>
    createAsyncThunk('/action/' + name, async (payload, thunkAPI) => {
      const [data, error] = await handlePromise(action(payload, {}));
      return error ? thunkAPI.rejectWithValue(error.data) : { ...data };
    });

  const thunkGetter = (acc, thunk) =>
    setGetObj(acc, thunk.name, getThunk(thunk));

  const thunks = actionsProviders.reduce(thunkGetter, {});
  const thunksMapper = mapOrReduceOnKeys(thunks);

  const actionsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      clearState: () => initialState,
    },
    extraReducers: builder =>
      thunksMapper(_thunk =>
        asyncStateReducer(builder)(_thunk, { storeKey: 'saved' }),
      ),
  });

  const dataSelector = state =>
    !state || !state[sliceName] ? initialState : state[sliceName];
  const selectData = createSelector([dataSelector], dataState => dataState);

  const mapStateToProps = mapStateToPropsCreator(selectData, {});
  const mapDispatchToProps = dispatch => {
    const dispacher = _thunk => payload => dispatch(_thunk(payload));
    const createActions = (acc, _thunk, actionName) =>
      setGetObj(acc, actionName, dispacher(_thunk));

    return {
      actions: {
        clearStateAction: () => dispatch(actionsSlice.clearState()),
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
