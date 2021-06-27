import localStorageDataProvider from 'ra-data-local-storage';
const param = { defaultData: [] };
const dataProvider = localStorageDataProvider(param);

const defaultParam = { pagination: { page: 1, perPage: 5 } };

const getResource = resource =>
  dataProvider.getList('corsi', {}).then(response => {
    console.log('resource XX ' + resource, response); // { id: 123, title: "hello, world" }
  });

export default getResource;
