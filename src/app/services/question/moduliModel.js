export const MODULO_DATA_KEY = 'smart_modulo';
export const RISPOSTE_DATA_KEY = 'smart_risposte';

export const newDomanda = {
  domanda: '',
  tipo: 2,
  risposte: [{ val: null, risposta: '' }],
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
        (!domanda.risposte || domanda.risposte.length === 0 ? [null] : domanda.risposte).map(() => null),
      );
