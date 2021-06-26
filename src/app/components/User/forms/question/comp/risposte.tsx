import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {
  Box,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Checkbox,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { ToFieldArray, withField } from '../../lib/formikWithField';

import GridChilds from './gridChilds';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const Risposte = props => {
  const { values, id, tipo } = props;

  const tipoQ = tipo || '';
  const valuesQ = values || [];

  const formik = useFormik({
    initialValues: values || {},
    //  validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {values.map((item, idx) => (
          <GridChilds view={[8, 4]}>
            <TextField
              fullWidth
              id={'Risposta' + idx}
              name="Risposta"
              label="Risposta"
              value={item.risposta}
              onChange={formik.handleChange}
            />
            {tipoQ.trim() === 'Opzione unica' ? (
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value={item.val}
                  control={<Radio checked={item.val} />}
                  label="The best!"
                />
              </RadioGroup>
            ) : tipoQ.trim() === 'Opzione multipla' ? (
              <FormControlLabel
                value={item.val}
                control={<Checkbox checked={item.val} color="primary" />}
                label="End"
                labelPlacement="end"
              />
            ) : (
              <span>xx</span>
            )}
          </GridChilds>
        ))}
        <Button color="primary" variant="contained" fullWidth type="submit">
          add
        </Button>
      </form>
    </div>
  );
};

export default Risposte;
