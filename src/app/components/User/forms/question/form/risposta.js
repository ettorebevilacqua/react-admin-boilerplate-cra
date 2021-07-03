import React from 'react';
import { useState } from 'react';

import { useFormikContext, Field, FieldArray } from 'formik';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import * as Yup from 'yup';
import { withSubForm } from '../../lib/formikSub';
import { useValues } from '../../lib/useValues';
import GridChilds from '../comp/gridChilds';
import { withField } from '../../lib/formikWithField';
import FormikOnChange from '../../lib/FormikOnChange';
import { TextField, Checkbox, RadioGroup } from 'formik-material-ui';
import { Rating } from 'formik-material-ui-lab';
import { DomandaForm } from './domanda';

const nameSchema = Yup.object().shape({
  // risposta: Yup.string().required('Required'),
  //  last: Yup.string().required('Required'),
});

const newDomanda = {
  domanda: '',
  tipo: 1,
  risposte: [{}],
};

const CompTrueFalse = ({
  value,
  title,
  compProps,
  color,
  onClickOptions,
  ...props
}) => {
  const Comp = value ? RadioButtonChecked : RadioButtonUnchecked;
  const propComp = {
    color,
    onClick: onClickOptions,
    ...compProps,
  };
  return (
    <Box {...props}>
      <Comp {...propComp} /> <span> {title}</span>
    </Box>
  );
};

const MRispostaForm = ({ name, errors, touched, fieldProps, ...props }) => {
  const arrayManager = fieldProps.arrayManager;
  const index = fieldProps.index;
  const [tipo, setTipo] = useState(fieldProps.tipo);
  const [valValue, setValValue] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  const onChangeForm = (values, isFirstTime) => {
    !isFirstTime &&
      fieldProps.onSubFormChange &&
      fieldProps.onSubFormChange(values);
  };

  React.useEffect(() => {
    setValValue(values.val);
  }, [values.val]);

  React.useEffect(() => {
    setTipo(fieldProps.tipo);
  }, [fieldProps.tipo]);

  const onClickOptions = () => {
    const newVal = !valValue;
    setValValue(newVal);
    fieldProps.onChange && fieldProps.onChange(name, newVal);
  };

  const radioTrueFalse = val => (
    <>
      {['Vero', 'Falso'].map((title, index) => (
        <div key={index}>
          <CompTrueFalse
            key={index}
            value={!index ? val : !val}
            title={title}
            color={!index ? 'primary' : 'secondary'}
            onClickOptions={onClickOptions}
          />
        </div>
      ))}
    </>
  );

  const addCorrelata = () => {
    setFieldValue('correlata', newDomanda);
    //  fieldProps.onSubFormChange({ ...values, correlata: newDomanda });
  };

  const onCorrelataFormChange = subValue => {
    setFieldValue('correlata', subValue);
    // fieldProps.onSubFormChange({ ...values, correlata: subValue });
  };

  const renderTipoInner = () =>
    tipo === 2 ? (
      valValue ? (
        <RadioButtonChecked
          color={valValue ? 'primary' : 'secondary'}
          onClick={onClickOptions}
        />
      ) : (
        <RadioButtonUnchecked color="secondary" onClick={onClickOptions} />
      )
    ) : tipo === 3 ? (
      <Field component={Checkbox} name="val" type="checkbox" />
    ) : tipo === 1 ? (
      <Box component="fieldset" mb={3} borderColor="transparent"></Box>
    ) : tipo === 4 ? (
      <Field component={RadioGroup} aria-label="gender" name="gender1">
        {radioTrueFalse(valValue, [true, false])}
      </Field>
    ) : tipo === 5 || tipo === 6 ? (
      <span></span>
    ) : (
      <span></span>
    );

  const renderButtonRisposta = e => (
    <GridChilds
      key="1aag"
      justify="space-between"
      alignItems="center"
      spacing={2}
      view={[2, 4, 1, 1, 1]}
    >
      <Box style={{ float: 'left', marginRight: '6px' }}>
        <Box style={{ float: 'left' }}>
          <ArrowUpward
            color="primary"
            onClick={event => arrayManager('moveup')}
          />
        </Box>
        <Box>
          <ArrowDownward
            color="primary"
            onClick={event => arrayManager('movedown')}
          />
        </Box>
      </Box>
      <Box style={{ width: '100%' }}>
        {!values.correlata && !fieldProps.isCorrelata && (
          <Button variant="contained" color="primary" onClick={addCorrelata}>
            <span style={{ fontSize: '11px' }}>Add</span>
          </Button>
        )}
      </Box>
      <Box>
        {!(fieldProps.index === 0) && (
          <DeleteIcon
            style={{ fontSize: '36px' }}
            color="secondary"
            onClick={event => arrayManager('delete')}
          />
        )}
      </Box>

      <span> </span>
    </GridChilds>
  );

  const renderTipo = val =>
    tipo !== 5 && tipo !== 1 ? (
      <GridChilds
        key="1aag"
        style={{ alignItems: 'center' }}
        justify="space-between"
        view={[5, 7]}
        spacing={5}
      >
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
            {fieldProps.renderScala()}
            {renderButtonRisposta()}
          </GridChilds>
        ) : (
          <GridChilds
            justify="space-between"
            alignItems="center"
            spacing={2}
            key="ss0"
            view={[8, 4]}
          >
            <div>
              <Field
                component={TextField}
                fullWidth
                name={`risposta`}
                label="Risposta"
              />
            </div>

            <div style={{ marginLeft: '8px' }}>{renderTipo()}</div>
          </GridChilds>
        )}
        {values.correlata && (
          <GridChilds
            key="ss04"
            style={{ alignItems: 'center' }}
            view={[11, 1]}
          >
            <Field
              component={DomandaForm}
              name="correlata"
              label="Correlata"
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
              onClick={e => {
                setFieldValue('correlata', false);
                fieldProps.onSubFormChange({ ...values, correlata: false });
              }}
            />
          </GridChilds>
        )}
      </Card>
    </GridChilds>
  );
};

export const RispostaForm = withSubForm(MRispostaForm, nameSchema);
