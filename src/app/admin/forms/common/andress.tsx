import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import {
  TextField,
  ReferenceField,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  Toolbar,
  useTranslate,
  FormWithRedirect,
  DateInput,
  required,
  email,
  NullableBooleanInput,
} from 'react-admin';

const AndressFields = (props: any) => {
  const translate = useTranslate();
  const { title, prefix, resourceName } = props;
  const getSource = txt => prefix + txt;

  return (
    <Box display={{ md: 'block', lg: 'flex' }}>
      <Box flex={2} mr={{ md: 0, lg: '1em' }}>
        <Box mt="1em" />

        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <TextInput
          source={getSource('andress')}
          resource={resourceName}
          label={translate('resources.andress.andress')}
          multiline
          fullWidth
          helperText={false}
        />
        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('city')}
              resource={resourceName}
              label={translate('resources.andress.city')}
              fullWidth
              helperText={false}
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('state')}
              resource={resourceName}
              label={translate('resources.andress.state')}
              fullWidth
              helperText={false}
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('pv')}
              resource={resourceName}
              label={translate('resources.andress.pv')}
              fullWidth
              helperText={false}
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput
              source={getSource('zipcode')}
              resource={resourceName}
              label={translate('resources.andress.cap')}
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

export default AndressFields;
