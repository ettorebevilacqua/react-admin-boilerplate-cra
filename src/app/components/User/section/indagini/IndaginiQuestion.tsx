import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';

import { ShowQuestion } from 'app/components/User/forms/question/form/show';
// styles
import useStyles from './styles';

import { Helmet } from 'react-helmet-async';

import {
  // getIndaginiAperte,
  getModulo,
  makeRisposte,
  saveRisposte,
} from 'app/services/question/moduliModel';

/* const commonStyle = {
  background: 'rgb(173 182 235)',
  height: '120px',
  width: '75%',
  marginTop: '26px',
  marginLeft: '15%',
  paddind: '8px',
}; */

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function IndaginiQuestion() {
  const { id } = useParams() as any;
  const [values] = React.useState(getModulo(id));
  const classes = useStyles();

  useEffect(() => {}, []);
  const onSendRisposte = () => saveRisposte(id, values);
  return (
    <>
      <Helmet>
        <title>Indagini</title>
        <meta name="description" content="Indagini" />
      </Helmet>
      <div className={classes.root}>
        <ShowQuestion
          values={values}
          onSend={onSendRisposte}
          risposte={makeRisposte(values || [])}
        />
      </div>
    </>
  );
}

export default withRouter(IndaginiQuestion);
