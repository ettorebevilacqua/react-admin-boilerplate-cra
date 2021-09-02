// in src/Corsi.js
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  EditProps,
  Edit,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
  FormWithRedirect,
  Toolbar,
  AutocompleteInput,
  SimpleFormIterator,
  ArrayInput,
} from 'react-admin';

// import AnagFields from '../common/anagFields';

/*
CREATE TABLE `Materie`
 (
	`ID`			int, 
	`Materia`			varchar (510), 
	`Ambito`			int
);
<AutocompleteInput source="category" choices={[
    { id: 'programming', name: 'Programming' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'photography', name: 'Photography' },
]} />
idcorso, titolo, idmodulo, titolo modulo, docenti, n partecipanti, mail o cell partecipanti

*/
<ReferenceInput
  label="Ambito"
  source="ambito"
  reference="ambiti"
  helperText={false}
>
  <SelectInput optionText="ambito" />
</ReferenceInput>;

const getSource = txt => txt;
const resourceName = 'indagini';

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
                    source="idcorso"
                    label={'Corso'}
                    reference="corsi"
                  >
                    <SelectInput optionText="titolo" />

                    {/*   <AutocompleteInput
                      optionText={(choice?) =>
                        choice?.id // the empty choice is { id: '' }
                          ? `${choice.titolo} ${choice.data_inizio}`
                          : ''
                      }
                    />*/}
                  </ReferenceInput>
                </Box>
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
                <ReferenceInput
                  source="idmodulo"
                  label={'Modulo'}
                  reference="moduli"
                >
                  <AutocompleteInput
                    optionText={(choice?) =>
                      choice?.id // the empty choice is { id: '' }
                        ? `${choice.titolo}`
                        : ''
                    }
                  />
                </ReferenceInput>

                <TextInput
                  label="Titolo modulo"
                  source="titoloModulo"
                  fullWidth
                  helperText={false}
                />
              </Box>
            </Box>
            <br />
            <Typography variant="h6" gutterBottom>
              Docenti
            </Typography>

            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <ArrayInput source="docenti" label="">
                  <SimpleFormIterator>
                    <ReferenceInput
                      source="docenti"
                      label={'Docenti'}
                      reference="risorse"
                    >
                      <AutocompleteInput
                        optionText={(choice?) =>
                          choice?.id // the empty choice is { id: '' }
                            ? `${choice.cognome} ${choice.nome}`
                            : ''
                        }
                      />
                    </ReferenceInput>
                  </SimpleFormIterator>
                </ArrayInput>
              </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput
                  label="NumPartecipanti "
                  source="num_partecipanti"
                  fullWidth
                  helperText={false}
                />
              </Box>
            </Box>
            <br />
            <Typography variant="h6" gutterBottom>
              Contatti partecipanti
            </Typography>
            <Box display={{ xs: 'block', sm: 'flex' }}>
              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <ArrayInput source="partecipanti" label="">
                  <SimpleFormIterator>
                    <TextInput
                      label="Nome "
                      source="nome"
                      fullWidth
                      helperText={false}
                    />
                    <TextInput
                      label="Telefono "
                      source="tel"
                      fullWidth
                      helperText={false}
                    />
                    <TextInput
                      label="Mail "
                      source="Mail"
                      fullWidth
                      helperText={false}
                    />
                  </SimpleFormIterator>
                </ArrayInput>
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
