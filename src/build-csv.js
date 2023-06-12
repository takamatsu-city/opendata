const { writeFile } = require('fs/promises');
const klaw = require('klaw');
const Papa = require('papaparse');
const { basename, dirname, join } = require('path');
const readXlsxFile = require('read-excel-file/node');

const excel2csv = async (excelPath) => {
  let rows = await readXlsxFile(excelPath);

  // Remove first column
  rows = rows.filter(row => { // remove empty lines ― This is required because Papaparse does not elimitate the row with all null cells
    if (!Array.isArray(row)) {
      return false;
    }

    for (const cell of row) {
      if (cell) {
        return true;
      }
    }

    return false;
  });

  const csv = Papa.unparse(rows, { quotes: true, skipEmptyLines: true });

  return csv.endsWith("\r\n") || csv.endsWith("\n") ? csv : csv + "\r\n";
};

(async () => {
  const promises = [];

  for await (const file of klaw(join(__dirname, "../data"), { depthLimit: -1 })) {
    if (file.path.endsWith(".xlsx")) {
      const excelPath = file.path;
      const csvPath = join(dirname(excelPath), `${basename(excelPath, ".xlsx")}.csv`);

      const csv = await excel2csv(excelPath);
      promises.push(writeFile(csvPath, csv));
    }
  }

  await Promise.all(promises);
})();

module.exports = { excel2csv };
