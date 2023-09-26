const path = require('path');
const { excel2csv } = require(path.join(__dirname, '../src/build-csv'));

describe('excel2csv function tests', () => {

  it('should convert Excel to CSV with correct time format', async () => {
    const csvData = await excel2csv(path.join(__dirname, './fixtures/timeFormat.xlsx'));

    const lines = csvData.split('\n');

    const column1 = lines[1].split(',')
    const startTime1 = column1[9];
    const endTime1 = column1[10];

    // セルフォーマット「標準」（文字列値）
    expect(startTime1).toBe('"08:30"');
    expect(endTime1).toBe('"16:30"');

    const column2 = lines[2].split(',')
    const startTime2 = column2[9];
    const endTime2 = column2[10];

    // セルフォーマット「ユーザー定義」（数値）
    expect(startTime2).toBe('"9:30"');
    expect(endTime2).toBe('"23:00"');
  });

  // excelファイルが破損している場合 エラーを返す
  it('should throw error when Excel file is broken', async () => {
    await expect(excel2csv(path.join(__dirname, './fixtures/broken.xlsx'))).rejects.toThrow('FILE_ENDED');
  });
});