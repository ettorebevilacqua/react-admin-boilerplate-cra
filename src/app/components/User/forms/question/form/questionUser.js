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

import { CrudButton, ButtonnType } from '../../component/crudButtons';

import {
  empityParteipante,
  empityQuestion,
  schema,
} from 'app/data/schema/questionSchema';

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

const getPartecipantiByNum = (list, valNum) => {
  // const val = e.target.value;
  // const valNum = isNaN(val) ? 1 : Number(val);
  const newVal = valNum > 99 ? 99 : valNum < 1 ? 1 : valNum;
  const partecipanti = !list ? [empityParteipante] : [...list];
  debugger;
  const empityList =
    partecipanti.length < newVal
      ? Array(newVal - partecipanti.length).fill(
          empityParteipante,
          partecipanti.length - 1,
          newVal - 1,
        )
      : [];
  const refList = [...partecipanti, ...empityList];
  const partecipantiNew =
    refList.length > newVal ? refList.slice(0, newVal - 1) : refList;
  partecipantiNew.length === 0 && partecipantiNew.push(empityParteipante);
  // setValue();
  return partecipantiNew;
  // setValue({ ...value, partecipanti: partecipantiNew });
  // propsFormik.setFieldValue('', partecipantiNew);
  // setTimeout(() => propsFormik.setFieldTouched('partecipanti.1.nome', true));
};

const QuestionUsersFields = ({
  propsFormik,
  numPartecipanti,
  value,
  addPartecipante,
  parentValue,
}) => {
  const handleSelecetedTags = () => {};
  const classes = elemStyle();

  const getPartecipanti = values =>
    getPartecipantiByNum(values, numPartecipanti || 1);

  const [partecipanti, setPartecipanti] = React.useState(
    getPartecipanti(propsFormik?.values?.partecipanti || [empityParteipante]),
  );

  const init = () => {
    // setPartecipanti(getPartecipanti());
  };

  // React.useEffect(init, []);
  React.useEffect(() => {
    partecipanti && setPartecipanti(getPartecipanti(partecipanti));
  }, [numPartecipanti]);

  const PartecipanteForm = index => {
    return (
      <Paper className={`${classes.paperTitle} ${classes.width95}`} key={index}>
        <GridChilds view={[4, 4, 3, 1]} spacing={3} style={{ width: '100%' }}>
          {renderField({}, `partecipanti.${index}.nome`, TextField, 'Nome')}
          {renderField({}, `partecipanti.${index}.email`, TextField, 'Email')}
          {renderField(
            {},
            `partecipanti.${index}.phone`,
            TextField,
            'Telefono',
          )}
          <CrudButton />
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

          {renderField(
            { max: 99, min: 1, onKeyUp: () => 1 },
            'numPartecipanti',
            TextField,
            'Num. Partecipanti',
            'number',
          )}
        </GridChilds>

        <GridChilds
          view={[8, 4]}
          spacing={3}
          style={{ marginTop: '16px', width: '100%' }}
        >
          {renderField({}, 'titoloModulo', TextField, 'Titolo modulo')}
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            <b>Id modolo</b> <br /> {parentValue?.idmodulo}
          </Typography>
          {renderField({}, 'idcorso', TextField, 'Id Corso')}
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
        </GridChilds>
      </Paper>

      <Typography variant="h4" style={{ marginTop: '12px' }}>
        Partecipanti
      </Typography>

      <GridChilds
        view={[12]}
        spacing={1}
        style={{ marginTop: '1px', width: '100%', marginLeft: '5%' }}
      >
        <FieldArray
          name="partecipanti"
          render={arrayHelper => (
            <>
              {/* value.partecipanti &&
                !value.partecipanti[0] &&
              addPartecipante(propsFormik, arrayHelper, value) */}

              {partecipanti &&
                partecipanti.map((elem, index) =>
                  PartecipanteForm(index, classes),
                )}
              <GridChilds
                view={[4, 2]}
                spacing={3}
                style={{ marginTop: '16px', width: '100%' }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={e =>
                    addPartecipante(propsFormik, arrayHelper, value)
                  }
                >
                  Aggiungi Partecipante
                </Button>
              </GridChilds>
            </>
          )}
        />
      </GridChilds>
    </>
  );
};

export default QuestionUsersFields;
