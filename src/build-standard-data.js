const fs = require('fs');
const { parse } = require('csv-parse');
const glob = require('glob');
const path = require('path');

const categories = require('./standard-data-categories.json');

for (let i = 0; i < categories.length; i++) {
  const category = categories[i].category;
  const csvFiles = `data/${category}/*.csv`;

  glob(csvFiles, async (err, files) => {
    for(let j = 0; j < files.length; j++) {
      const file = files[j];
      const filename = path.basename(file, '.csv');
      const categoryPath = `build/${category}`;
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
        // csvファイルをbuildフォルダにコピー
        fs.copyFileSync(file, `${categoryPath}/${path.basename(file)}`);
        // 最新json、csvファイルをそれぞれdata.json、data.csvにコピー
        fs.copyFileSync(filepath, categoryPath + '/data.json');
        fs.copyFileSync(file, categoryPath + '/data.csv');
      } else if (files.length === 1) {
        fs.copyFileSync(file, categoryPath + '/data.csv');
      } else {
        // csvファイルをbuildフォルダにコピー
        fs.copyFileSync(file, `${categoryPath}/${path.basename(file)}`);
      }
    };
  });
}
