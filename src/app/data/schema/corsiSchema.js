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
  titolo: Yup.string().required('Required'),
  dataInizio: Yup.string(),
  sede: Yup.string(),
  finanziatore: Yup.string(),
  ambito: Yup.array(),
  durata: Yup.number(),
  coordinatore: Yup.string(),
  tutor: Yup.string(),
});

export const empityCorso = {
  nome: '',
  titolo: '',
  dataInizio: '',
  finanziatore: '',
  ambito: [],
  durata: 0,
  sede: '',
  coordinatore: '',
  tutor: '',
};
