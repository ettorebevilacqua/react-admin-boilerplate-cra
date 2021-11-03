import * as Yup from 'yup';

export const empityomanda = {
  domanda: '',
  tipo: 2,
  risposte: [{ val: null }],
};

export const empityModulo = {
  id: null,
  title: '',
  domande: [empityomanda],
};

export const schema = Yup.object().shape({
  nome: Yup.string().required('Richiesto'),
  cognome: Yup.string().required('Richiesto'),
  indirizzo: Yup.string(),
  cap: Yup.string(),
  city: Yup.string(),
  prov: Yup.string(),
  country: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email('Email non valida.').required('Richiesto'),
  dateBorn: Yup.string(),
  ambito: Yup.array(),
  tipologia: Yup.string().min(2, 'Richiesto'),
  cf: Yup.string().required('Richiesto'),
  qualifica: Yup.object().shape({
    data: Yup.string(),
    responsabile: Yup.string(),
    modalita: Yup.string(),
    altro: Yup.string(),
  }),
});

export const empityAnagrafica = {
  nome: '',
  cognome: '',
  indirizzo: '',
  cap: '',
  city: '',
  prov: '',
  country: '',
  phone: '',
  email: '',
  dateBorn: '',
  ambito: [],
  tipologia: '',
  cf: '',
};
