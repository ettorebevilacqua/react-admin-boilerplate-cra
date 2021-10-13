import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { schema } from 'app/data/schema/corsiSchema';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';

const renderField = (props = {}, name, component, label, type, width) => {
  return (
    <div>
      <Field
        {...props}
        name={name}
        style={{ width: width || '100%' }}
        type={type || 'text'}
        component={component}
        label={label}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

export const CorsiForm = ({ value, onSubmit, onExit, saved }) => {
  const classes = elemStyle();
  const onSubmitBefore = (valFormik, actions) => {
    actions.setSubmitting(false);
    onSubmit && onSubmit(valFormik);
  };

  const renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[9, 3]}>
        <div>
          <Typography variant="h4" color="error">
            {saved?.isError && saved?.errorMessage}
          </Typography>
        </div>
      </GridChilds>
    </div>
  );

  return (
    <div className={classes.root}>
      <h2>Corsi </h2>
      {!!value && (
        <Formik
          initialValues={value}
          enableReinitialize
          onSubmit={onSubmitBefore}
          validationSchema={schema}
          validateOnMount={true}
          children={propsFormik => (
            <>
              {renderTitle(propsFormik)}
              <Form onReset={propsFormik.handleReset} onSubmit={propsFormik.handleSubmit}>
                <GridChilds justify="space-between" view={[6, 6]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `titolo`, TextField, 'Titolo')}
                </GridChilds>
                <GridChilds justify="space-between" view={[7, 5]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `dataInizio`, TextField, 'Data Inizio')}
                  {renderField({}, `sede`, TextField, 'Sede')}
                </GridChilds>
                <GridChilds justify="space-between" view={[4, 4, 4]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `ambito`, TextField, 'Ambito')}
                  {renderField({}, `durata`, TextField, 'Durata')}
                </GridChilds>
                <GridChilds justify="space-between" view={[2, 4, 6]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `coordinatore`, TextField, 'Coordinatore')}
                  {renderField({}, `tutor`, TextField, 'Tutor')}
                  <span> </span>
                </GridChilds>
                <GridChilds justify="space-between" view={[6, 6]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `finanziatore`, TextField, 'Finanziatore')}
                  <span> </span>
                </GridChilds>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  style={{ width: '68%' }}
                  disabled={!propsFormik.dirty || !propsFormik.isValid}
                  type="submit"
                >
                  <span className={classes.buttonAction}>Salva</span>
                </Button>{' '}
                <Button color="primary" variant="contained" style={{ width: '27%' }} onClick={() => onExit()}>
                  <span className={classes.buttonAction}>Annulla</span>
                </Button>
              </Form>
            </>
          )}
        />
      )}
    </div>
  );
};
