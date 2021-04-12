import {
  useState,
  useEffect,
  useRef,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';

import useEventListener from './eventListener';
import createGlobalState, { IGlobalStateStore } from './createGlobalState';

const usePersistedState = (initialState, key, { get, set }): [any, any] => {
  const globalState = useRef<IGlobalStateStore | null>(null);
  const [state, setState] = useState(() => get(key, initialState));

  // subscribe to `storage` change events
  useEventListener('storage', ({ key: k, newValue }): void => {
    //    if (k === key) return ;
    /*   try {
      // Get from local storage by key
      const newState = JSON.parse(newValue)
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
    */
    /*  const newState = k === key ? JSON.parse(newValue) :null
        : state !== newState && setState(newState); */
  });

  // only called on mount
  useEffect(() => {
    // register a listener that calls `setState` when another instance emits
    globalState.current = createGlobalState(key, setState, initialState);

    return () => {
      globalState.current && globalState.current.deregister();
    };
  }, [initialState, key]);

  const persistentSetState = useCallback(
    newState => {
      const newStateValue =
        typeof newState === 'function' ? newState(state) : newState;

      set(key, newStateValue); // persist to localStorage
      setState(newStateValue);

      // inform all of the other instances in this tab
      globalState.current && globalState.current.emit(newState);
    },
    [state, set, key],
  );

  return [state, persistentSetState];
};

export default usePersistedState;
