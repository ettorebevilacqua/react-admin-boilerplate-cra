import React from 'react';
import { questionSlice } from 'app/slice';
import { menuSatisfaction } from 'app/components/User/forms/question/menuListSatisfaction';
import LoadSliceData from 'app/components/loader';
import { reportStart } from './mock';
import { colorsVote } from './calcChart';
import { PageContainer } from 'app/components/User/Layout/pageContainer';
import { InputText } from 'primereact/inputtext';
import './table.css';

const report = reportStart();

export function RelazioneIndagineContent({ data }) {
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
  const rows = [
    `Da cui si evidenzia che gli item "di eccellenza" che hanno inciso maggiormente in maniera positiva sono:`,

    `l'assistenza della segreteria organizzativa`,
    `la completezza e tempestività delle informazioni relative al corso`,
    ` `,
    ` `,

    `rispetto dei tempi`,
    ` `,

    `mentre gli item "da migliorare" che hanno inciso maggiormente in maniera negativa sono:`,
    `Soddisfazione complessiva`,
    ` `,
    ` `,
    `l'adeguatezza del calendario delle attività`,
    ` `,
    `gli orari degli incontri`,
    `l'attività di coordinamento`,
    ` `,
    `Al fine di meglio comprendere eventuali elementi di criticità relativi all'organizzazione sono stati indigati i seguenti`,
    `fattori con la possibilità di elencarne di ulteriori:`,
  ];

  return !data ? (
    <h3>Lista vuota</h3>
  ) : (
    <>
      <table className="relazione">
        <tbody>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              In merito alla sezione organizzazione
              <br />
              sono stati inviati n° 16 questionari e ne sono stati restituiti 6
            </td>
          </tr>
          <tr>
            <td>
              con una redemption pari al 40% <br />
              <br />
            </td>
          </tr>
          <tr>
            <td>
              La soddisfazione per la sezione si attesta su un valore percentuale pari al 64%
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td>
              In riferimento agli items individuati, i singoli valori sono riportati a seguire:
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <table className="subRelazione">
                <tbody></tbody>
                <tr>
                  <td>Soddisfazione complessiva</td>
                </tr>
                <tr>
                  <td> l'assistenza della segreteria organizzativa</td>
                  <td>60%</td>
                </tr>
                <tr>
                  <td> la completezza e tempestività delle informazioni relative al corso</td>
                  <td>69% </td>
                </tr>
                <tr>
                  <td> l'adeguatezza del calendario delle attività</td>
                  <td>69% </td>
                </tr>
                <tr>
                  <td> la qualità del materiale fornito (dispense, file, ecc)</td>
                  <td>60%</td>
                </tr>
                <tr>
                  <td> gli orari degli incontri</td>
                  <td>64%</td>
                </tr>
                <tr>
                  <td> l'attività di coordinamento</td>
                  <td>60%</td>
                </tr>
                <tr>
                  <td> rispetto dei tempi</td>
                  <td>60%</td>
                </tr>
                <tr>
                  <td> 69% coordinamento delle attività</td>
                  <td></td>
                </tr>{' '}
              </table>
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td>
              Come meglio rappresentati nel grafico a seguire:
              <br />
              <br />
            </td>
          </tr>
          {rows.map(row => (
            <tr>
              <td>{row.trim() === '' ? <br /> : row}</td>
            </tr>
          ))}
          <tr>
            <td>
              <br />
              Elementi di criticità riscontrati N°
              <br />
              <table className="subRelazione">
                <tbody>
                  <tr>
                    <td>Frequenti annullamenti di lezione</td>
                    <td>&nbsp;1&nbsp;</td>
                  </tr>
                  <tr>
                    <td> Non tempestiva comunicazione del calendario </td>
                    <td>&nbsp;2&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Materiali didattici consegnati in ritardo</td>
                    <td>&nbsp;0&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <br />
              Sono stati segnalati 2 ulteriori elementi critici :
            </td>
          </tr>
          <tr>
            <br />
            <table className="subRelazione">
              <tbody>
                <tr>
                  <td> Pause troppo lunghe durante la lezione</td>
                </tr>
                <tr>
                  <td>Io non ho il pc e non posso leggere le dispense inviate via mail </td>
                </tr>
              </tbody>
            </table>

            <td></td>
          </tr>
          <tr>
            <td>
              <br />
              In merito alla ripartizione delle risposte sulla scala likert proposta, si evidenziano i seguenti dati
              riassunti nel grafico a seguire:
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Note relazione</h3>
      <div>
        <InputText type="search" value={''} placeholder="Note" style={{ fontSize: '14px', width: '100%' }} />
      </div>
    </>
  );
}

export const RelazioneIndaginePage = props => (
  <PageContainer {...props} menu={menuSatisfaction} title="Relazione Indagine" Content={RelazioneIndagineContent} />
);
export const RelazioneIndagine = (
  <LoadSliceData values={report} slice={questionSlice} Component={RelazioneIndaginePage} />
);
