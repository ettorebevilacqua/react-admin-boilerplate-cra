import React from 'react';
import { Formik, Field } from 'formik';

// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormikOnChange from '../../lib/FormikOnChange';
import GridChilds from '../../component/gridChilds';
import TagsInput from '../comp/tagInput';
import { ToFieldArray } from '../../lib/formikWithField';

import { TextField } from 'formik-material-ui';

import { setMenuList } from 'app/slice/layoutSlice';
import { DomandaForm } from './domanda';

import { newDomanda } from 'app/services/question/moduliModel';
import { AdjustingInterval } from 'app/services/helper';

const ticker = new AdjustingInterval(null, 6000);

const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));
const dataExt = null;
export const DomandeC = ({ initialValues, saveData, actions, selectDataItem, isFirstTime, setIsFirstTime }) => {
  // const initialValues  = useLocation().state;
  /*  const temp = useSelector(selectDataItem);
  const tmp = [temp].map(val => ({ ...val }));
  const initialValues = tmp && tmp[0]; */
  const [value, setValue] = React.useState(null);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  // React.useEffect(() => actions.reload(), []);

  React.useEffect(() => initialValues && !value && setValue(initialValues), [value, initialValues]);

  const onSave = () => {
    if (isFirstTime) return false;
    saveData(value).then(res => {
      const idnew = res.payload.id;
      setValue({ ...value, id: idnew });
    });
    console.log('main change', value);
    ticker.stop();
  };

  ticker.workFunc = onSave;

  const handleSubmit = vals => {
    console.log('form value ', vals);
  };

  const onChangeForm = (valueNew, isFirstTime) => {
    if (isFirstRender) return setIsFirstRender(false);
    //  if (!valueNew) return setIsFirstTime(false);
    setValue(valueNew);
    ticker.stop();
    !isFirstTime && ticker.start();
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
    arrayHelper.replace(index, subValue);
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
  console.log('dddd', initialValues);
  console.log('ggg', value);
  if (value === null) {
    return <>load</>;
  }

  return (
    <>
      {
        <Formik
          initialvalue={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          children={propsFormik => (
            <>
              <FormikOnChange delay={500} onChange={onChangeForm} />
              PPPPPPPPPPPPPPPPPPp{JSON.stringify(value)}
              <GridChilds view={[8, 4]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
                <Field name={'title'} style={{ width: '100%' }} component={TextField} label="Modulo nome" />
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

export const Domande = ({ data, queryValue, actions, formProp: { selectData }, Domande }) => {
  // const stateData = useSelector(selectData);
  console.log('xxxxxxxxxx', queryValue);
  const id = queryValue.id;
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  data && isFirstTime && setIsFirstTime(false);
  const dataStr = JSON.stringify(data);
  const dataVal = JSON.parse(dataStr);

  React.useEffect(
    () =>
      setMenuList([
        { link: '/app/user/moduli?isCustomer', label: 'Moduli' },
        { link: '/app/user/indagini/list', label: 'Questionari' },
        { link: '/app/user/moduli/' + id, label: 'Domande' },
        { link: '/app/user/show/' + id, label: 'Anteprima' },
      ]),
    [],
  );
  return (
    <DomandeC
      initialValues={{ ...dataVal }}
      setIsFirstTime={setIsFirstTime}
      isFirstTime={isFirstTime}
      selectDataItem={selectData}
      actions={actions}
      saveData={Domande}
    />
  );
};
