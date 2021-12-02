import React from 'react';
import { questionSlice } from 'app/slice';
import { menuSatisfaction } from 'app/components/User/forms/question/menuListSatisfaction';
import LoadSliceData from 'app/components/loader';
import { reportStart } from './mock';
import { colorsVote } from './calcChart';
import { PageContainer } from 'app/components/User/Layout/pageContainer';
import './table.css';

const report = reportStart();

export function StatoIndagineContent({ data }) {
  const cell = (idx, freq, conta) => (
    <td key={idx} style={{ padding: 6, background: colorsVote[idx + 1], color: 'black', fontWeight: 'bold' }}>
      {freq}
      <br />
      {conta + (conta && '%')}
    </td>
  );
  const renderDomande = (domanda, idxDomanda) => (
    <tr key={idxDomanda}>
      <td>{domanda.domanda}</td>
      <td style={{ padding: 6, fontWeight: 'bold' }}>{domanda.report.media}</td>
      {Array.from(Array(domanda.max).keys()).map(idxVal =>
        cell(idxVal, domanda.report.freqs[idxVal + 1] || '', domanda.report.conta[idxVal + 1] || ''),
      )}
    </tr>
  );

  return !data ? (
    <h3>Lista vuota</h3>
  ) : (
    <table className="domande">
      <thead>
        <th>Domanda</th>
        <th>Media</th>
        {Array.from(Array(data[0].maxVote).keys()).map(idxVal => (
          <th>{idxVal + 1}</th>
        ))}
      </thead>
      <tbody>{data.map(renderDomande)}</tbody>
    </table>
  );
}

export const StatoIndaginePage = props => (
  <PageContainer {...props} menu={menuSatisfaction} title="Risposte partecipanti :" Content={StatoIndagineContent} />
);
export const StatoIndagine = <LoadSliceData values={report} slice={questionSlice} Component={StatoIndaginePage} />;
