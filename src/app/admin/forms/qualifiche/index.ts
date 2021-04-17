import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import listGridMaker from '../lists/list';
import Edit from './edit';

const fields = [
  {
    type: 'reference',
    source: 'id_ente',
    sourceRef: 'denominazione',
    reference: 'enti',
    label: 'Ente',
  },
  {
    type: 'reference',
    source: 'id_risorsa',
    sourceRef: 'cognome',
    reference: 'risorse',
    label: 'Risorsa',
  },
  {
    type: 'text',
    source: 'data_qualifica',
    label: 'Data qualifica',
  },
  {
    type: 'text',
    source: 'modalita',
    label: 'Modalita',
  },
  {
    type: 'text',
    source: 'responsabile',
    label: 'Responsabile',
  },
];

const param = {
  hideId: false,
  sourceList: fields,
};
const list = listGridMaker(param);

const qualifiche = {
  list,
  edit: Edit.Edit,
  create: Edit.Create,
  icon: AccountBalanceIcon,
};

export default qualifiche;
