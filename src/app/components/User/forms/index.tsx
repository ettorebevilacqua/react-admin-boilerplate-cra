import React from 'react';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Question from './question';

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function Forms(props) {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/app/user/forms/question"
          component={() => <Question />}
        />
        <Redirect from="/app/user/forms" to="/app/user/forms/question" exact />
      </Switch>
    </>
  );
}

export default Forms;
