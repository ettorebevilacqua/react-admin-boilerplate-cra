import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { DomandaForm } from './domanda';
import Divider from '@material-ui/core/Divider';
import GridChilds from '../../component/gridChilds';
// import TagsInput from '../comp/tagInput';
// import { ToFieldArray } from '../../lib/formikWithField';

import TextField from '@material-ui/core/TextField';

import { setMenuList } from 'app/slice/layoutSlice';

import { empityModulo, newDomanda } from 'app/services/question/moduliModel';
import { AdjustingInterval } from 'app/services/helper';
import { elemStyle } from '../../stylesElement';

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
  const classes = elemStyle();
  const param = useParams();
  const idStart = param.id;

  const [value, setValue] = React.useState(initialValues);
  const [valueTmp, setValueTmp] = React.useState(initialValues);
  const [title, setTitle] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(initialValues.id);
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const location = useLocation();

  const idStartValue = toNumberOr(idStart, 0) === 0 ? false : idStart;
  // React.useEffect(() => actions.reload(), []);

  const onSave = valFrom => {
    const valueNew = valFrom ? { ...valFrom } : { ...valueTmp };
    if (isFirstTime) return setIsFirstTime(false);
    // const valNewTxt = JSON.stringify(valueNew);
    // const valueTxt = JSON.stringify(oldValue);
    // if (valNewTxt === valueTxt) return false;
    ticker.stop();
    valueNew.title = title ? title : initialValues.title;
    /* if (idStartValue) {
      !!valueNew.id = initialValues.id ? initialValues.id : idStart;
    } */

    saveData(valueNew).then(res => {
      const idnew = res && res.payload && res.payload.id;
      if (!res || !res.payload) return false;
      if (valueNew.id !== idnew) {
        // window.history.pushState('', 'Modulo', '/app/user/moduli/' + idnew);
        // history.push('/app/user/moduli/' + idnew);
      }

      const toStore = { ...valueNew, id: initialValues.id ? initialValues.id : idnew };
      setCurrentId(idnew);
      setValueTmp(toStore);
      setValue(toStore);
      window.history.replaceState(null, null, `/app/user/moduli/${idnew}`);
      // history.push(`/app/user/moduli/'${idnew}`);
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

    const toSaveValue = { ...valueNew }; // isSub ? { ...valueNew, title: valueTmp.title } : { ...valueTmp, title: valueNew.title };
    console.log('onChangeForm xxx', toSaveValue);

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
      onChangeForm(valueT, true);
    }
  };

  const onCloneDomanda = val => {
    const _value = { ...valueTmp };
    const _domande = _value.domande.map(dom => dom);
    _domande.push(val);
    const valueT = { ..._value, domande: _domande };
    setValueTmp(valueT);
    onChangeForm(valueT, true);
  };

  const arrayManager = (arrayHelper, index) => (op, val) => {
    return op === 'delete'
      ? onDeleteDomanda(arrayHelper, index)
      : op === 'clone'
      ? onCloneDomanda(val)
      : op === 'add'
      ? arrayHelper.push(newDomanda)
      : () => 1;
  };

  const onSubFormChange = (arrayHelper, index) => subValue => {
    if (!valueTmp || !subValue || !value.domande || !valueTmp.domande[index]) return false;

    const _domande = value.domande.map((dom, idxDomanda) => (idxDomanda === index ? subValue : dom));
    const _value = { ...valueTmp, domande: _domande };
    setValueTmp(_value);
    onChangeForm(_value, true, false);
    // arrayHelper.replace(index, subValue);
  };

  const domandaSave = idx => value => {
    onSubFormChange(null, idx)(value);
    onSave();
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
        // formikProps.setFieldValue('domande.' + lenDomande, newDomanda);
      }}
    >
      <span style={{ fontSize: '11px' }}>Nuova Domanda</span>
    </Button>
  );

  const domandaChange = () => {};

  const handleSelecetedTags = () => {};
  if (value === null) {
    return <>load</>;
  }
  const changeTitle = title => {
    setTitle(title);
    setValueTmp({ ...valueTmp, title });
  };

  return (
    <div className={classes.root}>
      <GridChilds view={[9, 3]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
        <TextField
          fullWidth
          name="title"
          value={valueTmp.title}
          label="Start descrizione"
          onChange={e => changeTitle(e.target.value)}
        />
        {1 === 1 && (
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

        {value.title && renderNewDomanda()}
      </GridChilds>
      {valueTmp?.domande.map((domanda, index) => {
        const fieldProps = {
          onSubFormChange: onSubFormChange(null, index),
          arrayManager: arrayManager(null, index),
          tipo: toNumberOr(value && value.tipo, 0),
          values: valueTmp && valueTmp.domande && valueTmp.domande[index] ? valueTmp.domande[index] : newDomanda,
        };
        return (
          <DomandaForm
            key={index}
            initialValues={
              valueTmp && valueTmp.domande && valueTmp.domande[index] ? valueTmp.domande[index] : newDomanda
            }
            name="domande"
            setFieldValue={domandaChange}
            fieldProps={fieldProps}
            domandaSave={domandaSave(index)}
          />
        );
      })}
      <div
        style={{
          marginTop: '16px',
          marginLeft: '36px',
          marginRight: '36px',
        }}
      >
        <span> </span>
        {value.title && renderNewDomanda()}
      </div>
      {1 === 0 && (
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      )}
      <Divider style={{ marginTop: '22px' }} />
    </div>
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
    // console.log('loc', data);
    // !data && id && actions.get(id, true);
  }, []);
  React.useEffect(() => {
    if (data) {
      sessionStorage.removeItem('currentModuloId');

      /*  data && data.id !== id && toNumberOr(id, -1) !== 0 && actions.reset();
      if (data && toNumberOr(id, -1) !== 0 && data.id !== id && data.id !== null) {

        // actions.reload();
      }   */
      console.log('loc', data);

      setMenuList([
        { link: '/app/user/moduli', label: 'Moduli' },
        { link: '/app/user/moduli/' + id, label: 'Domande' },
        // { link: '/app/user/show/' + id, label: 'Anteprima', data: { moduli: [data], title: data.title } },
      ]);
    }
  }, [data]);

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
