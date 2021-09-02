// in src/Corsi.js
import { Box, Card, CardContent } from '@material-ui/core';
import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  EditProps,
  Edit,
  TextInput,
  required,
  FormWithRedirect,
  Toolbar,
} from 'react-admin';

const RenderFields = props => {
  const { resource, source, label, ...other } = props;

  return (
    <FormWithRedirect
      {...other}
      render={(formProps: any) => (
        <Card>
          <form>
            <CardContent>
              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={source}
                    resource={resource}
                    label={label}
                    validate={requiredValidate}
                    fullWidth
                  />
                </Box>
              </Box>
            </CardContent>
            <Toolbar
              record={formProps.record}
              basePath={formProps.basePath}
              undoable={true}
              invalid={formProps.invalid}
              handleSubmit={formProps.handleSubmit}
              saving={formProps.saving}
              resource={resource}
            />
          </form>
        </Card>
      )}
    />
  );
};

const EditItem = resourcesProps => (props: EditProps) => (
  <Edit {...props}>
    <RenderFields {...resourcesProps} />
  </Edit>
);

const CreateItem = resourcesProps => (props: EditProps) => {
  return (
    <Create {...props}>
      <RenderFields {...resourcesProps} />
    </Create>
  );
};

const requiredValidate = [required()];
const lists = props => {
  return {
    Edit: EditItem(props) as FC<EditProps>,
    Create: CreateItem(props) as FC<EditProps>,
  };
};

export default lists;
