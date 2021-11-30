import React from 'react';
import { useDataLoadingError } from '@data-provider/react';
import { questionSlice } from 'app/slice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { setMenuList } from 'app/slice/layoutSlice';
import { menuSatisfaction } from 'app/components/User/forms/question/menuListSatisfaction';
import { pick } from 'utils/pick';

export function FSoddisfazione(props) {
  return <p>soddisfazione {JSON.stringify(props, null, 2)}</p>;
}

export function Soddisfazione(props) {
  useInjectReducer({ key: questionSlice.name, reducer: questionSlice.slice.reducer });
  const questionSelector = useSelector(questionSlice.selects.dataSelector);
  const [data, loading, error] = useDataLoadingError(questionSelector.provider);
  const params = useParams();
  const idQuestion = pick(params, ['id']);
  const [question, setQuestion] = React.useState();

  React.useEffect(() => {
    setMenuList(menuSatisfaction);
    questionSlice.actions.get(idQuestion, true);
  }, []);

  React.useEffect(() => {
    !!questionSelector && setQuestion(questionSelector.results);
  }, [questionSelector]);

  return !question ? <h3>Loading</h3> : <FSoddisfazione {...props} data={question} />;
}
