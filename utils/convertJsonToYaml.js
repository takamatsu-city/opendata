const fs = require('fs');
const yaml = require('js-yaml');

if (process.argv.length < 4) {
  console.error("Usage: node convertJsonToYaml.js [inputFile] [dataType]");
  process.exit(1);
}

const inputFile = process.argv[2];
const dataType = process.argv[3];

if (!["location", "pdf", "standard"].includes(dataType)) {
  console.error("Error: dataType should be one of 'location', 'pdf', or 'standard'");
  process.exit(1);
}

// JSONファイルの読み込み
fs.readFile(inputFile, 'utf8', (err, jsonString) => {
  if (err) {
    console.error(`Error reading the file: ${err}`);
    return;
  }

  const jsonData = JSON.parse(jsonString);
  
  jsonData.forEach(data => {
    const output = {
      category: `${data.category}`,
      name: `${data.name}`,
      filename: `${data.filename}`,
      description: `${data.description}`,
      historical: data.historical,
      dataType: `${dataType}`,
    };

    const yamlString = yaml.dump(output);
    const outputPath = `data/${data.category}/config.yml`;
    fs.mkdirSync(`data/${data.category}`, { recursive: true });

    fs.writeFileSync(outputPath, yamlString, 'utf8');
    console.log(`Saved to ${outputPath}`);
  });
});
