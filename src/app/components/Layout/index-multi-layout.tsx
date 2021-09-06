import React from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { isSidebarOpenedSelector } from 'app/slice/layoutSlice';

// styles
import useStyles from './styles';

// components
// import Header from '../Header';
// import Sidebar from '../Sidebar';

function Layout(props) {
  const classes = useStyles();
  const isSidebarOpened = useSelector(isSidebarOpenedSelector);

  return (
    <div className={classes.root}>
      <>
        {/* props.header && (<Header toolbar={props.toolbar} history={props.history} />) */}
        {/* props.sidebar && (<Sidebar />) */}
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />

          {props.children}
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
