import React from 'react';
import { useState } from 'react';

import { useFormikContext, Field } from 'formik';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
// import RadioGroup from '@material-ui/core/RadioGroup';

import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import * as Yup from 'yup';
import GridChilds from '../../component/gridChilds';
import FormikOnChange from '../../lib/FormikOnChange';
import { TextField, Checkbox, RadioGroup } from 'formik-material-ui';
import { DomandaForm } from './domanda';
import { AdjustingInterval } from 'app/services/helper';

const nameSchema = Yup.object().shape({
  // risposta: Yup.string().required('Required'),
  //  last: Yup.string().required('Required'),
});

const newDomanda = {
  domanda: '',
  tipo: 1,
  risposte: [{ val: null }],
};

const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));
const ticker = new AdjustingInterval(null, 1000);

const CompTrueFalse = ({ value, title, compProps, color, onClickOption, ...props }) => {
  const Comp = value ? RadioButtonChecked : RadioButtonUnchecked;
  const propComp = {
    color,
    onClick: onClickOption,
    ...compProps,
  };
  return (
    <Box {...props}>
      <Comp {...propComp} /> <span> {title}</span>
    </Box>
  );
};

const MRispostaForm = ({
  idxList,
  tipo,
  risposte,
  valRisposta,
  renderScala,
  onClickOption,
  arrayManager,
  isCorrelata,
  fieldProps,
  name,
}) => {
  tipo = toNumberOr(tipo, 0);

  const [values, setValues] = useState(risposte[idxList]);
  const [valValue, setValValue] = useState(true);
  const { values: valueCtx, setFieldValue } = useFormikContext();

  React.useEffect(() => setValues(risposte), [risposte]);
  const onSave = newVal => () => {
    fieldProps.onSubFormChange && fieldProps.onSubFormChange(newVal);
  };
  // console.log('valRisposta', values);
  // console.log('valRisposta valueCtx ', valueCtx);

  const onChangeForm = (valueNew, isFirstTime) => {
    const valNewTxt = JSON.stringify(valueNew);
    const valueTxt = JSON.stringify(values);
    // if (isFirstTime || valNewTxt === valueTxt) return false;
    // ticker.stop();
    // ticker.workFunc = onSave(valueNew);
    // ticker.start();

    // !isFirstTime && fieldProps.onSubFormChange && fieldProps.onSubFormChange(values);
  };

  const onClickOptionInternal = () => {
    const newVal = !valValue;
    // setValValue(newVal);
    onClickOption();
  };

  const radioTrueFalse = val => (
    <>
      {['Vero', 'Falso'].map((title, index) => (
        <div key={index}>
          <CompTrueFalse
            key={index}
            value={val === null || val === undefined ? false : index === 0 ? val : !val}
            title={title}
            color={!index ? 'primary' : 'secondary'}
            onClickOption={onClickOptionInternal}
          />
        </div>
      ))}
    </>
  );

  const addCorrelata = () => {
    !valRisposta.correlata
      ? setFieldValue(`risposte.${idxList}.correlata`, newDomanda)
      : setFieldValue(`risposte.${idxList}.correlata`, false);
    //  fieldProps.onSubFormChange({ ...values, correlata: newDomanda });
  };

  const onCorrelataFormChange = subValue => {
    setFieldValue(`risposte.${idxList}.correlata`, subValue);
    // fieldProps.onSubFormChange({ ...values, correlata: subValue });
  };

  const renderTipoInner = () =>
    tipo === 2 ? (
      valRisposta.val ? (
        <RadioButtonChecked color={valRisposta.val ? 'primary' : 'secondary'} onClick={onClickOptionInternal} />
      ) : (
        <RadioButtonUnchecked color="secondary" onClick={onClickOptionInternal} />
      )
    ) : tipo === 3 ? (
      <Field component={Checkbox} indeterminate={false} name={`risposte.${idxList}.val`} type="checkbox" />
    ) : tipo === 1 ? (
      <Box component="fieldset" mb={3} borderColor="transparent"></Box>
    ) : tipo === 4 ? (
      <Field component={RadioGroup} aria-label="gender" name="gender1">
        {radioTrueFalse(valRisposta.val, [true, false])}
      </Field>
    ) : tipo === 5 || tipo === 6 ? (
      <span></span>
    ) : (
      <span></span>
    );

  const renderButtonRisposta = () => (
    <GridChilds key="1aag" justify="space-between" alignItems="center" spacing={2} view={[8, 2, 2]}>
      <Box>
        <Button style={{ width: '100px' }} variant="contained" color="primary" onClick={addCorrelata}>
          <span style={{ fontSize: '11px' }}>{valRisposta && valRisposta.correlata ? 'Rimuovi' : 'Correlata'}</span>
        </Button>
      </Box>

      <Box style={{ float: 'left', marginRight: '6px' }}>
        <Box style={{ float: 'left' }}>
          <ArrowUpward color="primary" onClick={() => arrayManager('moveup')} />
        </Box>
        <Box>
          <ArrowDownward color="primary" onClick={() => arrayManager('movedown')} />
        </Box>
      </Box>

      <Box>
        {!(idxList === 0) && (
          <DeleteIcon style={{ fontSize: '36px' }} color="secondary" onClick={() => arrayManager('delete')} />
        )}
      </Box>
    </GridChilds>
  );

  const renderTipo = () =>
    tipo !== 5 && tipo !== 1 ? (
      <GridChilds key="1aag" style={{ alignItems: 'center' }} justify="space-between" view={[5, 7]} spacing={5}>
        <div>{renderTipoInner()}</div>
        {renderButtonRisposta()}
      </GridChilds>
    ) : (
      <span></span>
    );

  return (
    <GridChilds key="gg01" style={{ alignItems: 'center' }} view={[1, 11]}>
      <span> </span>
      <Card
        style={{
          marginTop: '18px',
          padding: '8px',
          height: '100%',
          width: '95%',
        }}
      >
        <FormikOnChange delay={500} onChange={onChangeForm} />
        {tipo === 1 ? (
          <GridChilds key="gg01" style={{ alignItems: 'center' }} view={[8, 4]}>
            {renderScala()}
            {renderButtonRisposta()}
          </GridChilds>
        ) : (
          <GridChilds justify="space-between" alignItems="center" spacing={2} key="ss0" view={[8, 4]}>
            <div>
              <Field component={TextField} fullWidth name={`risposte.${idxList}.risposta`} label="Risposta" />
            </div>

            {tipo !== 5 && <div style={{ marginLeft: '8px' }}>{renderTipo()}</div>}
          </GridChilds>
        )}
        {valRisposta.correlata && (
          <GridChilds key="ss04" style={{ alignItems: 'center' }} view={[11, 1]}>
            <DomandaForm
              initialValues={valRisposta.correlata}
              fieldProps={{
                onCorrelataFormChange: onCorrelataFormChange,
                expanded: true,
                tipo: tipo,
                parentValues: values,
              }}
            />

            <DeleteIcon
              childProps={{ style: { height: '100%' } }}
              style={{ fontSize: '38px' }}
              color="secondary"
              onClick={() => {
                setFieldValue('correlata', false);
                fieldProps && fieldProps.onSubFormChange && fieldProps.onSubFormChange({ ...values, correlata: false });
              }}
            />
          </GridChilds>
        )}
      </Card>
    </GridChilds>
  );
};

export const RispostaForm = MRispostaForm;

/*


*/
