import React from 'react';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';
import { ShowQuestion } from './form/show';
import {
  getIndaginiAperte,
  getModulo,
  makeRisposte,
  saveRisposte,
} from 'app/services/question/moduliModel';

export default function GuestQuestionFormWrap({
  formProp: { id, data, saved, stateLoad, meta },
  queryValue,
  onSubmit,
  actions,
  ...props
}) {
  const { modulo, questions } = data || {};
  // React.useEffect(init, []);
  // React.useEffect(dataUpdate, [data]);
  console.log('GuestQuestionForm', data);
  const values = [];
  const onSendRisposte = () => 1;
  return (
    <ShowQuestion
      values={values}
      onSend={onSendRisposte}
      risposte={makeRisposte(values || [])}
    />
  );
}
