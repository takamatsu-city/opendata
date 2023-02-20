const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { parse } = require('csv-parse')

function main() {
  glob('./data/*.csv', (err, files) => {
    files.forEach(async file => {
      const dest = fs.createWriteStream(`build/${path.basename(file)}`);
      const parser = fs
        .createReadStream(file)
        .pipe(parse(
      ))
    
      const regex = new RegExp('^#')
      for await (const record of parser) {
        if (record[0]  === '#property') {
          // locationをlat,lngの2つのカラムに分割し、ヘッダー行を出力
          dest.write(`${record.map(rec => rec.replace('location', 'lat,lng')).join(',')}\n`)
        }
        // #から始まる行は無視
        if (regex.test(record[0])) {
          continue
        }
    
        dest.write(`${record.join(',')}\n`)
      }
    });
  });
}

main()
