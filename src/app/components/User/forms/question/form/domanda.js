import React from 'react';
import { useState } from 'react';

import { Form, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { withSubForm } from '../../lib/formikSub';
import { useValues } from '../../lib/useValues';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';
import FormikOnChange from '../../lib/FormikOnChange';

import CardContent from '@material-ui/core/CardContent';
import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

import GridChilds from '../comp/gridChilds';
import { ToFieldArray } from '../../lib/formikWithField';
import { RispostaForm } from './risposta';

// util Function for
const toNumberOr = (val, orVal) =>
  isNaN(parseInt(val + '')) ? orVal : parseInt(val + '');

const nameSchema = Yup.object().shape({
  // first: Yup.string().required('Required'),
  // last: Yup.string().required('Required'),
});

/*
add Field <Field name="bval" component={Bform} />
*/
const TipoQuestionName = {
  scala: 1,
  unica: 2,
  multipla: 3,
  veroFalso: 4,
  aperta: 5,
};

const TipoQuestion = [
  { id: 1, tipo: 'Scala', param: { ratingMin: 2, ratingDefault: 5 } },
  { id: 2, tipo: 'Opzione unica' },
  { id: 3, tipo: 'Opzione multipla' },
  { id: 4, tipo: 'vero/falso' },
  { id: 5, tipo: 'Aperta' },
];

const styles = ({ spacing }) =>
  createStyles({
    formControl: {
      margin: spacing(1),
      minWidth: 120,
    },
  });

const MDomandaForm = ({
  name,
  errors,
  touched,
  fieldProps,
  setFieldValue,
  ...props
}) => {
  // useValues(name, props);
  const { values, setFieldValue: setSubFieldValue } = useFormikContext();

  const onChangeForm = (newValues, isFirstTime) => {
    console.log('domanda onChangeForm ', values);

    fieldProps &&
      fieldProps.onSubFormChange &&
      fieldProps.onSubFormChange(newValues);

    fieldProps &&
      fieldProps.onCorrelataFormChange &&
      fieldProps.onCorrelataFormChange(newValues);
    // fieldProps.onSubFormChange(values);
  };

  const setOptionsTipoUnico = (replace, val, index) =>
    setFieldValue(
      name + '.risposte',
      values.risposte.map((ris, iRis) => {
        ris.val = iRis === index ? val : false;
        return ris;
      }),
    );

  const onClickOption = (replace, index) => (field, val) => {
    values.tipo === TipoQuestionName.unica
      ? setOptionsTipoUnico(replace, val, index)
      : replace(index, { ...values.risposte[index], val });
    setFieldValue(name + '._tmp', index);
  };

  const onSubFormChange = (replace, index) => subValue => {
    replace(index, subValue);
  };

  const arrayManager = (arrayHelper, index) => op => {
    return op === 'delete' ? arrayHelper.remove(index) : () => 1;
  };

  const onChangeRatingMax = e => {
    const value = e.target.value;
    const numValue = parseInt(value);
    const numValValid = numValue < 2 ? 2 : numValue;
    e.target.value = numValValid;
    setSubFieldValue(`ratingMax`, numValValid);
  };

  const onSetRating = e => {
    const value = e.target.value;
    const numValue = parseInt(value);
    setSubFieldValue(`rating`, numValue);
  };

  const renderScala = () => (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <GridChilds view={[12]}>
        {values.tipo === TipoQuestionName.scala && (
          <GridChilds view={[5, 5, 2]}>
            <Field
              component={TextField}
              fullWidth
              name="ratingStart"
              label="Descrizione Minimo"
            />
            <Field
              fullWidth
              component={TextField}
              name="ratingEnd"
              label="Descrizione Massimo"
            />
            <Field
              fullWidth
              component={TextField}
              name="ratingMax"
              type="number"
              label="N. Stelle"
              onChange={e => {
                onChangeRatingMax(e);
              }}
            />
          </GridChilds>
        )}
      </GridChilds>

      <Grid
        container
        spacing={3}
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '16px',
        }}
      >
        <Typography variant="subtitle2">{values.ratingStart || ''}</Typography>
        <span> </span>
        <Box style={{ marginLeft: '16px', marginRight: '16px' }}>
          <Rating
            name="rating"
            max={toNumberOr(values.ratingMax, 2)}
            value={toNumberOr(values.rating, 0)}
            onChange={(event, newValue) => {
              onSetRating(event);
            }}
          />
        </Box>
        <span> </span>
        <Typography variant="subtitle2">{values.ratingEnd || ''}</Typography>
      </Grid>
    </Box>
  );

  const renderAddRisposta = ({ arrayHelper }) =>
    values.tipo !== TipoQuestionName.aperta && (
      <Box
        style={{ width: '100%', margin: '16px' }}
        alignContent="flex-end"
        justifyContent="flex-end"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={e => arrayHelper.push({ risposta: '', val: false })}
        >
          <span style={{ fontSize: '11px' }}>Nuova Risposta</span>
        </Button>
      </Box>
    );

  return (
    <div>
      <FormikOnChange delay={500} onChange={onChangeForm} />
      <Card
        style={{
          marginTop: '18px',
          marginLeft: '8px',
          marginRight: '8px',
          padding: '8px',
          height: '100%',
        }}
      >
        <GridChilds view={[8, 4]} width="100%">
          <Field
            component={TextField}
            fullWidth
            name="domanda"
            label="Domanda"
          />
          <FormControl fullWidth>
            <InputLabel>Tipo Domanda</InputLabel>
            <Field name="tipo" component={Select}>
              {TipoQuestion.map(el => (
                <MenuItem key={el.id} value={el.id}>
                  {el.tipo}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
        </GridChilds>
        {values.tipo === 1 && renderScala()}
      </Card>

      {values.tipo !== TipoQuestionName.scalable && (
        <>
          {values.risposte && (
            <ToFieldArray
              name={'risposte'}
              renderMaxElem={values.tipo === TipoQuestionName.aperta ? 1 : 0}
              values={values.risposte}
              fieldProps={({ index, arrayHelper }) => {
                return {
                  onChange: onClickOption(arrayHelper.replace, index),
                  onSubFormChange: onSubFormChange(arrayHelper.replace, index),
                  arrayManager: arrayManager(arrayHelper, index),
                  tipo: values.tipo,
                };
              }}
              renderFooter={renderAddRisposta}
              component={RispostaForm}
            />
          )}
        </>
      )}
    </div>
  );
};

export const DomandaForm = withSubForm(MDomandaForm, nameSchema);
