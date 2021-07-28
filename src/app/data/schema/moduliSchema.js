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
  domanda: Yup.string().required('Required'),
  tipo: Yup.number().required('').required('Required'),
  domande: Yup.array().required(),
});
