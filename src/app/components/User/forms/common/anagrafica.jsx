import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { TextField } from 'formik-material-ui';
import MuiTextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';

import { schema } from 'app/data/schema/anagrafica';
import AmbitiDialg from './ambitiModal';

const getIsAmbito = val =>
  ['docente', 'esperto di competenze'].indexOf(val && val.toLowerCase ? val.toLowerCase() : '') > -1;

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

const fieldCustom = (propsFormik, props = {}, name, label, type) => (
  <Field name={name}>
    {({ field, form, meta }) => (
      <div style={{ width: '100%' }}>
        <MuiTextField
          type={type || 'text'}
          fullWidth
          {...props}
          {...field}
          label={label}
          InputProps={{
            style: { fontSize: '14px', width: '100%' },
          }}
        />
        {meta.error && <div style={{ color: 'red', fontSize: '1' }}>{meta.error}</div>}
      </div>
    )}
  </Field>
);

export const AnagraficaForm = ({ value, personaleTipo, onSubmit, onExit, saved }) => {
  const classes = elemStyle();
  const [editValue, setEditValue] = useState(value);
  const [isAmbito, setIsAmbito] = useState(false);
  const [isDialogAmbiti, setIsDialogAmbiti] = React.useState(false);

  React.useEffect(() => {
    value && value.tipologia && setIsAmbito(getIsAmbito(value?.tipologia));
  }, [value]);

  const onSubmitBefore = (valFormik, actions) => {
    actions.setSubmitting(false);
    onSubmit && onSubmit(valFormik);
  };

  const onSelectAmbiti = propsFormik => ambiti => {
    propsFormik.setFieldValue('ambito', ambiti);
  };

  const tipologiaOnChange = formikProps => (e, value) => {
    if (!value && value !== '') return false;
    setIsAmbito(getIsAmbito(value));
    formikProps.setFieldValue('tipologia', value);
  };

  const closeAmbito = () => setIsDialogAmbiti(false);

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
      {!!editValue && (
        <Formik
          initialValues={editValue}
          enableReinitialize
          onSubmit={onSubmitBefore}
          validationSchema={schema}
          children={propsFormik => (
            <>
              <AmbitiDialg
                ambitiSelected={propsFormik.values.ambito ? propsFormik.values.ambito : []}
                open={isDialogAmbiti}
                onSelect={onSelectAmbiti(propsFormik)}
                close={closeAmbito}
              />
              {renderTitle(propsFormik)}
              <Form onReset={propsFormik.handleReset} onSubmit={propsFormik.handleSubmit}>
                <GridChilds justify="space-between" view={[6, 6]} spacing={3} style={{ width: '100%' }}>
                  {fieldCustom(propsFormik, {}, `cognome`, 'Cognome')}
                  {fieldCustom(propsFormik, {}, `nome`, 'Nome')}
                </GridChilds>
                <GridChilds justify="space-between" view={[4, 8]} spacing={3} style={{ width: '100%' }}>
                  <Field name={'Tipologia'}>
                    {({ field, form, meta }) => (
                      <div>
                        <Autocomplete
                          onInputChange={tipologiaOnChange(propsFormik)}
                          disablePortal
                          getOptionLabel={option => option || ''}
                          options={personaleTipo ? personaleTipo.map(el => el.label) : []}
                          sx={{ width: 300 }}
                          defaultValue={propsFormik?.values?.tipologia || ''}
                          renderInput={params => (
                            <MuiTextField
                              {...params}
                              label="Tipologia"
                              defaultValue={propsFormik?.values?.tipologia || ''}
                            />
                          )}
                        />
                        {/* onChange={tipologiaOnChange(propsFormik)} */}
                        {(!propsFormik.values?.tipologia || meta.error) && (
                          <div style={{ color: 'red', fontSize: '1' }}>{meta.error || 'Richiesto'}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  {isAmbito && (
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: '134px', float: 'left', fontSize: '12px' }}
                        onClick={() => {
                          setIsDialogAmbiti(true);
                        }}
                      >
                        <span style={{ fontSize: '11px' }} className={classes.buttonAction}>
                          Ambiti
                        </span>
                      </Button>
                      {propsFormik.values.ambito &&
                        propsFormik.values.ambito.map((ambito, idxAmbito) => (
                          <Chip style={{ marginLeft: '6px' }} key={idxAmbito} tabIndex={-1} label={ambito} />
                        ))}
                    </div>
                  )}
                </GridChilds>
                <GridChilds justify="space-between" view={[7, 5]} spacing={3} style={{ width: '100%' }}>
                  {fieldCustom(propsFormik, {}, `indirizzo`, 'Indirizzo')}
                  {fieldCustom(propsFormik, {}, `cap`, 'Cap')}
                </GridChilds>
                <GridChilds justify="space-between" view={[2, 2, 4]} spacing={3} style={{ width: '100%' }}>
                  {fieldCustom(propsFormik, {}, `prov`, 'Prov')}
                  {fieldCustom(propsFormik, {}, `city`, 'Città')}
                  {fieldCustom(propsFormik, {}, `country`, 'Nazione')}
                </GridChilds>
                <GridChilds justify="space-between" view={[2, 4, 6]} spacing={3} style={{ width: '100%' }}>
                  {fieldCustom(propsFormik, {}, `dateBorn`, 'Data Nascita')}
                  {fieldCustom(propsFormik, {}, `cf`, 'Cod. Fisc')}
                  <span> </span>
                </GridChilds>
                <GridChilds justify="space-between" view={[8, 4]} spacing={3} style={{ width: '100%' }}>
                  {fieldCustom(propsFormik, {}, `email`, 'Email')}
                  {fieldCustom(propsFormik, {}, `phone`, 'Phone')}
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
