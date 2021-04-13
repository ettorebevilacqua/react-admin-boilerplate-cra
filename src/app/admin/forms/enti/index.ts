import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import listGridMaker from '../lists/list';
import edit from './CorsiEdit';

const fields = [
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
];
const param = {
  hideId: false,
  sourceList: fields,
};
const list = listGridMaker(param);
const enti = {
  list,
  edit: edit.CorsiEdit,
  create: edit.CorsiCreate,
  icon: AccountBalanceIcon,
};

export default enti;
