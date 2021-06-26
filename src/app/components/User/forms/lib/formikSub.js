import { Formik } from 'formik';
import React from 'react';

const onSubmit = () => {};

export const withSubForm = (Component, validationSchema) => ({
  field,
  form,
  fieldProps,
}) => {
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
