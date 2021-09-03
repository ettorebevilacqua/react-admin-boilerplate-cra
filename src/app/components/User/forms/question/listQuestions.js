import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';
// import { Email } from '@material-ui/icons';

const MlistQuestions = ({ formProp: { data, saved } }) => {
  const [values, setValues] = React.useState();
  const classes = elemStyle();

  const loadData = () => data && setValues(data);
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
          {fields.map(field => (
            <div className={classes.fieldTitle}>{field}</div>
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

  const renderList = (fields, sizes) => (dataTo, index) => {
    return (
      <Paper className={`${classes.paperRow} ${classes.width95}`} key={index}>
        <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[...sizes]}>
          <div className={classes.paperRowElem}>{dataTo['title'] || ''}</div>
          <div className={classes.paperRowElem}>{data['data'] || '10/03/2021'}</div>
          <div className={classes.paperRowElem}>{data['rendeption'] || '10/03/2021'}</div>
          <div>
            <ul style={{ fontSize: '18px' }}>
              <li>
                <Link to={`/app/user/indagini_edit/${dataTo.id}`}>Visualizza i risultati grezzi</Link>
              </li>
              <li>Genera remind per chi non ha risposto</li>
              <li>Chiudi indagine e genera relazione</li>
            </ul>
          </div>
        </GridChilds>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      {renderTitle()}
      {renderHeaderList(['Indagine', 'Data Apertura', 'Rendeptiom', 'Azioni'], [4, 2, 2, 4])}
      {!!values && values.map && values.map(renderList(['title', 'data', 'rendeption'], [4, 2, 2, 4]))}
    </div>
  );
};

export const ListQuestions = MlistQuestions;
