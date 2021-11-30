import React from 'react';
import { Chart } from 'primereact/chart';
import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './chartStyle.css';

import { datasets, datasetStacked } from './calcChart';

// Chart.register(ChartDataLabels);
export const GraphQuestion = () => {
  const basicData = datasets;

  const stackedData = datasetStacked; /* {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "bar",
        label: "Dataset 1",
        backgroundColor: "#42A5F5",
        data: [50, 25, 12, 48, 90, 76, 42]
      },
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: "#66BB6A",
        data: [21, 84, 24, 75, 37, 65, 34]
      },
      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: "#FFA726",
        data: [41, 52, 24, 74, 23, 21, 32]
      }
    ]
  }; */

  const getLightTheme = () => {
    let horizontalOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };

    let stackedOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          display: true,
          labels: {
            color: '#495057',
          },
        },
        datalabels: {
          color: 'black',
          anchor: 'end',
          align: 'end',
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
    // stackedOptions.defaults.global.plugins.datalabels.anchor = "end";
    // stackedOptions.defaults.global.plugins.datalabels.align = "end";
    return {
      horizontalOptions,
      stackedOptions,
    };
  };

  const { horizontalOptions, stackedOptions } = getLightTheme();

  return (
    <div style={{ marginLeft: 30, marginTop: -50, marginRight: 30 }}>
      <div className="card">
        <h3>Soddisfazione Organizzazione</h3>
        <Chart type="bar" data={basicData} options={horizontalOptions} />
      </div>

      <div className="card">
        <h3>Ripartizione delle risposte</h3>
        <Chart type="bar" data={stackedData} options={stackedOptions} />
      </div>
    </div>
  );
};
