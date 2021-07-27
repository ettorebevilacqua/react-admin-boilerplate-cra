import React from 'react';
import { useState } from 'react';

import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import queryString from 'query-string';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { CrudButton, ButtonnType } from '../component/CrudButtons';

import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

import TagsInput from './comp/tagInput';
import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';

const empityParteipante = { nome: '', email: '', telefono: '' };

const empityQuestion = {
  titolo: '',
  idcorso: '',
  titoloModulo: '',
  idmodulo: '',
  docenti: '',
  NumPartecipanti: '',
  partecipanti: [empityParteipante],
};

const MquestionTo = ({ id, data, saved, stateLoad, actions, ...props }) => {
  const classes = elemStyle();
  const modulo = props.location.state;
  const dataValue = (data?.data && !data.data[0]) || empityQuestion;
  dataValue.idmodulo = modulo?.id;
  const [value, setValue] = React.useState(dataValue || empityQuestion);

  if (!modulo) {
    props.history.push('/app/user/indagini');
    return <span> </span>;
  }

  console.log('xxxxx', data, stateLoad);

  const handleSubmit = val => {
    console.log('xxxx ', val);
    actions.save(val);
    // setValue(val);
  };
  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
*/
  const PartecipanteForm = index => {
    return (
      <Card
        key={index}
        style={{
          marginTop: '22px',
          marginLeft: '8px',
          marginRight: '8px',
          padding: '8px',
          width: '95%',
        }}
      >
        <GridChilds
          view={[4, 4]}
          spacing={3}
          style={{ marginTop: '16px', width: '100%' }}
        >
          <Field
            name={`partecipanti.${index}.nome`}
            style={{ width: '100%' }}
            component={TextField}
            label="Nome"
          />
          <Field
            name={`partecipanti.${index}.email`}
            style={{ width: '100%' }}
            component={TextField}
            label="Email"
          />
          <Field
            name={`partecipanti.${index}.email`}
            style={{ width: '100%' }}
            component={TextField}
            label="Telefono"
          />
          <CrudButton />
        </GridChilds>
      </Card>
    );
  };

  const handleSelecetedTags = () => {};

  return (
    <div className={classes.root}>
      <Paper className={classes.paperTitle}>
        <GridChilds style={{ alignItems: 'center' }} view={[10, 4]}>
          <Typography
            variant="h2"
            className={classes.domandaTxt}
            color="textSecondary"
          >
            Indagine {modulo?.title}
          </Typography>
          <Box style={{ width: '100%' }}>
            <Button variant="contained" color="primary" onClick={e => 1}>
              <span style={{ fontSize: '11px' }}>Save</span>
            </Button>
          </Box>
          y
        </GridChilds>
      </Paper>
      <Formik
        initialValues={value}
        enableReinitialize
        onSubmit={handleSubmit}
        children={propsFormik => (
          <Form>
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
                <Field
                  name={'titolo'}
                  style={{ width: '100%' }}
                  component={TextField}
                  label="Titolo"
                />
                <Field
                  name={'idcorso'}
                  style={{ width: '100%' }}
                  component={TextField}
                  label="Id Corso"
                />
              </GridChilds>
              <GridChilds
                view={[8, 4]}
                spacing={3}
                style={{ marginTop: '16px', width: '100%' }}
              >
                <Field
                  name={'titoloModulo'}
                  style={{ width: '100%' }}
                  component={TextField}
                  label="Titolo modulo"
                />
                <Field
                  name={'idmodulo'}
                  style={{ width: '100%' }}
                  component={TextField}
                  label="Id Modulo"
                />
              </GridChilds>

              <GridChilds
                view={[10, 2]}
                spacing={3}
                style={{ marginTop: '16px', width: '100%' }}
              >
                <TagsInput
                  selectedTags={handleSelecetedTags}
                  fullWidth
                  variant="outlined"
                  id="docenti"
                  name="docenti"
                  placeholder="add Tags"
                  label="Docenti"
                />
                <Field
                  name={'NumPartecipanti'}
                  style={{ width: '100%' }}
                  component={TextField}
                  label="Num. Partecipanti"
                />
              </GridChilds>
            </Paper>
            <GridChilds
              view={[12]}
              spacing={3}
              style={{ marginTop: '16px', width: '100%' }}
            >
              <FieldArray
                name="partecipanti"
                render={arrayHelper => (
                  <>
                    {value.partecipanti &&
                      !value.partecipanti[0] &&
                      arrayHelper.push(empityParteipante)}

                    {value.partecipanti.map((elem, index) =>
                      PartecipanteForm(index),
                    )}

                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={e => arrayHelper.push(empityParteipante)}
                    >
                      Aggiungi Partecipante
                    </Button>
                  </>
                )}
              />
            </GridChilds>
            <GridChilds
              view={[12]}
              spacing={3}
              style={{ marginTop: '16px', width: '100%' }}
            >
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Salva e invia le email
              </Button>
            </GridChilds>
          </Form>
        )}
      />
    </div>
  );
};

export const QuestionTo = MquestionTo;
