import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    width: '90%',
    display: 'table',
    margin: '0 auto',
    height: '100%',
    // border: '1px solid black',
  },
  dialogPaper: {
    height: '80%',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
}));
