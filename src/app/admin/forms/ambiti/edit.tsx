// in src/Corsi.js
import {
  Box,
  Card,
  CardContent,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
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
  ArrayField,
  SingleFieldList,
  ChipField,
  DateField,
  SimpleFormIterator,
  ArrayInput,
} from 'react-admin';

// import AnagFields from '../common/anagFields';
import AndressFields from '../common/andress';
import ContactFields from '../common/contatti';

/*
CREATE TABLE `Materie`
 (
	`ID`			int, 
	`Materia`			varchar (510), 
	`Ambito`			int
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
                    label="Ambito"
                    source="ambito"
                    fullWidth
                    resource={'ambiti'}
                    helperText={false}
                  />
                </Box>
              </Box>
              <Typography variant="h6" gutterBottom>
                {'Materie'}
              </Typography>
              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <ArrayInput source="materie" label="">
                    <SimpleFormIterator>
                      <TextInput
                        source="materia"
                        resource={'ambiti'}
                        label="materia"
                        fullWidth
                      />
                    </SimpleFormIterator>
                  </ArrayInput>
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
