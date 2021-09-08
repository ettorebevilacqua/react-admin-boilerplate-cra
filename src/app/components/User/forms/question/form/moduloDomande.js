import React from 'react';
import { Formik, Field } from 'formik';

// import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormikOnChange from '../../lib/FormikOnChange';
import GridChilds from '../../component/gridChilds';
// import TagsInput from '../comp/tagInput';
import { ToFieldArray } from '../../lib/formikWithField';

import { TextField } from 'formik-material-ui';

import { setMenuList } from 'app/slice/layoutSlice';
import { DomandaForm } from './domanda';

import { newDomanda } from 'app/services/question/moduliModel';
import { AdjustingInterval } from 'app/services/helper';

const ticker = new AdjustingInterval(null, 6000);

const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

export const DomandeC = ({ initialValues, saveData, isFirstTime, setIsFirstTime }) => {
  // const initialValues  = useLocation().state;
  /*  const temp = useSelector(selectDataItem);
  const tmp = [temp].map(val => ({ ...val }));
  const initialValues = tmp && tmp[0]; */
  const [value, setValue] = React.useState(null);
  const [valueTmp, setValueTmp] = React.useState(null);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  // React.useEffect(() => actions.reload(), []);

  React.useEffect(() => {
    initialValues && !value && setValue(initialValues);
    setValueTmp(initialValues);
  }, [value, initialValues]);

  const onSave = (oldValue, valueNew) => () => {
    if (isFirstTime) return setIsFirstTime(false);
    const valNewTxt = JSON.stringify(valueNew);
    const valueTxt = JSON.stringify(oldValue);
    if (valNewTxt === valueTxt) return false;

    saveData(valueNew).then(res => {
      const idnew = res && res.payload && res.payload.id;
      if (idnew) {
        setValue({ ...valueNew, id: idnew });
        setValueTmp(valueNew);
      }
    });
    console.log('main change', valueNew);
    ticker.stop();
  };

  const handleSubmit = vals => {
    console.log('form value ', vals);
  };

  const onChangeForm = (valueNew, isFirstTime, isSub) => {
    if (isFirstRender) return setIsFirstRender(false);
    // if (!valueNew.title || !valueNew.title.trim()) return false;
    //  if (!valueNew) return setIsFirstTime(false);
    const valNewTxt = JSON.stringify(valueNew);
    const valueTxt = JSON.stringify(value);
    if (valNewTxt === valueTxt) return false;

    // setValue(valueNew);

    const toSaveValue = isSub ? { ...valueNew, title: valueNew.title } : { ...valueTmp, title: valueNew.title };
    setValueTmp(toSaveValue);
    ticker.stop();
    ticker.workFunc = onSave(valueTmp, toSaveValue);
    !isFirstTime && ticker.start(value);
    setIsFirstTime(false);
  };

  const onDeleteDomanda = (arrayHelper, index) => {
    return value.domande && value.domande[1]
      ? arrayHelper.remove(index)
      : !value.domande[0]
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
    onChangeForm(_value, false, true);
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
          initialValues={value}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validateOnChange={false}
          children={propsFormik => (
            <>
              <FormikOnChange delay={500} onChange={onChangeForm} />
              <GridChilds view={[8, 4]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
                <Field name={'title'} style={{ width: '100%' }} component={TextField} label="Modulo nome" />
                <h3>Moduli</h3>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: '42px', width: '180px' }}
                  onClick={() => onSave()}
                >
                  Salva
                </Button>
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

                {renderNewDomanda(propsFormik)}
              </GridChilds>
              <div style={{ marginTop: '22px' }}>
                <ToFieldArray
                  name="domande"
                  component={DomandaForm}
                  fieldProps={({ index, arrayHelper }) => {
                    if (value.domande && !value.domande[0]) {
                      arrayHelper.push(newDomanda);
                    }

                    return {
                      onSubFormChange: onSubFormChange(arrayHelper, index),
                      arrayManager: arrayManager(arrayHelper, index),
                      tipo: toNumberOr(value && value.tipo, 0),
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
  React.useEffect(() => {
    data &&
      setMenuList([
        { link: '/app/user/moduli', label: 'Moduli' },
        { link: '/app/user/questionModuli', label: 'Questionari' },
        { link: '/app/user/moduli/' + id, label: 'Domande' },
        // { link: '/app/user/show/' + id, label: 'Anteprima', data: { moduli: [data], title: data.title } },
      ]);
  }, [data]);

  return (
    <DomandeC
      initialValues={{ ...data }}
      setIsFirstTime={setIsFirstTime}
      isFirstTime={isFirstTime}
      selectDataItem={selectData}
      actions={actions}
      saveData={saveData}
    />
  );
};
