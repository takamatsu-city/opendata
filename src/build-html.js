const locationDataCategories = require('./location-data-categories.json');
const standardDataCategories = require('./standard-data-categories.json');

const fs = require('fs');
const glob = require('glob');
const path = require('path');

class BuildHtml {
  run() {
    const opendataViewerUrl = "https://geolonia.github.io/opendata-editor/";

    let html = "<html>\n  <head><meta charset='utf-8'></head>\n  <body>\n";
    
    html += "<h1>位置情報付きデータ</h1>\n";
    html += "<ul>\n";
    for (let i = 0; i < locationDataCategories.length; i++) {
      const category = locationDataCategories[i];

      const csvFile = glob.sync(`data/${category.category}/*.csv`)[0];
      const csvFileUrl = `https://raw.githubusercontent.com/takamatsu-city/opendata/main/${csvFile}`;
      const mapUrl = `${opendataViewerUrl}?data=${csvFileUrl}`;

      html += `      <li>${category.name} <a target="_blank" href="${category.category}/data.geojson">GeoJSON</a> <a target="_blank" href="${mapUrl}">地図</a></li>\n`;
    }
    html += "</ul>\n";

    html += "<h1>一般データ</h1>\n";
    html += "<ul>\n";
    for (let i = 0; i < standardDataCategories.length; i++) {
      const category = standardDataCategories[i];

      const jsonFiles = `build/${category.category}/*.json`;
      glob.sync(jsonFiles).map(file => {
        const date = path.basename(file, '.json');
        html += `      <li>${category.name}(${date}) <a target="_blank" href="${category.category}/${date}.json">JSON</a></li>\n`;
      });
    }
    html += "    </ul>\n  </body>\n</html>";

    fs.writeFileSync("build/index.html" , html)
  }
}

const buildHtml = new BuildHtml();
buildHtml.run();
