import React from 'react';
import ReactDOM from 'react-dom';
import { FieldArray, Form, Formik } from 'formik';
import * as yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

import {
  Box,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Checkbox,
} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

import GridChilds from './gridChilds';
import Risposte from './risposte';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const TipoQuestion = [
  { tipo: 'Scala' },
  { tipo: 'Opzione unica' },
  { tipo: 'Opzione multipla' },
  { tipo: 'Aperta' },
];

const valueRisposte = [
  { risposta: 'sssss', val: false, rating: 2 },
  { risposta: 'bbbb', val: true, rating: 1 },
  { risposta: 'cccc', val: false, rating: 4 },
];

const initialValues = {
  questionario: 'quest ggg',
  domande: [
    {
      domanda: 'first question',
      tipo: 'Opzione unica',
      risposte: valueRisposte,
    },
  ],
};

const TestL = ({
  index,
  ratingMax,
  addCorrelata,
  domanda,
  formikProps,
  arrayHelpers,
  onSetRating,
  setValue,
  idxDomanda,
}) => {
  const { values, setFieldValue } = formikProps;

  if (!domanda || !domanda.risposte) return <div></div>;
  const risposte = domanda.risposte;
  if (!risposte || !risposte[index]) return <div></div>;

  const tipo = domanda.tipo;
  const getChecked = (risposte, idx) =>
    risposte && risposte[idx] ? risposte[idx].val : false;

  const renderTipo = () =>
    tipo === 'Opzione unica' ? (
      <FormControlLabel
        control={
          <Radio
            name="val"
            checked={getChecked(risposte, index)}
            onClick={e => setValue(risposte, setFieldValue, index)}
          />
        }
        label=""
      />
    ) : tipo === 'Opzione multipla' ? (
      <FormControlLabel
        control={
          <Checkbox
            name="val"
            checked={getChecked(risposte, index)}
            color="primary"
            onClick={e => setValue(risposte, setFieldValue, index)}
          />
        }
        label=""
        labelPlacement="end"
      />
    ) : tipo === 'Scala' ? (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <GridChilds view={[2, 8, 2]}>
          <Typography variant="subtitle2">
            {domanda.ratingStart || ''}
          </Typography>
          <Rating
            name="rating"
            max={ratingMax}
            value={
              risposte && risposte[index]
                ? domanda.risposte[index].rating
                : index
            }
            onChange={(event, newValue) => {
              onSetRating(event, onSetRating, index, setFieldValue);
            }}
          />
          <Typography variant="subtitle2">{values.ratingEnd || ''}</Typography>
        </GridChilds>
      </Box>
    ) : (
      <span></span>
    );

  return (
    <div id={'risp_' + idxDomanda + index}>
      <GridChilds view={[7, 4, 1]}>
        <GridChilds view={[1, 11]}>
          <span>{index + 1} )</span>
          <TextField
            fullWidth
            name={`domande[.${idxDomanda}].risposte.${index}.risposta`}
            label="Risposta"
          />
        </GridChilds>

        {renderTipo()}

        {risposte && risposte[index] && risposte[index].correlata ? (
          <GridChilds view={[1, 9, 2]} width="100%">
            <div>&nbsp;</div>
            <TextField fullWidth name="correlata" label="correlata" />
            <Button
              color="primary"
              variant="contained"
              style={{ fontSize: '11px', width: '100px', maxHeight: '22px' }}
              onClick={e =>
                setFieldValue(
                  `domande[.${idxDomanda}].risposte.${index}.correlata`,
                  null,
                )
              }
            >
              Rimuovi
            </Button>
          </GridChilds>
        ) : (
          <Button
            color="primary"
            variant="contained"
            style={{ fontSize: '11px', width: '100px', maxHeight: '22px' }}
            onClick={e => addCorrelata(index, setFieldValue, risposte[index])}
          >
            Correlata
          </Button>
        )}
      </GridChilds>
    </div>
  );
};

