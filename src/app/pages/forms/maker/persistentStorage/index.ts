const getProvider = (): Storage | null => {
  if (typeof global !== 'undefined' && global.localStorage) {
    return global.localStorage;
  }
  // eslint-disable-next-line no-undef
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    // eslint-disable-next-line no-undef
    return globalThis.localStorage;
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return null;
};
/*
const CreatePersistedState = (
  key: string,
  provider = getProvider(),
): SetStateAction<any> => {
  const store = provider
    ? useState
    : usePersistedState(initialState, key, createStorage(provider));
  return store;
};
*/
export default 1; // CreatePersistedState;
