/* eslint-disable prettier/prettier */
import React from 'react';
import { questionSlice } from 'app/slice';
import { menuSatisfaction } from 'app/components/User/forms/question/menuListSatisfaction';
import LoadSliceData from 'app/components/loader';
import { reportStart } from './mock';
import { colorsVote } from './calcChart';
import { PageContainer } from 'app/components/User/Layout/pageContainer';
import './table.css';
import Button from '@material-ui/core/Button';

const report = reportStart();

const tableStyle = width => ({
  width,
  display: 'inline-block',
  overflowX: 'auto',
  fontSize: '0.775rem',
  minWidth: '2000px',
  whiteSpace: 'nowrap',
});

const Rows = [
  { title: 'MISURE DI TENDENZA CENTRALE', field: '' },
  { title: 'MEDIA ', field: 'media' },
  { title: ' ', field: 'perc', after: '%' },
  { title: 'MODA ', field: 'moda' },
  { title: ' ', field: 'pmoda', after: '%' },
  { title: 'MEDIANA ', field: 'mediana' },
  { title: ' ', field: 'pmediana', after: '%' },
  { title: 'MISURE DI  DISPERSIONE ', field: '' },
  { title: 'VARIANZA ', field: 'varianza' },
  { title: 'DEVIAZIONE STANDARD ', field: 'devStandard' },
  { title: '', field: 'pvarianza', after: '%' },
  // { title: 'FREQUENZA', field: '' },

];

// Soddisfazione complessiva	l'assistenza della segreteria organizzativa 	la completezza e tempestività delle informazioni	l'adeguatezza del calendario delle attività	la qualità del materiale fornito(dispense, file, ecc) 	gli orari degli incontri 	l'attività di coordinamento 	rispetto dei tempi 	coordinamento delle attività

export function GrezziIndagineContent({ data }) {
  const renderCells = row =>
    data.map((domanda, idxDomanda) =>
      <td key={idxDomanda} style={{ textAlign: 'right' }}>
        {!domanda.report[row.field] ? '' : (domanda.report[row.field] + (row.after || ''))}
      </td>
    );

  const renderRow = (row, idxrow) => (
    <tr key={idxrow}>
      <td class={!row.field ? 'titleRow' : '' } style={{ minWidth: 240 }}>{row.title}</td>
      {renderCells(row)}
    </tr>
  );

  const renderHeaderCell = (domanda, idxDomanda) => <th style={{ minWidth: 110 }} key={idxDomanda}>
    <div style={{ whiteSpace: 'break-spaces', maxWidth: 110 }} >{domanda.domanda}</div></th>;

  const maxValue = data.reduce((acc, domanda) => domanda.max > acc ? domanda.max : acc, 0);
  const renderFreqCell = (domanda, field, idxFreq, after) => {
    return !domanda.report[field] || !domanda.report[field][idxFreq] ?
      <td>0</td> : <td key={'freq' + idxFreq}>{domanda.report[field][idxFreq] + (after || '')}</td>;
  }
  const renderFreq = (field, after) => {
    const rowsFreq = [];
    for (let i = 1; i <= maxValue; i++)
      rowsFreq.push(<tr key={'rowFreq' + i}>
        <td style={{ backgroundColor: colorsVote[i] }}>{i}</td>
        {data.map((domanda, idxFreq) => renderFreqCell(domanda, field, i, after))}
      </tr>)
    return rowsFreq;
  }
  return !data ? (
    <h3>Lista vuota</h3>
  ) : (
    <div style={{ display: 'inline-block', width: (data.lenght * 110) + 200, overflowX: 'scroll', whiteSpace: 'nowrap' }} >
               <Button
            style={{ width: '150px', justifySelf: 'flex-end' }}
            color="primary"
            variant="contained"
            onClick={() => alert('error')}
          >
            Esporta In Excel
          </Button>
      <table className="relazione" style={tableStyle((data.lenght * 110) + 200)}>
        <thead><tr>
          <th>&nbsp;</th>
          {data.map(renderHeaderCell)}
        </tr></thead>
        <tbody>
          {Rows.map(renderRow)}
          <tr>
            <td class="titleRow" >Frequenza</td>
            {new Array(maxValue).fill(0).map(_ => <td></td>)}
          </tr>

          {renderFreq('contaFreq')}
          <tr>
            <td class="titleRow" >Percentuale</td>
            {new Array(maxValue).fill(0).map(_ => <td></td>)}
          </tr>
          {renderFreq('conta', '%')}
        </tbody>
      </table>
    </div>
  );
}

export const GrezziIndaginePage = props => (
  <PageContainer {...props} menu={menuSatisfaction} title="Risposte partecipanti :" Content={GrezziIndagineContent} />
);
export const GrezziIndagine = <LoadSliceData values={report} slice={questionSlice} Component={GrezziIndaginePage} />;
