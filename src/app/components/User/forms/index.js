import React from 'react';
import { shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';

import { questionSlice, questionViewSlice } from 'app/slice';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { QuestionTo } from './question/questionTo';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Question from './question';
import { makeContainer } from './component/makerCointainer';

export const QuestionToForm = makeContainer(
  QuestionTo,
  questionSlice,
  (matchParam, history, location, saved) => {
    const { id, idmodulo, idcorso } = (saved && saved.data) || {};
    questionSlice.actions.query(
      {
        idmodulo: matchParam.idmodulo,
        idcorso: matchParam.idcorso || 0,
      },
      true,
    );
  },
);

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
