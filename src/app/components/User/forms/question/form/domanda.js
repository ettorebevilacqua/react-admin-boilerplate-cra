// FIXME: Form Exmaples
import React from 'react';

import { Formik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';

import Rating from '@material-ui/lab/Rating';

import { TextField } from 'formik-material-ui';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Box, FormControl, InputLabel, MenuItem } from '@material-ui/core';

import GridChilds from '../../component/gridChilds';
import { newDomanda } from 'app/services/question/moduliModel';
import { RispostaForm } from './risposta';
import FormikOnChange from '../../lib/FormikOnChange';

// util Function for
const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));
// const ticker = new AdjustingInterval(null, 1000);

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
  titolo: 6,
};

const TipoQuestion = [
  { id: 1, tipo: 'Scala', param: { ratingMin: 2, ratingDefault: 5 } },
  { id: 2, tipo: 'Opzione unica' },
  { id: 3, tipo: 'Opzione multipla' },
  { id: 4, tipo: 'vero/falso' },
  { id: 5, tipo: 'Aperta' },
  { id: 6, tipo: 'Titolo' },
];

const MDomandaForm = ({ initialValues, name, fieldProps, setFieldValue, domandaSave }) => {
  // useValues(name, props)

  const domandaVal = initialValues || newDomanda;
  const startValue = {
    ...domandaVal,
    tipo: domandaVal.tipo || 0,
    risposte: domandaVal.risposte || [],
    ratingMax: domandaVal.ratingMax || 2,
  };
  const [values, setValues] = React.useState(startValue);

  const [tipo, setTipo] = React.useState(values && values.tipo);
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const [risposte, setRisposte] = React.useState(values && values.risposte);
  const [ratingStore, setRatingStore] = React.useState({
    ratingMax: domandaVal.ratingMax || 2,
    ratingEnd: domandaVal.ratingEnd,
    ratingStart: domandaVal.ratingEnd,
  });

  const getRatingStore = newValue => ({
    ratingMax: newValue.ratingMax || 2,
    ratingEnd: newValue.ratingEnd,
    ratingStart: newValue.ratingStart,
  });
  // const { values, setFieldValue: setSubFieldValue } = useFormikContext();

  const [expanded, setExpanded] = React.useState(
    fieldProps.expanded || toNumberOr(values && values.tipo, 0) === 0 || false,
  );

  const [isFirstTime, setIsFirstTime] = React.useState(true);

  React.useEffect(() => {
    setExpanded(true);
  }, [tipo]);

  const onChangeRatingMax = formiklProps => e => {
    const value = e.target.value;
    const numValue = parseInt(value);
    const numValValid = numValue < 2 ? 2 : numValue;
    e.target.value = numValValid;

    // formiklProps.setFieldValue(`ratingMax`, numValValid);
  };

  const onChangeForm = newValues => {
    if (isFirstTime) {
      return setIsFirstTime(false);
    }
    console.log('domanda onChangeForm ', newValues);
    setRatingStore(getRatingStore(newValues));
    setRisposte(newValues.risposte);
    fieldProps && fieldProps.onSubFormChange && fieldProps.onSubFormChange(newValues);
    fieldProps && fieldProps.onCorrelataFormChange && fieldProps.onCorrelataFormChange(newValues);
    // fieldProps.onSubFormChange(values);
  };

  const submit = formiklProps => {
    formiklProps.submitForm();
    formiklProps.setSubmitting(false);
  };
  const onSubmit = (valFormik, actions) => {
    const out = { ...valFormik, risposte };
    fieldProps.onSubFormChange(out);
    domandaSave(out);
  };

  const changeTipo = (formiklProps, value) => {
    setTipo(value);
    formiklProps.setFieldValue('tipo', value);
  };

  const setOptionsTipoUnico = (replace, val, index) =>
    setFieldValue(
      'risposte',
      values.risposte.map((ris, iRis) => {
        const risNes = { ...ris };
        risNes.val = iRis === index ? val : false;
        return risNes;
      }),
    );

  const onClickOption = (replace, index) => (field, val) => {
    tipo === TipoQuestionName.unica
      ? setOptionsTipoUnico(replace, val, index)
      : replace(index, { ...values.risposte[index], val });
    setFieldValue(`risposte.${index}._tmp`, index);
  };

  const moveRisposta = (op, arrayHelper, index) => {
    op === 'movedown'
      ? index < values.risposte.length - 1 && arrayHelper.move(index, index + 1)
      : op === 'moveup' && index > 0 && arrayHelper.move(index, index - 1);
  };

  const clonaDomanda = () => fieldProps.arrayManager('clone', values);

  const arrayManager = (arrayHelper, index) => op => {
    debugger;
    return op === 'delete'
      ? index === 0
        ? arrayHelper.replace(index, {})
        : arrayHelper.remove(index)
      : op === 'moveup' || op === 'movedown'
      ? moveRisposta(op, arrayHelper, index)
      : () => 1;
  };

  const onSetRating = (formiklProps, value) => {
    const numValue = parseInt(value);
    formiklProps.setFieldValue(`risposte.0.rating`, numValue);
  };

  const onChangeAccordion = () => setExpanded(!expanded);
  const getRatingVals = key =>
    values && values.risposte && values.risposte[0] && values.risposte[0][key] && values.risposte[0][key];

  const renderScala = formiklProps => () => (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <GridChilds view={[12]}>
        {tipo === TipoQuestionName.scala && (
          <GridChilds view={[5, 5, 2]}>
            <Field component={TextField} name="ratingStart" label="Descrizione Minimo" />
            <Field component={TextField} name="ratingEnd" label="Descrizione Massimo" />
            <Field component={TextField} name="ratingMax" type="number" label="N. Stelle" />
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
        <Typography variant="subtitle2">{ratingStore.ratingStart || ''}</Typography>
        <span> </span>
        <Box style={{ marginLeft: '16px', marginRight: '16px' }}>
          <Rating
            name="rating"
            max={toNumberOr(ratingStore.ratingMax, 2)}
            value={toNumberOr(getRatingVals('rating'), 0)}
            onChange={event => {
              onSetRating(formiklProps, event.target.value);
            }}
          />
        </Box>
        <span> </span>
        <Typography variant="subtitle2">{ratingStore.ratingEnd || ''}</Typography>
      </Grid>
    </Box>
  );

  const renderAddRisposta = arrayHelper =>
    tipo !== TipoQuestionName.aperta &&
    tipo !== TipoQuestionName.scala && (
      <Box
        style={{ width: '100%', margin: '16px', marginLeft: '60px' }}
        alignContent="flex-end"
        justifyContent="flex-end"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            debugger;
            arrayHelper.push({ risposta: '', val: null });
          }}
        >
          <span style={{ fontSize: '11px' }}>Nuova Risposta</span>
        </Button>
      </Box>
    );
  //    enableReinitialize={true}
  return (
    <Formik
      initialValues={values}
      onSubmit={onSubmit}
      children={formiklProps => (
        <>
          <FormikOnChange delay={500} onChange={onChangeForm} />
          <Accordion
            expanded={expanded}
            id="accordionRoot"
            onClick={e => e.stopPropagation()}
            style={{
              height: '100%',
              width: '100&',
              backgroundColor: 'transparent',
              position: 'inherit',
              boxShadow: 'none',
            }}
          >
            <AccordionSummary
              expandIcon={
                <IconButton aria-label="expand">
                  <ExpandMoreIcon />
                </IconButton>
              }
              IconButtonProps={{ onClick: onChangeAccordion }}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                height: '100%',
                width: '100&',
                backgroundColor: 'transparent',
                position: 'inherit',
                boxShadow: 'none',
                padding: '0px',
                marginTop: '-22px',
              }}
            >
              <Card
                style={{
                  marginTop: '18px',
                  marginLeft: '8px',
                  marginRight: '8px',
                  padding: '8px',
                  height: '100%',
                  width: '100%',
                }}
              >
                <GridChilds view={[8, 2, 2]} style={{ alignItems: 'center' }} width="100%">
                  <Field style={{ width: '100%' }} component={TextField} name="domanda" label="Domanda" />

                  <FormControl style={{ width: '100%' }}>
                    <InputLabel>Tipo Domanda</InputLabel>
                    <Select value={tipo || 2} onChange={e => changeTipo(formiklProps, e.target.value)}>
                      {TipoQuestion.map(el => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.tipo}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {(!fieldProps || !fieldProps.parentValues) && (
                    <GridChilds spacing={1} view={[4, 4, 4]} style={{ alignItems: 'center', marginLeft: '12px' }}>
                      <Box style={{ marginBottom: '1px' }}>
                        <Button variant="contained" color="primary" onClick={clonaDomanda} style={{ width: '77px' }}>
                          <span style={{ fontSize: '11px' }}>Clona</span>
                        </Button>
                      </Box>
                      <Box style={{ marginBottom: '1px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => submit(formiklProps)}
                          style={{ width: '77px' }}
                        >
                          <span style={{ fontSize: '11px' }}>Salva</span>
                        </Button>
                      </Box>
                      <Box>
                        <Button onClick={() => fieldProps.arrayManager('delete')}>
                          <DeleteIcon color="secondary" style={{ fontSize: '36px' }} />
                        </Button>
                      </Box>
                    </GridChilds>
                  )}
                </GridChilds>
              </Card>
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column' }}>
              <>
                {risposte && (
                  <FieldArray
                    name="risposte"
                    render={arrayHelper => (
                      <>
                        {risposte
                          .filter((elRisp, idxFilt) =>
                            (tipo === TipoQuestionName.aperta || tipo === TipoQuestionName.scala) && idxFilt > 0
                              ? false
                              : true,
                          )
                          .map((elem, index) => (
                            <RispostaForm
                              name={`risposte.${index}`}
                              onClickOption={onClickOption}
                              key={index}
                              idxList={index}
                              tipo={tipo}
                              numStelle={ratingStore}
                              renderScala={renderScala(formiklProps)}
                              arrayManager={arrayManager(arrayHelper, index)}
                            />
                          ))}
                        {renderAddRisposta(arrayHelper)}
                      </>
                    )}
                  />
                )}
              </>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    />
  );
};

export const DomandaForm = MDomandaForm;

/*

 <AccordionDetails style={{ flexDirection: 'column' }}>
              <>
                {values.risposte && values.tipo !== TipoQuestionName.titolo && values.tipo !== TipoQuestionName.aperta && (
                  <ToFieldArray
                    name={'risposte'}
                    renderMaxElem={
                      values.tipo === TipoQuestionName.aperta || values.tipo === TipoQuestionName.scala ? 1 : 0
                    }
                    fieldProps={({ index, arrayHelper }) => {
                      return {
                        renderScala,
                        onChange: onClickOption(arrayHelper.replace, index),
                        onSubFormChange: onSubFormChange(arrayHelper.replace, index),
                        arrayManager: arrayManager(arrayHelper, index),
                        tipo: formiklProps.values.tipo,
                        risposta: () => {
                          const _values =
                            formiklProps.values.risposte && values.risposte[0] ? values.risposte : [{ risposta: '' }];
                          return values.risposte[index];
                        },
                        isCorrelata: fieldProps && fieldProps.parentValues,
                      };
                    }}
                    renderFooter={renderAddRisposta}
                    component={RispostaForm}
                  />
                )}
              </>
            </AccordionDetails>
*/
