const locationDataCategories = require('./location-data-categories.json');
const standardDataCategories = require('./standard-data-categories.json');

const fs = require('fs');
const glob = require('glob');
const path = require('path');

class BuildReadme {
  run() {
    const opendataViewerUrl = "https://geolonia.github.io/opendata-editor/";

    let readme = "# 高松市オープンデータ\n\n高松市では、以下のデータをオープンデータとして提供しています。\n\n表内の **CSV** や **GeoJSON** をクリックすると、最新データが得られます。\n\nデータを編集する場合には、**編集**リンクをクリックします。データが地図上に表示され、表組み形式でデータを編集し、編集済みデータをダウンロードすることができます。\n\n位置情報データが誤っている、追加したい、等のご提案には、更新済みのデータの更新をプルリクエストとして送ってください。高松市役所で確認の上、取り込みさせていただきます。詳しい方法は、「[高松市、オープンデータの更新提案の送り方]()」でご案内しています。\n\n";
    readme += "| データ名 | CSV | GeoJSON | 地図で編集 | 説明 |\n";
    readme += "| --- | --- | --- | --- | --- |\n";
    
    for (let i = 0; i < locationDataCategories.length; i++) {
      const category = locationDataCategories[i];

      const csvFile = glob.sync(`data/${category.category}/*.csv`)[0];
      const csvFileUrl = `https://raw.githubusercontent.com/takamatsu-city/opendata/main/${csvFile}`;
      const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.geojson`
      const mapUrl = `${opendataViewerUrl}?data=${csvFileUrl}`;

      readme += `| ${category.name} | [CSV](${csvFileUrl}) |[GeoJSON](${jsonFileUrl}) | [編集](${mapUrl}) | ${category.description} |\n`;
    }

    readme += "\n以下のデータは位置情報を含まないデータです。\n\n";
    readme += "| データ名 | 最新版CSV | 最新版JSON | 過去データ一覧 | 説明 |\n";
    readme += "| --- | --- | --- | --- | --- |\n";

    for (let i = 0; i < standardDataCategories.length; i++) {
      const category = standardDataCategories[i];

      const jsonFiles = `build/${category.category}/*.json`;
      glob.sync(jsonFiles).map(file => {
        const date = path.basename(file, '.json');
        const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/${date}.json`
        const csvFile = `data/${category.category}/${date}.csv`
        const csvFileUrl = `https://raw.githubusercontent.com/takamatsu-city/opendata/main/${csvFile}`;

        readme += `| ${category.name}(${date}) | [CSV](${csvFileUrl}) | [JSON](${jsonFileUrl}) | [過去データ]() | ${category.description} |\n`
      });
    }

    fs.writeFileSync("README.md" , readme)
  }
}

const buildReadme = new BuildReadme();
buildReadme.run();
