import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, Fab, Button } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import AccountIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';

import { withRouter, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import Notification from '../components/Notification';

// components
import { Badge } from '../components/Wrappers';
import React, { useState } from 'react';
// context
import { useSelector } from 'react-redux';
import { logOut, userSelector } from 'app/slice/userSlice';
// styles
import useStyles from './styles';
import UserAvatar from '../components/UserAvatar';
import { menuListSelector, isSidebarOpenedSelector, setIsSidebarOpened } from 'app/slice/layoutSlice';

const messages = [
  {
    id: 0,
    variant: 'warning',
    name: 'Jane Hew',
    message: 'Hey! How is it going?',
    time: '9:32',
  },
  {
    id: 1,
    variant: 'success',
    name: 'Lloyd Brown',
    message: 'Check out my new Dashboard',
    time: '9:18',
  },
  {
    id: 2,
    variant: 'primary',
    name: 'Mark Winstein',
    message: 'I want rearrange the appointment',
    time: '9:15',
  },
  {
    id: 3,
    variant: 'secondary',
    name: 'Liana Dutti',
    message: 'Good news from sale department',
    time: '9:09',
  },
];

const notifications = [
  { id: 0, color: 'warning', message: 'Check out this awesome ticket' },
  {
    id: 1,
    color: 'success',
    type: 'info',
    message: 'What is the best way to get ...',
  },
  {
    id: 2,
    color: 'secondary',
    type: 'notification',
    message: 'This is just a simple notification',
  },
  {
    id: 3,
    color: 'primary',
    type: 'e-commerce',
    message: '12 new orders has arrived today',
  },
];

function Header(props) {
  var classes = useStyles();

  // global
  const { username, email } = useSelector(userSelector);
  const menuListState = useSelector(menuListSelector);
  const isSidebarOpened = useSelector(isSidebarOpenedSelector);

  debugger;
  // local
  var [mailMenu, setMailMenu] = useState<any>(null);
  var [isMailsUnread, setIsMailsUnread] = useState<boolean>(true);
  var [notificationsMenu, setNotificationsMenu] = useState<any>(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState<boolean>(true);
  var [profileMenu, setProfileMenu] = useState<any>(null);

  /*  if(window.history.length > 1 &&
    document.referrer.indexOf(window.location.host) !== -1) { */

  const goBack = browserHistory =>
    window.history.length > 1 && document.referrer.indexOf(window.location.host) === -1
      ? browserHistory.push('/')
      : browserHistory.goBack();

  const isMenu = false;

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => goBack(props.history)}
          className={classNames(classes.headerMenuButton, classes.headerMenuButtonCollapse)}
        >
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>

        <Button color="primary" variant="contained" onClick={() => props.history.push('/')}>
          <span style={{}}>Home</span>
        </Button>

        {isMenu && (
          <IconButton
            color="inherit"
            onClick={() => setIsSidebarOpened()}
            className={classNames(classes.headerMenuButton, classes.headerMenuButtonCollapse)}
          >
            {isSidebarOpened ? (
              <ArrowBackIcon
                classes={{
                  root: classNames(classes.headerIcon, classes.headerIconCollapse),
                }}
              />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(classes.headerIcon, classes.headerIconCollapse),
                }}
              />
            )}
          </IconButton>
        )}
        <Typography className={classes.logotype}>Smart</Typography>
        <div className={classes.grow} />
        {props.toolbar}
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge badgeContent={isNotificationsUnread ? notifications.length : null} color="warning">
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge badgeContent={isMailsUnread ? messages.length : null} color="secondary">
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography>New Messages</Typography>
            <Typography className={classes.profileMenuLink} component="a" color="secondary">
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map(message => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography>{message.time}</Typography>
              </div>
              <div className={classNames(classes.messageNotificationSide, classes.messageNotificationBodySide)}>
                <Typography gutterBottom>{message.name}</Typography>
                <Typography>{message.message}</Typography>
              </div>
            </MenuItem>
          ))}
          <Fab variant="extended" color="primary" aria-label="Add" className={classes.sendMessageButton}>
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map((notification: any) => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography>{username || email}</Typography>
            <Typography className={classes.profileMenuLink} component="a" color="primary" href="https://flatlogic.com">
              {}
            </Typography>
          </div>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography className={classes.profileMenuLink} color="primary" onClick={() => logOut()}>
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
      <br />
      <Toolbar className={classes.toolbar}>
        {menuListState &&
          menuListState.map((item, idx) => (
            <Box key={idx}>
              <NavLink to={item.link} activeClassName={classes.activeLink}>
                <Button style={{ width: '160px', backgroundColor: 'inherit' }} color="primary" variant="contained">
                  {item.label}
                </Button>{' '}
              </NavLink>
            </Box>
          ))}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
