import React from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import FormikOnChange from '../../lib/FormikOnChange';
import { DomandaForm } from './domanda';
import GridChilds from '../comp/gridChilds';

const initialValues = {
  domanda: {
    domanda: 'domada 1 ',
    tipo: 4,
    risposte: [
      {
        risposta: 'ddd ss',
        val: true,
      },
      { risposta: 'yyy22', val: false },
    ],
  },
};

const newDomanda = {
  domanda: {
    domanda: '',
    tipo: 1,
    risposte: [],
  },
};

const nameSchema = Yup.object().shape({
  // name: Yup.string().required('Required'),
});

const handleSubmit = values => {
  console.log('form values ', values);
};

export const Domande = () => {
  const [domande, setDomande] = React.useState([newDomanda]);
  const onChangeForm = (values, isFirstTime) => {
    console.log('main change', isFirstTime, values);
    // setTipo('Opzione unica');
    // console.log('values risposta sssss', isFirstTime, values);
  };

  const NameForm = ({ handleSubmit, setFieldValue, ...props }) => {
    const onSubFormChange = val => {
      console.log('values kk', val);
      setFieldValue('domanda', val);
    };

    return (
      <Form>
        <FormikOnChange delay={500} onChange={onChangeForm} />
        <Field
          name="domanda"
          component={DomandaForm}
          fieldProps={{
            onSubFormChange: onSubFormChange,
          }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Form>
    );
  };

  return (
    <div>
      <GridChilds view={[8, 4]} style={{ marginTop: '16px', width: '100%' }}>
        <h3>Questionario</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={e => setDomande([...domande, newDomanda])}
        >
          <span style={{ fontSize: '11px' }}>Nuova Domanda</span>
        </Button>
      </GridChilds>
      {domande.map(domanda => (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
          children={NameForm}
        />
      ))}
    </div>
  );
};
