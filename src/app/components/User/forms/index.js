import { pick } from 'utils/pick';
import { questionSlice, moduliSliceCrud, questionModuliSlice } from 'app/slice';
import { makeContainerRefreshed } from './component/makerCointainer';

import { QuestionTo } from './question/questionTo';
import GuestQuestionFormWrap from './question/guestQuestionForm';
import { ModuliFormContainer } from './question';

export const QuestionToForm = makeContainerRefreshed(
  QuestionTo,
  questionSlice,
  (matchParam, history, location, saved) => {
    debugger;
    const { id, idquestion } = pick(matchParam, ['id', 'idquestion', 'idcorso']);
    const filter = !saved || !saved.data || !saved.data.id ? { idquestion } : { id: saved.data.id };
    // console.log('xxxxx queryParam', queryParam);

    questionModuliSlice.actions.reset();
    questionModuliSlice.actions.query(filter, true);
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
