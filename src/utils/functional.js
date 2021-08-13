export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const setGetObj = (obj, key, val) => ((obj[key] = val), obj);
export const setGetObjC = obj => key => val => setGetObj(obj, key, val);

export const handlePromise = (promise, onSucces, onError) =>
  promise
    .then(data => (onSucces ? onSucces(data) : [data, undefined]))
    .catch(error =>
      onError
        ? Promise.resolve(onError(error))
        : Promise.resolve([undefined, error]),
    );
