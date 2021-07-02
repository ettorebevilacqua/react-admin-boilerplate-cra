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
      risposte: [{}],
    },
  ],
};

const newDomanda = {
  domanda: '',
  tipo: 2,
  risposte: [{}],
};
const storeValuesTxt = localStorage.getItem(MODULO_DATA_KEY);
const storeValues = storeValuesTxt ? JSON.parse(storeValuesTxt) : empityValues;
const initialValues =
  !storeValues.domande || !storeValues.domande[0] ? empityValues : storeValues;

const nameSchema = Yup.object().shape({
  // name: Yup.string().required('Required'),
});

const handleSubmit = values => {
  console.log('form values ', values);
};

const getRisposte = domande =>
  !domande || !domande.map
    ? []
    : domande.map(domanda =>
        (!domanda.risposte || domanda.risposte.length === 0
          ? [null]
          : domanda.risposte
        ).map(risp => null),
      );

export const Domande = () => {
  const [values, setValues] = React.useState(initialValues);
  const [domande, setDomande] = React.useState([newDomanda]);
  const [arManagerDomande, setArManagerDomande] = React.useState();

  const onChangeForm = (values, isFirstTime) => {
    setValues(values);
    localStorage.setItem(MODULO_DATA_KEY, JSON.stringify(values));
    console.log('main change', values);
  };

  const onDeleteDomanda = (arrayHelper, index) => {
    debugger;
    return values.domande && values.domande[1]
      ? arrayHelper.remove(index)
      : !values.domande[0]
      ? arrayHelper.push(newDomanda)
      : arrayHelper.replace(0, newDomanda);
  };

  const arrayManager = (arrayHelper, index) => (op, val) => {
    return op === 'delete'
      ? onDeleteDomanda(arrayHelper, index)
      : op === 'clone'
      ? arrayHelper.push(val)
      : op === 'add'
      ? arrayHelper.push(newDomanda)
      : () => 1;
  };

  const onSubFormChange = (arrayHelper, index) => subValue => {
    arrayHelper.replace(index, subValue);
  };

  const renderNewDomanda = formikProps => (
    <Button
      variant="contained"
      color="primary"
      style={{ height: '42px', width: '120px' }}
      onClick={e => {
        debugger;
        const lenDomande = values.domande.length;
        console.log('', formikProps);
        formikProps.setFieldValue('domande.' + lenDomande, newDomanda);
      }}
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
        children={propsFormik => (
          <Form>
            <FormikOnChange delay={500} onChange={onChangeForm} />

            <GridChilds
              view={[8, 1, 1]}
              style={{ marginTop: '16px', width: '100%' }}
            >
              <Field
                name={'modulo'}
                style={{ width: '100%' }}
                component={TextField}
                label="Modulo nome"
              />
              <span> </span>
              {renderNewDomanda(propsFormik)}
            </GridChilds>
            <div style={{ marginTop: '22px' }}>
              <ToFieldArray
                name="domande"
                component={DomandaForm}
                fieldProps={({ index, arrayHelper }) => {
                  if (values.domande && !values.domande[0]) {
                    arrayHelper.push(newDomanda);
                  }

                  return {
                    onSubFormChange: onSubFormChange(arrayHelper, index),
                    arrayManager: arrayManager(arrayHelper, index),
                    tipo: values.tipo,
                  };
                }}
              />
            </div>
            <div
              style={{
                marginTop: '16px',
                marginLeft: '36px',
                marginRight: '36px',
              }}
            >
              <span> </span>
              {renderNewDomanda(propsFormik)}
            </div>
            <div>
              <h3>Anteprima</h3>
            </div>
            <ShowQuestion
              key="mainShoeQuestion1"
              values={values}
              risposte={getRisposte(values.domande || [])}
            />
            {1 === 1 && (
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
