export const MODULO_DATA_KEY = 'smart_modulo';
export const RISPOSTE_DATA_KEY = 'smart_risposte';

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

export const makeRisposte = domande =>
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

function getStoreValueDefault(storeKey, valDefault) {
  const storeValuesTxt = localStorage.getItem(storeKey);
  const storeValuesTmp = storeValuesTxt
    ? JSON.parse(storeValuesTxt)
    : [empityModulo];

  const dataRow = storeValuesTmp && storeValuesTmp[0];
  !dataRow &&
    localStorage.setItem(RISPOSTE_DATA_KEY, JSON.stringify(valDefault));

  const storeValues = !dataRow ? [empityModulo] : storeValuesTmp;
  return !storeValues || !storeValues[0] ? [empityModulo] : storeValues;
}

export const saveValues = values => {
  localStorage.setItem(MODULO_DATA_KEY, JSON.stringify(values));
};

export const getIndaginiAperte = values => {
  return getValues();
};

export const getModulo = idx => {
  const vals = getValues();
  return vals && vals[idx] ? vals[idx] : null;
};

export const getRisposte = idx => {
  const vals = getStoreValueDefault(RISPOSTE_DATA_KEY, []);
  return idx === undefined ? vals : vals[idx] || null;
};

export const saveRisposte = (idx, risposte) => {
  const risposteAll = getRisposte(idx, risposte);
  if (risposteAll[idx]) {
    risposteAll[idx] = risposte;
    localStorage.setItem(RISPOSTE_DATA_KEY, JSON.stringify(risposteAll));
  }
};
