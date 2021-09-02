export const initialState = {
  data: null,
  saved: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const handlePromise = promise =>
  promise.then(data => [data, undefined]).catch(error => Promise.resolve([undefined, error]));

export const stateAsyncNameReducer = dataname => (state, { isFetching, isSuccess, isError, errorMessage, payload }) => {
  const stateKey = state;
  const setState = (key, value) => {
    stateKey[key] = value;
  };
  isFetching !== undefined && setState('isFetching', isFetching);
  isSuccess !== undefined && setState('isSuccess', isSuccess);
  isError !== undefined && setState('isError', isError);
  errorMessage !== undefined && setState('errorMessage', errorMessage);
  payload !== undefined && setState(dataname || 'data', payload);
  // return stateKey;
};

export const asyncStateReducer = builder => (thunk, param = {}) => {
  const { dataname, storeKey } = param;
  const getState = state => (storeKey ? state[storeKey] : state);
  const statReducer = stateAsyncNameReducer(dataname);

  builder.addCase(thunk.fulfilled, (state, { payload }) => {
    const param = {
      isFetching: false,
      isSuccess: true,
      payload,
      isError: false,
      errorMessage: '',
    };
    statReducer(getState(state), param);
  });

  builder.addCase(thunk.rejected, (state, { payload }) => {
    statReducer(getState(state), {
      isFetching: false,
      isError: true,
      isSuccess: false,
      errorMessage: payload?.message,
    });
  });

  builder.addCase(thunk.pending, state => {
    statReducer(getState(state), {
      ...initialState,
      isError: false,
      isFetching: true,
    });
  });
};

export const mapStateToPropsCreator = (select, meta) => (state, ownProps) => {
  // ownProps would look like { "id" : 123 }
  const { id } = ownProps || {};
  // const select = id ? selectItem(id)(state) : selectData(state);
  const { data, saved, ...stateLoad } = select(state);
  return {
    formProp: {
      id,
      data,
      saved,
      stateLoad,
      meta,
    },
  };
};

export const mapDispatchToPropsCreator = (
  dispatch,
  clearState,
  { readProvider, saveProvider, getProvider, gueryProvider },
) => {
  return {
    actions: {
      clearState: () => clearState && dispatch(clearState()),
      load: id => {
        readProvider && dispatch(readProvider(id));
      },
      save: id => {
        saveProvider && dispatch(saveProvider(id));
      },
      get: id => {
        getProvider && dispatch(getProvider(id));
      },
      query: parm => {
        gueryProvider && dispatch(gueryProvider(parm));
      },
    },
  };
};
