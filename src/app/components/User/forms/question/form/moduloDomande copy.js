import React from 'react';
import { Formik, Field } from 'formik';

import { useHistory, useLocation, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormikOnChange from '../../lib/FormikOnChange';
import GridChilds from '../../component/gridChilds';
// import TagsInput from '../comp/tagInput';
import { ToFieldArray } from '../../lib/formikWithField';

import { TextField } from 'formik-material-ui';

import { setMenuList } from 'app/slice/layoutSlice';
import { DomandaForm } from './domanda';

import { empityModulo, newDomanda } from 'app/services/question/moduliModel';
import { AdjustingInterval } from 'app/services/helper';
// import { moduliSliceCrud } from 'app/slice';

const ticker = new AdjustingInterval(null, 100);
sessionStorage.removeItem('currentModuloId');
const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

export const DomandeC = ({ startValues, saveData, isFirstTime, setIsFirstTime }) => {
  // const initialValues  = useLocation().state;
  /*  const temp = useSelector(selectDataItem);
  const tmp = [temp].map(val => ({ ...val }));
  const initialValues = tmp && tmp[0]; */
  const initialValuesTmp = !startValues ? empityModulo : startValues;
  if (!initialValuesTmp.domande) {
    initialValuesTmp.domande = newDomanda;
  }
  const initialValues = { ...initialValuesTmp, domande: initialValuesTmp.domande.filter(dom => !!dom) };
  const history = useHistory();
  const param = useParams();
  const idStart = param.id;

  const [value, setValue] = React.useState(initialValues);
  const [valueTmp, setValueTmp] = React.useState(initialValues);
  const [title, setTitle] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(initialValues.id);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  // React.useEffect(() => actions.reload(), []);

  const onSave = valFrom => {
    const valueNew = valFrom ? { ...valFrom } : { ...valueTmp };
    if (isFirstTime) return setIsFirstTime(false);
    // const valNewTxt = JSON.stringify(valueNew);
    // const valueTxt = JSON.stringify(oldValue);
    // if (valNewTxt === valueTxt) return false;
    ticker.stop();
    valueNew.title = title ? title : initialValues.title;
    valueNew.id = initialValues.id ? initialValues.id : sessionStorage.getItem('currentModuloId');
    saveData(valueNew).then(res => {
      const idnew = res && res.payload && res.payload.id;
      if (valueNew.id !== idnew) {
        // window.history.pushState('', 'Modulo', '/app/user/moduli/' + idnew);
        // history.push('/app/user/moduli/' + idnew);
      }
      const toStore = { ...valueNew, id: initialValues.id ? initialValues.id : idnew };
      setCurrentId(idnew);
      if (idnew) {
        sessionStorage.setItem('currentModuloId', idnew);
      }
      // setValueTmp(toStore);
      // setValue(toStore);

      console.log('main change', toStore);
    });

    ticker.stop();
  };

  const handleSubmit = vals => {
    console.log('form value ', vals);
  };

  const checkChanged = (before, after) => {
    let isChange = false;
    if (before.domande.length !== after.domande.length) return true;
    after.domande.map((item, idx) => {
      if (!before || !before.domande || !before.domande[idx]) return true;
      const beforeDom = before.domande[idx];
      if (item && item.tipo !== beforeDom.tipo) {
        isChange = true;
      }
      if (item && item.risposte && item.risposte.length !== beforeDom.risposte.length) {
        isChange = true;
      }
    });
    return isChange;
  };

  const onChangeForm = (valueNew, isSub, isToSave) => {
    if (isFirstRender) return setIsFirstRender(false);
    // if (!valueNew.title || !valueNew.title.trim()) return false;
    //  if (!valueNew) return setIsFirstTime(false);
    const valNewTxt = JSON.stringify(valueNew);
    const valueTxt = JSON.stringify(value);
    if (valNewTxt === valueTxt) return false;

    // setValue(valueNew);
    if (!isSub && valueNew.title) {
      setTitle(valueNew.title);
    }

    const toSaveValue = { ...valueNew, title }; // isSub ? { ...valueNew, title: valueTmp.title } : { ...valueTmp, title: valueNew.title };
    console.log('title xxx', toSaveValue);

    // checkChanged(valueTmp, toSaveValue) && onSave();
    setValueTmp(toSaveValue);
    isToSave && onSave(toSaveValue);
    ticker.stop();
    // ticker.workFunc = onSave(valueTmp, toSaveValue);
    // !isFirstTime && checkChanged(valueTmp, toSaveValue) && ticker.start();
    setIsFirstTime(false);
  };

  const onDeleteDomanda = (arrayHelper, index) => {
    const _value = { ...valueTmp };
    const _domande = _value.domande.map(dom => dom);
    if (_value.domande && _value.domande[1]) {
      _domande.splice(index, 1);
      const valueT = { ..._value, domande: _domande };
      setValueTmp(valueT);
      onChangeForm(valueT, true, true);
    }

    return _value.domande && _value.domande[1]
      ? arrayHelper.remove(index)
      : !_value.domande[0]
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
    if (!value || !subValue || !value.domande || !value.domande[index]) return false;

    const _domande = value.domande.map((dom, idxDomanda) => (idxDomanda === index ? subValue : dom));
    const _value = { ...valueTmp, domande: _domande };
    setValueTmp(_value);
    onChangeForm(_value, true);
    // arrayHelper.replace(index, subValue);
  };

  const renderNewDomanda = formikProps => (
    <Button
      variant="contained"
      color="primary"
      style={{ height: '42px', width: '120px' }}
      onClick={() => {
        const lenDomande = value.domande.length;
        console.log('', formikProps);
        const _value = { ...valueTmp };
        const _domande = _value.domande.map(dom => dom);
        _domande.push(newDomanda);
        const valueT = { ..._value, domande: _domande };
        setValueTmp(valueT);
        onChangeForm(valueT, true, true);
        formikProps.setFieldValue('domande.' + lenDomande, newDomanda);
      }}
    >
      <span style={{ fontSize: '11px' }}>Nuova Domanda</span>
    </Button>
  );

  const handleSelecetedTags = () => {};
  if (value === null) {
    return <>load</>;
  }

  return (
    <>
      {
        <Formik
          initialValues={valueTmp}
          onSubmit={handleSubmit}
          validateOnChange={false}
          children={propsFormik => (
            <>
              <FormikOnChange delay={500} onChange={onChangeForm} />
              <GridChilds view={[8, 4]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
                <Field name="title" style={{ width: '100%' }} component={TextField} label="Modulo nome" />
                <h3>Moduli</h3>
                {1 == 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: '42px', width: '180px' }}
                    onClick={() => onSave()}
                  >
                    Salva
                  </Button>
                )}
                {/*
                  <TagsInput
                    selectedTags={handleSelecetedTags}
                    fullWidth
                    variant="outlined"
                    id="tags"
                    name="tags"
                    placeholder="add Tags"
                    label="tags"
                  />
                */}

                {propsFormik.values.title && renderNewDomanda(propsFormik)}
              </GridChilds>
              <div style={{ marginTop: '22px' }}>
                {!propsFormik.values.title ? (
                  <h3>Inserire il titolo</h3>
                ) : (
                  <ToFieldArray
                    name="domande"
                    component={DomandaForm}
                    fieldProps={({ index, arrayHelper }) => {
                      if (valueTmp.domande && !valueTmp.domande[0]) {
                        arrayHelper.push(newDomanda);
                      }

                      return {
                        onSubFormChange: onSubFormChange(arrayHelper, index),
                        arrayManager: arrayManager(arrayHelper, index),
                        tipo: toNumberOr(value && value.tipo, 0),
                        values:
                          valueTmp && valueTmp.domande && valueTmp.domande[index]
                            ? valueTmp.domande[index]
                            : newDomanda,
                      };
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  marginTop: '16px',
                  marginLeft: '36px',
                  marginRight: '36px',
                }}
              >
                <span> </span>
                {propsFormik.values.title && renderNewDomanda(propsFormik)}
              </div>
              {1 === 0 && (
                <Button color="primary" variant="contained" fullWidth type="submit">
                  Submit
                </Button>
              )}
              <Divider style={{ marginTop: '22px' }} />
            </>
          )}
        />
      }
    </>
  );
};

export const Domande = ({ data, queryValue, actions, formProp: { selectData }, saveData }) => {
  // const stateData = useSelector(selectData);
  const id = queryValue.id;
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const location = useLocation();

  const dataParam = toNumberOr(id, -1) === 0 ? empityModulo : data;
  // const questionModulo = location.state && location.state.data;
  // moduliSliceCrud.actions.reset();
  React.useEffect(() => {
    data && data.id !== id && toNumberOr(id, -1) !== 0 && actions.reset();
    if (data && toNumberOr(id, -1) !== 0 && data.id !== id && data.id !== null) {
      // actions.reload();
    }
    console.log('loc', data);
    // !data && id && actions.get(id, true);
  }, []);
  React.useEffect(() => {
    data &&
      setMenuList([
        { link: '/app/user/moduli', label: 'Moduli' },
        { link: '/app/user/moduli/' + id, label: 'Domande' },
        // { link: '/app/user/show/' + id, label: 'Anteprima', data: { moduli: [data], title: data.title } },
      ]);
  }, [data]);
  sessionStorage.removeItem('currentModuloId');
  return (
    <DomandeC
      startValues={{ ...dataParam }}
      setIsFirstTime={setIsFirstTime}
      isFirstTime={isFirstTime}
      selectDataItem={selectData}
      actions={actions}
      saveData={saveData}
    />
  );
};
