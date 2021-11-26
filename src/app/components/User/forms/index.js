import { pick } from 'utils/pick';
import { questionSlice, moduliSliceCrud, corsiSlice } from 'app/slice';
import { makeContainerRefreshed } from './component/makerCointainer';

import { QuestionTo } from './question/questionTo';
import GuestQuestionFormWrap from './question/guestQuestionForm';
import { ModuliFormMaker } from './question/moduliForm';
import { Domande } from './question/form/moduloDomande';
import { empityModulo } from 'app/services/question/moduliModel';
import { CorsiForm } from './common/corsi';
import { CorsiList as _CorsiList } from './question/form/questionUser/corsiList';
import { PersonaleList as _PersonaleList } from './question/form/questionUser/personaleList';
import { DocentiActivity as _DocentiActivity } from './question/form/questionUser/valutaDocente';

export const CorsiList = _CorsiList;
export const PersonaleList = _PersonaleList;
export const DocentiActivity = _DocentiActivity;

const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

export const CorsiDataForm = makeContainerRefreshed(CorsiForm, corsiSlice, (matchParam, saved) => {
  const { id, idquestion } = pick(matchParam, ['id']);
  // const filter = !saved || !saved.data || !saved.data.id ? { idquestion } : { id: saved.data.id };
  // console.log('xxxxx queryParam', queryParam);
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

export const ModuloDomandeForm = Domande;

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
