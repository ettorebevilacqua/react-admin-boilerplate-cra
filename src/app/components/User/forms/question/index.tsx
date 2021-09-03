import React from 'react';
import { questionModuliSlice } from 'app/slice';

import { makeContainerRefreshed } from '../component/makerCointainer';

import { ModuliFormMaker } from './moduliForm';
import QuestionModuli from './questionModuli';
import IndaginiListForm from './form/indaginList';
import { ListQuestions } from './listQuestions';

export function ModuliFormContainer({ formProp: { data }, actions }) {
  // React.useEffect(init, []);
  // React.useEffect(dataUpdate, [data]);
  const onSendRisposte = () => {
    // console.log('ModuliFormContainer onSendRisposte', val1, val2);
  };
  return <ModuliFormMaker actions={actions} data={data} onSend={onSendRisposte} />;
}

export const QuestionModuliForm = makeContainerRefreshed(QuestionModuli, questionModuliSlice, () => {
  // console.log('xxxxx queryParam', queryParam);
  const queryParam = {};
  /* !saved || !saved.data || !saved.data.id
        ? pick(matchParam, ['id'])
        : { id: saved.data.id }; */

  questionModuliSlice.actions.reset();
  questionModuliSlice.actions.query(queryParam, true);
});

export const IndaginiList = makeContainerRefreshed(IndaginiListForm, questionModuliSlice, () => {
  // console.log('xxxxx queryParam', queryParam);
  const queryParam = { isPublic: true };
  questionModuliSlice.actions.reset();
  questionModuliSlice.actions.query(queryParam, true);
});

export const QuestionList = makeContainerRefreshed(ListQuestions, questionModuliSlice, () => {
  questionModuliSlice.actions.reset();
  /* pick({ closeAt: 'false', full: 'true', ...matchParam }, [
      'closeAt',
      'full',
      'id',
    ]), */
  questionModuliSlice.actions.query({ isPublic: true }, true);
});
