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
  risposte: [],
};

const CompTrueFalse = ({
  value,
  title,
  compProps,
  color,
  key,
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
        <CompTrueFalse
          value={!index ? val : !val}
          title={title}
          color={!index ? 'primary' : 'secondary'}
          onClickOptions={onClickOptions}
        />
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
    ) : tipo === 5 ? (
      <span></span>
    ) : (
      <span></span>
    );

  const renderTipo = val =>
    tipo !== 5 && (
      <GridChilds key="1aag" style={{ alignItems: 'center' }} view={[5, 7]}>
        <div>{renderTipoInner()}</div>
        <GridChilds key="1aag" view={[2, 1, 4, 1, 1]}>
          <Box>
            <DeleteIcon
              color="secondary"
              onClick={event => arrayManager('delete')}
            />
          </Box>
          <div> </div>
          <Box style={{ width: '100%' }}>
            <Button variant="contained" color="primary" onClick={addCorrelata}>
              <span style={{ fontSize: '11px' }}>Add</span>
            </Button>
          </Box>
          <Box style={{ float: 'left', marginRight: '6px' }}>
            <box>
              <ArrowUpward
                color="primary"
                onClick={event => arrayManager('moveup')}
              />
            </box>
            <box>
              <ArrowDownward
                color="primary"
                onClick={event => arrayManager('movedown')}
              />
            </box>
          </Box>
        </GridChilds>
      </GridChilds>
    );

  return (
    <Card
      fullWidth
      style={{
        marginTop: '18px',
        marginLeft: '60px',
        marginRight: '8px',
        padding: '8px',
        height: '100%',
        width: '95%',
      }}
    >
      <FormikOnChange delay={500} onChange={onChangeForm} />
      <GridChilds key="ss0" view={[8, 4]}>
        <Field
          component={TextField}
          fullWidth
          name={`risposta`}
          label="Risposta"
        />

        {renderTipo()}
      </GridChilds>
      {values.correlata && (
        <GridChilds key="ss04" style={{ alignItems: 'center' }} view={[1, 11]}>
          <Grid
            container
            spacing={3}
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
            }}
          >
            <DeleteIcon
              style={{ fontSize: '28px' }}
              onClick={e => {
                setFieldValue('correlata', false);
                fieldProps.onSubFormChange({ ...values, correlata: false });
              }}
            />
          </Grid>
          <Field
            component={DomandaForm}
            fullWidth
            name="correlata"
            label="Correlata"
            fieldProps={{
              onCorrelataFormChange: onCorrelataFormChange,
              tipo: tipo,
            }}
          />
        </GridChilds>
      )}
    </Card>
  );
};

export const RispostaForm = withSubForm(MRispostaForm, nameSchema);
