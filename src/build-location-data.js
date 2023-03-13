const fs = require('fs');
const { parse } = require('csv-parse');
const glob = require('glob');
const path = require('path');

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

      const parser = fs
        .createReadStream(file)
        .pipe(parse())

      let headers = [];
      dest.write('{"type":"FeatureCollection","features":[');
      let begin = true;
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

        if (begin) {
          begin = false;
        } else {
          dest.write(",");
        }

        const properties = headers.reduce((map, header) => {
          map[header] = record[headers.indexOf(header)];
          return map;
        }, {});
        const coordinates = record[headers.indexOf('location')].split(',').map(value => Number(value))

        dest.write(JSON.stringify(
          {
            "type": "Feature",
            "properties": properties,
            "geometry": {
              "coordinates": [coordinates[1], coordinates[0]],
              "type": "Point"
            }
          }
        ));
      }
      dest.write("]}");
    });
  });
}
