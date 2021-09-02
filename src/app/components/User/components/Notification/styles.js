import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  notificationContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  notificationContained: {
    borderRadius: 4,
    minHeight: 45,
    boxShadow: theme.customShadows.widgetDark,
    borderWidth: '1px 1px 1px 4px',
    borderStyle: 'solid',
    padding: '4px 8px 4px 0px',
  },
  notificationContainedShadowless: {
    boxShadow: 'none',
  },
  notificationIconContainer: {
    minWidth: 45,
    height: 45,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIconContainerContained: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  notificationIconContainerRounded: {
    marginRight: theme.spacing(2),
  },
  containedTypography: {
    color: 'white',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    color: '#4A4A4A',
  },
  extraButton: {
    color: 'white',
    '&:hover, &:focus': {
      background: 'transparent',
    },
  },
}));
