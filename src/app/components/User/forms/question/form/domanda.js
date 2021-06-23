import React from 'react';
import { Form, Field } from 'formik';
import * as Yup from 'yup';
import { withSubForm } from '../../lib/formikSub';
import { useValues } from '../../lib/useValues';
import { Bform } from './other';

const nameSchema = Yup.object().shape({
  first: Yup.string().required('Required'),
  last: Yup.string().required('Required'),
});

/*
add Field <Field name="bval" component={Bform} />
*/

const NameForm = ({ name, errors, touched, ...props }) => {
  useValues(name, props);

  return (
    <div>
      <div>
        <label>
          First Name:
          <Field name="first" />
          {errors.first && touched.first ? <div>{errors.first}</div> : null}
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <Field name="last" />
          {errors.last && touched.last ? <div>{errors.last}</div> : null}
        </label>
      </div>
      <div>
        <label>
          bval sub sub:
          <Field name="bval" component={Bform} />
          {errors.first && touched.first ? <div>{errors.first}</div> : null}
        </label>
      </div>
    </div>
  );
};

export const NameSubForm = withSubForm(NameForm, nameSchema);
