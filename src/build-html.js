const categories = require('./categories.json');
const fs = require('fs');
const glob = require('glob');

class BuildHtml {
  run() {
    const opendataViewerUrl = "https://geolonia.github.io/opendata-viewer/";

    let html = "<html>\n  <head><meta charset='utf-8'></head>\n  <body>\n    <ul>\n";
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      const csvFile = glob.sync(`data/${category.category}/*.csv`)[0];
      const csvFileUrl = `https://raw.githubusercontent.com/takamatsu-city/opendata/main/${csvFile}`;
      const mapUrl = `${opendataViewerUrl}?data=${csvFileUrl}`;

      html += `      <li><a target="_blank" href="${category.category}/data.geojson">${category.name}</a> <a target="_blank" href="${mapUrl}">🌏</a></li>\n`;
    }
    html += "    </ul>\n  </body>\n</html>";

    fs.writeFileSync("build/index.html" , html)
  }
}

module.exports = BuildHtml;
