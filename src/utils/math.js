const occurrences = list => list.reduce((acc, curr) => (acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc), {});

const modaOfoccurrences = freq => {
  let moda = 0;
  let maxOcc = 0;
  Object.keys(freq).map(key => {
    if (freq[key] > maxOcc) {
      maxOcc = freq[key];
      moda = parseInt(key);
    }
  });
};

function median(values) {
  if (values.length === 0) return 0;
  values.sort((a, b) => a - b);
  const half = Math.floor(values.length / 2);
  return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2.0;
}

function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}

module.exports = {
  modaOfoccurrences,
  occurrences,
  median,
  getStandardDeviation,
};
