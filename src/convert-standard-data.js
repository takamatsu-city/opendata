const fs = require('fs');
const { parse } = require('csv-parse');
const glob = require('glob');
const path = require('path');
const stringifySync = require("csv-stringify/sync");
const XLSX = require('xlsx');
const categories = require('./standard-data-categories.json');

const outDir = 'data';

const main = async () => {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i].category;

    csvFiles = glob.sync(`old_data/${categories[i].filename}*.xlsx`)
    for (let j = 0; j < csvFiles.length; j++) {

      const file = csvFiles[j];

      const filename = path.basename(file, '.xlsx');
      const workBook = XLSX.readFile(file);
      const csvFilePath = `old_data/${filename}.csv`;

      XLSX.writeFile(workBook, csvFilePath, { bookType: "csv" });
      
      const categoryPath = `${outDir}/${category}`;
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }

      const parser = fs
        .createReadStream(csvFilePath)
        .pipe(parse())

      const data = [];

      let headers = [];

      for await (const record of parser) {
        if (record[0]  === '#property') {
          headers = record;
        }

        // #から始まる行は無視
        if (/#/.test(record[0])) {
          continue;
        }

        // 空行は無視
        if (!record[0]) {
          continue;
        }

        const object = {};
        for (let i = 0; i < record.length; i++) {
          object[headers[i]] = record[i];
        }

        data.push(object);
      }
      const csvString = stringifySync.stringify(data, {
        header: true
      });
      fs.writeFileSync(`${outDir}/${category}/${filename}.csv`, csvString);
    }
  }
}

main();
