const fs = require('fs');
const path = require('path');
const csvToGeoJSON = require(path.join(__dirname, '../src/csv-to-geojson.js'));
const expectedGeoJSON = fs.readFileSync(path.join(__dirname, './fixtures/csv2geojson.geojson'), 'utf8');

describe('csv2geojson function tests', () => {
  it('should convert CSV to GeoJSON', async () => {
    const csvData = `latitude,longitude,name\n35.681236,139.767125,東京駅\n35.658581,139.745433,品川駅`;

    const { data } = await csvToGeoJSON(csvData);
    expect(data).toEqual(JSON.parse(expectedGeoJSON));
  });

  it('should convert CSV to GeoJSON', async () => {
    const csvData = `緯度,経度,name\n35.681236,139.767125,東京駅\n35.658581,139.745433,品川駅`;

    const { data } = await csvToGeoJSON(csvData);
    expect(data).toEqual(JSON.parse(expectedGeoJSON));
  });
});
