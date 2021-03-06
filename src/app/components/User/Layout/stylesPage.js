// DEBUG: user/forms stylesElements
import { makeStyles } from '@material-ui/core/styles';

export const elemStyle = makeStyles(theme => ({
  root: {
    width: '90%',
    display: 'table',
    margin: '0 auto',
    // border: '1px solid black',
  },
  center: {
    display: 'table',
    margin: '0 auto',
    border: '1px solid black',
  },
  cardFlex: {
    minHeight: 52,
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  cardDomanda: {
    padding: '4px',
    paddingLeft: '8px',
    alignItems: 'center',
    display: 'flex',
  },
  boxDomanda: {
    background: 'white',
    padding: '8px',
    backGround: 'white',
    borderRadius: '6px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  paperTitle: {
    marginTop: '26px',
    marginBottom: '12px',
    padding: '8px',
  },
  main: () => ({
    overflow: 'inherit',
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .icon': {
      color: theme.palette.type === 'dark' ? 'inherit' : '#dc2440',
    },
  }),
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
