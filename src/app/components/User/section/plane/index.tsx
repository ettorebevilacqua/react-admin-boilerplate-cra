import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

// styles
import useStyles from './styles';

import MenuCard from '../../menuCard';
import CardInfo from '../../components/CardInfo';
import { Typography } from '@material-ui/core';
const planeButton = [
  { name: 'Gold ', link: '/catalogo/linee' },
  { name: 'Silver', link: '/users' },
  { name: 'Base' /*, link: '/app/crm'*/ },
  { name: 'Prova gratuita' /*, link: ''*/ },
];
// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Plane(props) {
  var classes = useStyles();
  const commonStyle = {
    background: 'rgb(173 182 235)',
    height: '120px',
    width: '75%',
    marginTop: '26px',
    marginLeft: '15%',
    paddind: '8px',
  };

  const data = [
    {
      title: 'Gold',
      text:
        'Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale',
    },
    {
      title: 'Silver',
      text: 'Paga pacchetto indagini',
    },
    {
      title: 'Base',
      text: 'Paga ogni singola indagine',
    },
    {
      title: 'Prava gratuita',
      text: 'Paga ogni singola indagine',
    },
  ];

  const renderBox = data => (
    <Card style={commonStyle}>
      <div style={{ width: '100%', padding: '8px' }}>
        <p style={{ fontSize: '18px', alignItems: 'center' }}>{data.title}</p>

        <p style={{ fontSize: '14px', alignItems: 'center' }}>{data.text}</p>
      </div>
    </Card>
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="baseline"
      >
        <Grid item xs={6}>
          <Card style={{ margin: '22px' }}>
            <h2 style={{ marginTop: '46px' }}>
              Sceglio il tuo profilo di servizio
            </h2>
          </Card>
        </Grid>
        <Grid item xs={6}>
          {renderBox(data[0])}
          {renderBox(data[1])}
          {renderBox(data[2])}
          {renderBox(data[3])}
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Plane);
