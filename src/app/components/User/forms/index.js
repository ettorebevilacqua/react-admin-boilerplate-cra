import React from 'react';
import { pick } from 'utils/pick';
import {
  questionSlice,
  moduliSliceCrud,
  questionSlice2,
  questionViewSlice,
} from 'app/slice';
import { makeContainerRefreshed } from './component/makerCointainer';

import { QuestionTo } from './question/questionTo';
import { ListQuestions } from './question/listQuestions';
import GuestQuestionFormWrap from './question/guestQuestionForm';
import { ModuliFormContainer } from './question';
import IndaginiContainer from 'app/components/User/section/indagini';

export const QuestionToForm = makeContainerRefreshed(
  QuestionTo,
  questionSlice,
  (matchParam, history, location, saved) => {
    const { id, idquestion, idcorso } = (saved && saved.data) || {};

    const queryParam =
      !saved || !saved.data || !saved.data.id
        ? pick(matchParam, ['id', 'idquestion', 'idcorso'])
        : { id: saved.data.id };
    // console.log('xxxxx queryParam', queryParam);

    questionSlice.actions.reset();
    questionSlice.actions.query(queryParam, true);
  },
);

export const GuestQuestionForm = makeContainerRefreshed(
  GuestQuestionFormWrap,
  moduliSliceCrud,
  (matchParam, history, location, saved) => {
    const { id, idquestion, idcorso } = (saved && saved.data) || {};

    const queryParam =
      !saved || !saved.data || !saved.data.id
        ? pick(matchParam, ['id', 'idquestion', 'idcorso'])
        : { id: saved.data.id };
    // console.log('xxxxx queryParam', queryParam);
    moduliSliceCrud.actions.reset();
    moduliSliceCrud.actions.get(id);
  },
);

export const QuestionList = makeContainerRefreshed(
  ListQuestions,
  questionSlice2,
  (matchParam, history, location, saved) => {
    questionSlice2.actions.reset();
    questionSlice2.actions.query(
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
    const { id, idquestion, idcorso } = (saved && saved.data) || {};
    // console.log('xxxxx queryParam', queryParam);
    moduliSliceCrud.actions.reset();
    moduliSliceCrud.actions.load();
    console.log();
  },
);

export const IndaginiList = makeContainerRefreshed(
  IndaginiContainer,
  moduliSliceCrud,
  (matchParam, history, location, saved, stateLoad) => {
    const { id, idquestion, idcorso } = (saved && saved.data) || {};
    // console.log('xxxxx queryParam', queryParam);
    moduliSliceCrud.actions.reset();
    moduliSliceCrud.actions.load();
    console.log();
  },
);
// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
