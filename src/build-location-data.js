const fs = require('fs');
const { parse } = require('csv-parse');
const glob = require('glob');
const path = require('path');
const csv2geojson = require('csv2geojson');

const categories = require('./location-data-categories.json');

const outDir = 'build';

for (let i = 0; i < categories.length; i++) {
  const category = categories[i].category;
  const csvFiles = `data/${category}/*.csv`;

  glob(csvFiles, (err, files) => {
    files.forEach(async file => {
      const category = path.basename(path.dirname(file));
      const categoryPath = `${outDir}/${category}`;
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }
      const dest = fs.createWriteStream(`${categoryPath}/data.geojson`);

      const csvString = fs.readFileSync(file, 'utf8');

      csv2geojson.csv2geojson(csvString, function(err, data) {
        if (err) throw err;
        dest.write(JSON.stringify(data));
      });
    });
  });
}
