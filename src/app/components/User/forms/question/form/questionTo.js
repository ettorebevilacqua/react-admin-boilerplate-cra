import React from 'react';
import { useState } from 'react';

import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import queryString from 'query-string';

import { withSubForm } from '../../lib/formikSub';
import { useValues } from '../../lib/useValues';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';

import FormikOnChange from '../../lib/FormikOnChange';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TagsInput from '../comp/tagInput';

import CardContent from '@material-ui/core/CardContent';
import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

import GridChilds from '../comp/gridChilds';
import { ToFieldArray } from '../../lib/formikWithField';

const nameSchema = Yup.object().shape({});

const handleSubmit = () => 1;

const initialValues = {};

const MquestionTo = props => {
  const modulo = props.location.state;

  if (!initialValues) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }
  const handleSelecetedTags = () => {};
  return (
    <Card>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        children={propsFormik => (
          <Form>
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
            <GridChilds
              view={[12]}
              spacing={3}
              style={{ marginTop: '16px', width: '100%' }}
            >
              <TagsInput
                selectedTags={handleSelecetedTags}
                fullWidth
                variant="outlined"
                id="partecipanti"
                name="partecipanti"
                placeholder="add Tags"
                label="Partecipanti"
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
    </Card>
  );
};

export const QuestionTo = MquestionTo;
