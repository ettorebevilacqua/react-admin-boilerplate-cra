import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    marginTop: '33px',
    maxWidth: '100vw',
    overflow: 'hidden',
    height: '100%',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
}));
