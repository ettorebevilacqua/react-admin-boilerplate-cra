import React from 'react';
import { useState } from 'react';

import { Field, FieldArray, ErrorMessage } from 'formik';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';
import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

import TagsInput from '../comp/tagInput';
import GridChilds from '../../component/gridChilds';
import { elemStyle } from '../../stylesElement';

import { CrudButton, ButtonType } from '../../component/crudButtons';
import { ViewWeek, Email, PlaylistAddCheck } from '@material-ui/icons';

import {
  empityParteipante,
  empityQuestion,
  schema,
} from 'app/data/schema/questionSchema';

import Tooltip from '@material-ui/core/Tooltip';

const renderField = (props = {}, name, component, label, type, error) => {
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

// const partecipantiFilled = list => isItemsFieldEmpity(list);

const getPartecipantiByNum = (list, val) => {
  // const val = e.target.value;

  const partecipanti = !list ? [empityParteipante] : [...list];
  const valToNum = !val ? 1 : Number(val);
  const valNum = isNaN(valToNum) ? partecipanti.length : valToNum;
  const newVal = valNum > 99 ? 99 : valNum < 1 ? 1 : valNum;

  if (partecipanti.length === newVal) return partecipanti;

  const empityList =
    partecipanti.length < newVal
      ? Array(newVal - partecipanti.length).fill(empityParteipante)
      : [];
  const refList = [...list, ...empityList];
  const partecipantiNew =
    refList.length > newVal ? refList.slice(0, newVal) : refList;
  partecipantiNew.length === 0 && partecipantiNew.push(empityParteipante);
  // setValue();
  return partecipantiNew;
  // s
  // propsFormik.setFieldValue('', partecipantiNew);
  // setTimeout(() => propsFormik.setFieldTouched('partecipanti.1.nome', true));
};

const QuestionUsersFields = ({
  propsFormik,
  numPartecipanti,
  parentValue,
  ...rest
}) => {
  const handleSelecetedTags = () => {};
  const classes = elemStyle();
  const propValue = propsFormik?.values || {};

  const getPartecipanti = values =>
    getPartecipantiByNum(values, numPartecipanti || 1);

  const [partecipanti, setPartecipanti] = React.useState(
    getPartecipanti(propValue?.partecipanti),
  );

  const [docenti, setDocenti] = React.useState();
  const docentiAction = arrayHelper => type => {
    type === ButtonType.delete && arrayHelper.remove();
  };

  const init = () => {
    // setPartecip anti(getPartecipanti());
  };

  React.useEffect(init, []);
  React.useEffect(() => {
    if (numPartecipanti !== partecipanti.length) {
      setPartecipanti(getPartecipanti(propValue?.partecipanti));
      // propsFormik.setFieldValue('partecipanti', partecipanti);
    }
  }, [numPartecipanti]);

  const DocentiForm = (index, arrayHelper) => {
    return (
      <Paper className={`${classes.paperTitle} ${classes.width95}`} key={index}>
        <GridChilds
          justify="space-between"
          view={[4, 4, 3, 1]}
          spacing={1}
          style={{ width: '100%' }}
        >
          {renderField({}, `docenti.${index}.nome`, TextField, 'Nome')}
          {renderField({}, `docenti.${index}.email`, TextField, 'Email')}
          {renderField({}, `docenti.${index}.phone`, TextField, 'Telefono')}

          <CrudButton
            show={['delete']}
            onClick={docentiAction(arrayHelper)}
            disableds={
              index === 0 &&
              arrayHelper?.form?.values?.docenti &&
              arrayHelper?.form?.values?.docenti.length < 2
                ? ['delete']
                : null
            }
          />
        </GridChilds>
      </Paper>
    );
  };

  const PartecipanteForm = (elem, index) => {
    const renderButtonActionRecord = token => (
      <GridChilds
        justify="space-between"
        alignItems="center"
        spacing={1}
        style={{
          flexDirection: 'row',
          textAlign: 'end',
        }}
        view={[6, 6]}
      >
        <Box style={{ width: '100%' }}>
          <Tooltip title="Vai alle domande">
            <span>
              <IconButton
                style={{ fontSize: '48px' }}
                color="primary"
                aria-label="domande"
                onClick={e => {
                  debugger;
                  rest.history.push('/guest/' + token);
                }}
              >
                <PlaylistAddCheck />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <Box style={{ width: '100%' }}>
          <Tooltip title="invia mail">
            <span>
              <IconButton
                style={{ fontSize: '36px' }}
                color="primary"
                aria-label="delete"
                disabled={!token}
                onClick={e => {
                  debugger;
                  rest.history.push('/guest/' + token);
                }}
              >
                <Email />
                <span style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>
                  {elem.sendCount ? ' (' + elem.sendCount + ') ' : ''}
                </span>
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </GridChilds>
    );
    return (
      <Paper className={`${classes.paperTitle} ${classes.width95}`} key={index}>
        <GridChilds view={[3, 4, 3, 2]} spacing={3} style={{ width: '100%' }}>
          {renderField({}, `partecipanti.${index}.nome`, TextField, 'Nome')}
          {renderField({}, `partecipanti.${index}.email`, TextField, 'Email')}
          {renderField(
            {},
            `partecipanti.${index}.phone`,
            TextField,
            'Telefono',
          )}

          {renderButtonActionRecord(elem.token)}
        </GridChilds>
      </Paper>
    );
  };

  return (
    <>
      <Paper
        style={{
          marginTop: '18px',
          marginLeft: '5%',
          padding: '8px',
          paddingBotton: '18px',
          width: '95%',
        }}
      >
        <GridChilds
          view={[8, 4]}
          spacing={3}
          style={{ marginTop: '16px', width: '100%' }}
        >
          {renderField({}, 'titolo', TextField, 'Titolo')}
        </GridChilds>

        <GridChilds
          view={[4, 4, 4]}
          spacing={3}
          style={{ marginTop: '16px', width: '100%' }}
        >
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            <b>Id modolo</b> <br /> {propValue?.idmodulo || ''}{' '}
          </Typography>
          {renderField({}, 'idcorso', TextField, 'Id Corso')}
          {renderField(
            { max: 99, min: 1, onKeyUp: e => e },
            'numPartecipanti',
            TextField,
            'Num. Partecipanti',
            'number',
          )}
        </GridChilds>
      </Paper>

      <Typography variant="h4" style={{ marginTop: '12px' }}>
        Docenti
      </Typography>

      <FieldArray
        name="docenti"
        render={arrayHelper => (
          <>
            {/* value.partecipanti &&
                !value.partecipanti[0] &&
              addPartecipante(propsFormik, arrayHelper, value) */}

            {propsFormik?.values?.docenti &&
              propsFormik.values.docenti.map((elem, index) =>
                DocentiForm(index, arrayHelper),
              )}
            <GridChilds
              view={[10, 2]}
              justify="space-between"
              spacing={2}
              style={{ textAlign: 'end', marginTop: '16px', width: '100%' }}
            >
              <span> </span>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={e => arrayHelper.push(empityParteipante)}
              >
                Nuovo Docente
              </Button>
            </GridChilds>
          </>
        )}
      />

      <Typography variant="h4" style={{ marginTop: '12px' }}>
        Partecipanti
      </Typography>

      <GridChilds view={[12]} spacing={1}>
        <FieldArray
          name="partecipanti"
          render={arrayHelper => (
            <>
              {/* value.partecipanti &&
                !value.partecipanti[0] &&
              addPartecipante(propsFormik, arrayHelper, value) */}

              {partecipanti &&
                partecipanti.map((elem, index) =>
                  PartecipanteForm(elem, index, classes),
                )}
              <GridChilds
                view={[4, 2]}
                spacing={3}
                style={{ marginTop: '16px', width: '100%' }}
              >
                <span> </span>
                {/* <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={e =>
                    addPartecipante(propsFormik, arrayHelper, value)
                  }
                >
                  Aggiungi Partecipante
                </Button> */}
              </GridChilds>
            </>
          )}
        />
      </GridChilds>
    </>
  );
};

export default QuestionUsersFields;
