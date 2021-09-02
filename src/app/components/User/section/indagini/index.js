import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import IndaginiList from 'app/components/User/forms/question/form/indaginList';
// styles
import useStyles from './styles';

import { Helmet } from 'react-helmet-async';

const commonStyle = {
  background: 'rgb(173 182 235)',
  height: '120px',
  width: '75%',
  marginTop: '26px',
  marginLeft: '15%',
  paddind: '8px',
};

// Paga abbonamento annuale, genera tutte le indagini  che desidera e ottiene anche il report annuale
function IndaginiContainer(props) {
  const { data, isFetching, isSuccess, isError } = props.formProp;
  const classes = useStyles();
  // const [indagini, setIndagini] = useState(getIndaginiAperte());
  const paramsQuery = queryString.parse(props.location.search);

  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>Indagini</title>
        <meta name="description" content="Indagini" />
      </Helmet>
      {isFetching && !data ? (
        <h2>Loading...</h2>
      ) : (
        <IndaginiList values={data ? data.filter(item => item.isPublic) : []} />
      )}
    </>
  );
}

export default withRouter(IndaginiContainer);
