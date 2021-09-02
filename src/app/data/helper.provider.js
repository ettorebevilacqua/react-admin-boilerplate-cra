import { Axios } from '@data-provider/axios';

const initialStateDefault = { loading: false, data: [] };

export const createAxioByTag = (baseId, tags) => (id, { url, initialState = initialStateDefault }) =>
  new Axios({
    id: baseId + id,
    url,
    tags,
    initialState,
  });

export const createListAxio = (listObj, baseId, tags) =>
  Object.keys(listObj).reduce((acc, axioName, idx) => {
    const axioDef = listObj[axioName];
    acc[axioName] = createAxioByTag(baseId, tags)(idx, axioDef);
    return acc;
  }, {});
