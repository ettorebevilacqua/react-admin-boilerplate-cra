// FIXME: Form Exmaples
import React from 'react';

import { Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { withSubForm } from '../../lib/formikSub';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { TextField, Select } from 'formik-material-ui';
import FormikOnChange from '../../lib/FormikOnChange';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Box, FormControl, InputLabel, MenuItem } from '@material-ui/core';

import GridChilds from '../../component/gridChilds';
import { ToFieldArray } from '../../lib/formikWithField';
import { RispostaForm } from './risposta';

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

const MDomandaForm = ({ name, fieldProps, setFieldValue }) => {
  // useValues(name, props)
  const { values, setFieldValue: setSubFieldValue } = useFormikContext();
  const [expanded, setExpanded] = React.useState(fieldProps.expanded || toNumberOr(values.tipo, 0) === 0 || false);

  const [isFirstTime, setIsFirstTime] = React.useState(true);

  React.useEffect(() => {
    setExpanded(true);
  }, [values.tipo]);

  const onChangeForm = newValues => {
    if (isFirstTime) {
      return setIsFirstTime(false);
    }
    console.log('domanda onChangeForm ', newValues);

    fieldProps && fieldProps.onSubFormChange && fieldProps.onSubFormChange(newValues);

    fieldProps && fieldProps.onCorrelataFormChange && fieldProps.onCorrelataFormChange(newValues);
    // fieldProps.onSubFormChange(values);
  };

  const setOptionsTipoUnico = (replace, val, index) =>
    setFieldValue(
      name + '.risposte',
      values.risposte.map((ris, iRis) => {
        const risNes = { ...ris };
        risNes.val = iRis === index ? val : false;
        return risNes;
      }),
    );

  const onClickOption = (replace, index) => (field, val) => {
    values.tipo === TipoQuestionName.unica
      ? setOptionsTipoUnico(replace, val, index)
      : replace(index, { ...values.risposte[index], val });
    setFieldValue(name + '._tmp', index);
  };

  const onSubFormChange = (replace, index) => subValue => {
    if (!values || !subValue || !values.risposte || !values.risposte[index]) return false;

    const _risposte = values.risposte.map((item, idxRisposte) => (idxRisposte === index ? subValue : item));
    const _value = { ...values, risposte: _risposte };
    fieldProps && fieldProps.onSubFormChange && fieldProps.onSubFormChange(_value);

    // replace(index, subValue);
  };

  const moveRisposta = (op, arrayHelper, index) => {
    op === 'movedown'
      ? index < values.risposte.length - 1 && arrayHelper.move(index, index + 1)
      : op === 'moveup' && index > 0 && arrayHelper.move(index, index - 1);
  };

  const clonaDomanda = () => fieldProps.arrayManager('clone', values);

  const arrayManager = (arrayHelper, index) => op => {
    return op === 'delete'
      ? index === 0
        ? arrayHelper.replace(index, {})
        : arrayHelper.remove(index)
      : op === 'moveup' || op === 'movedown'
      ? moveRisposta(op, arrayHelper, index)
      : () => 1;
  };

  /* const onChangeRatingMax = e => {
    const value = e.target.value;
    const numValue = parseInt(value);
    const numValValid = numValue < 2 ? 2 : numValue;
    e.target.value = numValValid;
    setSubFieldValue(`ratingMax`, numValValid);
  }; */

  const onSetRating = e => {
    const value = e.target.value;
    const numValue = parseInt(value);
    setSubFieldValue(`risposte.0.rating`, numValue);
  };

  const onChangeAccordion = () => setExpanded(!expanded);
  const getRatingVals = key =>
    values && values.risposte && values.risposte[0] && values.risposte[0][key] && values.risposte[0][key];

  const renderScala = () => (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <GridChilds view={[12]}>
        {values.tipo === TipoQuestionName.scala && (
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
        <Typography variant="subtitle2">{getRatingVals('ratingStart') || ''}</Typography>
        <span> </span>
        <Box style={{ marginLeft: '16px', marginRight: '16px' }}>
          <Rating
            name="rating"
            max={toNumberOr(getRatingVals('ratingMax'), 2)}
            value={toNumberOr(getRatingVals('rating'), 0)}
            onChange={event => {
              onSetRating(event);
            }}
          />
        </Box>
        <span> </span>
        <Typography variant="subtitle2">{getRatingVals('ratingEnd') || ''}</Typography>
      </Grid>
    </Box>
  );

  const renderAddRisposta = ({ arrayHelper }) =>
    values.tipo !== TipoQuestionName.aperta &&
    values.tipo !== TipoQuestionName.scala && (
      <Box
        style={{ width: '100%', margin: '16px', marginLeft: '60px' }}
        alignContent="flex-end"
        justifyContent="flex-end"
      >
        <Button variant="contained" color="primary" onClick={() => arrayHelper.push({ risposta: '', val: null })}>
          <span style={{ fontSize: '11px' }}>Nuova Risposta</span>
        </Button>
      </Box>
    );

  return (
    <div>
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
                <Field name="tipo" component={Select}>
                  {TipoQuestion.map(el => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.tipo}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              {(!fieldProps || !fieldProps.parentValues) && (
                <GridChilds spacing={1} view={[6, 6]} style={{ alignItems: 'center', marginLeft: '12px' }}>
                  <Box style={{ marginBottom: '1px' }}>
                    <Button variant="contained" color="primary" onClick={clonaDomanda} style={{ width: '77px' }}>
                      <span style={{ fontSize: '11px' }}>Clona</span>
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
            {/* values.tipo === 1 && renderScala() */}
          </Card>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: 'column' }}>
          <>
            {values.risposte && values.tipo !== TipoQuestionName.titolo && values.tipo !== TipoQuestionName.aperta && (
              <ToFieldArray
                name={'risposte'}
                renderMaxElem={
                  values.tipo === TipoQuestionName.aperta || values.tipo === TipoQuestionName.scala ? 1 : 0
                }
                values={values.risposte && values.risposte[0] ? values.risposte : [{ risposta: '' }]}
                fieldProps={({ index, arrayHelper }) => {
                  return {
                    renderScala,
                    onChange: onClickOption(arrayHelper.replace, index),
                    onSubFormChange: onSubFormChange(arrayHelper.replace, index),
                    arrayManager: arrayManager(arrayHelper, index),
                    tipo: values.tipo,
                    isCorrelata: fieldProps && fieldProps.parentValues,
                  };
                }}
                renderFooter={renderAddRisposta}
                component={RispostaForm}
              />
            )}
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export const DomandaForm = withSubForm(MDomandaForm, nameSchema);
