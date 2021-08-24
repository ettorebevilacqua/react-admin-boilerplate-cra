import React from 'react';

import { questionModuliSlice } from 'app/slice';

import { makeContainerRefreshed } from '../component/makerCointainer';

import { ModuliFormMaker } from './moduliForm';
import QuestionModuliContainer from './questionModuliForm';

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
  const onSendRisposte = (val1, val2) => {
    console.log('ModuliFormContainer onSendRisposte', val1, val2);
  };
  return (
    <ModuliFormMaker actions={actions} data={data} onSend={onSendRisposte} />
  );
}

export const QuestionModuliForm = makeContainerRefreshed(
  QuestionModuliContainer,
  questionModuliSlice,
  (matchParam, history, location, saved, stateLoad) => {
    const { id, idmodulo, idcorso } = (saved && saved.data) || {};
    // console.log('xxxxx queryParam', queryParam);
    questionModuliSlice.actions.clearState();
    questionModuliSlice.actions.load();
  },
);
