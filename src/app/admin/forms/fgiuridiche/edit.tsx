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
CREATE TABLE `Qualifica`
 (
	`ID`			int, 
	`Ente`			int, 
	`Risorsa`			int, 
	`Data qualifica iniziale`			datetime, 
	`Modalità di qualifica`			type 0012, 
	`Note esplicative qualifica`			text (255), 
	`Responsabile qualifica`			varchar (510)
);

*/
const choicesQualifica = [
  { id: 1, desc: 'a' },
  { id: 2, desc: 'b' },
  { id: 3, desc: 'c' },
  { id: 4, desc: 'd' },
];

const getSource = txt => txt;
const resourceName = 'fgiuridiche';

const RenderFields = props => (
  <FormWithRedirect
    {...props}
    render={(formProps: any) => (
      <Card>
        <form>
          <CardContent>
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
            </Box>
          </CardContent>
          <Toolbar
            record={formProps.record}
            basePath={formProps.basePath}
            undoable={true}
            invalid={formProps.invalid}
            handleSubmit={formProps.handleSubmit}
            saving={formProps.saving}
            resource={resourceName}
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
