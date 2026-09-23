const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const params = e.parameter;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['타임스탬프', '이름', '연락처', '참석 여부', '동반 인원', '식단제한']);
    }

    sheet.appendRow([
      params.timestamp || new Date().toISOString(),
      params.name,
      params.phone,
      params.attending === 'yes' ? '참석' : '불참',
      params.guestCount,
      params.dietary
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
