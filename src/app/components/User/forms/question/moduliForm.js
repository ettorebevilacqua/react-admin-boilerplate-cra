import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AutoTabs, getParamTab } from 'app/components/Layout/autoTabs';
import GridChilds from '../component/gridChilds';

// import { Domande } from './comp/question';

import { Domande } from './form/main';
import { Moduli } from './form/moduli';
import { ShowQuestion } from './form/show';
import { empityModulo, newDomanda, makeRisposte } from 'app/services/question/moduliModel';

import { saveModulo } from 'app/slice/moduliSlice';

import { QuestionModuliForm } from './';

const toNumberOr = (val, orVal) => (!val ? 2 : isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

export const ModuliFormMakerC = props => {
  const { isFetching, actions, values, setValues } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const intiTab = getParamTab(location, 'tabs1');
  const [newId, setNewId] = React.useState();
  const [tabValue, setTabValue] = React.useState(intiTab);

  const getIdxModulo = () => toNumberOr(sessionStorage.getItem('moduliForm'), 0);

  const setterIdxModulo = idx => {
    sessionStorage.setItem('moduliForm', idx);
  };

  const editModulo = idx => {
    setterIdxModulo(idx);
    setTabValue(2);
  };

  React.useEffect(() => {
    //  data && setValues(data.results);
  }, []);

  const onSaveData = index => domanda => {
    if (isFetching) return false;
    if (!domanda.id && newId) {
      domanda.id = newId;
    }
    dispatch(saveModulo(domanda)).then(savedData => {
      const dataModuliTmp = [...values];
      dataModuliTmp[index] = savedData.payload;
      setNewId(savedData.payload.id);
      setValues(dataModuliTmp);
      actions.reload();
    });
  };

  const commandModuli = (cmd, payload) => {
    const add = () => {
      // const newModuli = [...values, empityModulo];
      setterIdxModulo(-1);
      // setValues(newModuli);
      onSaveData(values.lenght)({ ...empityModulo, title: 'Nuovo' });
      // setTimeout(() => setTabValue(2), 50);
    };
    const remove = () => {
      const newValues = payload === 0 ? [empityModulo] : [...values];
      const id = newValues[payload].id;
      payload > 0 && newValues.splice(payload, 1);
      id && dispatch(saveModulo({ id, _deleted: true }));
      setValues(newValues);
      setterIdxModulo(0);
      actions.reload();
    };

    const cmds = { add, remove };
    cmds[cmd] && cmds[cmd](payload);
  };

  const cmdDomanda = (cmd, payload) => {
    const cmds = { list: () => setTabValue(2) };
    cmds[cmd] && cmds[cmd](payload);
  };

  const initDomande = moduloFrom => {
    const domande = moduloFrom.domande && moduloFrom.domande[0] ? moduloFrom.domande : [newDomanda];
    const modulo = { ...moduloFrom, domande };
    return modulo;
  };

  const getCurrentModulo = () => {
    const cur = getIdxModulo();
    return values && cur > -1 && values[cur] ? initDomande(values[cur]) : empityModulo;
  };

  const HeaderModuli = () => (
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
      <ShowQuestion values={{ moduli: [getCurrentModulo()] }} risposte={makeRisposte(values.domande || [])} />
    </div>
  );

  const renderDomande = () => (
    <div style={{ marginLeft: '24px' }}>
      <HeaderModuli />
      <Domande initialValues={getCurrentModulo()} command={cmdDomanda} onSaveData={onSaveData(getIdxModulo())} />
    </div>
  );

  const compTabs = {
    moduli: <Moduli values={values} current={getIdxModulo()} command={commandModuli} onEdit={editModulo} />,
    qModuli: <QuestionModuliForm moduli={values} />,
    domande: renderDomande,
    show: renserShow,
  };

  const tabsElem = [
    { label: 'Moduli', comp: () => compTabs.moduli },
    { label: 'Questionari', comp: () => compTabs.qModuli },
    { label: 'Domande', comp: compTabs.domande },
    { label: 'Anteprima', comp: compTabs.show },
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
        tabsName="tabs1"
        value={tabValue}
        tabs={tabsElem}
        visibles={visibleTabs}
        onChange={newValue => {
          tabValue && setTabValue(newValue);
        }}
      />
    </div>
  );
};

export const ModuliFormMaker = props => {
  const data = props.data && props.data.results ? props.data.results : [];
  const storeIdx = toNumberOr(sessionStorage.getItem('moduliForm'), 0);

  data && data[0] && data.length - 1 < storeIdx && sessionStorage.setItem('moduliForm', 0);

  const [values, setValues] = React.useState(() => data);

  if (!data) return <h2>Attender</h2>;
  return <ModuliFormMakerC values={values} setValues={setValues} {...props} />;
};
/*
providers.getByTag('axios').cleanCache();

export const FormikTest = withDataLoadingError(moduliProvider.provider)(
  _FormikTest,
);
*/
