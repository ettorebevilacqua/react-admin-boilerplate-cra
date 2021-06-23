export const withField = Component => ({ field, form, ...props }) => (
  <Component {...field} {...form} {...props} />
);
