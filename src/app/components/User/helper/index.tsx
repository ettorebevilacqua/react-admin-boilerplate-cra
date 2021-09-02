export const handlePromise = promise =>
  !promise || !promise.then
    ? Promise.resolve([undefined, 'no promise'])
    : promise.then(data => [data, undefined]).catch(error => Promise.resolve([undefined, error]));

export const isNotEmpity = data => {
  for (var key in data)
    if (data[key] && (!data[key].trim ? data[key] || '' : data[key].trim()) !== '') {
      return true;
    }
  return false;
};

export const getNotEmpityInList = list => list.filter(isNotEmpity);
