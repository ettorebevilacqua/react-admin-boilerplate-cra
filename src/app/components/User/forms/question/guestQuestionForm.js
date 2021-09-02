import React from 'react';

import { ShowQuestion } from './form/show';
import { makeRisposte } from 'app/services/question/moduliModel';

export default function GuestQuestionFormWrap({ formProp: { data } }) {
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
