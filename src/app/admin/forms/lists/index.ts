import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import listGridMaker from './list';
import flists from './edit';

const lists = (props, gridListFields) => {
  const Edit = flists(props);
  return {
    list: listGridMaker(gridListFields),
    edit: Edit.Edit,
    create: Edit.Create,
    icon: AccountBalanceIcon,
  };
};

export default lists;
