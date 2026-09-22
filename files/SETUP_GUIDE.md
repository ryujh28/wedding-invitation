# 청첩장 배포 가이드

## 1단계: Google Sheets 설정 (RSVP 데이터 저장)

### 1.1 Google Sheets 생성
1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 생성 (이름: "Wedding RSVP")
3. 첫 번째 시트의 이름을 "RSVP"로 변경

### 1.2 Google Apps Script 설정
1. Google Sheets 상단의 **확장 프로그램 > Apps Script** 클릭
2. 기존 코드 삭제
3. `apps-script.gs` 파일의 전체 코드 복사 후 붙여넣기
4. 저장 (Ctrl+S)
5. `createSheet()` 함수를 클릭하고 상단의 ▶ 실행 버튼 누르기
   - "권한 검토" → 본인 계정으로 로그인 → "허용" 클릭

### 1.3 웹 앱으로 배포
1. **배포** > **새 배포** 클릭
2. 배포 유형에서 **웹 앱** 선택
3. 설정:
   - 새 실행 파일로 실행: 본인 이메일
   - 다음 사용자가 액세스: 모든 사람
4. **배포** 클릭
5. 생성된 배포 ID 복사 (이후 필요)

```
예시: https://script.google.com/macros/s/AKfycbxXxXxXxXxXxXxXx/usercallback
```

---

## 2단계: GitHub 설정

### 2.1 리포지토리 생성
1. [GitHub](https://github.com) 접속
2. **New Repository** 클릭
3. Repository 이름: `wedding-invitation`
4. **Create Repository** 클릭

### 2.2 로컬 코드 푸시
```bash
# 프로젝트 폴더에서
git init
git add .
git commit -m "Initial commit: wedding invitation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git push -u origin main
```

---

## 3단계: Vercel 배포 (무료 호스팅)

### 3.1 GitHub 연결
1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. **Import Project** > **Import Git Repository**
4. `wedding-invitation` 리포지토리 선택
5. **Import** 클릭

### 3.2 환경 변수 설정
프로젝트 설정에서 환경 변수 추가:

```
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/usercallback
```

### 3.3 배포
1. **Deploy** 클릭
2. 배포 완료 (약 1분)
3. 생성된 URL 확인 (예: `https://wedding-invitation-abc123.vercel.app`)

---

## 4단계: 청첩장 커스터마이징

### 4.1 신랑신부 정보 수정
`WeddingInvitation.jsx`에서 다음 부분 수정:

```javascript
<h1 style={styles.mainTitle}>
  <span style={styles.nameSpan}>신랑이름</span>
  <span style={styles.ampersand}>&</span>
  <span style={styles.nameSpan}>신부이름</span>
</h1>
```

### 4.2 행사 정보 수정
```javascript
<p style={styles.weddingDate}>2024년 6월 1일 토요일</p>
```

### 4.3 장소 및 시간
```javascript
<p style={styles.infoValue}>그랜드 볼룸</p>
<p style={styles.infoValue}>2024.06.01 SAT</p>
```

### 4.4 예식 순서 수정
```javascript
{[
  { time: '16:00', event: '예식장 입장' },
  { time: '16:30', event: '결혼식' },
  // ... 수정하기
].map((item, idx) => (
```

### 4.5 사진 갤러리 추가
```javascript
// 이미지 URL로 교체
<div style={styles.galleryPlaceholder}>
  <img src="YOUR_IMAGE_URL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</div>
```

### 4.6 구글 맵 임베드
```javascript
<div style={styles.locationMap}>
  <iframe
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>
```

### 4.7 계좌 정보
```javascript
<div style={styles.accountCard}>
  <p style={styles.accountName}>신랑 이름</p>
  <p style={styles.accountBank}>국민은행 123-456-789012</p>
</div>
```

---

## 5단계: 코드 수정 후 배포

```bash
# 로컬에서 수정 후
git add .
git commit -m "Update wedding details"
git push

# Vercel 자동 배포 시작
```

---

## 6단계: RSVP 데이터 확인

1. Google Sheets 접속
2. "RSVP" 시트에서 실시간으로 데이터 확인
3. 엑셀로 내보내기 가능 (File > Download)

---

## 트러블슈팅

### RSVP 제출이 안 될 때
1. Apps Script 배포 URL 확인
2. `WeddingInvitation.jsx`의 `scriptUrl` 변수 재확인
3. 브라우저 개발자 도구(F12) > Console에서 에러 확인

### 이미지 안 보일 때
- 이미지 URL이 HTTPS 프로토콜을 사용하는지 확인
- 이미지 크기: 1200x800px 또는 정사각형 (가로세로 같음)

### 지도 안 보일 때
1. [Google Maps Platform](https://console.cloud.google.com)에서 API 키 생성
2. Embed URL에 API 키 추가

---

## 고급: 커스텀 도메인 연결 (선택사항)

1. Vercel > Settings > Domains
2. 본인 도메인 추가
3. DNS 설정 수정 (도메인 호스팅 서비스에서)
4. 약 10분 후 반영 완료

예시: `우리이름.kr`

---

## 팁

- 모바일 환경에서 테스트 (QR코드 스캔)
- PC 환경에서도 테스트
- 조명 밝은 환경에서 색감 확인
- 친구에게 RSVP 폼 테스트 요청

---

질문이 있으면 Vercel 또는 GitHub의 이슈 섹션 활용
