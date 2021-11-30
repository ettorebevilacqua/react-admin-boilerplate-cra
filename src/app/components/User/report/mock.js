// import { modaOfoccurrences, occurrences, median, getStandardDeviation } from 'utils/math';
const {
  modaOfoccurrences,
  occurrences,
  median,
  getStandardDeviation,
} = require('/home/etto/prj/donatello/smart/src/utils/math');
const getRandRisposta = () => Math.floor(Math.random() * 7) + 1;
const getRandBolRisposta = () => (!!Math.floor(Math.random() * 2) ? true : false);

const listaRisposte = [
  { domanda: 'In dettaglio quanto si ritiene soddsfatto per:', max: 7, risposte: [6, 3, 4, 2, 4] },
  { domanda: "l'assistenza della segreteria organizzativa ", max: 7, risposte: [] },
  { domanda: 'la completezza e tempestività delle informazioni relative al corso ', max: 7, risposte: [] },
  { domanda: "l'adeguatezza del calendario delle attività", risposte: [] },
  { domanda: 'la qualità del materiale fornito (dispense, file, ecc) ', max: 7, risposte: [] },
  { domanda: 'gli orari degli incontri ', max: 7, risposte: [] },
  { domanda: "l'attività di coordinamento ", max: 7, risposte: [] },
  { domanda: 'rispetto dei tempi ', max: 7, risposte: [] },
  { domanda: 'coordinamento delle attività ', max: 7, risposte: [] },
];

const listaBolRisposte = [
  { domanda: 'La preghiamo di evidenziare eventuali criticità', risposte: [] },
  { domanda: 'Frequenti annullamenti di lezione', risposte: [] },
  { domanda: 'Non tempestiva comunicazione del calendario', risposte: [] },
  { domanda: 'Materiali didattici consegnati in ritardo', risposte: [] },
  { domanda: 'Altro: Specificare', risposte: [] },
];

const filler = getter => [1, 2, 3, 4, 5, 6, 7, 8].map(() => getter());
const risposteNum = listaRisposte.map(domanda => ({ ...domanda, risposte: filler(getRandRisposta) }));
const bolRisposte = listaBolRisposte.map(domanda => ({ ...domanda, risposte: filler(getRandBolRisposta) }));

risposteNum[0].risposte = [5, 6, 3, 5, 3, 7, 6, 1]; // new Array(8).fill(7);
const risposte = [...risposteNum, ...bolRisposte];
const getTot = domanda => {
  const _risp = domanda.risposte;
  const max = domanda.max || 1;
  const len = _risp.length;
  const boolToInt = val => (typeof val !== 'boolean' ? 0 : val ? 1 : 0);
  const getVal = val => (typeof val === 'number' ? val : boolToInt(val));
  const freqs = occurrences(_risp);
  const moda = modaOfoccurrences(freqs);
  const tot = _risp.reduce((acc, val) => acc + getVal(val), 0);
  const media = tot / len;
  const perc = Math.round((media / max) * 100);
  const mediana = median(_risp);
  const varianza = getStandardDeviation(_risp);
  const pvarianza = Math.round((varianza / max) * 100);
  return { tot, media, perc, moda, mediana, varianza, pvarianza };
};
const report = risposte.map(domanda => ({ ...domanda, report: getTot(domanda) }));
// const reportBool = risposte.map(domanda => ({ ...domanda, report: domanda.risposte }));

console.log(JSON.stringify(report, null, 2));
