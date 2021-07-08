export const MODULO_DATA_KEY = 'smart_modulo';

export const newDomanda = {
  domanda: '',
  tipo: 2,
  risposte: [{ val: null }],
};

export const newModulo = {
  id: null,
  title: '',
  domande: [],
};

export const empityModulo = {
  id: null,
  title: '',
  domande: [newDomanda],
};

export const getRisposte = domande =>
  !domande || !domande.map
    ? []
    : domande.map(domanda =>
        (!domanda.risposte || domanda.risposte.length === 0
          ? [null]
          : domanda.risposte
        ).map(risp => null),
      );

export const getValues = () => {
  const storeValuesTxt = localStorage.getItem(MODULO_DATA_KEY);
  const storeValuesTmp = storeValuesTxt
    ? JSON.parse(storeValuesTxt)
    : [empityModulo];

  const dataRow = storeValuesTmp && storeValuesTmp[0];
  !dataRow &&
    localStorage.setItem(MODULO_DATA_KEY, JSON.stringify([empityModulo]));

  const storeValues = !dataRow ? [empityModulo] : storeValuesTmp;
  return !storeValues || !storeValues[0] ? [empityModulo] : storeValues;
};

export const saveValues = values => {
  localStorage.setItem(MODULO_DATA_KEY, JSON.stringify(values));
};
