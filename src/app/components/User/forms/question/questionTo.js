import React from 'react';
import { useState } from 'react';

import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import FormikOnChange from '../lib/FormikOnChange';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import QuestionUsersFields from './form/questionUser';
import {
  empityParteipante,
  empityQuestion,
  schema,
} from 'app/data/schema/questionSchema';

import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

import TagsInput from './comp/tagInput';
import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';
import { CrudButton, ButtonnType } from '../component/crudButtons';

const MquestionTo = ({
  formProp: { id, data, saved, stateLoad, meta },
  queryValue,
  onSubmit,
  actions,
  ...props
}) => {
  const { modulo, questions } = data || {};

  function loadData() {
    const dataToValue = {
      ...((questions && questions.results && questions.results[0]) ||
        empityQuestion),
    };
    const dataValue = dataToValue || empityQuestion;
    const idmodulo =
      modulo && modulo.id ? modulo.id : dataValue?.idmodulo || '';
    return { ...dataValue, idmodulo };
  }

  const [value, setValue] = React.useState();
  const [numPartecipanti, setNumPartecipanti] = React.useState(
    value?.numPartecipanti,
  );
  const classes = elemStyle();

  const init = () => {
    // !value && setValue(dataValueState || empityQuestion);
  };

  const dataUpdate = () => data && setValue(loadData());

  React.useEffect(init, []);
  React.useEffect(dataUpdate, [data]);

  if (data && !modulo) {
    props.history.push('/app/user/indagini');
    return <span> </span>;
  }

  const addPartecipante = (propsFormik, arrayHelper, value) =>
    arrayHelper.push(empityParteipante);

  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
*/

  const onSubmitBefore = (values, actions) => {
    console.log(actions);
    onSubmit(values, actions);
  };

  const onChangeForm = propsFormik => (valuesNew, isFirstTime) => {
    if (isFirstTime) return;
    const numPart = valuesNew.numPartecipanti || 1;
    numPartecipanti !== numPart && setNumPartecipanti(numPart);
    // valuesNew.partecipanti.length !== numPart && onChangeNumPartecipanti(propsFormik, numPart);
  };

  return (
    <div className={classes.root}>
      <div className={classes.paperTitle}>
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={[9, 3]}
        >
          <div>
            <Typography variant="h3" color="textSecondary">
              Indagine : {modulo?.title}
            </Typography>
            <Typography variant="h4" color="error">
              {saved?.isError && saved?.errorMessage}
            </Typography>
          </div>
          <GridChilds
            justify="space-between"
            style={{ alignItems: 'center' }}
            view={[6, 6]}
          >
            <Button variant="contained" color="primary" onClick={e => 1}>
              <span style={{ fontSize: '11px' }}>Salva</span>
            </Button>
            <Button variant="contained" color="primary" onClick={e => 1}>
              <span style={{ fontSize: '11px' }}>Invia mail</span>
            </Button>
          </GridChilds>
        </GridChilds>
      </div>
      {!!value && (
        <Formik
          initialValues={value}
          onSubmit={onSubmitBefore}
          validationSchema={schema}
          children={propsFormik => (
            <Form
              success={!!propsFormik.status && !!propsFormik.status.success}
              error={!!propsFormik.errors.submit}
              onSubmit={propsFormik.handleSubmit}
            >
              <FormikOnChange
                delay={500}
                onChange={onChangeForm(propsFormik)}
              />

              {
                <QuestionUsersFields
                  propsFormik={propsFormik}
                  numPartecipanti={numPartecipanti}
                  parentValue={propsFormik.values}
                  addPartecipante={addPartecipante}
                />
              }
              <GridChilds
                view={[12]}
                spacing={3}
                style={{ marginTop: '16px', width: '100%' }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={!(propsFormik.dirty && propsFormik.isValid)}
                  type="submit"
                >
                  Salva e invia le email
                </Button>
                {propsFormik.errors.submit}
              </GridChilds>
            </Form>
          )}
        />
      )}
    </div>
  );
};

export const QuestionTo = MquestionTo;
