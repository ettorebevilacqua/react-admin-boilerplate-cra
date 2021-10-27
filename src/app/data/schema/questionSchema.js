import * as Yup from 'yup';
import get from 'lodash/get';

Yup.addMethod(Yup.array, 'unique', function (message, path) {
  return this.test('unique', message, function (list) {
    if (!list) return true;
    const mapper = x => get(x, path);
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }
    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    const founds = list.filter(l => mapper(l) === set[0]);
    founds && founds.map((el, idEl) => this.createError({ path: `${this.path}.[${idEl}].${path}`, message }));
    return this.createError({
      path: `${this.path}.[${idx}].${path}`,
      message,
    });
  });
});
export const schema = Yup.object().shape({
  titolo: Yup.string().required('Richiesto'),
  idcorso: Yup.string().required('Richiesto'),
  codiceCorso: Yup.number(),
  idquestion: Yup.string().required('Richiesto'),
  docenti: Yup.array()
    .of(
      Yup.object().shape({
        nome: Yup.string().required('Required'),
        email: Yup.string().email('Email non valida.').required('Richiesto'),
        phone: Yup.string(),
      }),
    )
    .unique('email ripetuta', 'email'),
  partecipanti: Yup.array()
    .of(
      Yup.object().shape({
        nome: Yup.string().required('Richiesto'),
        email: Yup.string().email('Email non valida.').required('Richiesto'),
        phone: Yup.string(),
      }),
    )
    .required('Richiesto')
    .unique('email ripetuta', 'email')
    .min(1, 'inserire almeno un partecipante'),
  numPartecipanti: Yup.number()
    .min(1, 'inserire almeno un partecipante')
    .when('partecipanti', (partecipanti, schema) =>
      schema.test({
        test: numPartecipanti => partecipanti && partecipanti.length === numPartecipanti,
        message: 'inserire i dati per ogni partecipante per raggiungere il umero indicato',
      }),
    ),
});

export const questionModulischema = Yup.object().shape({
  title: Yup.string().required('Richiesto'),
  isPublic: Yup.boolean(),
  moduli: Yup.array(),
});

export const empityParteipante = { nome: '', email: '', telefono: '' };

export const empityQuestion = {
  titolo: '',
  idcorso: '',
  titoloModulo: '',
  idquestion: '',
  numPartecipanti: 1,
  docenti: [],
  partecipanti: [empityParteipante],
};
