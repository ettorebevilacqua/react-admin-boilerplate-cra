import lists from '../lists';

const risorsaTipoResource = {
  resource: 'risorsaTipo',
  source: 'tipo',
  label: 'Tipologie risorsa',
};

const fieldsGridRisorsaTipo = {
  hideId: false,
  sourceList: [{ type: 'text', ...risorsaTipoResource }],
};

const risorsaTipo = {
  ...lists(risorsaTipoResource, fieldsGridRisorsaTipo),
};

const risorsaModqualifica = {
  resource: 'risorsaTipo',
  source: 'modalita',
  label: 'Modalità qualifica',
};

const fieldsGridModqualifica = {
  hideId: false,
  sourceList: [{ type: 'text', ...risorsaModqualifica }],
};

const modqualifica = {
  ...lists(risorsaModqualifica, fieldsGridModqualifica),
};

const fields = {
  enti: [
    {
      type: 'text',
      source: 'denominazione',
      label: 'Denominazione',
    },
    {
      type: 'text',
      source: 'ateco',
      label: 'Ateco',
    },
    {
      type: 'text',
      source: 'ref_cognome',
      label: 'Reerente',
    },
    {
      type: 'text',
      source: 'ref_email',
      label: 'Mail',
    },
    {
      type: 'text',
      source: 'ref_tel',
      label: 'Telefono',
    },
  ],
};

const forms = {
  enti: {
    grid: {
      hideId: false,
      resource: '',
      title: '',
      sourceList: fields.enti,
    },
  },
};

export default forms;
