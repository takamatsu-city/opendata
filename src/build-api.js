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
      const csvFileUrl = `https://raw.githubusercontent.com/takamatsu-city/opendata/main/${csvFile}`;
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

    // for (let i = 0; i < standardDataCategories.length; i++) {
    //   const category = standardDataCategories[i];

    //   const csvFilesPattern = `data/${category.category}/${category.filename}*.csv`;

    //   // 最新順にソート
    //   const csvFiles = glob.sync(csvFilesPattern).reverse();

    //   csvFiles.map(file => {
    //     const filename = path.basename(file, '.csv');
    //     const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/${filename}.json`;
    //     const csvFile = `data/${category.category}/${filename}.csv`
    //     const csvFileUrl = `https://raw.githubusercontent.com/takamatsu-city/opendata/main/${csvFile}`;

    //     readme += `| ${category.name}(${filename}) | [CSV](${csvFileUrl}) | [JSON](${jsonFileUrl}) | ${category.description} |\n`;
    //   });
    // }

    console.log(data);
    const dest = fs.createWriteStream(`build/index.json`);
    dest.write(JSON.stringify(data));
  }
}

const buildApi = new BuildApi();
buildApi.run();
