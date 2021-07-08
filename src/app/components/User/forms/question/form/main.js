import React from 'react';
import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Card';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormikOnChange from '../../lib/FormikOnChange';
import GridChilds from '../comp/gridChilds';
import TagsInput from '../comp/tagInput';
import { withSubForm } from '../../lib/formikSub';
import { ToFieldArray, withField } from '../../lib/formikWithField';

import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';

import { DomandaForm } from './domanda';
import { ShowQuestion } from './show';
import { Moduli } from './moduli';

import { newDomanda } from 'app/services/question/moduliModel';

export const Domande = ({ initialValues, onSaveData, command, ...props }) => {
  const [values, setValues] = React.useState(initialValues);
  const [arManagerDomande, setArManagerDomande] = React.useState();
  const [currentIdxModule, setCurrentIdxModule] = React.useState(0);
  const [dataModuli, setDataModuli] = React.useState(initialValues);
  const [timeOutAutoSave, setTimeOutAutoSave] = React.useState(null);
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const handleSubmit = vals => {
    console.log('form values ', vals);
  };

  const onChangeForm = (valuesNew, isFirstTime) => {
    // if (isFirstTime) return setIsFirstTime(false);

    setValues(valuesNew);
    clearTimeout(timeOutAutoSave);
    const timeSave = !timeOutAutoSave
      ? setTimeout(() => {
          clearTimeout(timeOutAutoSave);
          setTimeOutAutoSave(null);
          onSaveData(valuesNew);
          console.log('main change', values);
        }, 5000)
      : null;
    timeSave && setTimeOutAutoSave(timeSave);
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleSelecetedTags = () => {};

  return (
    <Formik
      initialValues={values}
      enableReinitialize
      onSubmit={handleSubmit}
      children={propsFormik => (
        <Form>
          <FormikOnChange delay={500} onChange={onChangeForm} />

          <GridChilds
            view={[8, 4]}
            spacing={3}
            style={{ marginTop: '16px', width: '100%' }}
          >
            <Field
              name={'title'}
              style={{ width: '100%' }}
              component={TextField}
              label="Modulo nome"
            />
            <TagsInput
              selectedTags={handleSelecetedTags}
              fullWidth
              variant="outlined"
              id="tags"
              name="tags"
              placeholder="add Tags"
              label="tags"
            />

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
          {1 === 0 && (
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          )}
          <Divider style={{ marginTop: '22px' }} />
        </Form>
      )}
    />
  );
};
