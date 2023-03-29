const locationDataCategories = require('./location-data-categories.json');
const standardDataCategories = require('./standard-data-categories.json');

const fs = require('fs');
const glob = require('glob');
const path = require('path');

class BuildApi {
  run() {
    const data = [];
    
    for (let i = 0; i < locationDataCategories.length; i++) {
      const category = locationDataCategories[i];

      const csvFile = glob.sync(`data/${category.category}/*.csv`)[0];
      const csvFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.csv`;
      const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.geojson`;

      const id = path.basename(category.filename, '.xlsx');

      data.push(
        {
          "id": id,
          "name": category.name,
          "csv": csvFileUrl,
          "json": jsonFileUrl,
          "location": true
        }
      );
    }

    for (let i = 0; i < standardDataCategories.length; i++) {
      const category = standardDataCategories[i];

      const csvFilesPattern = `data/${category.category}/${category.filename}*.csv`;

      // 最新順にソート
      const csvFiles = glob.sync(csvFilesPattern).reverse();

      const csvs = []
      const jsons = []
      csvFiles.map(file => {
        const filename = path.basename(file, '.csv');
        const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/${filename}.json`;
        const csvFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/${filename}.csv`;
        csvs.push(csvFileUrl)
        jsons.push(jsonFileUrl);
      });

      const defaultJsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.json`;
      const defaultCsvFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.csv`;

      data.push(
        {
          "id": category.filename,
          "name": category.name,
          "csv": csvs.length > 1 ? [defaultCsvFileUrl].concat(csvs) : defaultCsvFileUrl,
          "json": jsons.length > 1 ? [defaultJsonFileUrl].concat(jsons) : defaultJsonFileUrl,
          "location": false
        }
      )
    }

    const dest = fs.createWriteStream(`build/index.json`);
    dest.write(JSON.stringify(data));
  }
}

const buildApi = new BuildApi();
buildApi.run();
