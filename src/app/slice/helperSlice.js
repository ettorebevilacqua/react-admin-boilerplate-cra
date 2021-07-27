export const initialState = {
  data: null,
  saved: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const stateAsyncNameReducer = dataname => (
  state,
  { isFetching, isSuccess, isError, errorMessage, payload },
) => {
  const stateKey = state;
  const setState = (key, value) => (stateKey[key] = value);

  isFetching !== undefined && setState('isFetching', isFetching);
  isSuccess !== undefined && setState('isSuccess', isSuccess);
  isError !== undefined && setState('isError', isError);
  errorMessage !== undefined && setState('errorMessage', errorMessage);
  payload !== undefined && setState(dataname || 'data', payload);
  return stateKey;
};

export const asyncStateReducer = builder => (thunk, param = {}) => {
  const { dataname, storeKey } = param;
  const getState = state => (storeKey ? state[storeKey] : state);
  const statReducer = stateAsyncNameReducer(dataname);

  builder.addCase(thunk.fulfilled, (state, { payload }) => {
    const param = { isFetching: false, isSuccess: true, payload };
    statReducer(getState(state), param);
  });

  builder.addCase(thunk.rejected, (state, { payload }) =>
    statReducer(getState(state), {
      isFetching: false,
      isError: true,
      errorMessage: payload.message,
    }),
  );

  builder.addCase(thunk.pending, (state, { payload }) =>
    statReducer(getState(state), { ...initialState, isFetching: true }),
  );
};
