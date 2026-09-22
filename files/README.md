# 🌹 모바일 청첩장

**Google Sheets 자동 저장 + Vercel 무료 호스팅 완성형 청첩장**

## 특징

✨ **아름다운 디자인**
- 우아한 한글 세리프 타이포그래피
- 부드러운 베ージュ/골드 톤 색감
- 모바일 최적화 반응형 디자인

🔄 **자동 RSVP 시스템**
- Google Sheets에 실시간 저장
- 참석자 정보 자동 관리
- 식단 제한사항 메모 기능

🚀 **무료 배포**
- Vercel 무료 호스팅 (영구 무료)
- 커스텀 도메인 옵션
- HTTPS 자동 지원

---

## ⚡ 5분 안에 시작하기

### 1️⃣ Google Sheets 설정
```
1. Google Sheets 생성 (이름: "Wedding RSVP")
2. 확장 프로그램 > Apps Script
3. apps-script.gs 코드 붙여넣기
4. 배포 > 새 배포 > 웹 앱
5. 배포 URL 복사
```

### 2️⃣ 코드 업로드
```bash
# GitHub에 푸시
git add .
git commit -m "Initial"
git push
```

### 3️⃣ Vercel 배포
```
1. Vercel.com 접속
2. Import GitHub Repository
3. 배포 완료!
```

### 4️⃣ 커스터마이징
```
WeddingInvitation.jsx에서 수정:
- 신랑신부 이름
- 결혼식 날짜/장소
- 행사 시간
- 사진 갤러리
- 계좌 정보
```

---

## 🎨 디자인 세부사항

### 색상
- **주요색**: `#b89968` (골드 베이지)
- **배경**: `#faf8f5` (따뜻한 베이지)
- **텍스트**: `#2c2c2c` (진회색)
- **서브색**: `#7a6d5f` (연한 갈색)

### 폰트
- **주 폰트**: Noto Serif CJK KR (한글 세리프)
- **대체**: Georgia (영문 세리프)

### 섹션
```
✓ Hero (제목, 날짜)
✓ 날짜 & 장소
✓ 우리의 이야기
✓ 예식 순서 (타임라인)
✓ 갤러리 (사진)
✓ 오시는 길 (지도)
✓ RSVP 폼
✓ 계좌 정보
✓ Footer
```

---

## 📱 RSVP 폼 기능

**필수 입력**
- 이름
- 연락처
- 참석 여부

**조건부 입력** (참석 선택 시)
- 동반 인원 (1~4명)
- 식단 제한사항 (선택)

**자동 저장**
- Google Sheets의 "RSVP" 시트
- 타임스탐프 + 모든 정보 기록
- 실시간 확인 가능

---

## 🔧 커스텀 가이드

### 이미지 추가
```javascript
// 갤러리에 이미지 추가
<img src="https://your-image-url.jpg" 
     style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
```

### 지도 임베드
```javascript
// Google Maps 임베드 코드 삽입
<iframe src="https://www.google.com/maps/embed?pb=YOUR_CODE"
        style={{ width: '100%', height: '200px' }}
        allowFullScreen="" loading="lazy"></iframe>
```

### 색상 변경
```javascript
// styles 객체에서 색상 코드 수정
ampersand: {
  color: '#b89968', // 이 값 변경
}
```

---

## 📦 파일 구조

```
invitation/
├── WeddingInvitation.jsx      # 메인 컴포넌트
├── package.json               # 의존성
├── next.config.js             # Next.js 설정
├── vercel.json                # Vercel 배포 설정
├── apps-script.gs             # Google Sheets 연동
├── SETUP_GUIDE.md             # 상세 설정 가이드
└── README.md                  # 이 파일
```

---

## 🌐 배포 후 유지보수

### Google Sheets 데이터 관리
```
1. RSVP 시트에서 실시간 확인
2. 엑셀로 다운로드 (File > Download > Excel)
3. 필터링 & 분석 가능
```

### 청첩장 수정
```bash
# 코드 수정 후
git add .
git commit -m "Update invitation details"
git push
# → Vercel 자동 배포 (약 1분)
```

---

## ✅ 체크리스트

- [ ] Google Sheets 생성
- [ ] Apps Script 배포
- [ ] GitHub 리포지토리 생성
- [ ] Vercel 배포
- [ ] 신랑신부 이름 수정
- [ ] 결혼식 날짜/장소 수정
- [ ] 사진 갤러리 추가
- [ ] 지도 임베드
- [ ] 계좌 정보 입력
- [ ] 모바일 테스트
- [ ] 친구에게 공유

---

## 💡 팁

- **QR코드**: 주소를 QR코드로 변환해서 인쇄물에 붙이기
- **SNS**: 카톡 오픈채팅/인스타그램 소개에 링크 공유
- **커스텀 도메인**: `이름결혼.kr` 같은 도메인 구입 후 연결 가능
- **분석**: Vercel 대시보드에서 방문자 수 추적 가능

---

## 🆘 트러블슈팅

**Q: RSVP가 제출되지 않음**
- A: Apps Script 배포 URL이 맞는지 확인
- 브라우저 콘솔(F12)에서 에러 메시지 확인

**Q: 이미지가 안 보임**
- A: HTTPS 이미지 URL 사용 확인
- 이미지 크기 최적화 (1200x800px 추천)

**Q: 배포가 실패함**
- A: package.json에 모든 의존성 설치되었는지 확인
- Vercel 빌드 로그에서 에러 메시지 확인

---

## 📞 연락처

- Vercel 지원: [vercel.com/support](https://vercel.com/support)
- Google Apps Script: [script.google.com](https://script.google.com)

---

**행복한 결혼식 되세요! 🎉💕**
