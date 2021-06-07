import React from 'react';
import { Card } from '@material-ui/core';
import useStyles from './styles';
import {
  UIGenerator, // main component
  isInvalid, // for validity checking
  createEmptyStore,
  createStore, // for initial data-store creation
  createMap,
  createOrderedMap,
  prependKey, // for deep immutables
} from '@ui-schema/ui-schema';

import { widgets } from '@ui-schema/ds-material';

import { schemaTitolo, schemaQuestion } from './schemaQuestion';
import useStore from '../storeHook';

function Forms(props) {
  const { store, onChange } = props;
  const isOnLine = useStore(1);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <UIGenerator
          schema={schemaTitolo}
          store={store}
          onChange={onChange}
          widgets={widgets}
        />
      </Card>
      <Card className={classes.card}>
        <UIGenerator
          schema={schemaQuestion}
          store={store}
          onChange={onChange}
          widgets={widgets}
        />
      </Card>
    </div>
  );
}

export default Forms;
