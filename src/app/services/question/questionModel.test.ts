import Model from './questionModel';
// const Model = require('./questionModel');

const data = {
  _info: {
    uc: '61daf8686f7d15f3a05091a3',
    uu: '61daf8686f7d15f3a05091a3',
  },
  docenti: [
    {
      ambito: [],
      nome: 'mario',
      cognome: 'rossi',
      cap: '',
      prov: '',
      country: '',
      phone: '',
      email: 'rossi@email.com',
      dateBorn: '',
      tipologia: 'Docente',
      cf: 'cc',
      _info: {
        uc: '61daf8686f7d15f3a05091a3',
      },
      id: '61dfcfd56f7d15f3a05097e6',
      _nome: 'rossi mario',
    },
    {
      qualifica: {
        modalita: '1',
        altro: ' ',
      },
      _info: {
        uc: '61daf8686f7d15f3a05091a3',
      },
      ambito: [],
      nome: 'luigi',
      cognome: 'verdi',
      cap: '',
      prov: '',
      country: '',
      phone: '',
      email: 'ettorevilacqua@gmail.com',
      dateBorn: '',
      tipologia: 'Docente',
      cf: 'ww',
      id: '61f515fb7b03fbf06252d47f',
      _nome: 'verdi luigi',
    },
  ],
  titolo: 'corso 2',
  idcorso: {
    _info: {
      uc: '61daf8686f7d15f3a05091a3',
    },
    ambito: ['ambito 1', 'ambito2'],
    titolo: 'corso 2',
    dataInizio: '',
    finanziatore: '',
    durata: 0,
    sede: '',
    coordinatore: '',
    tutor: '',
    codice: 2,
    id: '61dfcc526f7d15f3a05097af',
  },
  idquestion: {
    _info: {
      uc: '61daf8686f7d15f3a05091a3',
      uu: '61daf8686f7d15f3a05091a3',
    },
    moduli: [
      {
        _info: {
          uc: '61daf8686f7d15f3a05091a3',
          uu: '61daf8686f7d15f3a05091a3',
        },
        title: 'docente',
        domande: [
          {
            risposte: [
              {
                val: null,
                risposta: 'si',
              },
              {
                risposta: 'no',
                val: true,
              },
              {
                risposta: 'forse',
                val: null,
              },
            ],
            _id: '61dec2a26f7d15f3a0509683',
            domanda: 'bravo',
            tipo: 2,
          },
        ],
        isDocente: true,
        id: '61daf8956f7d15f3a05091c1',
      },
      {
        _info: {
          uc: '61daf8686f7d15f3a05091a3',
          uu: '61daf8686f7d15f3a05091a3',
        },
        title: 'organizzazione',
        domande: [
          {
            risposte: [
              {
                val: null,
                risposta: 'bb',
              },
              {
                risposta: 'cc',
                val: null,
              },
            ],
            _id: '61dd09d06f7d15f3a0509546',
            domanda: 'aa',
            tipo: 3,
          },
          {
            risposte: [
              {
                val: null,
                risposta: '',
              },
            ],
            _id: '61f8b833f8e44828016f5aea',
            domanda: 'bb',
            tipo: 1,
            ratingStart: 'min',
            ratingEnd: 'max',
            ratingMax: 5,
          },
          {
            risposte: [
              {
                val: null,
                risposta: 'bb',
              },
              {
                risposta: 'cc',
                val: null,
              },
            ],
            _id: '61f8b84ff8e44828016f5afa',
            domanda: 'cc',
            tipo: 4,
          },
          {
            risposte: [
              {
                val: null,
                risposta: '',
              },
            ],
            _id: '61f8b883f8e44828016f5b05',
            domanda: 'titolo',
            tipo: 6,
          },
          {
            risposte: [
              {
                val: null,
                risposta: '',
              },
            ],
            _id: '61f8b8d2f8e44828016f5b28',
            domanda: 'aperta',
            tipo: 5,
          },
        ],
        id: '61dd09d06f7d15f3a0509545',
      },
    ],
    title: 'docenti q',
    isPublic: true,
    id: '61dfc8456f7d15f3a05096d1',
  },
  numPartecipanti: 1,
  partecipanti: [
    {
      risposte: [
        {
          idmodulo: '61daf8956f7d15f3a05091c1',
          iddomanda: '61dec2a26f7d15f3a0509683',
          risposte: [
            {
              pos: 0,
              val: null,
            },
            {
              pos: 1,
              val: null,
            },
            {
              pos: 2,
              val: null,
            },
          ],
        },
      ],
      _id: '61dfcff06f7d15f3a05097ea',
      nome: 'aa',
      email: 'ddd@pp.it',
      telefono: '',
      cognome: 'bb',
    },
  ],
  titoloQuestion: 'docenti q',
  codiceCorso: 2,
  id: '61dfcff06f7d15f3a05097e9',
};

