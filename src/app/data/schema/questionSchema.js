import * as Yup from 'yup';

export const schema = Yup.object().shape({
  titolo: Yup.string().required('Required'),
  idcorso: Yup.string().required('Required'),
  idmodulo: Yup.string().required('Required'),
  partecipanti: Yup.array()
    .of(
      Yup.object().shape({
        nome: Yup.string().required('Required'),
        email: Yup.string().email('Email non valida.').required('Required'),
        phone: Yup.string(),
      }),
    )
    .required('Required')
    .min(1, 'inserire almeno un partecipante'),
  numPartecipanti: Yup.number()
    .required('Required')
    .min(1, 'inserire almeno un partecipante')
    .when('partecipanti', (partecipanti, schema) =>
      schema.test({
        test: numPartecipanti => partecipanti.length === numPartecipanti,
        message: 'il numero di partecipanti deve essere',
      }),
    ),
});

export const empityParteipante = { nome: '', email: '', telefono: '' };

export const empityQuestion = {
  titolo: '',
  idcorso: '',
  titoloModulo: '',
  idmodulo: '',
  docenti: '',
  numPartecipanti: 1,
  partecipanti: [empityParteipante],
};
