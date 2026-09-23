# 404 오류 해결 — 재배포 가이드

이전 배포에서 Next.js 구조 문제로 404가 발생했습니다. 이제 완전히 수정되었습니다.

## ✅ 수정된 부분

1. **layout.tsx 추가** — Next.js 필수 파일
2. **globals.css 추가** — 전역 스타일
3. **WeddingInvitation 컴포넌트 이동** — `/app/components/` 디렉토리
4. **import 경로 수정** — 정확한 경로 설정
5. **package.json 정리** — 필요한 스크립트만 유지

---

## 🚀 재배포 방법

### 옵션 A: Vercel 대시보드에서 재배포 (가장 간단)

1. Vercel 대시보드 접속
2. `wedding-invitation` 프로젝트 클릭
3. **Deployments** 탭
4. 최신 배포 찾기
5. **Redeploy** 버튼 클릭
6. 2-3분 기다리기

### 옵션 B: GitHub에 코드 푸시 (권장)

```bash
# 프로젝트 폴더에서
cd wedding-invitation

# 변경사항 모두 추가
git add .

# 커밋
git commit -m "Fix: Next.js structure and routing"

# 푸시 (Vercel 자동 배포)
git push
```

Vercel이 자동으로 변경사항을 감지하고 배포합니다 (약 1분).

---

## 📝 배포 후 확인

1. Vercel 배포 URL 접속
2. 홈페이지가 정상적으로 보이는지 확인
3. RSVP 플로팅 버튼 클릭 → 폼이 보이는지 확인

---

## ⚙️ Google Apps Script URL 설정

아직 안 했다면:

1. `/app/components/WeddingInvitation.jsx` 열기
2. 24번 줄 찾기:
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. `YOUR_SCRIPT_ID` 부분을:
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/AKfycbxbGVuwj1_r62hILYTrmUNHchqpofaIvLwg_N37aWZDyLq7sR5EME9Z5L7t3ldocd4tbg/exec';
   ```
   로 변경

4. 저장 후:
   ```bash
   git add .
   git commit -m "Add Google Apps Script URL"
   git push
   ```

---

## 🔍 여전히 404가 나면

### 확인사항:

1. **URL 확인**
   - Vercel 대시보드의 Domain 섹션에서 프로젝트 URL 확인
   - 브라우저에서 정확히 입력했는지 확인

2. **빌드 로그 확인**
   - Vercel 대시보드 > Deployments > 최신 배포 > Logs
   - "error" 있는지 확인

3. **캐시 삭제**
   - Ctrl+Shift+Delete (Windows) 또는 Cmd+Shift+Delete (Mac)
   - 브라우저 캐시 삭제 후 새로고침

4. **수동 재배포**
   ```
   Vercel > Deployments > 최신 배포 > ... > Redeploy
   ```

---

## 📁 최종 파일 구조

```
invitation/
├── app/
│   ├── components/
│   │   └── WeddingInvitation.jsx    ← 메인 컴포넌트
│   ├── globals.css                  ← 전역 스타일
│   ├── layout.tsx                   ← Next.js 레이아웃
│   └── page.tsx                     ← 홈페이지
├── .gitignore
├── package.json
├── next.config.js
├── vercel.json
├── apps-script.gs
├── README.md
└── REDEPLOY.md                      ← 이 파일
```

---

## 💡 팁

- **로컬에서 테스트**:
  ```bash
  npm install
  npm run dev
  # localhost:3000 에서 확인
  ```

- **Vercel 무료 배포** 지원:
  - 월 100GB 네트워크 대역폭
  - 서버리스 함수 최대 10초
  - 무제한 배포

---

**이제 배포 완료! 🎉**
