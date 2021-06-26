import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik';

export const withField = Component => ({ field, form, ...props }) => (
  <Component {...field} {...form} {...props} />
);

export const ToFieldArray = ({
  name,
  renderHeader,
  renderFooter,
  ...props
}) => {
  const { values } = useFormikContext();

  const renderField = arrayHelper => (elem, index) => {
    const fieldProps = props.fieldProps
      ? props.fieldProps({ index, arrayHelper })
      : {};
    return (
      <div key={index}>
        <Field
          {...props}
          name={`${name}.${index}`}
          fieldProps={{ arrayHelper: { ...arrayHelper }, index, ...fieldProps }}
          onChange={e => console.log('has Change Field', e)}
        />
      </div>
    );
  };

  return (
    <FieldArray
      name={name}
      render={arrayHelper => (
        <>
          {renderHeader && renderHeader({ name, arrayHelper })}
          {values[name].map(renderField(arrayHelper))}
          {renderFooter && renderFooter({ name, arrayHelper })}
        </>
      )}
    />
  );
};
