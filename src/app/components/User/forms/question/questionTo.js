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
  const renderButtonActionRecord = propsFormik => (
    <GridChilds style={{ textAlign: 'end' }} view={[6, 6]}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        disabled={!(propsFormik.dirty && propsFormik.isValid)}
        type="submit"
      >
        <span className={classes.buttonAction}>Salva</span>
      </Button>
      <Button variant="contained" color="primary" onClick={e => 1}>
        <span className={classes.buttonAction}>Invia mail</span>
      </Button>
    </GridChilds>
  );

  const renderTitle = propsFormik => (
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
        {renderButtonActionRecord(propsFormik)}
      </GridChilds>
    </div>
  );

  return (
    <div className={classes.root}>
      {!!value && (
        <Formik
          initialValues={value}
          onSubmit={onSubmitBefore}
          validationSchema={schema}
          children={propsFormik => (
            <>
              {renderTitle(propsFormik)}
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
                  />
                }
                <GridChilds
                  view={[9, 3]}
                  justify="space-between"
                  spacing={3}
                  style={{ marginTop: '16px', width: '100%' }}
                >
                  <div>{propsFormik.errors.submit} </div>
                  {renderButtonActionRecord(propsFormik)}
                </GridChilds>
              </Form>
            </>
          )}
        />
      )}
    </div>
  );
};

export const QuestionTo = MquestionTo;
