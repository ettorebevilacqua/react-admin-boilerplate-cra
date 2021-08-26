import React from 'react';
import { pick } from 'utils/pick';
import { questionModuliSlice } from 'app/slice';

import { makeContainerRefreshed } from '../component/makerCointainer';

import { ModuliFormMaker } from './moduliForm';
import QuestionModuli from './questionModuli';
import IndaginiContainer from 'app/components/User/section/indagini';

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
  QuestionModuli,
  questionModuliSlice,
  (matchParam, history, location, saved, stateLoad) => {
    const { id, idquestion, idcorso } = (saved && saved.data) || {};
    // console.log('xxxxx queryParam', queryParam);
    const queryParam =
      !saved || !saved.data || !saved.data.id
        ? pick(matchParam, ['id'])
        : { id: saved.data.id };

    questionModuliSlice.actions.clearState();
    questionModuliSlice.actions.query(queryParam, true);
  },
);

export const IndaginiList = makeContainerRefreshed(
  IndaginiContainer,
  questionModuliSlice,
  (matchParam, history, location, saved, stateLoad) => {
    const { id, idquestion, idcorso } = (saved && saved.data) || {};
    // console.log('xxxxx queryParam', queryParam);
    const queryParam = {};
    questionModuliSlice.actions.clearState();
    questionModuliSlice.actions.query(queryParam, true);
  },
);
