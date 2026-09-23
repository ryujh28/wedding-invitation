# 모바일 청첩장

## 파일 구조
```
wedding-invitation/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── package.json
├── next.config.js
└── .gitignore
```

## 배포 단계

### 1. 로컬 설정
```bash
# 프로젝트 폴더 생성 및 이동
mkdir wedding-invitation
cd wedding-invitation

# 위의 파일들을 폴더에 복사
# app 디렉토리, package.json, next.config.js, .gitignore 추가
```

### 2. GitHub 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git push -u origin main
```

### 3. Vercel 배포
1. vercel.com 접속
2. GitHub 계정으로 로그인
3. "Import Project" → wedding-invitation 선택
4. Deploy 클릭

### 4. Google Sheets 설정
1. Google Sheets 생성 (이름: "Wedding RSVP")
2. 첫 시트 이름을 "RSVP"로 변경
3. 확장 프로그램 > Apps Script
4. apps-script.gs 코드 붙여넣기
5. 배포 > 새 배포 > 웹 앱
6. 배포 ID 복사: `https://script.google.com/macros/s/YOUR_ID/exec`

### 5. Apps Script URL 연동
`app/page.tsx` 30번 줄 수정:
```javascript
const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

### 6. 정보 커스터마이징
`app/page.tsx`에서:
- 신랑신부 이름 (16-18줄)
- 날짜/시간/장소 (25-30줄)
- 예식 순서 (83-89줄)
- 계좌 정보 (298-306줄)

## 완료! 🎉
