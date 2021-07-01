import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import { Domande } from './comp/question';

import { Domande } from './form/main';

const domandeInit = [];

export const FormikTest = props => {
  const [domande, setDomande] = React.useState(domandeInit);

  const onDomanda = (index, value) => {
    if (!domande[index]) return false;
    domande[index] = value;
    setDomande(domande);

    console.log('onDomanda');
  };

  const addDomanda = e => setDomande([...domande, {}]);

  return (
    <div>
      <Domande onSubmit={onDomanda} />
    </div>
  );
};
