import React from 'react';
import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Card';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormikOnChange from '../../lib/FormikOnChange';
import GridChilds from '../comp/gridChilds';
import TagsInput from '../comp/tagInput';
import { withSubForm } from '../../lib/formikSub';
import { ToFieldArray, withField } from '../../lib/formikWithField';

import { TextField, Checkbox, RadioGroup, Select } from 'formik-material-ui';

import { DomandaForm } from './domanda';
import { ShowQuestion } from './show';
import { Moduli } from './moduli';

const MODULO_DATA_KEY = 'smart_modulo';

const testValues = {
  modulo: '',
  domande: [
    {
      domanda: '',
      tipo: 4,
      risposte: [
        {
          risposta: 'ddd ss',
          val: true,
        },
        { risposta: 'yyy22', val: false },
      ],
    },
  ],
};

const empityValues = {
  id: null,
  title: '',
  domande: [
    {
      domanda: '',
      tipo: 4,
      risposte: [{}],
    },
  ],
};

const newDomanda = {
  domanda: '',
  tipo: 2,
  risposte: [{}],
};

const newModulo = {
  id: null,
  title: '',
};

const dataModuliInit = [
  // { id: 1, title: 'mod1', domande: [] },
  // { id: 2, title: 'mod2', domande: [] },
];

const storeValuesTxt = localStorage.getItem(MODULO_DATA_KEY);
const storeValues = storeValuesTxt ? JSON.parse(storeValuesTxt) : empityValues;
const initialValues =
  !storeValues || !storeValues[0] ? dataModuliInit : storeValues;

const nameSchema = Yup.object().shape({
  // name: Yup.string().required('Required'),
});

const handleSubmit = values => {
  console.log('form values ', values);
};

const getRisposte = domande =>
  !domande || !domande.map
    ? []
    : domande.map(domanda =>
        (!domanda.risposte || domanda.risposte.length === 0
          ? [null]
          : domanda.risposte
        ).map(risp => null),
      );

