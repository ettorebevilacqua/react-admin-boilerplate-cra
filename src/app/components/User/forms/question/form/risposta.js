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

const MRispostaForm = ({ name, errors, touched, fieldProps, ...props }) => {
  const arrayManager = fieldProps.arrayManager;
  const index = fieldProps.index;
  const [tipo, setTipo] = useState(fieldProps.tipo);
  const { values, setFieldValue } = useFormikContext();

  const onChangeForm = (values, isFirstTime) => {
    !isFirstTime &&
      fieldProps.onSubFormChange &&
      fieldProps.onSubFormChange(values);
  };

  React.useEffect(() => setTipo(fieldProps.tipo), [fieldProps.tipo]);

  const getChecked = () => values.val;

  const onClickOptions = () => {
    const newVal = !values.val;
    // setFieldValue('val', newVal);
    fieldProps.onChange && fieldProps.onChange(name, newVal);
  };

  const getRadioChecked = () =>
    getChecked() ? (
      <>
        <Box>
          <RadioButtonChecked color="primary" onClick={onClickOptions} />
          <span> Vero</span>
        </Box>
        <Box>
          <RadioButtonUnchecked color="primary" onClick={onClickOptions} />
          <span> Falso</span>
        </Box>
      </>
    ) : (
      <>
        <Box>
          <RadioButtonUnchecked color="primary" onClick={onClickOptions} />
          <span> Vero</span>
        </Box>
        <Box>
          <RadioButtonChecked color="primary" onClick={onClickOptions} />
          <span> Falso</span>
        </Box>
      </>
    );

  const TrueOrFalse = () => {
    <GridChilds view={[8, 4]}>
      getChecked() ? <RadioButtonChecked onClick={onClickOptions} />
    </GridChilds>;
  };

  const addCorrelata = () => {
    setFieldValue('correlata', {});
    fieldProps.onSubFormChange({ ...values, correlata: {} });
  };

  const renderTipo = () =>
    tipo === 2 ? (
      getChecked() ? (
        <RadioButtonChecked onClick={onClickOptions} />
      ) : (
        <RadioButtonUnchecked onClick={onClickOptions} />
      )
    ) : tipo === 3 ? (
      <Field component={Checkbox} name="val" type="checkbox" />
    ) : tipo === 1 ? (
      <Box component="fieldset" mb={3} borderColor="transparent"></Box>
    ) : tipo === 4 ? (
      <Field component={RadioGroup} aria-label="gender" name="gender1">
        {getRadioChecked()}
      </Field>
    ) : tipo === 5 ? (
      <span></span>
    ) : (
      <span>dd</span>
    );

  const renderRisposte = () => (
    <Card
      style={{
        marginTop: '18px',
        marginLeft: '60px',
        marginRight: '8px',
        padding: '8px',
        height: '100%',
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

        <GridChilds key="1aag" view={[4, 1, 1, 4, 1]}>
          <div>{renderTipo()}</div>
          <Box>
            <ArrowDownward color="primary" onClick={event => alert('ddd')} />
          </Box>
          <Box>
            <ArrowUpward color="primary" onClick={event => alert('ddd')} />
          </Box>
          <Box style={{ width: '100%' }}>
            <Button variant="contained" color="primary" onClick={addCorrelata}>
              <span style={{ fontSize: '11px' }}> Correlata</span>
            </Button>
          </Box>
          <Box>
            <DeleteIcon
              color="primary"
              onClick={event => arrayManager('delete')}
            />
          </Box>
        </GridChilds>
      </GridChilds>
      {values.correlata && (
        <GridChilds key="ss04" view={[1, 11]}>
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
          />
        </GridChilds>
      )}
    </Card>
  );

  return <div>{renderRisposte()}</div>;
};

export const RispostaForm = withSubForm(MRispostaForm, nameSchema);
