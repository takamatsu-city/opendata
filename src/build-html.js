const categories = require('./categories.json');
const fs = require('fs');

class BuildHtml {
  run() {
    let html = "<html>\n  <head><meta charset='utf-8'></head>\n  <body>\n    <ul>\n";
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      html += `      <li><a href="${category.category}/data.geojson">${category.name}</a></li>\n`;
    }
    html += "    </ul>\n  </body>\n</html>";

    fs.writeFileSync("build/index.html" , html)
  }
}

module.exports = BuildHtml;
