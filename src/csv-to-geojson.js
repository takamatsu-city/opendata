const csv2geojson = require('csv2geojson');

const csvToGeoJSON = async (csvString) => {

  return new Promise((resolve, reject) => {

    let options = {
      delimiter: ','
    }

    const headers = csvString.split(/\r?\n|\r/)[0];
    if (headers.includes('緯度') && headers.includes('経度')) {
      options.latfield = '緯度';
      options.lonfield = '経度';
    }

    csv2geojson.csv2geojson(csvString, options,
      (err, data) => {
        if (err) {
          reject(err);
          return
        }
        resolve(data);
      }
    );
  });
}

module.exports = csvToGeoJSON;