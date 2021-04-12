export type ObjT<T = unknown> = Record<string, T>;

export type GlobalStateInternalStore = ObjT<any>;

export interface StateEmitValue {
  (value: GlobalStateInternalStore): void;
}

export interface IGlobalStateStore {
  deregister: () => void;
  emit: (value: any) => void;
  current?: any;
}

const globalState: GlobalStateInternalStore = {};

const createGlobalState = (
  key: string,
  thisCallback: StateEmitValue,
  initialValue: StateEmitValue,
): IGlobalStateStore => {
  if (!globalState[key]) {
    globalState[key] = { callbacks: [], value: initialValue };
  }
  globalState[key].callbacks.push(thisCallback);
  return {
    deregister() {
      const arr = globalState[key].callbacks;
      const index = arr.indexOf(thisCallback);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    emit(value) {
      if (globalState[key].value !== value) {
        globalState[key].value = value;
        globalState[key].callbacks.forEach(callback => {
          if (thisCallback !== callback) {
            callback(value);
          }
        });
      }
    },
  };
};

export default createGlobalState;
