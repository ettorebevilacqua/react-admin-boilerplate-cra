import * as React from 'react';
import {
  TextField,
  Datagrid,
  DateInput,
  Filter,
  FilterProps,
  List,
  ListProps,
  NullableBooleanInput,
  NumberField,
  SearchInput,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ReactElement } from 'react';

const CorsiFilter = (props: Omit<FilterProps, 'children'>) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <DateInput source="name" />
    <NullableBooleanInput source="has_ordered" />
    <NullableBooleanInput source="has_newsletter" defaultValue />
  </Filter>
);

const useStyles = makeStyles(theme => ({
  nb_commands: { color: 'purple' },
  hiddenOnSmallScreens: {
    display: 'table-cell',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const VisitorList = (props: ListProps): ReactElement => {
  const classes = useStyles();
  const isXsmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
  return (
    <List
      {...props}
      filters={isSmall ? <CorsiFilter /> : undefined}
      sort={{ field: 'name', order: 'DESC' }}
      perPage={25}
    >
      <Datagrid optimized rowClick="edit">
        <NumberField source="id" label="Id" className={classes.nb_commands} />
        <TextField
          source="ragsociale"
          label="resources.enti.fields.ragsociale"
        />
        <TextField source="mobile" label="Mobile" />
        <TextField source="email" label="Email" />
        <TextField source="status" label="Status" />
      </Datagrid>
    </List>
  );
};

export default VisitorList;
