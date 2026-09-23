const SHEET_NAME = 'RSVP';
const HEADERS = ['타임스탬프', '구분', '이름', '참석 여부', '인원'];

function doPost(e) {
  try {
    const params = e.parameter;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      params.timestamp || new Date().toISOString(),
      params.side === 'groom' ? '신랑측' : params.side === 'bride' ? '신부측' : '',
      params.name,
      params.attending === 'yes' ? '참석' : '불참',
      params.guestCount,
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
