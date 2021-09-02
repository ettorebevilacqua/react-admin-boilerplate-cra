import {
  createOrderedMap, // for deep immutables
} from '@ui-schema/ui-schema';

import { widgets } from '@ui-schema/ds-material/widgetsBinding';

const TipoDomande = [
  { tipo: 'unica' },
  { tipo: 'multipla' },
  { tipo: 'vf' },
  { tipo: 'aperta' },
];

const TipoQuestion = [
  { tipo: 'Scala' },
  { tipo: 'Opzione unica' },
  { tipo: 'Opzione multipla' },
  { tipo: 'Aperta' },
];

export const schemaTitolo = createOrderedMap({
  type: 'object',
  properties: {
    titolo: {
      type: 'string',
      title: 'Titolo',
      widget: 'Text',
      view: {
        sizeXs: 8,
        sizeMd: 8,
      },
    },
  },
});

export const schemaQuestion = createOrderedMap({
  type: 'object',
  properties: {
    question: {
      type: 'string',
      title: 'Domanda',
      widget: 'Text',
      view: {
        sizeXs: 8,
        sizeMd: 8,
      },
    },
    tipo: {
      type: 'string',
      widget: 'Select',
      enum: TipoQuestion.map(el => el.tipo),
      view: {
        sizeXs: 2,
        sizeMd: 2,
      },
    },
  },
  allOf: [
    {
      if: {
        properties: {
          tipo: {
            type: 'string',
            const: 'Scala',
          },
        },
      },
      then: {
        properties: {
          scala: {
            type: 'number',
            title: 'scala valore massimo',
            view: {
              sizeXs: 2,
              sizeMd: 2,
            },
          },
          preVote: {
            type: 'string',
            title: 'descrizione voto minimo',
            widget: 'Text',
            view: {
              sizeXs: 12,
              sizeMd: 12,
            },
          },

          point: {
            type: 'string',
            title: 'descrizione voto massimo',
            widget: 'Text',
            view: {
              sizeXs: 12,
              sizeMd: 12,
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          tipo: {
            type: 'string',
            const: 'Opzione unica',
          },
        },
      },
      then: {
        properties: {
          list: {
            type: 'array',
            title: ' ',
            widget: 'GenericList',
            view: {
              sizeXs: 12,
              sizeMd: 12,
              btnSize: 'medium',
            },
            items: {
              type: 'object',
              properties: {
                domanda: {
                  type: 'string',
                  title: 'Risposta',
                  widget: 'Text',
                  view: {
                    sizeXs: 8,
                    sizeMd: 8,
                  },
                },
                isRight: {
                  type: 'boolean',
                  title: 'vero',
                  view: {
                    sizeXs: 2,
                    sizeMd: 2,
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          tipo: {
            type: 'string',
            const: 'Aperta x',
          },
        },
      },
      then: {},
    },
  ],
});

// Multi Level destructure-merge to overwrite and clone and not change the original ones (shallow-copy)
export const customWidgets = {
  ...widgets,
};
