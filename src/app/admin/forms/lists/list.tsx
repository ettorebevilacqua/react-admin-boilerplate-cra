import * as React from 'react';
import {
  BooleanField,
  TextField,
  Datagrid,
  DateField,
  DateInput,
  Filter,
  FilterProps,
  List,
  ListProps,
  NullableBooleanInput,
  NumberField,
  SearchInput,
  FunctionField,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ReactElement } from 'react';

const typesField = {
  number: NumberField,
  text: TextField,
  date: DateField,
  bool: BooleanField,
  function: FunctionField,
};

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

export default function listGridMaker(params) {
  return (props: ListProps): ReactElement => {
    const hideId = params.hideId || false;
    const sourceList = params.sourceList;
    const resource = params.resource;
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
      theme.breakpoints.down('xs'),
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
      <List
        {...props}
        filters={isSmall ? <CorsiFilter /> : undefined}
        sort={{ field: 'name', order: 'DESC' }}
        perPage={25}
      >
        <Datagrid optimized rowClick="edit">
          {!hideId && (
            <NumberField
              source="id"
              label="Id"
              className={classes.nb_commands}
            />
          )}
          {sourceList.map((fieldOptions, idx) => {
            const { type, label, source, render } = fieldOptions;
            if (!type) {
              throw new Error(' bad type of list param in listGrid');
            }

            const Field = typesField[type];

            if (!Field) {
              throw new Error(type + ' bad type of list param in listGrid');
            }

            const res =
              type === 'function' ? (
                <FunctionField
                  key={idx}
                  label={label}
                  resource={resource}
                  render={render}
                />
              ) : (
                <Field
                  key={idx}
                  label={label}
                  resource={resource}
                  source={source}
                />
              );
            return res;
          })}
        </Datagrid>
      </List>
    );
  };
}
