const locationDataCategories = require('./location-data-categories.json');
const standardDataCategories = require('./standard-data-categories.json');

const fs = require('fs');
const glob = require('glob');
const path = require('path');

class BuildReadme {
  run() {
    const opendataViewerUrl = "https://geolonia.github.io/opendata-editor/";

    let readme = "# 高松市オープンデータ\n\n";
    readme += "[サイト(opendata.takamatsu-fact.com/)について（利用規約）](https://opendata.takamatsu-fact.com/about/)\n\n"
    readme += "高松市では、以下のデータをオープンデータとして提供しています。\n\n表内の **CSV** や **GeoJSON** をクリックすると、最新データが得られます。\n\nデータを編集する場合には、**編集**リンクをクリックします。データが地図上に表示され、表組み形式でデータを編集し、編集済みデータをダウンロードすることができます。\n\n位置情報データが誤っている、追加したい、等のご提案には、更新済みのデータの更新をプルリクエストとして送ってください。高松市役所で確認の上、取り込みさせていただきます。詳しい方法は、「[高松市、オープンデータの更新提案の送り方]()」でご案内しています。\n\n";
    readme += "| データ名 | フォルダ | CSV | GeoJSON | 地図で編集 |\n";
    readme += "| --- | --- | --- | --- | --- |\n";
    
    for (let i = 0; i < locationDataCategories.length; i++) {
      const category = locationDataCategories[i];

      const csvFile = glob.sync(`data/${category.category}/*.csv`)[0];
      
      const csvRawFileUrl = `https://raw.githubusercontent.com/takamatsu-city/opendata/main/${csvFile}`;
      const csvFolderUrl = `https://github.com/takamatsu-city/opendata/tree/main/data/${category.category}`;

      const csvFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.csv`;
      const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.geojson`;
      const mapUrl = `${opendataViewerUrl}?data=${csvRawFileUrl}`;

      const filename = path.basename(category.filename, '.xlsx');

      readme += `| ${category.name}(${filename}) | [フォルダ](${csvFolderUrl}) | [CSV](${csvFileUrl}) |[GeoJSON](${jsonFileUrl}) | [編集](${mapUrl}) |\n`;
    }

    readme += "\n以下のデータは位置情報を含まないデータです。\n\n";
    readme += "| データ名 | フォルダ | CSV | JSON |\n";
    readme += "| --- | --- | --- | --- |\n";

    for (let i = 0; i < standardDataCategories.length; i++) {
      const category = standardDataCategories[i];
      const csvFolderUrl = `https://github.com/takamatsu-city/opendata/tree/main/data/${category.category}`;
      const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.json`;
      const csvFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/data.csv`;
      if (category.category === "city_planning_basic_survey_information") {
        const csvFiles = glob.sync(`data/${category.category}/${category.filename}*.csv`);
        csvFiles.map(file => {
          const filename = path.basename(file, '.csv');
          const jsonFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/${filename}.json`;
          const csvFileUrl = `https://opendata.takamatsu-fact.com/${category.category}/${filename}.csv`;          
          const subCategory = filename.split('_')[1];
          if (file === csvFiles[0]) {
            readme += `| ${category.name}(${category.filename}) | [フォルダ](${csvFolderUrl}) | [CSV](${csvFileUrl}) | [JSON(${subCategory})](${jsonFileUrl}) |\n`;
          } else {
            readme += `||| [CSV](${csvFileUrl}) | [JSON(${subCategory})](${jsonFileUrl}) |\n`;
          } 
        });
      } else if (category.historical) {
        readme += `| ${category.name}(${category.filename}) | [フォルダ](${csvFolderUrl}) | [CSV(最新データ)](${csvFileUrl}) | [JSON(最新データ)](${jsonFileUrl}) |\n`;
      } else {
        readme += `| ${category.name}(${category.filename}) | [フォルダ](${csvFolderUrl}) | [CSV](${csvFileUrl}) | [JSON](${jsonFileUrl}) |\n`;  
      }
    }

    readme += "\n\n| データ名 | PDF |\n";
    readme += "| --- | --- |\n";
    readme += "| 小中学校通学区域情報 | [PDF](https://github.com/takamatsu-city/opendata/tree/main/data/school_area_information) |\n";
    readme += "| 令和2年度市民満足度アンケート結果 | [PDF](https://github.com/takamatsu-city/opendata/tree/main/data/citizen_satisfaction_questionnaire_result_r2) |\n";

    fs.writeFileSync("README.md" , readme);
  }
}

const buildReadme = new BuildReadme();
buildReadme.run();
