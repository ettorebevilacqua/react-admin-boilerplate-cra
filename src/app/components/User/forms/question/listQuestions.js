import React from 'react';
import { useState } from 'react';

import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import FormikOnChange from '../lib/FormikOnChange';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import QuestionUsersFields from './form/questionUser';
import {
  empityParteipante,
  empityQuestion,
  schema,
} from 'app/data/schema/questionSchema';

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
import { CrudButton, ButtonnType } from '../component/crudButtons';
import { ViewWeek } from '@material-ui/icons';

const MlistQuestions = ({
  formProp: { id, data, saved, stateLoad, meta },
  queryValue,
  onSubmit,
  actions,
  ...props
}) => {
  const { modulo, questions } = data || {};
  const [values, setValues] = React.useState();
  const classes = elemStyle();

  const loadData = () => data && data.questions && setValues(data.questions);
  React.useEffect(loadData, [data]);

  // if (data && !modulo) {
  //  props.history.push('/app/user/indagini');
  // return <span> </span>;
  // }

  const renderButtonActionRecord = id => (
    <GridChilds style={{ textAlign: 'end' }} view={[12]}>
      <Button
        variant="contained"
        color="primary"
        onClick={e => props.history.push(`/app/user/indagini_edit/${id}`)}
      >
        <span className={classes.buttonAction}>Vai</span>
      </Button>
    </GridChilds>
  );

  const renderTitle = propsFormik => (
    <div className={classes.paperTitle}>
      <GridChilds
        justify="space-between"
        style={{ alignItems: 'center' }}
        view={[9, 3]}
      >
        <div>
          <Typography variant="h3" color="textSecondary">
            Indagini Aperte soddifazione cliente :
          </Typography>
          <Typography variant="h4" color="error">
            {saved?.isError && saved?.errorMessage}
          </Typography>
        </div>
      </GridChilds>
    </div>
  );

  const renderValue = data => key => (
    <div className={classes.paperRowElem}>{data[key] || ''}</div>
  );

  const renderHeaderList = (fields, sizes) => {
    return (
      <Paper
        className={`${classes.paperRow} ${classes.width95}`}
        key={'headerFields'}
      >
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={sizes}
        >
          {fields.map(field => (
            <div className={classes.fieldTitle}>{field}</div>
          ))}
        </GridChilds>
      </Paper>
    );
  };

  const getRenderValues = (fields, dataTo) => {
    const vals = fields.map(renderValue(dataTo));
    vals.push(renderButtonActionRecord(dataTo.id));
    return vals;
  };

  const renderList = (fields, sizes) => (dataTo, index) => {
    return (
      <Paper className={`${classes.paperRow} ${classes.width95}`} key={index}>
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={[...sizes, 2]}
        >
          {getRenderValues(fields, dataTo).map(elem => elem)}
        </GridChilds>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      {renderTitle()}
      {renderHeaderList(
        ['Modulo', 'Titolo', 'idCorso', 'Visualizza'],
        [4, 4, 2, 2],
      )}
      {!!values &&
        values.map(
          renderList(['titoloModulo', 'titolo', 'idcorso'], [4, 4, 2]),
        )}
    </div>
  );
};

export const ListQuestions = MlistQuestions;
