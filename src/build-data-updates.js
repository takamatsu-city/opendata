const locationDataCategories = require('./location-data-categories.json');
const standardDataCategories = require('./standard-data-categories.json');
const pdfDataCategories = require('./pdf-data-categories.json');
const categories = [...locationDataCategories, ...standardDataCategories, ...pdfDataCategories];

const fs = require('fs');
const glob = require('glob');
const path = require('path');

const execSync = require('child_process').execSync;

class BuildDataUpdates {
  run() {
    const cmd = "git ls-files data | xargs -n1 -I{} git log --reverse -1 --format='%cd {}' --date=iso-local {} | sort";
    const result = execSync(cmd).toString();
    let updates = result.split("\n").map(line => {
      if (line) {
        const category = path.basename(path.dirname(line.split(" ")[3]));
        return {
          date: line.split(" ")[0],
          file: line.split(" ")[3],
          category: category,
          category_name: categories.find(c => c.category === category).name
        }
      }
    });

    // null を配列から除去
    updates = updates.filter(update => update);
    updates.reverse();
    const dest = fs.createWriteStream(`build/data-updates.json`);
    dest.write(JSON.stringify(updates));
  }
}

const buildDataUpdates = new BuildDataUpdates();
buildDataUpdates.run();
