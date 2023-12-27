const { csv2geojson, guessLonHeader, guessLatHeader } = require('csv2geojson');

const csvToGeoJSON = async (csvString) => {

  return new Promise((resolve, reject) => {

    let options = {
      delimiter: ','
    }

    const lines = csvString.trim().split(/\r?\n|\r/);
    const headers = lines[0].split(',');

    if (headers.includes('緯度') && headers.includes('経度')) {
      options.latfield = '緯度';
      options.lonfield = '経度';
    } else {

      // guessLatHeader, guessLonHeader の引数はオブジェクトなので、オブジェクトを作成
      const headerObj = {};
      headers.forEach((key, index) => {
        headerObj[key] = ''
      });

      options.latfield = guessLatHeader(headerObj);
      options.lonfield = guessLonHeader(headerObj);
    }

    const latIndex = headers.indexOf(options.latfield);
    const lonIndex = headers.indexOf(options.lonfield);

    if (latIndex === -1 || lonIndex === -1) {
      reject(new Error("緯度経度のヘッダーが見つかりませんでした。"));
      return;
    }

    // 緯度経度が空の行を削除
    const filteredCsv = lines.filter((line, index) => {
      // ヘッダー行は無視
      if (index === 0) return true;
      const cells = line.split(options.delimiter);
      return cells[latIndex].trim() !== '' && cells[lonIndex].trim() !== '';
    }).join('\n');

    csv2geojson(filteredCsv, options,
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