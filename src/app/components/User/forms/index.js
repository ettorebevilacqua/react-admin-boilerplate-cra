import React from 'react';
import { pick } from 'utils/pick';
import { questionSlice, moduliSliceCrud, questionViewSlice } from 'app/slice';
import { makeContainerRefreshed } from './component/makerCointainer';

import { QuestionTo } from './question/questionTo';
import { ListQuestions } from './question/listQuestions';
import GuestQuestionFormWrap from './question/guestQuestionForm';
import { ModuliFormContainer } from './question';

export const QuestionToForm = makeContainerRefreshed(
  QuestionTo,
  questionSlice,
  (matchParam, history, location, saved) => {
    const { id, idmodulo, idcorso } = (saved && saved.data) || {};

    const queryParam =
      !saved || !saved.data || !saved.data.id
        ? pick(matchParam, ['id', 'idmodulo', 'idcorso'])
        : { id: saved.data.id };
    // console.log('xxxxx queryParam', queryParam);
    questionSlice.actions.clearState();
    questionSlice.actions.query(queryParam, true);
  },
);

export const GuestQuestionForm = makeContainerRefreshed(
  GuestQuestionFormWrap,
  moduliSliceCrud,
  (matchParam, history, location, saved) => {
    const { id, idmodulo, idcorso } = (saved && saved.data) || {};

    const queryParam =
      !saved || !saved.data || !saved.data.id
        ? pick(matchParam, ['id', 'idmodulo', 'idcorso'])
        : { id: saved.data.id };
    // console.log('xxxxx queryParam', queryParam);
    debugger;
    moduliSliceCrud.actions.clearState();
    moduliSliceCrud.actions.get(id);
  },
);

export const QuestionList = makeContainerRefreshed(
  ListQuestions,
  questionSlice,
  (matchParam, history, location, saved) => {
    questionSlice.actions.query(
      pick({ closeAt: 'false', full: 'true', ...matchParam }, [
        'closeAt',
        'full',
        'id',
      ]),
      true,
    );
  },
);

export const ModuliForm = makeContainerRefreshed(
  ModuliFormContainer,
  moduliSliceCrud,
  (matchParam, history, location, saved, stateLoad) => {
    const { id, idmodulo, idcorso } = (saved && saved.data) || {};
    // console.log('xxxxx queryParam', queryParam);
    moduliSliceCrud.actions.clearState();
    moduliSliceCrud.actions.load();
    console.log();
  },
);

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
