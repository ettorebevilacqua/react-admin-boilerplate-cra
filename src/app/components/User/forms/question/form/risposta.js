import React from 'react';
import { useState } from 'react';

import { useFormikContext, Field } from 'formik';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import * as Yup from 'yup';
import { withSubForm } from '../../lib/formikSub';
import { useValues } from '../../lib/useValues';
import GridChilds from '../comp/gridChilds';
import { withField } from '../../lib/formikWithField';
import FormikOnChange from '../../lib/FormikOnChange';
import { TextField, Checkbox } from 'formik-material-ui';
import { Rating } from 'formik-material-ui-lab';

const nameSchema = Yup.object().shape({
  // risposta: Yup.string().required('Required'),
  //  last: Yup.string().required('Required'),
});

/*
add Field <Field name="bval" component={Bform} />
*/
const handleSubmit = values => {
  alert('ss');
  console.log('form values ', values);
};
const onChangeForm = (values, isFirstTime) => {
  isFirstTime && alert('ddd');
  console.log('values sssss', isFirstTime, values);
};

const MRispostaForm = ({ name, errors, touched, ...props }) => {
  const [tipo, setTipo] = useState('Opzione multipla');
  const { values } = useFormikContext();

  const index = 0;
  const idxDomanda = 0;

  const renderTipo = () =>
    tipo === 'Opzione unica' ? (
      <Field component={Checkbox} name="val" type="checkbox" />
    ) : tipo === 'Opzione multipla' ? (
      <Field component={Checkbox} name="val" type="checkbox" />
    ) : tipo === 'Scala' ? (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <GridChilds view={[2, 8, 2]}></GridChilds>
      </Box>
    ) : (
      <span></span>
    );

  return (
    <GridChilds view={[6, 6]}>
      <GridChilds view={[6, 6]}>
        <FormikOnChange delay={500} onChange={onChangeForm} />
        <span>{index + 1} )</span>
        <Field
          component={TextField}
          fullWidth
          name={`risposta`}
          label="Risposta"
        />
      </GridChilds>
      <div>{renderTipo()}</div>
    </GridChilds>
  );
};

export const RispostaForm = withSubForm(MRispostaForm, nameSchema);
