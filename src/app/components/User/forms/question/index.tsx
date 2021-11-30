import { questionModuliSlice } from 'app/slice';

import { makeContainerRefreshed } from '../component/makerCointainer';
import QuestionModuli from './questionModuli';
import IndaginiListForm from './form/indaginList';
import { ListQuestions } from './listQuestions';
// import { pick } from 'utils/pick';

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

export const QuestionList = ListQuestions; /* makeContainerRefreshed(ListQuestions, questionSlice, params => {
  questionSlice.actions.reset();
  const state = pick(params, ['state']);
   questionSlice.actions.query(state, true);
});
*/
