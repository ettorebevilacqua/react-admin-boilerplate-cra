import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import List from './list';
import flists from './edit';

const lists = props => {
  const Edit = flists(props);
  return {
    list: List,
    edit: Edit.Edit,
    create: Edit.Create,
    icon: AccountBalanceIcon,
  };
};

export default lists;
