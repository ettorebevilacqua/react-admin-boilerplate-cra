import { questionModuliSlice, questionSlice } from 'app/slice';

import { makeContainerRefreshed } from '../component/makerCointainer';

import QuestionModuli from './questionModuli';
import IndaginiListForm from './form/indaginList';
import { ListQuestions } from './listQuestions';

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

export const QuestionList = makeContainerRefreshed(ListQuestions, questionSlice, () => {
  questionSlice.actions.reset();
  /* pick({ closeAt: 'false', full: 'true', ...matchParam }, [
      'closeAt',
      'full',
      'id',
    ]), */
   questionSlice.actions.query({}, true);
});
