import React from 'react';
import { Link, useParams } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';
import { setMenuList } from 'app/slice/layoutSlice';
import { menuSatisfaction } from 'app/components/User/forms/question/menuListSatisfaction';
// import { useDataLoadingError } from '@data-provider/react';
import { pick } from 'utils/pick';
// import { questionProvider } from 'app/data';
import { questionSlice } from 'app/slice';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';

// import { Email } from '@material-ui/icons';

const MlistQuestions = ({ state, formProp: { data, saved } }) => {
  const [values, setValues] = React.useState();
  const classes = elemStyle();

  const loadData = () => {
    data && setValues(data);
  };

  React.useEffect(loadData, [data]);

  // if (data && !modulo) {
  //  props.history.push('/app/user/indagini');
  // return <span> </span>;
  // }

  const renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[9, 3]}>
        <div>
          <Typography variant="h3" color="textSecondary">
            Indagini Aperte soddifazione cliente :
          </Typography>
          <Typography variant="h4" color="error">
            {saved && saved.isError && saved.errorMessage}
          </Typography>
        </div>
      </GridChilds>
    </div>
  );

  const renderHeaderList = (fields, sizes) => {
    return (
      <Paper className={`${classes.paperRow} ${classes.width95}`} key={'headerFields'}>
        <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={sizes}>
          {fields.map((field, idx) => (
            <div key={idx} className={classes.fieldTitle}>
              {field}
            </div>
          ))}
        </GridChilds>
      </Paper>
    );
  };

  /*
  const renderValue = data => key => (
    <div className={classes.paperRowElem}>{data[key] || ''}</div>
  );

  const getRenderValues = (fields, dataTo) => {
    const vals = fields.map(renderValue(dataTo));
    // vals && vals.push(renderButtonActionRecord(dataTo.id));
    return vals;
  }; */

  const renderCellOpen = dataTo => (
    <div>
      <ul style={{ fontSize: '18px' }}>
        <li>
          <Link to={`/app/user/show/${dataTo.id}`}>Anteprima domande</Link>
        </li>
        <li>
          <Link to={`/app/user/indagini_edit/${dataTo.id}`}>Modifica</Link>
        </li>
        <li>
          <Link to={`/app/user/indagini/stato/${dataTo.id}`}>Visualizza i risultati grezzi</Link>
        </li>
        <li>Genera remind per chi non ha risposto</li>
        <li>
          <Link to={`/app/user/indagini/grezzi/${dataTo.id}`}>Chiudi indagine e genera relazione</Link>
        </li>
      </ul>
    </div>
  );
  const renderCellClose = dataTo => (
    <div>
      <ul style={{ fontSize: '18px' }}>
        <li>
          <Link to={`/app/user/indagini/graph/${dataTo.id}`}>Visualizza report</Link>
        </li>
      </ul>
    </div>
  );

  const renderList = (fields, sizes) => (dataTo, index) => {
    return (
      <Paper className={`${classes.paperRow} ${classes.width95}`} key={index}>
        <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[...sizes]}>
          <div className={classes.paperRowElem}>{dataTo['titolo'] || ''}</div>
          <div className={classes.paperRowElem}>{dataTo['data'] || ''}</div>
          <div className={classes.paperRowElem}>{dataTo['rendeption'] || ''}</div>
          {state === 'open' ? renderCellOpen(dataTo) : renderCellClose(dataTo)}
        </GridChilds>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      {renderTitle()}
      {renderHeaderList(
        ['Indagine', state === 'open' ? 'Data Apertura' : 'Data Chiusura', 'Rendeptiom', 'Azioni'],
        [4, 2, 2, 4],
      )}
      {!!values && values.map && values.map(renderList(['title', 'data', 'rendeption'], [4, 2, 2, 4]))}
    </div>
  );
};

const Loader = props => {
  useInjectReducer({ key: questionSlice.name, reducer: questionSlice.slice.reducer });
  // const [data, loading, error] = useDataLoadingError(questionProvider.provider);
  const questionSelector = useSelector(questionSlice.selects.dataSelector);
  const [questions, setQuestions] = React.useState();
  const params = useParams();
  const stateQuestions = pick(params, ['state']);
  React.useEffect(() => setMenuList(menuSatisfaction), []);
  React.useEffect(() => {
    questionSlice.actions.query(stateQuestions);
  }, [params]);

  /* React.useEffect(() => {
    const tmp = data && data.results;
    setQuestions(tmp);
  }, [data]); */
  React.useEffect(() => {
    !!questionSelector && setQuestions(questionSelector.results);
  }, [questionSelector]);

  return !questions ? (
    <h3>Loading</h3>
  ) : (
    <MlistQuestions {...props} formProp={{ data: questions }} state={stateQuestions.state} />
  );
};

export const ListQuestions = Loader;
