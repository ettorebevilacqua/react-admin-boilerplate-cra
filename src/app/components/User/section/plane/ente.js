import React, { useEffect, useState } from 'react';
import { useInjectReducer } from 'utils/redux-injectors';
import { useSelector } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { TextField } from 'formik-material-ui';
import MuiTextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UtentiForm } from './utenti';
import GridChilds from 'app/components/User/forms/component/gridChilds';
import { elemStyle } from '../stylesElement';

// import { setMenuList } from 'app/slice/layoutSlice';
import { schema } from 'app/data/schema/ente';
import { entiSlice, listsSlice } from 'app/slice';
import { useParams } from 'react-router-dom';
import { userSelector } from 'app/slice/userSlice';

// import AmbitiDialg from './ambitiModal'; //

const tipologiaEnte = [
  { id: 1, label: 'formazione' },
  { id: 2, label: 'altro' },
];

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

export const EnteFormContent = props => {
  const { value, personaleTipo, onSubmit, onExit, saved } = props;
  const classes = elemStyle();
  const [editValue, setEditValue] = useState(value);
  const [isMailSent, setIsMailSent] = useState(false);

  // setMenuList([{ link: '/app/user/moduli', label: 'Valutazione Annuale' }]);

  React.useEffect(() => {
    // value && value.tipologia && setIsAmbito(getIsAmbito(value?.tipologia));
  }, [value]);

  const saveData = function (data) {
    const idEnte = value.id;
    entiSlice.actions.save(data).then(res => {
      if (!res || !res.payload) return false;
      const savedData = { ...res.payload };
      // if (!data.id) { }
      !idEnte && setIsMailSent(true);
      setEditValue(savedData);
    });
  };

  const onSubmitBefore = (valFormik, actions) => {
    actions.setSubmitting(false);
    saveData(valFormik);
  };

  const onSelectAmbiti = propsFormik => ambiti => {
    propsFormik.setFieldValue('ambito', ambiti);
  };

  const tipologiaOnChange = formikProps => (e, value) => {
    if (!value && value !== '') return false;
    formikProps.setFieldValue('tipologia', value);
  };

  const pianoOnChange = formikProps => (e, value) => {
    if (!value && value !== '') return false;
    formikProps.setFieldValue('piano', value);
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

  const renderTipologia = propsFormik => (
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
                <MuiTextField {...params} label="Tipologia" defaultValue={propsFormik?.values?.tipologia || ''} />
              )}
            />
            {/* onChange={tipologiaOnChange(propsFormik)} */}
            {(!propsFormik.values?.tipologia || meta.error) && (
              <div style={{ color: 'red', fontSize: '1' }}>{meta.error || 'Richiesto'}</div>
            )}
          </div>
        )}
      </Field>
    </GridChilds>
  );

  const renderPiano = propsFormik => (
    <GridChilds justify="space-between" view={[4, 8]} spacing={3} style={{ width: '100%' }}>
      <Field name={'Tipologia'}>
        {({ field, form, meta }) => (
          <div>
            <Autocomplete
              onInputChange={pianoOnChange(propsFormik)}
              disablePortal
              getOptionLabel={option => option || ''}
              options={['platino', 'oro', 'argento']}
              sx={{ width: 300 }}
              defaultValue={propsFormik?.values?.piano || ''}
              renderInput={params => (
                <MuiTextField {...params} label="Piano" defaultValue={propsFormik?.values?.piano || ''} />
              )}
            />
            {/* onChange={tipologiaOnChange(propsFormik)} */}
            {(!propsFormik.values?.piano || meta.error) && (
              <div style={{ color: 'red', fontSize: '1' }}>{meta.error || 'Richiesto'}</div>
            )}
          </div>
        )}
      </Field>
    </GridChilds>
  );

  return (
    <div className={classes.root}>
      {isMailSent ? (
        <h2 style={{ textAlign: 'center' }}>Le abbiamo inviato una mail, per confermare l' iscrizione </h2>
      ) : (
        !!editValue && (
          <Formik
            initialValues={editValue}
            enableReinitialize
            onSubmit={onSubmitBefore}
            validationSchema={schema}
            children={propsFormik => (
              <>
                {renderTitle(propsFormik)}
                <Form onReset={propsFormik.handleReset} onSubmit={propsFormik.handleSubmit}>
                  <GridChilds justify="space-between" view={[7, 5]} spacing={3} style={{ width: '100%' }}>
                    {fieldCustom(propsFormik, {}, `nome`, 'Nome')}
                    {fieldCustom(propsFormik, {}, `pIva`, 'Partita Iva')}
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
                  <GridChilds justify="space-between" view={[8, 4]} spacing={3} style={{ width: '100%' }}>
                    {fieldCustom(propsFormik, {}, `email`, 'Email')}
                    {fieldCustom(propsFormik, {}, `phone`, 'Phone')}
                  </GridChilds>
                  <br />
                  <h3>Responsabile</h3>
                  <GridChilds justify="space-between" view={[6, 6]} spacing={3} style={{ width: '100%' }}>
                    {fieldCustom(propsFormik, {}, `responsabili.0.cognome`, 'Cognome')}
                    {fieldCustom(propsFormik, {}, `responsabili.0.nome`, 'Nome')}
                  </GridChilds>
                  <GridChilds justify="space-between" view={[8, 4]} spacing={3} style={{ width: '100%' }}>
                    {fieldCustom(propsFormik, {}, `responsabili.0.email`, 'Email')}
                    {fieldCustom(propsFormik, {}, `responsabili.0.phone`, 'Phone')}
                  </GridChilds>
                  <br />
                  <h3>Piano</h3>
                  {renderPiano(propsFormik)}
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
        )
      )}
      {value.id && <UtentiForm />}
    </div>
  );
};

export function EnteForm(props) {
  useInjectReducer({ key: entiSlice.name, reducer: entiSlice.slice.reducer });
  const { user } = useSelector(userSelector);
  const enteSelector = useSelector(entiSlice.selects.dataSelector);
  const listsSelector = useSelector(listsSlice.selects.dataSelector);
  const [ente, setEnte] = useState(null);
  const [personaleTipo, setPersonaleTipo] = useState(null);
  const params = useParams();
  const paramId = params?.id || '0';
  const idEnte = user?.idEnte || '0';

  useEffect(() => {
    if (!user?.idEnte) return setEnte({});
    entiSlice.actions.get(idEnte || '0', true);
    listsSlice.actions.get({ name: 'personaleTipo' }, true);
  }, []);

  useEffect(() => {
    !!enteSelector && enteSelector.id && setEnte(enteSelector);
  }, [enteSelector]);

  useEffect(() => {
    if (!!listsSelector && listsSelector.results && listsSelector.results[0] && listsSelector.results[0].list) {
      setPersonaleTipo(listsSelector.results[0].list);
      enteSelector && enteSelector.results && setEnte([...enteSelector.results]);
    }
  }, [listsSelector]);

  return (
    <div>
      {!ente ? <h3>Loading...</h3> : <EnteFormContent value={ente} user={user} personaleTipo={personaleTipo} />}
    </div>
  );
}
