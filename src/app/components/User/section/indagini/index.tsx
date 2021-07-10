import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import IndaginiList from 'app/components/User/forms/question/form/indaginList';
// styles
import useStyles from './styles';

import MenuCard from '../../menuCard';
import { Helmet } from 'react-helmet-async';

import { getIndaginiAperte } from 'app/services/question/moduliModel';

const commonStyle = {
  background: 'rgb(173 182 235)',
  height: '120px',
  width: '75%',
  marginTop: '26px',
  marginLeft: '15%',
  paddind: '8px',
};

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Indagini(props) {
  const classes = useStyles();
  const [indagini, setIndagini] = useState(getIndaginiAperte());
  const paramsQuery = queryString.parse(props.location.search);

  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>Indagini</title>
        <meta name="description" content="Indagini" />
      </Helmet>
      <div className={classes.root}>
        <IndaginiList values={indagini} />
      </div>
    </>
  );
}

export default withRouter(Indagini);