export const Domande = () => {
  const [values, setValues] = React.useState(dataModuliInit[0] || empityValues);
  const [domande, setDomande] = React.useState([newDomanda]);
  const [isAnteprima, setIsAnteprima] = React.useState([false]);
  const [isModuli, setIsModuli] = React.useState([true]);
  const [arManagerDomande, setArManagerDomande] = React.useState();
  const [currentIdxModule, setCurrentIdxModule] = React.useState(0);
  const [dataModuli, setDataModuli] = React.useState(dataModuliInit);
  const [timeOutAutoSave, setTimeOutAutoSave] = React.useState(null);
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const saveData = valuesNew => {
    if (!dataModuli[currentIdxModule]) return false;
    const dataModuliTmp = [...dataModuli];
    dataModuliTmp[currentIdxModule] = valuesNew;
    setDataModuli(dataModuliTmp);
    localStorage.setItem(MODULO_DATA_KEY, JSON.stringify(valuesNew));
    console.log('saveModuli', dataModuliTmp);
  };

  const onChangeForm = (valuesNew, isFirstTime) => {
    // if (isFirstTime) return setIsFirstTime(false);

    setValues(valuesNew);
    clearTimeout(timeOutAutoSave);
    const timeSave = !timeOutAutoSave
      ? setTimeout(() => {
          clearTimeout(timeOutAutoSave);
          setTimeOutAutoSave(null);
          saveData(valuesNew);
        }, 5000)
      : null;
    timeSave && setTimeOutAutoSave(timeSave);
    console.log('main change', values);
  };

  const onDeleteDomanda = (arrayHelper, index) => {
    debugger;
    return values.domande && values.domande[1]
      ? arrayHelper.remove(index)
      : !values.domande[0]
      ? arrayHelper.push(newDomanda)
      : arrayHelper.replace(0, newDomanda);
  };

  const arrayManager = (arrayHelper, index) => (op, val) => {
    return op === 'delete'
      ? onDeleteDomanda(arrayHelper, index)
      : op === 'clone'
      ? arrayHelper.push(val)
      : op === 'add'
      ? arrayHelper.push(newDomanda)
      : () => 1;
  };

  const onSubFormChange = (arrayHelper, index) => subValue => {
    arrayHelper.replace(index, subValue);
  };

  const editModulo = idx => {
    setCurrentIdxModule(idx);
    setValues(dataModuli[idx]);
    setIsModuli(false);
    setIsAnteprima(false);
  };

  const showModuli = () => {
    saveData(values);
    setIsModuli(true);
  };

  const commandModuli = (cmd, payload) => {
    const add = () => {
      const newModuli = [...dataModuli, empityValues];
      setIsModuli(false);
      setCurrentIdxModule(newModuli.length - 1);
      setValues(empityValues);
      setDataModuli(newModuli);
      setIsAnteprima(false);
    };
    const cmds = { add };
    cmds[cmd] && cmds[cmd](payload);
  };

  const renderNewDomanda = formikProps => (
    <Button
      variant="contained"
      color="primary"
      style={{ height: '42px', width: '120px' }}
      onClick={e => {
        debugger;
        const lenDomande = values.domande.length;
        console.log('', formikProps);
        formikProps.setFieldValue('domande.' + lenDomande, newDomanda);
      }}
    >
      <span style={{ fontSize: '11px' }}>Nuova Domanda</span>
    </Button>
  );

  const header = () => (
    <GridChilds
      view={[8, 2, 2]}
      style={{ marginTop: '16px', width: '100%', alignItems: 'center' }}
    >
      <div>
        <h2>Moduli</h2>
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ height: '42px', width: '120px' }}
        onClick={e => setIsAnteprima(!isAnteprima)}
      >
        {isAnteprima ? 'Compila' : 'Anteprima'}
      </Button>
      {!isModuli ? (
        <Button
          variant="contained"
          color="primary"
          style={{ height: '42px', width: '120px' }}
          onClick={e => showModuli()}
        >
          {'moduli'}
        </Button>
      ) : (
        <span> </span>
      )}
    </GridChilds>
  );
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleSelecetedTags = () => {};

  return (
    <div>
      {isModuli ? (
        <Moduli
          values={dataModuli}
          command={commandModuli}
          onEdit={editModulo}
        />
      ) : (
        <>
          {header()}
          {!isAnteprima && (
            <Formik
              initialValues={values}
              enableReinitialize
              onSubmit={handleSubmit}
              children={propsFormik => (
                <Form>
                  <FormikOnChange delay={500} onChange={onChangeForm} />

                  <GridChilds
                    view={[8, 4]}
                    spacing={3}
                    style={{ marginTop: '16px', width: '100%' }}
                  >
                    <Field
                      name={'title'}
                      style={{ width: '100%' }}
                      component={TextField}
                      label="Modulo nome"
                    />
                    <TagsInput
                      selectedTags={handleSelecetedTags}
                      fullWidth
                      variant="outlined"
                      id="tags"
                      name="tags"
                      placeholder="add Tags"
                      label="tags"
                    />

                    {renderNewDomanda(propsFormik)}
                  </GridChilds>
                  <div style={{ marginTop: '22px' }}>
                    <ToFieldArray
                      name="domande"
                      component={DomandaForm}
                      fieldProps={({ index, arrayHelper }) => {
                        if (values.domande && !values.domande[0]) {
                          arrayHelper.push(newDomanda);
                        }

                        return {
                          onSubFormChange: onSubFormChange(arrayHelper, index),
                          arrayManager: arrayManager(arrayHelper, index),
                          tipo: values.tipo,
                        };
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: '16px',
                      marginLeft: '36px',
                      marginRight: '36px',
                    }}
                  >
                    <span> </span>
                    {renderNewDomanda(propsFormik)}
                  </div>
                  {1 === 0 && (
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  )}
                  <Divider style={{ marginTop: '22px' }} />
                </Form>
              )}
            />
          )}
        </>
      )}
      {isAnteprima && !isModuli && (
        <>
          <div>
            <h3>Anteprima</h3>
          </div>
          <ShowQuestion
            key="mainShoeQuestion1"
            values={values}
            risposte={getRisposte(values.domande || [])}
          />
        </>
      )}
    </div>
  );
};
