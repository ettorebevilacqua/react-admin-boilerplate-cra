import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';

import { questionSlice, moduliSliceCrud, questionViewSlice } from 'app/slice';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { QuestionTo } from './question/questionTo';
import { ListQuestions } from './question/listQuestions';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Question from './question';
import { makeContainerRefreshed } from './component/makerCointainer';
import { pick } from 'utils/pick';
import GuestQuestionFormWrap from './question/guestQuestionForm';

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
    questionSlice.actions.clearState();
    questionSlice.actions.get(id);
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

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
