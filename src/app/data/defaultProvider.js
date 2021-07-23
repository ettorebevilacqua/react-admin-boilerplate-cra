import { Axios } from '@data-provider/axios';
import { providers, Selector } from '@data-provider/core';

export function defaultProvider(id, url, tags) {
  const myProvider = new Axios({
    id: id + '/list',
    url,
    tags,
    initialState: {
      loading: false,
      data: [],
    },
  });

  const idProvider = new Axios({
    id: id + '/id',
    url: url + '/:id',
    tags,
  });

  const mySelector = new Selector(
    myProvider,
    (queryValue, results) => {
      return results;
      const data = results.results || results;
      return !queryValue ? data : data.filter(queryValue.filter);
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

  const updateTodo = (id, data) => {
    return idProvider.query({ urlParams: { id } }).update(data);
  };

  return {
    provider: myProvider,
    create: data => myProvider.create(data),
    save: (id, data) => updateTodo(id, data),
    list: funzFilt => mySelector,
    get: id => myProvider.query({ urlParams: { id } }).read(),
    delete: id => myProvider.query({ urlParams: { id } }).delete(),
  };
}
