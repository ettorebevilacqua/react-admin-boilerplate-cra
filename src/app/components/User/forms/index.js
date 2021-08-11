import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';

import { questionSlice, questionViewSlice } from 'app/slice';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { QuestionTo } from './question/questionTo';
import { ListQuestions } from './question/listQuestions';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Question from './question';
import { makeContainer } from './component/makerCointainer';
import { pick } from 'utils/pick';

export const QuestionToForm = makeContainer(
  QuestionTo,
  questionSlice,
  (matchParam, history, location, saved) => {
    const { id, idmodulo, idcorso } = (saved && saved.data) || {};
    questionSlice.actions.query(
      {
        idmodulo: matchParam?.idmodulo,
        idcorso: matchParam?.idcorso || 0,
      },
      true,
    );
  },
);

export const QuestionList = makeContainer(
  ListQuestions,
  questionSlice,
  (matchParam, history, location, saved) =>
    questionSlice.actions.query(
      pick({ closeAt: 'false', full: 'true', ...matchParam }, [
        'closeAt',
        'full',
        'id',
      ]),
      true,
    ),
);

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
