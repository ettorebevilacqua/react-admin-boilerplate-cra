import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';

// styles
import useStyles from './styles';

// components
// import Header from '../Header';
// import Sidebar from '../Sidebar';

// pages

// context
import { useLayoutState } from '../../services/LayoutContext';

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      {/*
      props.header && (<Header toolbar={props.toolbar} history={props.history} />)

    /* }
      {
        /* props.sidebar && (<Sidebar />)
    
      */}
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        {props.children}
      </div>
    </div>
  );
}

export default withRouter(Layout);
