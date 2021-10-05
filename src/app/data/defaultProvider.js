import { Axios } from '@data-provider/axios';
import { Selector } from '@data-provider/core';

export function defaultProvider(id, url, schemas, tags) {
  const myProvider = new Axios({
    id: id + '/list',
    url,
    tags,
    cache: false,
    initialState: {
      loading: false,
      data: [],
    },
  });

  const idProvider = new Axios({
    id: id + '/id',
    url: url + '/:id',
    cache: false,
    tags,
  });

  const mySelector = new Selector(
    myProvider,
    (queryValue, results) => {
      return results;
      /* const data = results.results || results;
      return !queryValue ? data : data.filter(queryValue.filter); */
    },
    {
      id: id + '-filtered',
      tags: ['axios', id],
      initialState: {
        loading: false,
        data: [],
      },
    },
  );

  const wrapMethod = (prov, method, data) =>
    new Promise((resolve, reject) => {
      prov[method](data)
        .then(res => {
          resolve(res, null);
        })
        .catch(err => {
          reject(err.data ? err.data : err);
        });
    });

  const updateTodo = (id, data) =>
    new Promise((resolve, reject) => {
      return idProvider
        .query({ urlParams: { id } })
        .update(data)
        .then(res => {
          resolve(res, null);
        })
        .catch(err => {
          reject(err.data ? err.data : err);
        });
    });

  return {
    schemas,
    provider: myProvider,
    create: data => wrapMethod(myProvider, 'create', data),
    save: (id, data) => updateTodo(id, data),
    list: () => mySelector,
    query: param => idProvider.query(param).read(),
    get: id => idProvider.query({ urlParams: { id } }).read(),
    reset: () => {
      myProvider.cleanCache();
      idProvider.cleanCache();
    },
    cleanCache: () => {
      myProvider.cleanCache();
      idProvider.cleanCache();
    },
    delete: id => idProvider.query({ urlParams: { id } }).delete(),
  };
}
