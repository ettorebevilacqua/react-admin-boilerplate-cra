import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getParamTab } from 'app/components/Layout/autoTabs';

import { Moduli } from './form/moduli';
import { empityModulo, newDomanda } from 'app/services/question/moduliModel';
import { setMenuList } from 'app/slice/layoutSlice';

import { saveModulo } from 'app/slice/moduliSlice';

const toNumberOr = (val, orVal) => (!val ? 2 : isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

export const ModuliFormMakerC = props => {
  const { isFetching, actions, values, setValues } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const intiTab = getParamTab(location, 'tabs1');
  const [newId, setNewId] = React.useState();
  const [tabValue, setTabValue] = React.useState(intiTab);

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

  return <Moduli values={values} command={commandModuli} />;
};

export const ModuliFormMaker = props => {
  debugger;
  const data = props.data && props.data.results ? props.data.results : [];
  const storeIdx = toNumberOr(sessionStorage.getItem('moduliForm'), 0);

  React.useEffect(
    () =>
      setMenuList([
        { link: '/app/user/moduli?isCustomer', label: 'Moduli' },
        { link: '/app/user/indagini/list', label: 'Questionari' },
        // { link: '/app/user/domande', label: 'Domande' },
        // { link: '/app/user/show', label: 'Anteprima' },
      ]),
    [],
  );

  data && data[0] && data.length - 1 < storeIdx && sessionStorage.setItem('moduliForm', 0);

  const [values, setValues] = React.useState(() => data);

  if (!data) return <h2>Attendere</h2>;
  return <ModuliFormMakerC values={values} setValues={setValues} {...props} />;
};
/*
providers.getByTag('axios').cleanCache();

export const FormikTest = withDataLoadingError(moduliProvider.provider)(
  _FormikTest,
);
*/
