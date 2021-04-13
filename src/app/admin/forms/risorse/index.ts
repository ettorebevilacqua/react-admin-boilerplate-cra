import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import listGridMaker from '../lists/list';
import risorseEdit from './CorsiEdit';

const fields = [
  {
    type: 'function',
    label: 'Nome',
    render: record => `${record.cognome} ${record.nome}`,
  },
  {
    type: 'text',
    source: 'email',
    label: 'Email',
  },
  {
    type: 'text',
    source: 'tipologia',
    label: 'Tipologia',
  },
  {
    type: 'text',
    source: 'tel',
    label: 'Telefono',
  },
  {
    type: 'bool',
    source: 'interna',
    label: 'Interna',
  },
];

const param = {
  hideId: false,
  sourceList: fields,
  resource: 'risorse',
};

const list = listGridMaker(param);

const risorse = {
  list,
  edit: risorseEdit.Edit,
  create: risorseEdit.Create,
  icon: AccountBalanceIcon,
};

export default risorse;
