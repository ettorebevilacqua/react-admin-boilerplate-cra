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
import RelatedInputAddList from '../lists/relatedInputAddList';

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
                  <ReferenceInput
                    label="Risorsa"
                    source="id_risorsa"
                    reference="risorse"
                    fullWidth
                    helperText={false}
                  >
                    <SelectInput optionText="cognome" />
                  </ReferenceInput>
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <DateInput
                    source={getSource('data_qualifica')}
                    resource={resourceName}
                    label={'Data Qualifica'}
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <RelatedInputAddList
                    label={'Modalità qualifica'}
                    source={getSource('modalita')}
                    reference="modqualifica"
                    resource={resourceName}
                    optionText="modalita"
                    labelCreate="Nuova qualifica"
                    helperText={false}
                  />
                </Box>
              </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput
                  source="responsabile"
                  resource={resourceName}
                  label="Responsabile"
                  validate={requiredValidate}
                  fullWidth
                />
              </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput
                  source="note"
                  resource={resourceName}
                  label="Note esplicative qualifica"
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
