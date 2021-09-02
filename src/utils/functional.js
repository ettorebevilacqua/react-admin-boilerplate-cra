export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const setGetObj = (obj, key, val) => {
  obj[key] = val;
  return obj;
};
export const setGetObjC = obj => key => val => setGetObj(obj, key, val);

export const mapOrReduceOnKeys = obj => (mapper, accMapper) => {
  const keys = Object.keys(obj);
  const reducerMapper = (acc, key, index) => mapper(acc, obj[key], key, index);

  return accMapper !== undefined
    ? keys.reduce(reducerMapper, accMapper)
    : keys.map((key, index) => mapper(obj[key], key, index));
};

export const handlePromise = (promise, onSucces, onError) =>
  promise
    .then(data => (onSucces ? onSucces(data) : [data, undefined]))
    .catch(error =>
      onError
        ? Promise.resolve(onError(error))
        : Promise.resolve([undefined, error]),
    );
