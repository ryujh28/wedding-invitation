// 신랑측 / 신부측 탭을 나눠서 기록합니다. 탭이 없으면 자동으로 만들어요.
const SHEETS = { groom: '신랑측', bride: '신부측' };
const FALLBACK_SHEET = '미분류';
const HEADERS = ['제출 시각', '이름', '참석 여부', '인원'];

function doPost(e) {
  try {
    const params = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = SHEETS[params.side] || FALLBACK_SHEET;
    const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      params.name,
      params.attending === 'yes' ? '참석' : '불참',
      Number(params.guestCount) || 0,
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
