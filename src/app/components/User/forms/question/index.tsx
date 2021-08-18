import React from 'react';

import { widgets } from '@ui-schema/ds-material';

// Import UI Generator
import {
  UIGenerator, // main component
  isInvalid, // for validity checking
  createEmptyStore,
  createStore, // for initial data-store creation
  createMap,
  createOrderedMap,
  prependKey, // for deep immutables
} from '@ui-schema/ui-schema';
import { storeUpdater } from '@ui-schema/ui-schema/UIStore/storeUpdater';
import { Select, SelectMulti } from '@ui-schema/ds-material/Widgets/Select';
import {
  schema,
  TipoSchema,
  schemaCustomer,
  TipoSchemaCustomer,
} from './schema';

import { ModuliFormMaker } from './moduliForm';

export function ModuliFormContainer({
  formProp: { id, data, saved, stateLoad, meta },
  queryValue,
  onSubmit,
  actions,
  ...props
}) {
  const { modulo, questions } = data || {};
  // React.useEffect(init, []);
  // React.useEffect(dataUpdate, [data]);
  console.log('ModuliFormContainer', data);
  const values = [];
  const onSendRisposte = () => 1;
  return <ModuliFormMaker data={values} onSend={onSendRisposte} />;
}
