import {
  UIGenerator, // main component
  isInvalid, // for validity checking
  createEmptyStore,
  createStore, // for initial data-store creation
  createMap,
  createOrderedMap, // for deep immutables
} from '@ui-schema/ui-schema';

import { widgets } from '@ui-schema/ds-material/widgetsBinding';

import { TransTitle, WidgetProps } from '@ui-schema/ui-schema';

import { NumberSlider } from '@ui-schema/ds-material/Widgets/NumberSlider';

export const pointer = ({
  value,
  ownKey,
  storeKeys,
  onChange,
  required,
  schema,
  errors,
  valid,
  ...props
}) => {
  return (
    <>
      <label>
        <TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />
      </label>

      <input
        type={'text'}
        required={required}
        value={value || ''}
        onChange={e => {
          onChange(
            storeKeys,
            ['value'],
            ({ value: oldValue }) => ({ value: e.target.value }),
            schema.get('deleteOnEmpty') || required,
            schema.get('type'),
          );
        }}
      />
    </>
  );
};

const TipoDomande = [
  { tipo: 'unica' },
  { tipo: 'multipla' },
  { tipo: 'vf' },
  { tipo: 'aperta' },
];

export const TipoSchema = createOrderedMap({
  type: 'object',
  properties: {
    idcorso: {
      type: 'string',
      title: 'Id corso',
      widget: 'Text',
      view: {
        sizeXs: 2,
        sizeMd: 2,
      },
    },
    titoloCorso: {
      type: 'string',
      title: 'Titolo',
      widget: 'Text',
      view: {
        sizeXs: 10,
        sizeMd: 10,
      },
    },
    idmodulo: {
      type: 'string',
      title: 'Id Modulo',
      widget: 'Text',
      view: {
        sizeXs: 2,
        sizeMd: 2,
      },
    },
    titoloModulo: {
      type: 'string',
      title: 'Titolo modulo',
      widget: 'Text',
      view: {
        sizeXs: 10,
        sizeMd: 10,
      },
    },
    numPartecipanti: {
      type: 'string',
      title: 'Num Partecipanti',
      widget: 'Text',
      view: {
        sizeXs: 2,
        sizeMd: 2,
      },
    },
    partecipanti: {
      type: 'array',
      widget: 'GenericList',
      view: {
        sizeXs: 12,
        sizeMd: 12,
        btnSize: 'small',
      },
      items: {
        type: 'object',
        properties: {
          nome: {
            type: 'string',
            title: 'Nome',
            widget: 'Text',
            view: {
              sizeXs: 10,
              sizeMd: 10,
            },
          },
          nome: {
            type: 'string',
            title: 'Telefono',
            widget: 'Text',
            view: {
              sizeXs: 10,
              sizeMd: 10,
            },
          },
          nome: {
            type: 'string',
            title: 'Mail',
            widget: 'Text',
            view: {
              sizeXs: 10,
              sizeMd: 10,
            },
          },
        },
      },
    },
  },
});

export const TipoSchemaCustomer = createOrderedMap({
  type: 'object',
  properties: {
    idcorso: {
      type: 'string',
      title: 'Id corso',
      widget: 'Text',
      view: {
        sizeXs: 2,
        sizeMd: 2,
      },
    },
    idente: {
      type: 'string',
      title: 'Id Ente',
      widget: 'Text',
      view: {
        sizeXs: 2,
        sizeMd: 2,
      },
    },
    titolo: {
      type: 'string',
      title: 'Titolo',
      widget: 'Text',
      view: {
        sizeXs: 10,
        sizeMd: 10,
      },
    },
  },
});

export const schema = createOrderedMap({
  type: 'object',
  properties: {
    list: {
      type: 'array',
      widget: 'GenericList',
      view: {
        sizeXs: 12,
        sizeMd: 12,
        btnSize: 'small',
      },
      items: {
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
            enum: TipoDomande.map(el => el.tipo),
            view: {
              sizeXs: 2,
              sizeMd: 2,
            },
          },
          point: {
            type: 'number',
            title: 'punti',
            view: {
              sizeXs: 2,
              sizeMd: 2,
            },
          },
          solved: {
            type: 'array',
            title: '',
            widget: 'GenericList',
            view: {
              sizeXs: 12,
              sizeMd: 12,
              btnSize: 'small',
            },
            items: {
              type: 'object',
              properties: {
                response: {
                  title: 'Risposta',
                  type: 'string',
                  widget: 'Text',
                  view: {
                    sizeXs: 9,
                    sizeMd: 9,
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
                point: {
                  type: 'number',
                  title: 'point',
                  view: {
                    sizeXs: 1,
                    sizeMd: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

export const schemaCustomer = createOrderedMap({
  type: 'object',
  properties: {
    list: {
      type: 'array',
      widget: 'GenericList',
      view: {
        sizeXs: 12,
        sizeMd: 12,
        btnSize: 'medium',
      },
      items: {
        type: 'object',
        properties: {
          group: {
            type: 'string',
            title: 'Gruppo Domanda',
            widget: 'Text',
            view: {
              sizeXs: 12,
              sizeMd: 12,
            },
          },
          note: {
            title: 'note',
            type: 'string',
            widget: 'Text',
            view: {
              sizeXs: 12,
              sizeMd: 12,
            },
          },

          question: {
            type: 'array',
            title: '  ',
            widget: 'GenericList',
            view: {
              sizeXs: 12,
              sizeMd: 12,
              btnSize: 'medium',
            },
            items: {
              type: 'object',
              properties: {
                response: {
                  title: 'Domanda',
                  type: 'string',
                  widget: 'Text',
                  view: {
                    sizeXs: 10,
                    sizeMd: 10,
                  },
                },
                point: {
                  type: 'number',
                  title: 'punti',
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
                    sizeXs: 6,
                    sizeMd: 6,
                  },
                },
                vote: {
                  type: 'object',
                  properties: {
                    demo_input: {
                      title: 'voto',
                      type: 'string',
                      widget: 'OptionsRadio',
                      enum: ['1', '2', '3', '4', '5'],
                    },
                  },
                  view: {
                    sizeXs: 12,
                    sizeMd: 12,
                  },
                },
                afterVote: {
                  type: 'string',
                  title: 'descrizione voto minimo',
                  widget: 'Text',
                  view: {
                    sizeXs: 6,
                    sizeMd: 6,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

// Multi Level destructure-merge to overwrite and clone and not change the original ones (shallow-copy)
export const customWidgets = {
  ...widgets,
};
