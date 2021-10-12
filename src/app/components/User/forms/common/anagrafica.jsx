import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { schema } from 'app/data/schema/anagrafica';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';

const renderField = (props = {}, name, component, label, type) => {
  return (
    <div>
      <Field
        {...props}
        name={name}
        style={{ width: '100%' }}
        type={type || 'text'}
        component={component}
        label={label}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

export const AnagraficaForm = ({ value, onSubmit, onExit, saved }) => {
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
                  {renderField({}, `nome`, TextField, 'Nome')}
                  {renderField({}, `cognome`, TextField, 'Cognome')}
                </GridChilds>
                <GridChilds justify="space-between" view={[7, 5]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `indirizzo`, TextField, 'Indirizzo')}
                  {renderField({}, `ambito`, TextField, 'Ambito')}
                </GridChilds>
                <GridChilds justify="space-between" view={[2, 2, 4, 4]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `cap`, TextField, 'Cap')}
                  {renderField({}, `prov`, TextField, 'Prov')}
                  {renderField({}, `city`, TextField, 'Città')}
                  {renderField({}, `country`, TextField, 'Nazione')}
                </GridChilds>
                <GridChilds justify="space-between" view={[2, 4, 6]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `dateBorn`, TextField, 'Data Nascita')}
                  {renderField({}, `cf`, TextField, 'Cod. Fisc')}
                  <span> </span>
                </GridChilds>
                <GridChilds justify="space-between" view={[8, 4]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `email`, TextField, 'Email')}
                  {renderField({}, `phone`, TextField, 'Phone')}
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
