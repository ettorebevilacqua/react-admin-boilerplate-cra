import React from 'react';
import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import FormikOnChange from '../../lib/FormikOnChange';
import { DomandaForm } from './domanda';
import GridChilds from '../comp/gridChilds';
import { withSubForm } from '../../lib/formikSub';
import { ToFieldArray, withField } from '../../lib/formikWithField';

import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';
import { values } from 'lodash';

const initialValues = {
  modulo: '',
  test: 'test ff',
  domande: [
    {
      domanda: '',
      tipo: 4,
      risposte: [
        {
          risposta: 'ddd ss',
          val: true,
        },
        { risposta: 'yyy22', val: false },
      ],
    },
  ],
};

const newDomanda = {
  domanda: {
    domanda: 'dd',
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
  };

  const arrayManager = (arrayHelper, index) => op => {
    return op === 'delete' ? arrayHelper.remove(index) : () => 1;
  };

  const onSubFormChange = (arrayHelper, index) => subValue => {
    arrayHelper.replace(index, subValue);
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

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        render={props => (
          <Form>
            <FormikOnChange delay={500} onChange={onChangeForm} />
            <Field name={'modulo'} component={TextField} label="Modulo" />
            <ToFieldArray
              name="domande"
              component={DomandaForm}
              fieldProps={({ index, arrayHelper }) => {
                return {
                  onSubFormChange: onSubFormChange(arrayHelper, index),
                  arrayManager: arrayManager(arrayHelper, index),
                  tipo: values.tipo,
                };
              }}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Form>
        )}
      />
    </div>
  );
};
