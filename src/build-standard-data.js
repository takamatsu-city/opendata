const fs = require('fs');
const { parse } = require('csv-parse');
const glob = require('glob');
const path = require('path');

const categories = require('./standard-data-categories.json');

const outDir = 'build';

for (let i = 0; i < categories.length; i++) {
  const category = categories[i].category;
  const csvFiles = `data/${category}/*.csv`;

  glob(csvFiles, (err, files) => {
    files.forEach(async file => {
      const filename = path.basename(file, '.csv');
      const categoryPath = `${outDir}/${category}`;
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }

      const filepath = `${categoryPath}/${files.length === 1 ? 'data' : filename}.json`;
      const dest = fs.createWriteStream(filepath);

      const parser = fs
        .createReadStream(file)
        .pipe(parse({columns : true}))

      const data = [];
      for await (const record of parser) {
        data.push(record);
      }
      dest.write(JSON.stringify(data));
      if (categories[i].historical && file === files[files.length - 1]) {
        fs.copyFileSync(filepath, categoryPath + '/data.json');
        if (category === 'population') {
          console.log(`copy ${filepath} to ${categoryPath}/data.json`);
        }
        fs.copyFileSync(file, categoryPath + '/data.csv');
      } else if (files.length === 1) {
        fs.copyFileSync(file, categoryPath + '/data.csv');
      } else if (category === 'city_planning_basic_survey_information') {
        fs.copyFileSync(file, `${categoryPath}/${path.basename(file)}`);
      }
    });
  });
}
