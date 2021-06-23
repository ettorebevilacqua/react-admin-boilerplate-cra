import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';

import { RispostaForm } from './risposta';

const initialValues = {
  name: {
    first: 'Rajesh',
    last: 'Naroth',
    bval: { bfirst: 'sub', blast: ' sub lasr' },
  },
  risposta: { risposta: 'ddd', last: 'last sub' },
};

const nameSchema = Yup.object().shape({
  // name: Yup.string().required('Required'),
});

const handleSubmit = values => {
  console.log('form values ', values);
};

const NameForm = ({ handleSubmit, ...props }) => {
  return (
    <Form>
      <Field name="risposta" component={RispostaForm} />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </Form>
  );
};

export const Domande = () => (
  <div>
    <h3>Sub Forms</h3>
    <Formik
      initialValues={initialValues}
      validationSchema={nameSchema}
      onSubmit={handleSubmit}
      children={NameForm}
    />
  </div>
);
