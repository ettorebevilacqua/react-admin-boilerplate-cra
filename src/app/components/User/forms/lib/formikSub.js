import React from 'react';
import { Formik } from 'formik';

const onSubmit = () => {};

export const withSubForm = Component => ({ field, form, fieldProps }) => {
  const initialValues = field.value;
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      children={props => {
        return (
          <>
            <Component
              {...props}
              setFieldValue={form.setFieldValue}
              setFieldError={form.setFieldError}
              setErrors={form.setErrors}
              name={field.name}
              fieldProps={fieldProps}
              onChange={form.handleChange}
            />
          </>
        );
      }}
    />
  );
};
