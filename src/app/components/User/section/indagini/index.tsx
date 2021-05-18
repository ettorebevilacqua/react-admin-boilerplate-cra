import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

// styles
import useStyles from './styles';

import MenuCard from '../../menuCard';
import { Helmet } from 'react-helmet-async';

const data = [
  {
    name: 'Apri una nuova indagine',
    link: '/app/user/indagine',
  },
  {
    name: "Visualizza l'elenco delle indagini aperte",
    link: '/app//user/lindagini',
  },
  {
    name: 'Genera repost annuale',
    link: '/app/user/repoAnno',
  },
];

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Indagini(props) {
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
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className={classes.root}>
        <MenuCard items={data} />
      </div>
    </>
  );
}

export default withRouter(Indagini);
