const { parse } = require('csv-parse/sync');
const csv2geojson = require('csv2geojson');

const csvToGeoJSON = async (csvString) => {

  return new Promise((resolve, reject) => {

    let options = {
      delimiter: ','
    }

    const headers = csvString.split(/\r?\n|\r/)[0];
    if (headers.includes('緯度') && headers.includes('経度')) {
      options = {
        ...options,
        latfield: '緯度',
        lonfield: '経度',
      }
    }

    csv2geojson.csv2geojson(csvString, options,
      (err, data) => {
        if (err) {
          reject({ err });
        } else {
          resolve({ data });
        }
      }
    );
  });
}

module.exports = csvToGeoJSON;