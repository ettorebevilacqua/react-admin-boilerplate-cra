import { pick } from 'utils/pick';
import { questionSlice, moduliSliceCrud, moduloSliceCrud, corsiSlice } from 'app/slice';
import { makeContainerRefreshed } from './component/makerCointainer';

import { QuestionTo } from './question/questionTo';
import GuestQuestionFormWrap from './question/guestQuestionForm';
import { ModuliFormMaker } from './question/moduliForm';
import { Domande } from './question/form/moduloDomande';
import { empityModulo } from 'app/services/question/moduliModel';
import { CorsiForm } from './common/corsi';

const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

console.log('CorsiForm ', CorsiForm);
export const CorsiDataForm = makeContainerRefreshed(CorsiForm, corsiSlice, (matchParam, saved) => {
  const { id, idquestion } = pick(matchParam, ['id']);
  // const filter = !saved || !saved.data || !saved.data.id ? { idquestion } : { id: saved.data.id };
  // console.log('xxxxx queryParam', queryParam);
  debugger;
  corsiSlice.actions.reset();
  id ? corsiSlice.actions.get(id, true) : corsiSlice.actions.query({}, true);
});

export const QuestionToForm = makeContainerRefreshed(QuestionTo, questionSlice, (matchParam, saved) => {
  const { id, idquestion } = pick(matchParam, ['id', 'idquestion', 'idcorso']);
  // const filter = !saved || !saved.data || !saved.data.id ? { idquestion } : { id: saved.data.id };
  // console.log('xxxxx queryParam', queryParam);
  questionSlice.actions.reset();
  !!id ? questionSlice.actions.get(id, true) : questionSlice.actions.dataBack(empityModulo);
});

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

export const ModuliForm = makeContainerRefreshed(ModuliFormMaker, moduliSliceCrud, () => {
  // console.log('xxxxx queryParam', queryParam);
  const queryParam = {};
  moduliSliceCrud.actions.reset();
  moduliSliceCrud.actions.query(queryParam, true);
  console.log();
});

export const ModuloDomandeForm = makeContainerRefreshed(Domande, moduloSliceCrud, (matchParam, saved) => {
  const filter = pick(matchParam, ['id']);
  moduloSliceCrud.actions.reset();
  console.log('ModuloDomandeForm', filter.id, toNumberOr(filter.id, 0) === 0 ? 'isZero' : 'no Zero');
  toNumberOr(filter.id, 0) !== 0
    ? moduloSliceCrud.actions.get(filter.id, true)
    : moduloSliceCrud.actions.dataBack(empityModulo);
  console.log();
});

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
