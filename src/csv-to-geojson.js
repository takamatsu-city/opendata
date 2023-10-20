const { parse } = require('csv-parse/sync');
const csv2geojson = require('csv2geojson');

const csvToGeoJSON = (csvString, callback) => {

  // 緯度経度のフィールド名を判定
  const headers = parse(csvString, {
    skip_empty_lines: true
  })[0];

  let latField = 'latitude';
  let lonField = 'longitude';
  if (headers.includes('緯度')) latField = '緯度';
  if (headers.includes('経度')) lonField = '経度';

  csv2geojson.csv2geojson(csvString, {
    latfield: latField,
    lonfield: lonField,
    delimiter: ','
  },
    callback
  );
}

module.exports = csvToGeoJSON;