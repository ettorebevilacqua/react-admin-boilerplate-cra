// FIXME: Form Exmaples
import React from 'react';

import { Formik, useFormikContext, Field, FieldArray } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { selector, actions } from 'app/slice/modulo.slice';

import Paper from '@material-ui/core/Paper';
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
const getIndex = (list, id, index) => (id ? list.findIndex(el => el._id === id) : index);

// const ticker = new AdjustingInterval(null, 1000);

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

function useStateDomanda(initialValues, idDomanda, indexDomanda) {
  const domandaSelect = useSelector(state => selector.dataSelectDomanda(state, idDomanda, indexDomanda));
  const domanda = initialValues || domandaSelect;
  const domandaVal = domanda || newDomanda; // getDomanda(state, idDomanda, index);

  return domandaVal;
}

const getIndexDomanda = (_domande, id, index) => (id ? _domande.findIndex(el => el._id === id) : index);

export const MDomandaForm = ({
  initialValues,
  idDomanda,
  indexDomanda,
  formikPath,
  submit,
  onChange,
  onChangeRisposta,
  changeCorrelata,
  isCorrelata,
  correlataVal,
  domandaCommand,
  isSaving,
  setRisposte,
  risposte,
}) => {
  const formiklProps = useFormikContext();
  // useValues(name, props)
  // const state = useSelector(selector.selectState);
  // const domandaSelect = useSelector(selector.selectDomanda(idDomanda, indexDomanda));
  /* const startValue = domandaValTmp && {
    ...domandaVal,
    tipo: domandaVal.tipo || 0,
    risposte: domandaVal.risposte || [],
    ratingMax: domandaVal.ratingMax || 2,
  }; */

  const rispostaPath = formikPath ? formikPath : '';
  const getNamePath = name => rispostaPath + name;

  const _domandaVal = correlataVal || formiklProps.values;
  const domandaVal = {
    ..._domandaVal,
    ratingMax: _domandaVal.ratingMax || 2,
    ratingEnd: _domandaVal.ratingEnd || '',
    ratingStart: _domandaVal.ratingStart || '',
  };

  const tipo = domandaVal.tipo;
  const [expanded, setExpanded] = React.useState(true);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [values, setValues] = React.useState();
  // const [tipo, setTipo] = React.useState(domandaVal && domandaVal.tipo);
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const [valChange, setValChange] = React.useState(true);

  // const { values: valFormik } = useFormikContext();
  // console.log('valFormik', valFormik);
  /* const [ratingStore, setRatingStore] = React.useState(
    domandaVal && {
      ratingMax: domandaVal.ratingMax || 2,
      ratingEnd: domandaVal.ratingEnd,
      ratingStart: domandaVal.ratingEnd,
      rating: domandaVal.rating,
    },
  ); */
  React.useEffect(() => {
    if (domandaVal && !values) {
      setValues({ ...domandaVal });
      // setTipo(domandaVal.tipo);
    }
  }, [domandaVal]);

  React.useEffect(() => {
    setExpanded(true);
  }, [tipo]);

  if (!domandaVal) return <></>;

  const getRatingStore = newValue => ({
    ratingMax: newValue.ratingMax || 2,
    ratingEnd: newValue.ratingEnd,
    ratingStart: newValue.ratingStart,
    rating: newValue.rating,
  });

  const changeTipo = (formiklProps, value) => {
    formiklProps.setFieldValue(getNamePath('tipo'), value);
    /*
    setTipo(value);
   const _domanda = { ...domandaVal, tipo: value };
    if (isCorrelata) return false;
    onChange && onChange(_domanda); */
  };

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

  const moveRisposta = (op, arrayHelper, index) => {
    op === 'movedown'
      ? index < values.risposte.length - 1 && arrayHelper.move(index, index + 1)
      : op === 'moveup' && index > 0 && arrayHelper.move(index, index - 1);
  };

  /*  const domandaCommand =  op => {
    debugger;
 return op === 'delete'
      ? index === 0
        ? arrayHelper.replace(index, {})
        : arrayHelper.remove(index)
      : op === 'moveup' || op === 'movedown'
      ? moveRisposta(op, arrayHelper, index)
      : () => 1;
  }; */

  const clonaDomanda = () => domandaCommand('clone', domandaVal);

  const onSetRating = (formiklProps, value) => {
    const numValue = parseInt(value);
    // setRatingStore({ ...ratingStore, rating: numValue });
    // setTimeout(() => formiklProps.setFieldValue(`rating`, numValue), 30);
    console.log('onSetRating indexDomanda', indexDomanda);
    formiklProps.setFieldValue(getNamePath(`rating`), numValue);
    // const _domanda = { ...domandaVal, rating: numValue };
    // onChange && onChange(_domanda);
  };

  const onChangeAccordion = () => setExpanded(!expanded);
  const getRatingVals = key => domandaVal.rating;

  const changeRisposta = (formiklProps, id, index) => newValue => {
    if (isSaving || !formiklProps.dirty) return false;
    // console.log('onChangeRisposta', onChangeRisposta);
    // onChangeRisposta && onChangeRisposta(id, index, newValue.risposte);
    /* const _domanda = { ...domandaVal };
    const risposte = _domanda && _domanda.risposte ? { ..._domanda.risposte } : null;
    if (!risposte) return null;
    const idxRisposta = getIndex(risposte, id, index);
    risposte[idxRisposta] = newValue;
    const domandaNew = { ..._domanda, risposte };

    onChange && onChange(domandaNew);
    */
  };

  const renderScala = formiklProps => () => (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <GridChilds view={[12]}>
        {tipo === TipoQuestionName.scala && (
          <GridChilds view={[5, 5, 2]}>
            <Field component={TextField} name={getNamePath('ratingStart')} label="Descrizione Minimo" />
            <Field component={TextField} name={getNamePath('ratingEnd')} label="Descrizione Massimo" />
            <Field component={TextField} name={getNamePath('ratingMax')} type="number" label="N. Stelle" />
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
        <Typography variant="subtitle2">{domandaVal.ratingStart || ''}</Typography>
        <span> </span>
        <Box style={{ marginLeft: '16px', marginRight: '16px' }}>
          <Rating
            name="rating"
            max={!domandaVal.ratingMax ? 2 : toNumberOr(domandaVal.ratingMax, 2)}
            value={toNumberOr(domandaVal.rating, 0)}
            onChange={event => {
              console.log('set rating', isCorrelata);
              onSetRating(formiklProps, event.target.value);
            }}
          />
        </Box>
        <span> </span>
        <Typography variant="subtitle2">{domandaVal.ratingEnd || ''}</Typography>
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
            arrayHelper.push({ risposta: '', val: null });
          }}
        >
          <span style={{ fontSize: '11px' }}>Nuova Risposta</span>
        </Button>
      </Box>
    );

  const renderFormik = _values => (
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
        <Paper
          style={{
            marginTop: '1px',
            marginLeft: '5%',
            padding: '8px',
            paddingBotton: '18px',
            width: '95%',
          }}
        >
          <GridChilds view={[6, 3, 3]} style={{ alignItems: 'center' }} width="100%">
            <Field style={{ width: '100%' }} component={TextField} name={getNamePath('domanda')} label="Domanda" />

            <FormControl style={{ width: '100%' }}>
              <InputLabel>Tipo Domanda</InputLabel>
              <Select value={domandaVal.tipo || 2} onChange={e => changeTipo(formiklProps, e.target.value)}>
                {TipoQuestion.map(el => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <GridChilds spacing={1} view={[4, 4, 4]} style={{ alignItems: 'center', marginLeft: '12px' }}>
              {!isCorrelata ? (
                <>
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
                      disabled={!formiklProps.dirty}
                    >
                      <span style={{ fontSize: '11px' }}>Salva</span>
                    </Button>
                  </Box>
                  <Box>
                    <Button onClick={() => domandaCommand && domandaCommand('delete')}>
                      <DeleteIcon color="secondary" style={{ fontSize: '36px' }} />
                    </Button>
                  </Box>
                </>
              ) : (
                <span> </span>
              )}
            </GridChilds>
          </GridChilds>
        </Paper>
      </AccordionSummary>
      <AccordionDetails style={{ flexDirection: 'column' }}>
        <>
          {!domandaVal || !domandaVal.risposte ? (
            <></>
          ) : (
            tipo !== TipoQuestionName.titolo &&
            tipo !== TipoQuestionName.aperta && (
              <FieldArray
                name="risposte"
                render={arrayHelper => (
                  <>
                    {domandaVal &&
                      domandaVal.risposte &&
                      domandaVal.risposte
                        .filter((elRisp, idxFilt) => (tipo === TipoQuestionName.scala && idxFilt > 0 ? false : true))
                        .map((elem, index) => (
                          <RispostaForm
                            arrayHelper={arrayHelper}
                            name={getNamePath(`risposte.${index}`)}
                            domanda={domandaVal}
                            isCorrelata={isCorrelata}
                            risposta={domandaVal.risposte[index]}
                            risposte={domandaVal.risposte}
                            valChange={valChange}
                            key={index}
                            idxList={index}
                            valRisposta={domandaVal.risposte[index]}
                            tipo={domandaVal.tipo}
                            renderScala={renderScala(formiklProps)}
                            domandaCommand={domandaCommand}
                            arrayManager={arrayManager(arrayHelper, index)}
                          />
                        ))}
                    {!isCorrelata && renderAddRisposta(arrayHelper)}
                  </>
                )}
              />
            )
          )}
        </>
      </AccordionDetails>
    </Accordion>
  );
  //    enableReinitialize={true}
  return !domandaVal && !correlataVal ? <></> : renderFormik(correlataVal || domandaVal);
};

function DomandaLoader(props) {
  const propsReap = { ...props };
  const {
    initialValues,
    idDomanda,
    indexDomanda,
    isCorrelata,
    domandaSave,
    onChangeCorrelata,
    onCorrelataFormChange,
  } = propsReap;
  const dispatch = useDispatch();
  const moduloState = useSelector(selector.selectModulo);
  const moduloClone = { ...moduloState };
  const _domande = !moduloClone || !moduloClone.domande ? null : moduloClone.domande.map(el => ({ ...el }));

  const indexDomandaState = !_domande ? -1 : getIndexDomanda(_domande, idDomanda, indexDomanda);

  const domanda = indexDomandaState < 0 || !_domande[indexDomandaState] ? null : _domande[indexDomandaState]; // useStateDomanda(initialValues, idDomanda, indexDomanda);
  const domandaVal = domanda || newDomanda;
  const [isSaving, setIsSaving] = React.useState(false);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [isCorrelataChange, setIsCorrelataChange] = React.useState(false);
  const [risposte, setRisposte] = React.useState(
    domandaVal && domandaVal.risposte && domandaVal.risposte.map && [...domandaVal.risposte],
  );

  if (idDomanda === '6152131aed4d7651a672e71d') {
    // console.log('idex xxxx ', domanda); //);
  }

  const changeCorrelata = (id, index) => newValue => {
    setIsCorrelataChange(true);
    setTimeout(() => setIsCorrelataChange(false), 300);
    onChangeCorrelata && setTimeout(() => onChangeCorrelata(id, index, newValue), 30);
  };

  const onChange = _domanda => {
    dispatch(actions.upDateDomanda({ domanda: domanda, id: idDomanda, index: indexDomanda }));
  };
  // getDomanda(state, idDomanda, index);

  const onChangeForm = newValues => {};

  const submit = formiklProps => {
    formiklProps.submitForm();
    formiklProps.setSubmitting(false);
  };

  const onSubmit = (valFormik, _actions) => {
    const out = { ...valFormik };
    // onChange && onChange(out);
    //fieldProps.onCorrelataFormChange(out);
    // setIsSaving(true);
    // onChange && onChange(out);
    dispatch(actions.upDateDomanda({ domanda: out, id: idDomanda, index: indexDomanda }));
    setTimeout(() => domandaSave(out), 30);
    _actions.resetForm();
  };

  const renderFormik = _values => (
    <Formik
      initialValues={{ ..._values }}
      onSubmit={onSubmit}
      children={formiklProps => (
        <>
          <FormikOnChange delay={200} onChange={onChangeForm} />
          <MDomandaForm
            formiklProps={formiklProps}
            submit={submit}
            risposte={risposte}
            isSaving={isSaving}
            changeCorrelata={changeCorrelata}
            formiklProps={formiklProps}
            onChange={onChange}
            submit={submit}
            domandaVal={domandaVal}
            setRisposte={setRisposte}
            {...props}
          />
        </>
      )}
    />
  );

  return renderFormik(domandaVal);
}

export const DomandaForm = DomandaLoader;

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
                        domandaCommand: domandaCommand(arrayHelper, index),
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