const questionsTest = {
  idx: {
    tipo: 4,
    idmodulo: 0,
    iddomanda: 0,
    idxRisposta: 0,
    docente: { id: '61dfcfd56f7d15f3a05097e6' },
    risposta: { val: true },
    reset: true,
  },
  first: {
    tipo: 2,
    idmodulo: '61daf8956f7d15f3a05091c1',
    iddomanda: '61dec2a26f7d15f3a0509683',
    idxRisposta: 0,
    iddocente: '61dfcfd56f7d15f3a05097e6',
    risposta: { val: true },
    reset: true,
  },
};

const model = Model(data.idquestion, []);
debugger;
describe('Model Start', () => {
  test('check id dModlo', () => {
    expect(model.moduli.moduli[0].id).toBe('61daf8956f7d15f3a05091c1');
  });
});

const isValTrue = (val: any): boolean => (!!val ? true : false);
if (false) {
  describe('Model risposte.add', () => {
    let q = questionsTest.idx;
    let result = model.risposte.onClickOptions(q.tipo, q.idmodulo, q.iddomanda, q.idxRisposta, null);
    let val = isValTrue(result[0].risposta.val);

    test('add risposta', () => {
      expect(val).toBeTruthy();
    });

    result = model.risposte.onClickOptions(q.tipo, q.idmodulo, q.iddomanda, q.idxRisposta + 1, q.docente);
    val = !!result[0].risposta.val;
    test('add same risposta', () => {
      expect(val).toBe(true);
    });

    result = model.risposte.onClickOptions(q.tipo, q.idmodulo, q.iddomanda, q.idxRisposta + 2, q.docente);
    val = !!result[0].risposta.val;
    test('add same risposta', () => {
      expect(val).toBe(true);
    });
  });

  describe('changeRisposta', () => {
    let q = questionsTest.idx;

    let result = model.risposte.changeRisposta(q.idmodulo, q.iddomanda, q.idxRisposta + 2, 'ppp', null, q.docente);
    let val = result[0].risposta.val;

    test('add changeRisposta', () => {
      expect(val).toBe('ppp');
    });

    const result2 = model.risposte.changeRisposta(q.idmodulo, q.iddomanda, 0, 5, null, q.docente);
    const val2 = result2[0].risposta.val;

    test('add changeRisposta', () => {
      expect(val2).toBe(5);
    });
  });
}

describe('getValueRiposta', () => {
  let q = questionsTest.idx;

  const result2 = model.risposte.changeRisposta(q.idmodulo, q.iddomanda, 0, 5, null, q.docente);
  const val2 = result2[0].risposta.val;

  test('add changeRisposta', () => {
    expect(val2).toBe(5);
  });

  let result = model.risposte.getValue(q.idmodulo, q.iddomanda, 0, false, q.docente.id );
  console.log('rexult xxx ', result);
  const val = result;

  test('getValueRiposta', () => {
    expect(val).toBe(5);
  });
});
