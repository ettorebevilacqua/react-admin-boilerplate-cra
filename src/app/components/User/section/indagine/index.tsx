import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

// styles
import useStyles from './styles';

import MenuCard from '../../menuCard';

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Indagine(props) {
  var classes = useStyles();
  const commonStyle = {
    background: 'rgb(173 182 235)',
    height: '120px',
    width: '75%',
    marginTop: '26px',
    marginLeft: '15%',
    paddind: '8px',
  };

  return (
    <div className={classes.root}>
      <h3>Indagine</h3>
    </div>
  );
}

export default Indagine;
