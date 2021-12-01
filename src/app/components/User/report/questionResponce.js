import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { questionSlice } from 'app/slice';
import Paper from '@material-ui/core/Paper';
import LoadSliceData from 'app/components/loader';
import { menuSatisfaction } from 'app/components/User/forms/question/menuListSatisfaction';
import { setMenuList } from 'app/slice/layoutSlice';
import { reportStart, risposte } from './mock';

import GridChilds from 'app/components/User/forms/component/gridChilds';
import useStyle from './style';
import './table.css';

const report = reportStart();

const partecipanti = [
  { nome: 'Rossi Mario', email: 'rossi@mail.com', phone: '334 445566' },
  { nome: 'Bianchi Mario', email: 'bianchi@mail.com', phone: '334 445566' },
  { nome: 'Verdi Mario', email: 'verdi@mail.com', phone: '334 445566' },
  { nome: 'Gialli Mario', email: 'gialli@mail.com', phone: '334 445566' },
  { nome: 'Rossi Mario', email: 'rossi@mail.com', phone: '334 445566' },
  { nome: 'Neri Mario', email: 'Neri@mail.com', phone: '334 445566' },
];

function RQuestionResponce({ data }) {
  const classes = useStyle();
  const [] = useState();

  // const partecipanti = (data && data.partecipanti) || [];

  const renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[9, 3]}>
        <div>
          <Typography variant="h3" color="textSecondary">
            Risposte partecipanti :
          </Typography>
        </div>
      </GridChilds>
    </div>
  );

  const renderDomande = (partec, idxPart) => (domanda, idxDomanda) => (
    <tr>
      <td className={classes.text} style={{ width: '100%' }}>
        {domanda.domanda}
      </td>
      <td className={classes.text} style={{ width: '1px' }}>
        {domanda.risposte[idxPart]}
      </td>
    </tr>
  );

  const getDatiPartec = partec => (
    <span className={classes.text}>
      {`${partec['nome'] || ''}`}
      <br />
      {`${partec['email'] || ''} - ${partec['phone'] || ''}`}
    </span>
  );

  const renderList = (fields, sizes) => (partec, index) => {
    return (
      <Paper className={`${classes.paperRow}`} key={index}>
        <GridChilds justify="space-between" style={{ alignItems: 'initial' }} view={[3, 9]}>
          <div className={classes.paperRowElem}>{getDatiPartec(partec)}</div>
          <div className={classes.paperRowElem}>
            <table className="domande">
              <tbody>{risposte.map(renderDomande(partec, index))}</tbody>
            </table>
          </div>
        </GridChilds>
      </Paper>
    );
  };

  const renderHeaderList = (fields, sizes) => {
    return (
      <Paper className={`${classes.paperRow}`} key={'headerFields'}>
        <GridChilds justify="" style={{ alignItems: 'center', padding: 8 }} view={sizes}>
          {fields.map((field, idx) => (
            <div key={idx} className={classes.fieldTitle}>
              {field}
            </div>
          ))}
        </GridChilds>
      </Paper>
    );
  };

  const renderHeaderListDomande = (fields, sizes) => {
    return (
      <Paper className={`${classes.paperRow}`} key={'headerFields'}>
        <GridChilds justify="" style={{ alignItems: 'center', padding: 8 }} view={sizes}>
          {[].map((field, idx) => (
            <div key={idx} className={classes.fieldTitle}>
              {field}
            </div>
          ))}
        </GridChilds>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      {renderTitle()}
      {renderHeaderList(['Partecipante', 'Domande'], [3, 9])}
      {!!partecipanti && partecipanti.map && partecipanti.map(renderList(['nome', 'mail', 'telefono'], [3, 9]))}
    </div>
  );
}

export function QuestionResponce(props) {
  useEffect(() => setMenuList(menuSatisfaction), []);
  return <LoadSliceData slice={questionSlice} Component={RQuestionResponce} />;
}
