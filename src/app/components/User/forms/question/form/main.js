import React from 'react';
import { Formik, Form, Field } from 'formik';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import FormikOnChange from '../../lib/FormikOnChange';
import GridChilds from '../../component/gridChilds';
import TagsInput from '../comp/tagInput';
import { ToFieldArray } from '../../lib/formikWithField';

import { TextField } from 'formik-material-ui';

import { DomandaForm } from './domanda';

import { newDomanda } from 'app/services/question/moduliModel';
import { AdjustingInterval } from 'app/services/helper';

const ticker = new AdjustingInterval(null, 6000);

const toNumberOr = (val, orVal) =>
  isNaN(parseInt(val + '')) ? orVal : parseInt(val + '');

export const Domande = ({ initialValues, onSaveData }) => {
  const [values, setValues] = React.useState(initialValues);
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const onSave = () => {
    if (isFirstTime) return false;
    onSaveData(values);
    console.log('main change', values);
    ticker.stop();
  };

  ticker.workFunc = onSave;

  const handleSubmit = vals => {
    console.log('form values ', vals);
  };

  const onChangeForm = (valuesNew, isFirstTime) => {
    // if (isFirstRender) return setIsFirstRender(false);

    setValues(valuesNew);
    ticker.stop();
    !isFirstTime && ticker.start();
    setIsFirstTime(false);

    /* clearTimeout(timeOutAutoSave);
    const timeSave = !timeOutAutoSave
      ? setTimeout(() => {
          clearTimeout(timeOutAutoSave);
          setTimeOutAutoSave(null);
          onSaveData(valuesNew);
          console.log('main change', values);
        }, 5000)
      : null;
    timeSave && setTimeOutAutoSave(timeSave);
    */
  };

  const onDeleteDomanda = (arrayHelper, index) => {
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
      onClick={() => {
        const lenDomande = values.domande.length;
        console.log('', formikProps);
        formikProps.setFieldValue('domande.' + lenDomande, newDomanda);
      }}
    >
      <span style={{ fontSize: '11px' }}>Nuova Domanda</span>
    </Button>
  );

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
                  tipo: toNumberOr(values && values.tipo, 0),
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
