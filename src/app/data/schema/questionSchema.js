import * as Yup from 'yup';

export const schema = Yup.object().shape({
  titolo: Yup.string().required('Required'),
  idcorso: Yup.string().required('Required'),
  idmodulo: Yup.string().required('Required'),
  partecipanti: Yup.string().required('Required'),
});

export const empityParteipante = { nome: '', email: '', telefono: '' };

export const empityQuestion = {
  titolo: '',
  idcorso: '',
  titoloModulo: '',
  idmodulo: '',
  docenti: '',
  NumPartecipanti: '',
  partecipanti: [empityParteipante],
};
