import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { TextField } from 'formik-material-ui';
// import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { schema } from 'app/data/schema/corsiSchema';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';

import AmbitiDialg from './ambitiModal';

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
  const [isDialogAmbiti, setIsDialogAmbiti] = React.useState(false);
  const classes = elemStyle();
  const onSubmitBefore = (valFormik, actions) => {
    actions.setSubmitting(false);
    onSubmit && onSubmit(valFormik);
  };

  const onSelectAmbiti = propsFormik => ambiti => {
    propsFormik.setFieldValue('ambito', ambiti);
    propsFormik.setFieldValue('durata', ' ');
    propsFormik.setTouched(['durata']);
    propsFormik.validateField('durata');
  };

  const closeAmbito = () => setIsDialogAmbiti(false);

  const handleDeleteAmbito = (propsFormik, ambiti, idx) => {
    const _ambiti = [...ambiti];
    _ambiti.splice(idx, 1);
    propsFormik.setFieldValue('ambito', _ambiti);
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

  const renderAmbiti = () => {
    return (
      <>
        <Button color="primary" variant="contained" style={{ width: '27%' }} onClick={() => setIsDialogAmbiti(true)}>
          <span className={classes.buttonAction}>Ambiti</span>
        </Button>
        {/* <div className={`${classes.paperRow} ${classes.width95}`}>
          {dataTo.moduli &&
            dataTo.moduli.map &&
            dataTo.moduli.map((modulo, idxModulo) => (
              <Chip
                key={idxModulo}
                tabIndex={-1}
                label={findModulo(modulo && modulo.id ? modulo.id : modulo, 'title') || ''}
                className={classes.chip}
              />
            ))}
        </div> */}
      </>
    );
  };

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
              <AmbitiDialg
                ambitiSelected={propsFormik.values.ambito ? propsFormik.values.ambito : []}
                open={isDialogAmbiti}
                onSelect={onSelectAmbiti(propsFormik)}
                close={closeAmbito}
              />
              {renderTitle(propsFormik)}
              <Form onReset={propsFormik.handleReset} onSubmit={propsFormik.handleSubmit}>
                <GridChilds justify="space-between" view={[6, 6]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `titolo`, TextField, 'Titolo')}
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
                </GridChilds>
                <GridChilds justify="space-between" view={[7, 5]} spacing={3} style={{ width: '100%' }}>
                  {renderField({}, `dataInizio`, TextField, 'Data Inizio')}
                  {renderField({}, `durata`, TextField, 'Durata', 'number')}
                  {renderField({}, `sede`, TextField, 'Sede')}
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
                  <span className={classes.buttonAction}>Chiudi</span>
                </Button>
              </Form>
            </>
          )}
        />
      )}
    </div>
  );
};
