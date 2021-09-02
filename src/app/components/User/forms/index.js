import { pick } from 'utils/pick';
import { questionSlice, moduliSliceCrud } from 'app/slice';
import { makeContainerRefreshed } from './component/makerCointainer';

import { QuestionTo } from './question/questionTo';
import GuestQuestionFormWrap from './question/guestQuestionForm';
import { ModuliFormContainer } from './question';

export const QuestionToForm = makeContainerRefreshed(
  QuestionTo,
  questionSlice,
  (matchParam, history, location, saved) => {
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
    const { id } = (saved && saved.data) || {};

    // console.log('xxxxx queryParam', queryParam);
    moduliSliceCrud.actions.reset();
    moduliSliceCrud.actions.get(id);
  },
);

export const ModuliForm = makeContainerRefreshed(ModuliFormContainer, moduliSliceCrud, () => {
  // console.log('xxxxx queryParam', queryParam);
  moduliSliceCrud.actions.reset();
  moduliSliceCrud.actions.load();
  console.log();
});

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
