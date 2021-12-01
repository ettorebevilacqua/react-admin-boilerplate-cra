import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    width: '90%',
    display: 'block',
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
  domandaTxt: {
    fontSize: '16px',
    fontWeight: '500',
  },
  paperBox: {
    marginTop: '22px',
    marginLeft: '8px',
    marginRight: '8px',
    padding: '8px',
    width: '95%',
  },
  paperRow: {
    marginTop: '12px',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  paperRowElem: {
    padding: '2px',
    fontSize: '16px',
  },
  fieldTitle: {
    padding: '2px',
    fontSize: '16px',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main + 'dd',
    fontWeight: 'bold',
    color: 'white',
  },
  texth4: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  texth5: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '14px',
  },
  colorRed: {
    color: 'red',
  },
  width95: {
    width: '95%',
    marginLeft: '5%',
  },
  buttonAction: {
    fontSize: '14px',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  column: {
    fontSize: '14px',
  },
}));
