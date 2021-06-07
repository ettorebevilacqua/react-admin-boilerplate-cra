import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflow: 'hidden',
    height: '100%',
    flexDirection: 'column',
  },
  card: {
    margin: '12px',
    padding: '8px',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: '100vh',
  },

  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
}));
