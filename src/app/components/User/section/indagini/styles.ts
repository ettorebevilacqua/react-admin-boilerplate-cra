import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    marginTop: '33px',
    maxWidth: '80%',
    overflow: 'hidden',
    height: '100%',
    margin: 'auto'
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
}));
