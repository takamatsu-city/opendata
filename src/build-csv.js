const { writeFile } = require('fs/promises');
const klaw = require('klaw');
const { basename, dirname, join } = require('path');
const XLSX = require('xlsx');

const excel2csv = async (excelPath) => {

  const workbook = XLSX.readFile(excelPath, {cellNF: true, cellText: true, cellDates: true});
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const csv = XLSX.utils.sheet_to_csv(sheet, { FS: ',', RS: '\r\n', blankrows: false, forceQuotes: true});

  if (csv === "") {
    throw new Error("FILE_ENDED");
  }

  return csv.endsWith("\r\n") || csv.endsWith("\n") ? csv : csv + "\r\n";
};

const main = async () => {
  const promises = [];

  for await (const file of klaw(join(__dirname, "../data"), { depthLimit: -1 })) {
    if (file.path.endsWith(".xlsx")) {
      const excelPath = file.path;
      const csvPath = join(dirname(excelPath), `${basename(excelPath, ".xlsx")}.csv`);

      promises.push((async () => {
        try {
          const csv = await excel2csv(excelPath);
          await writeFile(csvPath, csv);
        } catch (err) {
          console.error(`Error: Excel ファイル ${excelPath} を CSV に変換できませんでした。`);
          
          await writeFile('error-file.txt', excelPath);

          if (err.message === "FILE_ENDED") {
            console.error("データが空になっているか、Excel ファイルが破損している可能性があります。");
          }
          throw err;
        }
      })());
    }
  }

  await Promise.all(promises);
}

if (require.main === module) {
  main();
} else {
  module.exports = { excel2csv };
}
