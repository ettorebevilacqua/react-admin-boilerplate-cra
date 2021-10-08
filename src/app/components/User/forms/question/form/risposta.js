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
import { MDomandaForm } from './domanda';
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

const CompTrueFalse = ({ value, title, onChange, compProps, color, onClickOption, ...props }) => {
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
  domanda,
  risposta,
  risposte,
  renderScala,
  arrayManager,
  isCorrelata,
  fieldProps,
  arrayHelper,
  name,
}) => {
  tipo = toNumberOr(tipo, 0);

  // const [values, setValues] = useState(risposte[idxList]);
  const { values, setFieldValue } = useFormikContext();
  const [valValue, setValValue] = useState(true);
  const [correlata, setCorrelata] = useState(
    isCorrelata || !risposta || !risposta.correlata ? false : risposta.correlata,
  );
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [disableChange, setDisableChange] = useState(false);

  const idDomanda = domanda && domanda._id;
  if (idDomanda === '6152131aed4d7651a672e71d') {
    //  console.log('idex xxxx ', risposta, values); //);
  }

  // React.useEffect(() => setValues(risposte), [risposte]);

  const onChangeForm = valueNew => {
    if (isFirstTime || disableChange) {
      setIsFirstTime(false);
      setDisableChange(false);
      return false;
    }
    // changeRisposta && changeRisposta(valueNew);
    // console.log('risposta change form ', valueNew);
    // !isFirstTime && fieldProps.onSubFormChange && fieldProps.onSubFormChange(values);
  };

  const getCorrelata = idx => {
    if ([5, 6].indexOf(tipo) > -1) return null;
    const _risposta = risposte[idx];
    return _risposta && _risposta.correlata ? _risposta.correlata : null;
  };

  const resize = (arr, newSize, defaultValue) => [
    ...arr,
    ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue),
  ];

  const onClickOption = () => {
    // console.log('click risposta', idxRisposta);
    if (isCorrelata || !values || !values.risposte || !values.risposte[idxList]) return false;
    const valBefore = risposte[idxList].val;
    const isBool = [2, 3, 4].indexOf(tipo) > -1;
    const valBoolTmp = isBool ? !valBefore : valBefore;
    const correlata = getCorrelata(idxList);

    const valBool = valBoolTmp; //correlata ? { val: valBoolTmp, correlata: {} } : valBoolTmp;
    const _risposteResizedTmp = risposte.length - 1 < idxList ? resize([], idxList + 1, null) : [...risposte];
    const _risposte = _risposteResizedTmp.map((el, idx) => ({ ...el, val: tipo === 2 ? null : el.val }));
    // const resizeIf = val => (val ? resize([], idxRisposta + 1, null) : _risposte[idxRisposta]);
    // const _rispostaOptionTmp = tipo === 2  ? valBoolTmp : resizeIf(_risposte.length - 1 < idxRisposta);
    _risposte[idxList].val = tipo === 2 ? valBool : valBool; // { ..._risposte[idxRisposta], val: tipo === 2 ? !valBool : !valBool };
    // setRisposte(_risposte);
    // formiklProps.setFieldValue(`risposte.${idxRisposta}.val`, valBool);
    // arrayHelper.replace(idxList, _risposte);
    setFieldValue(`risposte`, _risposte);
    // onChangeRisposta && onChangeRisposta(idRisposta, idxRisposta, _risposte);
    // replace(`risposte.${idxRisposta}.rating`, { ..._risposte[idxRisposta] });
    // return tipo === 2 ? setRisposte(_risposte) : isBool && changeRisposte(idxModulo, idxDomanda, idxRisposta, valBool);
  };

  const onClickOptionInternal = () => {
    const newVal = !valValue;
    // setValValue(newVal);
    onClickOption();
  };

  const addCorrelata = () => {
    const val = !risposta.correlata ? newDomanda : false;
    setFieldValue(`risposte.${idxList}.correlata`, val);
    return false;
    setDisableChange(true);
    setCorrelata(val);
    setTimeout(() => {
      setFieldValue(`risposte.${idxList}.correlata`, val);
      // changeCorrelata({ ...risposta, correlata: val });
    }, 40);

    // fieldProps.onSubFormChange({ ...values, correlata: newDomanda });
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

  const onCorrelataFormChange = subValue => {
    setFieldValue(`risposte.${idxList}.correlata`, subValue);
    return false;
    // fieldProps.onSubFormChange({ ...values, correlata: subValue });
  };

  const renderTipoInner = () =>
    tipo === 2 ? (
      risposta.val ? (
        <RadioButtonChecked color={risposta.val ? 'primary' : 'secondary'} onClick={onClickOptionInternal} />
      ) : (
        <RadioButtonUnchecked color="secondary" onClick={onClickOptionInternal} />
      )
    ) : tipo === 3 ? (
      <Field component={Checkbox} indeterminate={false} name={`risposte.${idxList}.val`} type="checkbox" />
    ) : tipo === 1 ? (
      <Box component="fieldset" mb={3} borderColor="transparent"></Box>
    ) : tipo === 4 ? (
      <Field component={RadioGroup} aria-label="gender" name="gender1">
        {radioTrueFalse(risposta.val, [true, false])}
      </Field>
    ) : tipo === 5 || tipo === 6 ? (
      <span></span>
    ) : (
      <span></span>
    );

  const renderButtonRisposta = () => (
    <GridChilds
      key="1aag"
      justify="space-between"
      alignItems="center"
      spacing={2}
      view={isCorrelata ? [2, 2] : [8, 2, 2]}
    >
      {!isCorrelata && (
        <Box>
          <Button style={{ width: '100px' }} variant="contained" color="primary" onClick={addCorrelata}>
            <span style={{ fontSize: '11px' }}>{risposta && risposta.correlata ? 'Rimuovi' : 'Correlata'}</span>
          </Button>
        </Box>
      )}

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

  if (!risposta) return <span> </span>;

  return (
    <GridChilds key="gg01" style={{ alignItems: 'center' }} view={[1, 11]}>
      <span> </span>
      <Card
        style={{
          marginTop: '18px',
          padding: '8px',
          height: '100%',
          width: '100%',
        }}
      >
        <FormikOnChange delay={400} onChange={onChangeForm} />
        {tipo === 1 ? (
          <GridChilds key="gg01" style={{ alignItems: 'center' }} view={[7, 3, 1]}>
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
        {risposta.correlata && (
          <GridChilds key="ss04" style={{ alignItems: 'center' }} view={[11, 1]}>
            {!isCorrelata && (
              <MDomandaForm
                initialValues={risposta.correlata}
                isCorrelata={true}
                correlataVal={risposta.correlata}
                formikPath={`risposte.${idxList}.correlata.`}
                onCorrelataFormChange={onCorrelataFormChange}
              />
            )}
            <DeleteIcon
              childprops={{ style: { height: '100%' } }}
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
