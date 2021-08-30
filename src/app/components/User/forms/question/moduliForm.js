import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import { AutoTabs } from 'app/components/Layout/autoTabs';
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

export const ModuliFormMaker = props => {
  const { data, isFetching, isError, onSubmit, actions } = props;
  const [newId, setNewId] = React.useState();
  const [tabValue, setTabValue] = React.useState(0);
  const [values, setValues] = React.useState(() =>
    data && data.results ? data.results : [],
  );
  const [currentIdxModule, setCurrentIdxModule] = React.useState(0);

  const dispatch = useDispatch();
  React.useEffect(() => {
    //  data && setValues(data.results);
  }, []);

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
      setCurrentIdxModule(newModuli.length - 1);
      setTabValue(2);
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
    const cmds = { list: () => setTabValue(2) };
    cmds[cmd] && cmds[cmd](payload);
  };

  const editModulo = idx => {
    setCurrentIdxModule(idx);
    setTabValue(2);
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
    </GridChilds>
  );

  const renserShow = () => (
    <div style={{ marginLeft: '24px' }}>
      <HeaderModuli />
      <ShowQuestion
        values={getCurrentModulo()}
        risposte={makeRisposte(values.domande || [])}
      />
    </div>
  );

  const renderDomande = () => (
    <div style={{ marginLeft: '24px' }}>
      <HeaderModuli />
      <Domande
        initialValues={getCurrentModulo()}
        command={cmdDomanda}
        onSaveData={onSaveData(currentIdxModule)}
      />
    </div>
  );

  const compTabs = [
    <Moduli values={values} command={commandModuli} onEdit={editModulo} />,
    <QuestionModuliForm moduli={values} />,
    renderDomande,
    renserShow,
  ];

  const tabsElem = [
    { label: 'Moduli', comp: () => compTabs[0] },
    { label: 'Questionari', comp: () => compTabs[1] },
    { label: 'domande', comp: compTabs[2] },
    { label: 'Anteprima', comp: compTabs[3] },
  ];

  const visibleTabs = [
    [0, 1],
    [0, 1],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ];

  return (
    <div>
      <AutoTabs
        value={tabValue}
        onChange={(event, newValue) => setTabValue(newValue)}
        tabs={tabsElem}
        visibles={visibleTabs}
      />
    </div>
  );
};
/*
providers.getByTag('axios').cleanCache();

export const FormikTest = withDataLoadingError(moduliProvider.provider)(
  _FormikTest,
);
*/
