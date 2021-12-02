import { modaOfoccurrences, occurrences, median, getStandardDeviation } from 'utils/math';
/* const {
  modaOfoccurrences,
  occurrences,
  median,
  getStandardDeviation,
} = require('/home/etto/prj/donatello/smart/src/utils/math');
*/

const getRandRisposta = () => Math.floor(Math.random() * 7) + 1;
const getRandBolRisposta = () => (!!Math.floor(Math.random() * 2) ? true : false);

const listaRisposte = [
  /*{
    domanda: 'Nel complesso, rispetto all’attività di organizzazione della formazione quanto si ritiene soddisfatto',
    max: 7,
    risposte: [6, 3, 4, 2, 4],
  }, */
  { domanda: "l'assistenza della segreteria organizzativa ", max: 7, risposte: [6, 6, 2, 2, 7, 6] },
  {
    domanda: 'la completezza e tempestività delle informazioni relative al corso ',
    max: 7,
    risposte: [6, 6, 2, 2, 7, 6],
  },
  { domanda: "l'adeguatezza del calendario delle attività", max: 7, risposte: [4, 6, 4, 4, 2, 5] },
  { domanda: 'la qualità del materiale fornito (dispense, file, ecc) ', max: 7, risposte: [3, 7, 5, 3, 6, 3] },
  { domanda: 'gli orari degli incontri ', max: 7, risposte: [2, 3, 5, 6, 7, 2] },
  { domanda: "l'attività di coordinamento ", max: 7, risposte: [1, 2, 4, 7, 7, 4] },
  { domanda: 'rispetto dei tempi ', max: 7, risposte: [7, 3, 3, 4, 7, 5] },
  { domanda: 'coordinamento delle attività ', max: 7, risposte: [6, 4, 4, 3, 5, 6] },
];

const listaBolRisposte = [
  { domanda: 'La preghiamo di evidenziare eventuali criticità', risposte: [] },
  { domanda: 'Frequenti annullamenti di lezione', risposte: [] },
  { domanda: 'Non tempestiva comunicazione del calendario', risposte: [] },
  { domanda: 'Materiali didattici consegnati in ritardo', risposte: [] },
  { domanda: 'Altro: Specificare', risposte: [] },
];

const filler = getter => [1, 2, 3, 4, 5, 6, 7, 8].map(() => getter());
const risposteNum = listaRisposte.map(domanda => ({
  ...domanda,
  risposte: domanda.risposte[0] ? domanda.risposte : filler(getRandRisposta),
}));
const bolRisposte = listaBolRisposte.map(domanda => ({ ...domanda, risposte: filler(getRandBolRisposta) }));
const summer = list => list.reduce((acc, item) => acc + item);

// risposteNum[0].risposte = [5, 6, 3, 5, 3, 7, 6, 1]; // new Array(8).fill(7);
export const risposte = [...risposteNum, ...bolRisposte];
const getTot = domanda => {
  const _risp = domanda.risposte;
  const max = domanda.max || 2;
  const len = _risp.length;
  const boolToInt = val => (typeof val !== 'boolean' ? 0 : val ? 1 : 0);
  const getVal = val => (typeof val === 'number' ? val : boolToInt(val));
  const freqs = occurrences(_risp);
  const moda = modaOfoccurrences(freqs);
  const tot = _risp.reduce((acc, val) => acc + getVal(val), 0);
  const media = (tot / len).toFixed(2);
  const perc = Math.round((media / max) * 100);
  const mediana = median(_risp);
  const varianza = getStandardDeviation(_risp);
  const pvarianza = Math.round((varianza / max) * 100);
  const conta = new Array(max + 1).fill(0); // Array.from({ length: max }, (_, i) => 0);
  const sumFreq = summer(Object.keys(freqs).map(key => freqs[key]));
  for (let i = 1; i <= max; i++) {
    conta[i] = freqs[i] ? Math.round((freqs[i] / sumFreq) * 100) : 0;
  }
  return { tot, media, perc, freqs, moda, mediana, varianza, pvarianza, conta };
};
const maxVote = risposte.reduce((acc, domanda) => (domanda.max > acc ? domanda.max : acc), 0);
export const reportStart = () => risposte.map(domanda => ({ ...domanda, maxVote, report: getTot(domanda) }));
// const reportBool = risposte.map(domanda => ({ ...domanda, report: domanda.risposte }));
// console.log(JSON.stringify(report, null, 2));
