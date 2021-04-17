import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import listGridMaker from '../lists/list';
import Edit from './edit';

const fields = [
  {
    type: 'reference',
    source: 'id_ente',
    sourceRef: 'denominazione',
    reference: 'enti',
    label: 'Denominazione',
  },
  {
    type: 'text',
    source: 'titolo',
    label: 'Titolo',
  },
  {
    type: 'text',
    source: 'data_inizio',
    label: 'Inizio',
  },
  {
    type: 'text',
    source: 'durata',
    label: 'Durata',
  },
  {
    type: 'text',
    source: 'ambito',
    label: 'Ambito',
  },
  {
    type: 'text',
    source: 'sede',
    label: 'Sede',
  },
  {
    type: 'text',
    source: 'coordinatore',
    label: 'Coordinatore',
  },
];

const param = {
  hideId: false,
  sourceList: fields,
};
const list = listGridMaker(param);

const corsi = {
  list,
  edit: Edit.Edit,
  create: Edit.Create,
  icon: AccountBalanceIcon,
};

export default corsi;
