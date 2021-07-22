import { Axios } from '@data-provider/axios';
import { providers, Selector } from '@data-provider/core';

export function defaultProvider(id, url, tags) {
  const myProvider = new Axios({
    id,
    url,
    tags,
    initialState: {
      loading: false,
      data: [],
    },
  });

  const mySelector = new Selector(
    myProvider,
    (queryValue, results) => {
      debugger;
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

  return {
    provider: myProvider,
    create: data => myProvider.create(data),
    list: funzFilt => mySelector,
    get: id => myProvider.query({ urlParams: { id } }).read(),
    delete: id => myProvider.query({ urlParams: { id } }).delete(),
  };
}
