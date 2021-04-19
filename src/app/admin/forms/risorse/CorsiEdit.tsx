// in src/Corsi.js
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { PinDropSharp } from '@material-ui/icons';
import { waitForDebugger } from 'inspector';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Create,
  EditProps,
  Edit,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
  FormWithRedirect,
  Toolbar,
  useGetList,
  SelectArrayInput,
  useGetOne,
  useGetMany,
} from 'react-admin';
import { useFormState } from 'react-final-form';

// import AnagFields from '../common/anagFields';
import AndressFields from '../common/andress';
import ContactFields from '../common/contatti';
import RelatedInputAddList from '../lists/relatedInputAddList';

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

const spySubscription = { values: true };

const MaterieAmbiti = ({ id }) => {
  const { values } = useFormState({ subscription: spySubscription });

  const { data } = useGetOne('ambiti', values.ambito);
  return (
    <>
      {data &&
        data.materie &&
        data.materie.map((materia, idx) => (
          <Chip key={idx} label={materia} style={{ marginRight: '5px' }} />
        ))}
    </>
  );
};

const ShowEnti = ({ ids }) => {
  const { data, loading, loaded, error } = useGetMany('enti', ids);
  const list = Object.keys(data).map(key => data[key]);
  return (
    <>
      <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
        {list.map(
          (ente, idx) =>
            ente && (
              <Chip
                key={idx}
                label={ente.denominazione}
                style={{ marginRight: '5px' }}
              />
            ),
        )}
      </Box>
    </>
  );
};
const QualificaEnti = ({ id }) => {
  const [idsEnti, setIdsEnti] = useState<any>();
  const { data, ids, total, loading, loaded, error } = useGetList(
    'qualifiche',
    { page: 1, perPage: 100000 },
    { field: 'ente', order: 'DESC' },
    { id_risorsa: id },
  );

  useEffect(() => {
    if (data) {
      debugger;
      const list = Object.keys(data)
        .filter(key => data[key].id_ente || data[key].id_ente === 0)
        .map(key => data[key].id_ente);
      list && setIdsEnti(list);
    }
  }, [data]);

  return <>{idsEnti && <ShowEnti ids={idsEnti} />}</>;
};

const RenderFields = props => {
  const autoFillAddress = event => {
    if (event.ambito) {
      console.log('ambito change', event);
    }
  };

  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <Card>
          <h3>{props.record.id}</h3>
          <form onChange={autoFillAddress}>
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
                    source="cv"
                    resource={resourceName}
                    label="Curriculum"
                    validate={requiredValidate}
                    fullWidth
                  />
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <RelatedInputAddList
                    label="Tipologia"
                    source="tipologia"
                    reference="risorsaTipo"
                    resource={resourceName}
                    optionText="tipo"
                    labelCreate="Nuova tipologia risorsa"
                    helperText={false}
                  />
                </Box>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <BooleanInput
                    source="interna"
                    resource={resourceName}
                    label="Interna / Esterna"
                    fullWidth
                  />
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom>
                Materie risorse
              </Typography>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceInput
                    label="Ambito"
                    source="ambito"
                    reference="ambiti"
                    helperText={false}
                  >
                    <SelectInput optionText="titolo" />
                  </ReferenceInput>
                </Box>
                <MaterieAmbiti id={props.record.ambito} />
              </Box>

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

              <Typography variant="h6" gutterBottom>
                Qualiiche enti
              </Typography>

              <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                <QualificaEnti id={props.record.id} />
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
};

const rEdit: FC<EditProps> = props => (
  <Edit {...props}>
    <RenderFields {...props} />
  </Edit>
);

const rCreate: FC<EditProps> = props => {
  return (
    <Create {...props} record={{ interna: false }}>
      <RenderFields {...props} />
    </Create>
  );
};

const requiredValidate = [required()];
const risorse = { Edit: rEdit, Create: rCreate };

export default risorse;
