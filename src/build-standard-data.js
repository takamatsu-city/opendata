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
      const filename = path.basename(file, '.csv').split('_')[1];
      const categoryPath = `${outDir}/${category}`;
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }
      const dest = fs.createWriteStream(`${categoryPath}/${filename}.json`);

      const parser = fs
        .createReadStream(file)
        .pipe(parse({columns : true}))

      const data = [];
      for await (const record of parser) {
        data.push(record);
      }
      dest.write(JSON.stringify(data));
    });
  });
}
