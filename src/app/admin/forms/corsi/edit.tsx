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
  DateInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
  FormWithRedirect,
  Toolbar,
  useGetList,
  SelectArrayInput,
  AutocompleteInput,
} from 'react-admin';

// import AnagFields from '../common/anagFields';
import AndressFields from '../common/andress';
import ContactFields from '../common/contatti';

/*
CREATE TABLE `Corso`
 (
	`ID`			int, 
	`Ente`			int, 
	`Titolo`			varchar (510), 
	`Data di inizio`			datetime, 
	`Soggetto finanziatore`			varchar (510), 
	`Durata`			varchar (510), 
	`Ambito`			varchar (510), 
	`Durata in ore`			int, 
	`Sede di svolgimento`			text (255), 
	`Coordinatore`			int, 
	`Tutor`			type 0012
);

*/
const choicesQualifica = [
  { id: 1, desc: 'a' },
  { id: 2, desc: 'b' },
  { id: 3, desc: 'c' },
  { id: 4, desc: 'd' },
];

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
                  <ReferenceInput
                    label="Ente"
                    source="id_ente"
                    reference="enti"
                    fullWidth
                    helperText={false}
                  >
                    <SelectInput optionText="denominazione" />
                  </ReferenceInput>
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    label="Titolo"
                    source="titolo"
                    fullWidth
                    helperText={false}
                  />
                </Box>
              </Box>
              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <DateInput
                    source={getSource('data_inizio')}
                    resource={resourceName}
                    label={'Data Inizio'}
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('durata')}
                    resource={resourceName}
                    label={'Durata'}
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('durata_ore')}
                    resource={resourceName}
                    label={'durata ore'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('ambito')}
                    resource={resourceName}
                    label={'ambito'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('coordinatore')}
                    label={'Coordinatore'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('tutor')}
                    label={'Tutor'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('finanziatore')}
                    label={'Soggetto finanziatore'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source={getSource('sede')}
                    label={'sede di svolgimento'}
                    fullWidth
                    helperText={false}
                  />
                </Box>
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
