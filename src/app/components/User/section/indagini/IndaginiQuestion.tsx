import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { ShowQuestion } from 'app/components/User/forms/question/form/show';
// styles
import useStyles from './styles';

import MenuCard from '../../menuCard';
import { Helmet } from 'react-helmet-async';

import {
  getIndaginiAperte,
  getModulo,
  getRisposte,
} from 'app/services/question/moduliModel';

const commonStyle = {
  background: 'rgb(173 182 235)',
  height: '120px',
  width: '75%',
  marginTop: '26px',
  marginLeft: '15%',
  paddind: '8px',
};

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function IndaginiQuestion(props) {
  const { id } = useParams() as any;
  const [values] = React.useState(getModulo(id));
  const classes = useStyles();
  const [indagini, setIndagini] = useState(getIndaginiAperte());
  const paramsQuery = queryString.parse(props.location.search);
  debugger;
  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>Indagini</title>
        <meta name="description" content="Indagini" />
      </Helmet>
      <div className={classes.root}>
        <ShowQuestion values={values} risposte={getRisposte(values || [])} />
      </div>
    </>
  );
}

export default withRouter(IndaginiQuestion);
