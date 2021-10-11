import { Button as ButtonPrime } from 'primereact/button';

const buttonsCrud = {
  edit: ({ style, icon, className, rest }) => (
    <ButtonPrime
      icon={icon || 'pi pi-pencil'}
      className={className || 'p-button-rounded p-button-success p-mr-2'}
      style={style || { height: '2rem', width: '2rem' }}
      {...rest}
    />
  ),
  delete: ({ style, icon, className, rest }) => (
    <ButtonPrime
      icon={icon || 'pi pi-trash'}
      className={className || 'p-button-rounded p-button-warning'}
      style={style || { height: '2rem', width: '2rem' }}
      {...rest}
    />
  ),
};

export default buttonsCrud;
