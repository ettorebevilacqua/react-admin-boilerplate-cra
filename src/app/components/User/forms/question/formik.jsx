import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import GridChilds from './comp/gridChilds';

// import { Domande } from './comp/question';

import { Domande } from './form/main';
import { Moduli } from './form/moduli';
import { ShowQuestion } from './form/show';
import {
  getValues,
  saveValues,
  empityModulo,
  getRisposte,
} from 'app/services/question/moduliModel';

export const FormikTest = props => {
  const [isModuli, setIsModuli] = React.useState([true]);
  const [isAnteprima, setIsAnteprima] = React.useState([false]);
  const [values, setValues] = React.useState(getValues());
  const [currentIdxModule, setCurrentIdxModule] = React.useState(0);

  const onSaveData = index => domanda => {
    if (!values[index]) return false;
    const dataModuliTmp = [...values];
    dataModuliTmp[index] = domanda;
    setValues(dataModuliTmp);
    saveValues(dataModuliTmp);
  };

  const commandModuli = (cmd, payload) => {
    const add = () => {
      const newModuli = [...values, empityModulo];
      setIsModuli(false);
      setCurrentIdxModule(newModuli.length - 1);
      setIsAnteprima(false);
      setValues(newModuli);
    };
    const remove = () => {
      const newValues = payload === 0 ? [empityModulo] : [...values];
      payload > 0 && newValues.splice(payload, 1);
      setValues(newValues);
      saveValues(newValues);
      setCurrentIdxModule(0);
    };

    const cmds = { add, remove };
    cmds[cmd] && cmds[cmd](payload);
  };

  const cmdDomanda = (cmd, payload) => {
    const cmds = { list: () => setIsModuli(true) };
    cmds[cmd] && cmds[cmd](payload);
  };

  const editModulo = idx => {
    setCurrentIdxModule(idx);
    setIsAnteprima(false);
    setIsModuli(false);
  };

  const showModuli = () => {
    onSaveData(values);
    setIsModuli(true);
  };

  const getCurrentModulo = () => values[currentIdxModule] || empityModulo;

  const HeaderModuli = props => (
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
      <Button
        variant="contained"
        color="primary"
        style={{ height: '42px', width: '120px' }}
        onClick={e => setIsModuli(true)}
      >
        {'moduli'}
      </Button>
    </GridChilds>
  );

  return (
    <div>
      {isModuli ? (
        <Moduli values={values} command={commandModuli} onEdit={editModulo} />
      ) : isAnteprima ? (
        <>
          <HeaderModuli />
          <ShowQuestion
            values={getCurrentModulo()}
            risposte={getRisposte(values.domande || [])}
          />
        </>
      ) : (
        <>
          <HeaderModuli />
          <Domande
            initialValues={getCurrentModulo()}
            command={cmdDomanda}
            onSaveData={onSaveData(currentIdxModule)}
          />
        </>
      )}
    </div>
  );
};
