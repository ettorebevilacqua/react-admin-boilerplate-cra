import { Box, Typography } from '@material-ui/core';
import * as React from 'react';
import { TextInput, useTranslate, required } from 'react-admin';

const ContactFields = (props: any) => {
  const translate = useTranslate();
  const { title, prefix, resourceName, withReference } = props;
  const getSource = txt => prefix + txt;

  return (
    <Box display={{ md: 'block', lg: 'flex' }}>
      <Box flex={2} mr={{ md: 0, lg: '1em' }}>
        <Box mt="1em" />

        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        {withReference && (
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
        )}

        <Box mt="1em" />

        <Typography variant="h6" gutterBottom>
          Contatti
        </Typography>

        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('tel1')}
              resource={resourceName}
              label={'telefono 1'}
              fullWidth
              helperText={false}
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('tel2')}
              resource={resourceName}
              label={'Telefono 2'}
              fullWidth
              helperText={false}
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('pec')}
              resource={resourceName}
              label={'Pec'}
              fullWidth
              helperText={false}
            />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('email1')}
              resource={resourceName}
              label={'Email 1'}
              fullWidth
              helperText={false}
            />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('email2')}
              resource={resourceName}
              label={'Email 2'}
              fullWidth
              helperText={false}
            />
          </Box>
        </Box>
        <Box mt="1em" />
      </Box>
    </Box>
  );
};

const requiredValidate = [required()];

export default ContactFields;
