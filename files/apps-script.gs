// Google Apps Script for Wedding RSVP
// 사용 방법:
// 1. Google Sheets에서 새 파일 생성 (이름: "Wedding RSVP")
// 2. 확장 프로그램 > Apps Script 클릭
// 3. 이 코드를 붙여넣기
// 4. 배포 > 새 배포 > 웹 앱으로 설정
// 5. 실행 권한: 본인, 액세스: 모든 사람으로 설정
// 6. 배포 ID를 복사해서 WeddingInvitation.jsx의 scriptUrl에 붙여넣기

const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEET_NAME = 'RSVP';

function doGet(e) {
  return HtmlService.createHtmlOutput('GET 요청은 지원하지 않습니다.');
}

function doPost(e) {
  try {
    // 요청 데이터 파싱
    const params = e.parameter;
    
    const data = {
      timestamp: params.timestamp || new Date().toISOString(),
      name: params.name || '',
      phone: params.phone || '',
      attending: params.attending || '',
      guestCount: params.guestCount || '',
      dietary: params.dietary || '',
    };

    // Sheets API를 통해 데이터 저장
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // 헤더 확인 및 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '타임스탬프',
        '이름',
        '연락처',
        '참석 여부',
        '동반 인원',
        '식단 제한사항'
      ]);
    }

    // 데이터 추가
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.attending === 'yes' ? '참석' : '불참',
      data.guestCount,
      data.dietary
    ]);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: '참석 의사 표시가 저장되었습니다.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 테스트 함수 (Apps Script 에디터에서 실행해서 Sheets 생성 테스트)
function createSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.insertSheet(SHEET_NAME);
  
  sheet.appendRow([
    '타임스탬프',
    '이름',
    '연락처',
    '참석 여부',
    '동반 인원',
    '식단 제한사항'
  ]);
  
  Logger.log('Sheet created: ' + SHEET_NAME);
}
