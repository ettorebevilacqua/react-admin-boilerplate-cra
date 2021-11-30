import { report } from './mock';

function calculatePoint(i, intervalSize, colorRangeInfo) {
  var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
  return useEndAsStart ? colorEnd - i * intervalSize : colorStart + i * intervalSize;
}

const colorRangeInfo = {
  colorStart: 0.2,
  colorEnd: 1,
  useEndAsStart: false,
};

function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  var { colorStart, colorEnd } = colorRangeInfo;
  var colorRange = colorEnd - colorStart;
  var intervalSize = colorRange / dataLength;
  var i, colorPoint;
  var colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}
// non usato insieme a funzioni sopra, genera i colori meglio
// const COLORS = interpolateColors(datasetStacked.datasets.length, colorScale, colorRangeInfo);

const randColor = () => (Math.random() * 256) >> 0;

const labels = report.map(item => item.domanda && item.domanda.substring(0, 44) + '..');
const values = report.map(item => item.report.perc);
console.log(report);
export const datasets = {
  labels,
  datasets: [
    {
      label: 'percentuale risposte',
      backgroundColor: '#42A5F5',
      data: values,
    },
  ],
};

const getDataSet = (label, data) => ({
  type: 'bar',
  label,
  backgroundColor: `rgb(${randColor()}, ${randColor()}, ${randColor()})`,
  data,
});

// dataset non è la lista delle domande, ma del numero risposta
// dove metto le domande ?
const maxValue = report.reduce((acc, item) => (item.max > acc ? item.max : acc), 0);
const reportWithMax = report.filter(item => item.max === maxValue);
const labelStacked = reportWithMax.map(item => item.domanda && item.domanda.substring(0, 44) + '..');
const baseDataset = new Array(maxValue).fill(0); // [1,2,3,4,5,6,7]
const listStacked = [];
for (let i = 1; i <= baseDataset.length; i++) {
  const data = reportWithMax.map(item => (!item.report.conta[i] ? 0 : item.report.conta[i]));
  listStacked.push(getDataSet(i, data));
}

/* const listStacked = report.map(item => {
  getDataSet(item.domanda && item.domanda.substring(0, 44) + '..', item.report.conta),
});
*/
export const datasetStacked = {
  labels: labelStacked,
  datasets: listStacked,
};
