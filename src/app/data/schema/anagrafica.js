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
  nome: Yup.string().required('Required'),
  cognome: Yup.string().required('Required'),
  indirizzo: Yup.string(),
  cap: Yup.string(),
  city: Yup.string(),
  prov: Yup.string(),
  country: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email('Email non valida.').required('Required'),
  dateBorn: Yup.string(),
  cf: Yup.string(),
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
  cf: '',
};
