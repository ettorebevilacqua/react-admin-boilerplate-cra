import React from 'react';
import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Card';

import FormikOnChange from '../../lib/FormikOnChange';
import GridChilds from '../comp/gridChilds';
import { withSubForm } from '../../lib/formikSub';
import { ToFieldArray, withField } from '../../lib/formikWithField';

import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';

import { DomandaForm } from './domanda';
import { ShowQuestion } from './show';

const MODULO_DATA_KEY = 'smart_modulo';

const testValues = {
  modulo: '',
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

const empityValues = {
  modulo: '',
  domande: [
    {
      domanda: '',
      tipo: 4,
      risposte: [],
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
const storeValuesTxt = localStorage.getItem(MODULO_DATA_KEY);
const storeValues = storeValuesTxt && JSON.parse(storeValuesTxt);
const initialValues = storeValues || empityValues;

const nameSchema = Yup.object().shape({
  // name: Yup.string().required('Required'),
});

const handleSubmit = values => {
  console.log('form values ', values);
};

const getRisposte = domande =>
  domande.map(domanda => domanda.risposte.map(risp => null));

export const Domande = () => {
  const [values, setValues] = React.useState(initialValues);
  const [domande, setDomande] = React.useState([newDomanda]);
  const onChangeForm = (values, isFirstTime) => {
    setValues(values);
    localStorage.setItem(MODULO_DATA_KEY, JSON.stringify(values));
    console.log('main change', values);
  };

  const arrayManager = (arrayHelper, index) => (op, val) =>
    op === 'delete'
      ? arrayHelper.remove(index)
      : op === 'clone'
      ? arrayHelper.push(val)
      : () => 1;

  const onSubFormChange = (arrayHelper, index) => subValue => {
    arrayHelper.replace(index, subValue);
  };

  const renderNewDomanda = () => (
    <Button
      variant="contained"
      color="primary"
      style={{ height: '42px', width: '120px' }}
      onClick={e => setDomande([...domande, newDomanda])}
    >
      <span style={{ fontSize: '11px' }}>Nuova Domanda</span>
    </Button>
  );

  return (
    <div>
      <GridChilds view={[8, 4]} style={{ marginTop: '16px', width: '100%' }}>
        <h3>Questionario</h3>
      </GridChilds>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        render={props => (
          <Form>
            <FormikOnChange delay={500} onChange={onChangeForm} />

            <GridChilds
              view={[8, 1]}
              style={{ marginTop: '16px', width: '100%' }}
            >
              <Field
                name={'modulo'}
                style={{ width: '220px' }}
                component={TextField}
                label="Modulo nome"
              />
              {renderNewDomanda()}
            </GridChilds>

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
            <div
              style={{
                marginTop: '16px',
                marginLeft: '36px',
                marginRight: '36px',
              }}
            >
              <span> </span>
              {renderNewDomanda()}
            </div>
            <div>
              <h3>Anteprima</h3>
            </div>
            <ShowQuestion
              values={values}
              risposte={getRisposte(values.domande || [])}
            />
            {1 === 0 && (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            )}
          </Form>
        )}
      />
    </div>
  );
};
