const path = require('path');
const glob = require('glob');
const fs = require('fs');
const buildConfigJSON = require(path.join(__dirname, '../src/build-config-json'));
const configJsonNames = ['location-data-categories.json', 'standard-data-categories.json', 'pdf-data-categories.json'];
const fixturesDir = path.join(__dirname, 'fixtures', 'buildConfigJson');

describe('buildConfigJSON function tests', () => {

  afterEach(() => {
    for (const name of configJsonNames) {

      const exists = fs.existsSync(path.join(fixturesDir, name));
      if (!exists) continue;
      
      fs.unlinkSync(path.join(fixturesDir, name));
    }
  });


  it ('should convert YAML to JSON', async () => {
    const configFiles = glob.sync(path.join(__dirname, 'fixtures/buildConfigJson/*.yml'));

    await buildConfigJSON(configFiles, fixturesDir);

    const locationData = require(path.join(fixturesDir, 'location-data-categories-sample.json'));
    const standardData = require(path.join(fixturesDir, 'standard-data-categories-sample.json'));
    const pdfData = require(path.join(fixturesDir, 'pdf-data-categories-sample.json'));

    // ファイルが一致するか確認
    expect(locationData).toEqual(require(path.join(fixturesDir, 'location-data-categories.json')));
    expect(standardData).toEqual(require(path.join(fixturesDir, 'standard-data-categories.json')));
    expect(pdfData).toEqual(require(path.join(fixturesDir, 'pdf-data-categories.json')));

  });
});