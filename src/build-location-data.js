const fs = require('fs');
const { parse } = require('csv-parse/sync');
const glob = require('glob');
const path = require('path');
const csv2geojson = require('csv2geojson');

const categories = require('./location-data-categories.json');

for (let i = 0; i < categories.length; i++) {
  const category = categories[i].category;
  const csvFiles = `data/${category}/data.csv`;

  glob(csvFiles, async (err, files) => {
    for(let j = 0; j < files.length; j++) {
      const file = files[j];
      const category = path.basename(path.dirname(file));
      const categoryPath = `build/${category}`;
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }
      const dest = fs.createWriteStream(`${categoryPath}/data.geojson`);

      const csvString = fs.readFileSync(file, 'utf8');

      // 緯度経度のフィールド名を判定
      const headers = parse(csvString, {
        skip_empty_lines: true
      })[0];

      let latField = 'latitude';
      let lonField = 'longitude';
      if (headers.includes('緯度')) latField = '緯度';
      if (headers.includes('経度')) lonField = '経度';

      csv2geojson.csv2geojson(csvString, {
        latfield: latField,
        lonfield: lonField,
        delimiter: ','
      },
        function(err, data) {
        if (err) {
          console.error(err);
          throw err;
        };
        dest.write(JSON.stringify(data));
      });

      if (files.length === 1) {
        fs.copyFileSync(file, `${categoryPath}/data.csv`);
      }
    };
  });
}
