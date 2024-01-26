const csv2geojson = require('csv2geojson');
const Papa = require('papaparse');

const csvToGeoJSON = async (csvString) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const latHeaders = ['緯度', 'lat', 'latitude'];
        const lonHeaders = ['経度', 'lon', 'lng', 'longitude'];
        
        let latField, lonField;

        // 緯度・経度のヘッダー名を判定
        results.meta.fields.forEach(field => {
          if (latHeaders.includes(field)) {
            latField = field;
          }
          if (lonHeaders.includes(field)) {
            lonField = field;
          }
        });

        // 緯度・経度に数値以外が含まれるレコードを除外
        const filteredData = results.data.filter(record => {
          const latValue = parseFloat(record[latField]);
          const lonValue = parseFloat(record[lonField]);

          return !isNaN(latValue) && !isNaN(lonValue);
        });

        // CSVフォーマットに戻す
        const filteredCsvString = Papa.unparse(filteredData, {
          quotes: false,
          delimiter: ',',
          header: true,
          newline: '\r\n'
        });

        let options = {
          delimiter: ',',
          latfield: latField,
          lonfield: lonField
        };

        csv2geojson.csv2geojson(filteredCsvString, options,
          (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(data);
          }
        );
      },
      error: (err) => {
        reject(err);
      }
    });
  });
}

module.exports = csvToGeoJSON;
