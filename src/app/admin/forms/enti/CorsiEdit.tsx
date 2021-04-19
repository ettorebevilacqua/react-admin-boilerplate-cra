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
  ArrayInput,
  SimpleFormIterator,
  useTranslate,
} from 'react-admin';

// import AnagFields from '../common/anagFields';
import AndressFields from '../common/andress';
import ContactFields from '../common/contatti';
import RelatedInputAddList from '../lists/relatedInputAddList';

/*
`ID`			int, 
`Denominazione`			varchar (510), 
`Codice Ateco`			varchar (510), 
`Codice Fiscale`			varchar (510), 
`Partita IVA`			varchar (510), 
`Telefono 1`			varchar (510), 
`Telefono 2`			varchar (510), 
`e-mail 1`			varchar (510), 
`e-mail 2`			varchar (510), 
`pec`			varchar (510), 
`Indirizzo sede legale`			varchar (510), 
`CAP sede legale`			varchar (510), 
`Comune sede legale`			varchar (510), 
`Provincia sede legale`			varchar (510), 
`Indirizzo sede operativa 1`			varchar (510), 
`CAP sede operativa 1`			varchar (510), 
`Comune sede operativa 1`			varchar (510), 
`Provincia sede operativa 1`			varchar (510), 
`Indirizzo sede operativa 2`			varchar (510), 
`CAP sede operativa 2`			varchar (510), 
`Comune sede operativa 2`			varchar (510), 
`Provincia sede operativa 2`			varchar (510), 
`Indirizzo sede operativa 3`			varchar (510), 
`CAP sede operativa 3`			varchar (510), 
`Comune sede operativa 3`			varchar (510), 
`Provincia sede operativa 3`			varchar (510), 
`Forma Giuridica`			int, 
`SDI`			varchar (510), 
`Nome referente`			varchar (510), 
`Cogmome referente`			varchar (510), 
`Telefono referente`			varchar (510), 
`e-mail referente`			varchar (510)
*/

const getSource = source => '' + source;

const RenderFields = props => {
  const translate = useTranslate();
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <Card>
          <form>
            <CardContent>
              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    style={{ width: '60%' }}
                    source="denominazione"
                    resource="enti"
                    fullWidth
                    validate={requiredValidate}
                  />
                </Box>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    style={{ width: '40%' }}
                    source="ateco"
                    resource="enti"
                    validate={requiredValidate}
                  />
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source="piva"
                    resource="enti"
                    label="Partita Iva"
                    validate={requiredValidate}
                    fullWidth
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source="cfisc"
                    resource="enti"
                    label="Codice Fiscale"
                    validate={requiredValidate}
                    fullWidth
                  />
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  {/*        <RelatedInputAddList
                    label="Forma Giuridica"
                    source="formagiuridica"
                    reference="fgiuridiche"
                    resource="enti"
                    optionText="tipo"
                    labelCreate="Nuova tipologia risorsa"
                    helperText={false}
                  />
           */}
                  <ReferenceInput
                    label="Forma Giuridica"
                    source="formagiuridica"
                    reference="fgiuridiche"
                    fullWidth
                    helperText={false}
                  >
                    <SelectInput optionText="tipo" />
                  </ReferenceInput>
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                    source="sdi"
                    resource="enti"
                    label="Sdi"
                    fullWidth
                  />
                </Box>
              </Box>

              <ContactFields
                title="Referente"
                prefix="ref_"
                withReference={true}
              />
              <AndressFields
                title="Indirizzo Sede Legale"
                prefix="legale_"
                resou
                rceName="enti"
              />
              <Typography variant="h6" gutterBottom>
                {'Sedi Operative'}
              </Typography>
              <ArrayInput source="sedi">
                <SimpleFormIterator>
                  <TextInput
                    source={getSource('city')}
                    label={translate('resources.andress.city')}
                    fullWidth
                    helperText={false}
                  />

                  <TextInput
                    source={getSource('state')}
                    label={translate('resources.andress.state')}
                    fullWidth
                    helperText={false}
                  />

                  <TextInput
                    source={getSource('pv')}
                    label={translate('resources.andress.pv') as any}
                    fullWidth
                    helperText={false}
                  />

                  <TextInput
                    source={getSource('zipcode')}
                    label={translate('resources.andress.cap') as any}
                    fullWidth
                    helperText={false}
                  />
                </SimpleFormIterator>
              </ArrayInput>
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
};

const CorsiEdit: FC<EditProps> = props => (
  <Edit {...props}>
    <RenderFields {...props} />
  </Edit>
);

const CorsiCreate: FC<EditProps> = props => {
  const { data, loading, error } = useGetList('enti');
  useEffect(() => {
    console.log('XXXXXXXXXXXX', data);
  }, [data]);

  return (
    <Create {...props}>
      <RenderFields {...props} />
    </Create>
  );
};

const requiredValidate = [required()];

export default { CorsiEdit, CorsiCreate };
