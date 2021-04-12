// in src/Corsi.js
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import * as React from 'react';
import { FC, useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Create,
  EditProps,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
  FormWithRedirect,
  Toolbar,
  useGetList,
  SelectArrayInput,
} from 'react-admin';

// import AnagFields from '../common/anagFields';
import AndressFields from '../common/andress';
import ContactFields from '../common/contatti';

/*
 (
	`ID`			int, 
	`COGNOME`			varchar (510), 
	`NOME`			varchar (510), 
	`CF`			varchar (510), 
	`CV`			type 0012, 
	`Tipologia`			type 0012, 
	`Note esplicative ambito`			text (255), 
	`Interna o esterna`			varchar (510),
	`-- Materie`			type 0012
);
*/
const getSource = txt => txt;
const resourceName = 'risorse';

const RenderFields = props => (
  <FormWithRedirect
    {...props}
    render={(formProps: any) => (
      <Card>
        <form>
          <CardContent>
            <Box>
              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('cognome')}
                    resource={resourceName}
                    label={'Cognome'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('nome')}
                    resource={resourceName}
                    label={'Nome'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('email')}
                    resource={resourceName}
                    label={'Email'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('tel')}
                    resource={resourceName}
                    label={'Telefono'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
              </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput
                  source="piva"
                  resource={resourceName}
                  label="Partita Iva"
                  validate={requiredValidate}
                  fullWidth
                />
              </Box>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput
                  source="cfisc"
                  resource={resourceName}
                  label="Codice Fiscale"
                  validate={requiredValidate}
                  fullWidth
                />
              </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput
                  source="tipologia"
                  resource={resourceName}
                  label="Tipologia"
                  validate={requiredValidate}
                  fullWidth
                />
              </Box>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput
                  source="interna"
                  resource={resourceName}
                  label="Interna / Esterna"
                  validate={requiredValidate}
                  fullWidth
                />
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              Materierisorse
            </Typography>

            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <SelectArrayInput
                  label="Materie"
                  source="materie"
                  reference={resourceName}
                  resource={resourceName}
                  fullWidth
                  choices={[
                    { id: 'music', name: 'Music' },
                    { id: 'photography', name: 'Photo' },
                    { id: 'programming', name: 'Code' },
                    { id: 'tech', name: 'Technology' },
                    { id: 'sport', name: 'Sport' },
                  ]}
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
            resource="customers"
          />
        </form>
      </Card>
    )}
  />
);

const rEdit: FC<EditProps> = props => (
  <Edit {...props}>
    <RenderFields {...props} />
  </Edit>
);

const rCreate: FC<EditProps> = props => {
  return (
    <Create {...props}>
      <RenderFields {...props} />
    </Create>
  );
};

const requiredValidate = [required()];
const risorse = { Edit: rEdit, Create: rCreate };

export default risorse;