export const Domande = props => {
  const [tipo, setTipo] = React.useState('');
  const [ratingMax, setRatingMax] = React.useState(5);

  const onChangeRatingMax = (e, idxDomanda, setFieldValue) => {
    const value = e.target.value;
    const numValue = parseInt(value);
    const numValValid = numValue < 2 ? 2 : numValue;
    e.target.value = numValValid;
    setFieldValue(`domande[.${idxDomanda}].ratingMax`, numValValid);
    setRatingMax(numValValid);
    //  setTimeout(()=> setTipo(curTipo), 1000);
  };

  const addCorrelata = idxDomanda => (index, setFieldValue, value) => {
    const oldVal = value.correlata;

    if (!oldVal) {
      setFieldValue(`domande[.${idxDomanda}].risposte.${index}.correlata`, ' ');
    }
  };

  // const setField = (field, value)=>setFieldValue();

  /* function onChangeTickets(e, field, values, setValues) {
    // update dynamic form
    const tickets = [...values.tickets];
    const numberOfTickets = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < numberOfTickets) {
        for (let i = previousNumber; i < numberOfTickets; i++) {
            tickets.push({ name: '', email: '' });
        }
    } else {
        for (let i = previousNumber; i >= numberOfTickets; i--) {
            tickets.splice(i, 1);
        }
    }
    setValues({ ...values, tickets });

    // call formik onChange method
    field.onChange(e);
} */

  const handleBlur = event => {
    // setTipo(event.target.value);
  };
  const onSubmit = vals => {
    alert(JSON.stringify(vals, null, 2));
  };

  const getTipo = values => (values && values.tipo ? values.tipo.trim() : '');

  const onSetResponce = (risposte, setFieldValue, index) => {
    if (!risposte && !risposte[index]) return false;
    if (tipo === 'Opzione unica') {
      const allFalse = risposte.map(elem => {
        elem.val = false;
        return elem;
      });

      setFieldValue(`risposte`, allFalse);
    }

    setFieldValue(`risposte.${index}.val`, !risposte[index].val);
    //alert(JSON.stringify(index, null, 2));
  };

  const onSetRating = (e, idxDomanda, index, setFieldValue) => {
    const value = e.target.value;
    const numValue = parseInt(value);
    setFieldValue(`domande[${idxDomanda}].risposte.${index}.rating`, numValue);
  };
  // { move, swap, push, insert, unshift, pop, form }

  const renderRoot = (formikProps, idxDomanda) => (
    <>
      <Card
        id={idxDomanda}
        style={{
          marginTop: '18px',
          marginLeft: '8px',
          marginRight: '8px',
          padding: '8px',
          height: '100%',
        }}
      >
        <CardContent>
          <GridChilds view={[8, 4]} width="100%">
            <TextField
              fullWidth
              name={`domande[${idxDomanda}].domanda`}
              label="Domanda"
            />

            {`domande[${idxDomanda}].domanda`}

            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <MuiSelect
                name={`domande[${idxDomanda}].tipo`}
                title="Tipo"
                label="Tipo"
                onChange={e => {
                  const val: string =
                    e.target.value && typeof e.target.value === 'string'
                      ? e.target.value
                      : '';
                  formikProps.setFieldValue(
                    `domande[${idxDomanda}].tipo`,
                    e.target.value,
                  );
                  setTipo(val);
                }}
                onBlur={handleBlur}
                style={{ display: 'block' }}
              >
                {TipoQuestion.map(el => (
                  <MenuItem value={el.tipo}>{el.tipo}</MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </GridChilds>

          {tipo === 'Scala' && (
            <GridChilds view={[6, 5, 1]}>
              <TextField
                fullWidth
                name="ratingStart"
                label="Start descrizione"
                onChange={e =>
                  formikProps.setFieldValue('ratingStart', e.target.value)
                }
              />
              <TextField
                fullWidth
                name="ratingEnd"
                label="End descrizione"
                onChange={e =>
                  formikProps.setFieldValue('ratingEnd', e.target.value)
                }
              />
              <TextField
                fullWidth
                name="ratingMax"
                type="number"
                onChange={e => {
                  onChangeRatingMax(e, idxDomanda, formikProps.setFieldValue);
                }}
                label="Rating max"
              />
            </GridChilds>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderDomanda = (
    domanda,
    idxDomanda,
    onSetRating,
    formikProps,
    arrayHelpers,
  ) =>
    domanda &&
    domanda.risposte &&
    domanda.risposte.map((risposta, index) => (
      <div id={'divRisposta_' + idxDomanda + '_' + index}>
        <TestL
          index={index}
          onSetRating={onSetRating}
          idxDomanda={idxDomanda}
          ratingMax={ratingMax}
          domanda={domanda}
          formikProps={formikProps}
          arrayHelpers={arrayHelpers}
          addCorrelata={addCorrelata(idxDomanda)}
          setValue={onSetResponce}
        />
      </div>
    ));

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        render={formikProps => (
          <div>
            <TextField
              id={'questionario'}
              fullWidth
              name="questionario"
              label="Questionario"
            />
            <FieldArray
              name="domande"
              render={arrayHelpers => (
                <>
                  {formikProps.values.domande.map((domanda, idxDomanda) => (
                    <div id={'idxDomanda_' + idxDomanda}>
                      {renderRoot(formikProps, idxDomanda)}
                      <Card
                        style={{
                          marginTop: '18px',
                          marginLeft: '8px',
                          marginRight: '8px',
                          padding: '8px',
                          height: '100%',
                        }}
                      >
                        <FieldArray
                          name={`domande[${idxDomanda}].risposte`}
                          render={arrayHelpersInner =>
                            renderDomanda(
                              domanda,
                              idxDomanda,
                              onSetRating,
                              formikProps,
                              arrayHelpersInner,
                            )
                          }
                        />
                      </Card>
                    </div>
                  ))}
                </>
              )}
            />
            <div>{JSON.stringify(formikProps.values)}</div>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </div>
        )}
      />
    </div>
  );
};
