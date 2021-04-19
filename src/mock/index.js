export const risorsaTipo = [
  { tipo: 'Tipologia' },
  { tipo: 'Docente' },
  { tipo: 'Tutor' },
  { tipo: 'Coordinatore' },
  { tipo: 'Consulente' },
  { tipo: 'Progettista' },
  { tipo: 'Analista del fabbisogno' },
  { tipo: 'Esperto di competenze' },
  { tipo: 'Operatore del mercato del lavoro' },
];

export const modqualifica = [
  { modalita: 'Analisi del curriculum vitae' },
  { modalita: 'Colloquio' },
  { modalita: 'Storica collaborazione' },
  { modalita: 'Segnalato da collaboratore/partner' },
  { modalita: 'Scelto dal cliente' },
  { modalita: 'Figura notoriamente esperta di settore' },
  { modalita: 'Altro (specificare)' },
];

export const fgiuridiche = [
  { tipo: 'SRL' },
  { tipo: 'SNC' },
  { tipo: 'SAS' },
  { tipo: 'COOP' },
  { tipo: 'CONSORZIO' },
];

export const ambiti = [
  { ambito: 'Privacy' },
  { ambito: 'Qualità' },
  { ambito: 'Ambiente' },
  { ambito: 'Sistemi cogenti' },
  { ambito: 'Commercializzazione e vendita' },
  { ambito: 'Gestione aziendale' },
  { ambito: 'Amministrazione e contabilità' },
  { ambito: 'Gestione finanziaria' },
  { ambito: 'Gestione risorse umane' },
  { ambito: 'Analisi del mercato' },
  { ambito: 'Progettazione e sviluppo' },
  { ambito: 'Produzione' },
  { ambito: 'Logistica' },
  { ambito: 'Gestione patrimoniale' },
  { ambito: 'Gestione acquisti' },
  { ambito: 'Informatica' },
  { ambito: 'Innovazione e sviluppo' },
  { ambito: 'Comunicazione e immagine' },
  { ambito: 'Segreteria' },
  { ambito: 'Sicurezza' },
];

const keysObj = obj => Object.keys(obj);
const hasVals = obj =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

export function setLocalStorage() {
  const strStorage = localStorage.getItem('ra-data-local-storage');
  const storage = strStorage ? JSON.parse(strStorage) : {};

  if (!storage.fgiuridiche || !storage.fgiuridiche[0]) {
    const listFgiuridiche = fgiuridiche.reduce((acc, tipo, idx) => {
      acc.push({ id: idx, ...tipo });
      return acc;
    }, []);
    storage.fgiuridiche = listFgiuridiche;
  }

  if (!storage.modqualifica || !storage.modqualifica[0]) {
    const listModQualifica = modqualifica.reduce((acc, item, idx) => {
      acc.push({ id: idx, ...item });
      return acc;
    }, []);
    storage.modqualifica = listModQualifica;
  }

  if (!storage.risorsaTipo || !storage.risorsaTipo[0]) {
    const listRisorsaTipo = risorsaTipo.reduce((acc, item, idx) => {
      acc.push({ id: idx, ...item });
      return acc;
    }, []);
    storage.risorsaTipo = listRisorsaTipo;
  }

  if (!storage.ambiti || !storage.ambiti[0]) {
    const listambiti = ambiti.reduce((acc, item, idx) => {
      acc.push({ id: idx, ...item });
      return acc;
    }, []);
    storage.ambiti = listambiti;
  }

  const strToStorage = JSON.stringify(storage);
  localStorage.setItem('ra-data-local-storage', strToStorage);
}

setLocalStorage();
