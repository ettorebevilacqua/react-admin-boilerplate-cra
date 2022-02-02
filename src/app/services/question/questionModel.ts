interface Risposta {
  idmodulo: string;
  iddomanda: string;
  iddocente: string;
  idxRisposta: number;
  risposta: any;
}

type Risposte = Array<Risposta>;
type Finder = (value: any) => boolean;
type FinderDomanda = (idmodulo: string, iddomanda: string, iddocente: string) => (value: any) => boolean;
type RemoveDomanda = (idmodulo: string, iddomanda: string, iddocente: string) => Risposte;

type FinderRisposta = (
  idmodulo: string,
  iddomanda: string,
  iddocente: string,
  idxRisposta: number,
) => (value: any) => boolean;

export const toNumberOr = (val, orVal) => (!val ? orVal : isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

export const upDateAr = (ar: any[], idx: number, val: any): any[] => {
  const newIdx = idx < 0 ? ar.push(val) - 1 : idx;
  ar[newIdx] = val;
  return ar;
};

const pushOrUpdate = (ar: any[], finder: Finder, val: any): any[] => {
  const idxFound = ar.findIndex(finder);
  return upDateAr(ar, idxFound, val);
};

const finderRisposta: FinderRisposta = (
  idmodulo: string,
  iddomanda: string,
  iddocente: string,
  idxRisposta: number,
) => risp =>
  risp.idmodulo === idmodulo &&
  iddomanda === risp.iddomanda &&
  idxRisposta === risp.idxRisposta &&
  (iddocente ? risp.iddocente === iddocente : true);

const finderDomanda: FinderDomanda = (idmodulo: string, iddomanda: string, iddocente: string) => risp =>
  risp.idmodulo === idmodulo && iddomanda === risp.iddomanda && (iddocente ? risp.iddocente === iddocente : true);

const findRisposta = (risposte: Risposte) => (idmodulo, iddomanda, iddocente, idxRisposta) => {
  const idx = risposte.findIndex(finderRisposta(idmodulo, iddomanda, iddocente, idxRisposta));
  return idx < 0 ? [-1, null] : [idx, risposte[idx]];
};

const getIdsDomanda = (moduli: any[]) => (idxModulo: number, idxDomanda: number) => {
  const modulo = moduli && moduli[idxModulo];
  if (!modulo) return null;
  return modulo.domande && modulo.domande[idxDomanda] ? [modulo.id, modulo.domande[idxDomanda]._id] : [modulo.id, -1];
};

const addRisposta = (risposte: Risposte, remover: RemoveDomanda) => (
  idmodulo: string,
  iddomanda: string,
  idxRisposta: number,
  iddocente: string,
  risposta: any,
  reset: boolean,
): Risposte => {
  const tmpRisposte = reset ? remover(idmodulo, iddomanda, iddocente) : [...risposte];
  const rispostaObj = { idmodulo, iddomanda, iddocente, idxRisposta, risposta };
  const newIdxRisposta = tmpRisposte.findIndex(finderRisposta(idmodulo, iddomanda, iddocente, idxRisposta));
  return upDateAr(tmpRisposte, newIdxRisposta, rispostaObj) as Risposte;
};

const getDomanda = (moduli: any[]) => (idxModulo: number, idx: number) =>
  moduli &&
  moduli[idxModulo] &&
  moduli[idxModulo].domande &&
  moduli[idxModulo].domande[idx] &&
  moduli[idxModulo].domande[idx].domanda.trim &&
  moduli[idxModulo].domande[idx].domanda.trim()
    ? moduli[idxModulo].domande[idx]
    : null;

const getValueRiposta: any = (moduli: any[], getRisposte: any) => (idxmodulo, idxdomanda, iddocente, idxRisposta) => {
  const risposte = getRisposte();
  const [idmodulo, iddomanda] = getIdsDomanda(moduli)(idxmodulo, idxdomanda) || [];
  if (!idmodulo || !iddomanda) return null;

  const risp = findRisposta(risposte)(idmodulo, iddomanda, iddocente, idxRisposta);
  return risp[1];
  // risposte && risposte[idxModulo] && risposte[idxModulo][idxDomanda] && risposte[idxModulo][idxDomanda][idxRisposta]
};

const getModuloRisposta = (moduli: any[]) => (idxModulo: number, idxDomanda: number, idxRisposta: number) => {
  const domanda = getDomanda(moduli)(idxModulo, idxDomanda);
  if (!domanda || !domanda.risposte) return null;
  debugger;
  if (domanda.tipo === 1) return domanda.rating;
  return !domanda.risposte[idxRisposta] || !domanda.risposte[idxRisposta]
    ? null
    : domanda.risposte[idxRisposta].val && domanda.risposte[idxRisposta].val.val
    ? domanda.risposte[idxRisposta].val.val
    : domanda.risposte[idxRisposta].val;
};

const getUserVal = (moduli: any[], getRisposte: any) => (idxModulo, idxDomanda, idxRisposta, correlata, docente) => {
  const valRisposta = getValueRiposta(moduli, getRisposte)(idxModulo, idxDomanda, docente.id, idxRisposta);
  console.log('idmodulo, iddomanda', valRisposta.risposta.val);
  return !valRisposta || !valRisposta.risposta
    ? null
    : correlata
    ? valRisposta.risposta.correlata || null
    : valRisposta.risposta.val || null;
};

const getTipoDomanda = (moduli: any[]) => (idxModulo: number, idxDomanda: number) => {
  const domanda = getDomanda(moduli)(idxModulo, idxDomanda);
  return !domanda ? 0 : toNumberOr(domanda.tipo, 0);
};

const getCorrelata = (moduli: any[]) => (idxModulo: number, idxDomanda: number, idxRisposta: number) => {
  const domanda = getDomanda(moduli)(idxModulo, idxDomanda);
  const tipoNum = toNumberOr(domanda?.tipo, -1);
  if ([5, 6].indexOf(tipoNum) > -1) return null;
  if (!domanda || !domanda.risposte || !domanda.risposte[idxRisposta]) return null;
  const risposta = domanda.risposte[idxRisposta];
  return risposta && risposta.correlata ? risposta.correlata : null;
};

const isCorrelata = (moduli: any[]) => (idxModulo, idxDomanda, idxRisposta, val) => {
  const correlata = getCorrelata(moduli)(idxModulo, idxDomanda, idxRisposta);
  if (!correlata) return false;
  const tipo = getTipoDomanda(moduli)(idxModulo, idxDomanda);
  const rispostaUser = getValueRiposta(idxModulo, idxDomanda, idxRisposta);
  const valCur = rispostaUser && rispostaUser.val;
  if (!valCur && tipo !== 4) return false;
  const valValues = getModuloRisposta(moduli)(idxModulo, idxDomanda, idxRisposta);
  // const ratingVal = toNumberOr(domanda.rating, 0);
  return tipo === 1 ? valValues !== 0 && valCur <= valValues : valCur === valValues;
};

const onClickOptions = (cb: any, moduli: any[], getRisposte: any, removeRisposteDomanda: RemoveDomanda) => (
  tipo,
  idxModulo,
  idxDomanda,
  idxRisposta = 0,
  docente,
): Risposte => {
  const risposte = getRisposte();

  // console.log('click risposta', idxDomanda, idxRisposta);
  const valBefore = getUserVal(moduli, getRisposte)(idxModulo, idxDomanda, idxRisposta, false, docente);
  const isBool = [2, 3, 4].indexOf(tipo) > -1;
  const valBool = isBool ? !valBefore : valBefore;
  //const correlata = getCorrelata(idxModulo, idxDomanda, idxRisposta);
  //const valBool = correlata ? { val: valBoolTmp, correlata: {} } : valBoolTmp;

  const _risposte = risposte.map(el => ({ ...el }));
  const _domandaRisposte = risposte && risposte[idxModulo] && risposte[idxModulo][idxDomanda];
  const [idmodulo, iddomanda] = getIdsDomanda(moduli)(idxModulo, idxDomanda) || [];

  const risposteNew = addRisposta(risposte, removeRisposteDomanda)(
    idmodulo,
    iddomanda,
    idxRisposta,
    docente && docente.id,
    { val: valBool },
    tipo === 2,
  );
  cb(risposteNew);
  return risposte;
  //setterRisposte(_risposte);
  // return tipo === 2 ? setRisposte(_risposte) : isBool && changeRisposte(idxModulo, idxDomanda, idxRisposta, valBool);
};

const changeRisposta = (cb: any, moduli: any[], getRisposte: any, removeRisposteDomanda: RemoveDomanda) => (
  idxModulo: number,
  idxDomanda: number,
  idxRisposta: number,
  newValue: any,
  correlata: any,
  docente: any,
): Risposte => {
  const risposte = getRisposte();
  const [idmodulo, iddomanda] = getIdsDomanda(moduli)(idxModulo, idxDomanda) || [];
  if (!idmodulo || !iddomanda) return [];

  const _risposte = addRisposta(risposte, removeRisposteDomanda)(
    idmodulo,
    iddomanda,
    idxRisposta,
    docente && docente.id,
    { val: newValue },
    false,
  );
  cb(_risposte);
  return _risposte;
};

export default function Model(data: any, _risposte: Risposte = [], setter: any) {
  const { moduli } = data;
  let risposte = [..._risposte];

  if (!moduli) {
    throw new Error('missing moduli');
  }

  const findDomanda = (idmodulo: string, iddomanda: string, iddocente: string) =>
    risposte.find(finderDomanda(idmodulo, iddomanda, iddocente));

  const removeRisposteDomanda = (idmodulo: string, iddomanda: string, iddocente: string) =>
    risposte.filter(risp => !finderDomanda(idmodulo, iddomanda, iddocente)(risp));

  const cb = newVal => {
    risposte = [...newVal];
    setter && setter(risposte);
  };

  const getRisposte = () => risposte;

  return {
    risposte: {
      getRisposte,
      find: findRisposta(risposte),
      findDomanda,
      resetDomanda: removeRisposteDomanda,
      getValue: getUserVal(moduli, getRisposte),
      // add: addRisposta(removeRisposteDomanda, removeRisposteDomanda),
      onClickOptions: onClickOptions(cb, moduli, getRisposte, removeRisposteDomanda),
      changeRisposta: changeRisposta(cb, moduli, getRisposte, removeRisposteDomanda),
    },
    moduli: {
      moduli,
      getTipoDomanda,
      getModuloRisposta: getModuloRisposta(moduli),
      getIdsDomanda: getIdsDomanda(moduli),
      getDomanda: getDomanda(moduli),
      isCorrelata,
      getCorrelata: getCorrelata(moduli),
    },
  };
}
