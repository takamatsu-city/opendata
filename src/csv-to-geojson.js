const { csv2geojson, guessLonHeader, guessLatHeader } = require('csv2geojson');

function cleanCSV(cols, csv) {
  let i, clean = "", col = 0;

  for (i = 0; i < csv.length; i++) {
    // \r\n を除外
    if (csv[i] === '\r' && csv[i+1] === '\n') {
      if (col < cols) {
        i++;
        continue;
      } else {
        col = 0;
        i++;
      }
    }
    // \n or \r を除外
    else if (csv[i] === '\n' || csv[i] === '\r') {
      if (col < cols) continue;
      else col = 0;
    }
    else {
      clean += csv[i];
    }
  }
  return clean;
}


const csvToGeoJSON = async (csvString) => {

  return new Promise((resolve, reject) => {

    let options = {
      delimiter: ','
    }

    let lines = csvString.trim().split(/\r?\n|\r/);
    const firstLine = lines[0].split(options.delimiter)
    const cols = firstLine.length - 1;
    
    // 値内の改行を削除
    lines = cleanCSV(cols, csvString).trim().split(/\r?\n|\r/);

    // header行を取得。ダブルクォーテーションを削除
    const headers = firstLine.map((header) => {
      return header.replace(/"/g, '');
    });

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

      return cells[latIndex] !== '' && cells[lonIndex] !== '';
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