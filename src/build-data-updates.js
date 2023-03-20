const locationDataCategories = require('./location-data-categories.json');
const standardDataCategories = require('./standard-data-categories.json');
const categories = [...locationDataCategories, ...standardDataCategories];

const fs = require('fs');
const glob = require('glob');
const path = require('path');

class BuildDataUpdates {
  run() {
    const data = [];

    const updates = glob.sync('data/**/*.csv').map(file => {
      const stats = fs.statSync(file);
      const category = path.dirname(file).split('/')[1];
      const categoryName = categories.find(c => c.category === category).name;

      return { 
        file,
        category: category,
        category_name: categoryName,
        mtime: stats.mtime
      };
    }).sort((a, b) => b.mtime - a.mtime);

    const dest = fs.createWriteStream(`build/data-updates.json`);
    dest.write(JSON.stringify(updates));
  }
}

const buildDataUpdates = new BuildDataUpdates();
buildDataUpdates.run();
