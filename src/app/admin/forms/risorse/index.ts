import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import CorsiList from './CorsiList';
import risorseEdit from './CorsiEdit';

const risorse = {
  list: CorsiList,
  edit: risorseEdit.Edit,
  create: risorseEdit.Create,
  icon: AccountBalanceIcon,
};

export default risorse;
