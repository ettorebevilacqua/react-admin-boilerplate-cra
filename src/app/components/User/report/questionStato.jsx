import React from 'react';
import { questionSlice } from 'app/slice';
import { menuSatisfaction } from 'app/components/User/forms/question/menuListSatisfaction';
import LoadSliceData from 'app/components/loader';
import { reportStart } from './mock';
import { PageContainer } from 'app/components/User/Layout/pageContainer';

const report = reportStart();

export function StatoIndagineContent({ data }) {
  const renderDomande = (domanda, idx) => (
    <tr>
      <td>{domanda.domanda}</td>
    </tr>
  );

  return !data ? (
    <h3>Lista vuota</h3>
  ) : (
    <table className="domande">
      <tbody>{data.map(renderDomande)}</tbody>
    </table>
  );
}

export const StatoIndaginePage = props => (
  <PageContainer {...props} menu={menuSatisfaction} title="" Content={StatoIndagineContent} />
);
export const StatoIndagine = <LoadSliceData values={report} slice={questionSlice} Component={StatoIndaginePage} />;
