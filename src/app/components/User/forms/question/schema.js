import {
  UIGenerator, // main component
  isInvalid, // for validity checking
  createEmptyStore,
  createStore, // for initial data-store creation
  createMap,
  createOrderedMap, // for deep immutables
} from '@ui-schema/ui-schema';

export const schema1 = createOrderedMap({
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
    },
    comment: {
      type: 'string',
      widget: 'Text',
      view: {
        rows: 3,
      },
    },
    accept_privacy: {
      type: 'boolean',
    },
  },
  required: ['accept_privacy'],
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
          solved: {
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

export const schemaTst = createOrderedMap({
  title: 'A list of tasks',
  type: 'object',
  required: ['title'],
  properties: {
    title: {
      type: 'string',
      title: 'Task list title',
    },
    tasks: {
      type: 'array',
      title: 'Tasks',
      items: {
        type: 'object',
        widget: 'GenericList',
        required: ['title'],
        properties: {
          title: {
            type: 'string',
            title: 'Title',
            description: 'A sample title',
          },
          details: {
            type: 'string',
            title: 'Task details',
            description: 'Enter the task details',
          },
          done: {
            type: 'boolean',
            title: 'Done?',
            default: false,
          },
        },
      },
    },
  },
});
