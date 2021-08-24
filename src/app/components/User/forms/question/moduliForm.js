import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import GridChilds from '../component/gridChilds';

// import { Domande } from './comp/question';

import { Domande } from './form/main';
import { Moduli } from './form/moduli';
import { ShowQuestion } from './form/show';
import {
  saveValues,
  empityModulo,
  newDomanda,
  makeRisposte,
} from 'app/services/question/moduliModel';

import { providers, Selector } from '@data-provider/core';
import { saveModulo, dataSelector } from 'app/slice/moduliSlice';
import {
  userCompSlice,
  userCompSelector,
  toggleModuliShow,
} from 'app/pages/User/slice/userCompSlice';

import { QuestionModuliForm } from './';

// const moduliProvider = moduliProvider;

export const ModuliFormMaker = props => {
  const { data, isFetching, isError, onSubmit, actions } = props;
  const isModuliStore = useSelector(userCompSelector);
  const [isModuli, setIsModuli] = React.useState(isModuliStore);
  const [newId, setNewId] = React.useState();

  // const isModuli = Window.sessionStorage.getItem('appSmart_moduli_isModuli') || true;

  const [isAnteprima, setIsAnteprima] = React.useState([false]);
  const [values, setValues] = React.useState(() =>
    data && data.results ? data.results : [],
  );
  const [currentIdxModule, setCurrentIdxModule] = React.useState(0);

  const dispatch = useDispatch();
  React.useEffect(() => {
    //  data && setValues(data.results);
  }, []);

  const changeView = val => {
    // Window.sessionStorage.set('appSmart_moduli_isModuli', val);

    dispatch(toggleModuliShow(!isModuli));
    setIsModuli(!isModuli);
  };

  const onSaveData = index => domanda => {
    if (!values[index] || isFetching) return false;
    if (!domanda.id && newId) {
      domanda.id = newId;
    }
    const aa = dispatch(saveModulo(domanda)).then(savedData => {
      const dataModuliTmp = [...values];
      dataModuliTmp[index] = savedData.payload;
      setNewId(savedData.payload.id);
      setValues(dataModuliTmp);
      saveValues(dataModuliTmp);
      actions.reload();
      actions.clearState();
    });
  };

  const commandModuli = (cmd, payload) => {
    const add = () => {
      const newModuli = [...values, empityModulo];
      changeView(false);
      setCurrentIdxModule(newModuli.length - 1);
      setIsAnteprima(false);
      setValues(newModuli);
    };
    const remove = () => {
      const newValues = payload === 0 ? [empityModulo] : [...values];
      const id = newValues[payload].id;
      payload > 0 && newValues.splice(payload, 1);
      id && dispatch(saveModulo({ id, _deleted: true }));
      setValues(newValues);
      saveValues(newValues);
      setCurrentIdxModule(0);
    };

    const cmds = { add, remove };
    cmds[cmd] && cmds[cmd](payload);
  };

  const cmdDomanda = (cmd, payload) => {
    const cmds = { list: () => changeView(true) };
    cmds[cmd] && cmds[cmd](payload);
  };

  const editModulo = idx => {
    setCurrentIdxModule(idx);
    setIsAnteprima(false);
    changeView(false);
  };

  const showModuli = () => {
    onSaveData(values);
    changeView(true);
  };

  const initDomande = moduloFrom => {
    const domande =
      moduloFrom.domande && moduloFrom.domande[0]
        ? moduloFrom.domande
        : [newDomanda];
    const modulo = { ...moduloFrom, domande };
    return modulo;
  };

  const getCurrentModulo = () =>
    values[currentIdxModule]
      ? initDomande(values[currentIdxModule])
      : empityModulo;

  const HeaderModuli = props => (
    <GridChilds
      view={[8, 2, 2]}
      style={{
        marginTop: '16px',
        width: '100%',
        alignItems: 'center',
      }}
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
        onClick={e => changeView(true)}
      >
        {'moduli'}
      </Button>
    </GridChilds>
  );

  return (
    <div>
      {isModuli ? (
        <GridChilds view={[5, 7]}>
          <Moduli values={values} command={commandModuli} onEdit={editModulo} />
          <QuestionModuliForm />
        </GridChilds>
      ) : isAnteprima ? (
        <div
          style={{
            marginLeft: '24px',
          }}
        >
          <HeaderModuli />
          <ShowQuestion
            values={getCurrentModulo()}
            risposte={makeRisposte(values.domande || [])}
          />
        </div>
      ) : (
        <div
          style={{
            marginLeft: '24px',
          }}
        >
          <HeaderModuli />
          <Domande
            initialValues={getCurrentModulo()}
            command={cmdDomanda}
            onSaveData={onSaveData(currentIdxModule)}
          />
        </div>
      )}
    </div>
  );
};
/*
providers.getByTag('axios').cleanCache();

export const FormikTest = withDataLoadingError(moduliProvider.provider)(
  _FormikTest,
);
*/
