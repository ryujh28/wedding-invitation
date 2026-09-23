/* ------------------------------------------------------------------ */
/*  기본 정보 — 여기만 고치면 청첩장 본문과 카톡 미리보기에 모두 반영됩니다  */
/* ------------------------------------------------------------------ */

// 배포 주소 (카톡 미리보기 이미지 주소를 만들 때 사용)
export const SITE_URL = 'https://wedding-invitation-ryujh28.vercel.app';

export const GROOM = { name: '류재현', en: 'Groom', parents: '류완석 · 이호연의 아들', photo: '/photos/01.jpg' };
export const BRIDE = { name: '차지예', en: 'Bride', parents: '차우철 · 김기영의 딸', photo: '/photos/02.jpg' };

// 예식 일시 (월은 1~12 그대로)
export const WEDDING = { year: 2027, month: 3, day: 20, hour: 12, minute: 0 };

export const VENUE = {
  place: '롯데호텔월드', // 지도 검색·링크에 쓰는 이름
  hall: '크리스탈볼룸',
  address: '서울 송파구 올림픽로 240',
  // 지도 핀 위치 — 핀이 어긋나 있으면 이 좌표만 고치면 됩니다
  lat: 37.5113,
  lng: 127.0983,
};

// 교통 안내 (필요한 만큼 추가/삭제)
export const TRANSPORT = [
  { label: '지하철', lines: ['2호선 · 8호선 잠실역'] },
  { label: '주차', lines: ['롯데호텔월드 주차장 이용'] },
];

// 네이버 지도 Client ID (NCP 콘솔에서 발급). 비워두면 지도 없이 길찾기 버튼만 보입니다.
export const NAVER_MAP_CLIENT_ID = '';

export const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxfdaKBePphPrqCqrQqk-LoTQEceDJ9Ctuiq1IiBoSo1G379TOq5G20KQjSjHqwsKIZsw/exec';

// 메인 화면 슬라이드 (순서대로 크로스페이드)
export const HERO_PHOTOS = ['/photos/04.jpg', '/photos/08.jpg', '/photos/06.jpg', '/photos/05.jpg', '/photos/09.jpg'];
// 갤러리 전체
export const GALLERY = Array.from({ length: 10 }, (_, i) => `/photos/${String(i).padStart(2, '0')}.jpg`);

export const ACCOUNTS = {
  groom: [
    { role: '신랑', name: '류재현', bank: '국민은행', number: '123-456-789012' },
    { role: '신랑 아버지', name: '류완석', bank: '은행', number: '000-000-000000' },
    { role: '신랑 어머니', name: '이호연', bank: '은행', number: '000-000-000000' },
  ],
  bride: [
    { role: '신부', name: '차지예', bank: '우리은행', number: '123-456-789012' },
    { role: '신부 아버지', name: '차우철', bank: '은행', number: '000-000-000000' },
    { role: '신부 어머니', name: '김기영', bank: '은행', number: '000-000-000000' },
  ],
};

export const SCHEDULE = [
  { time: '12:00', event: '결혼식' },
  { time: '13:00', event: '2부 예식' },
];

/* ------------------------------------------------------------------ */
/*  아래는 자동 계산 — 고칠 필요 없음                                    */
/* ------------------------------------------------------------------ */
export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
export const pad = (n: number) => String(n).padStart(2, '0');
const weddingDate = new Date(WEDDING.year, WEDDING.month - 1, WEDDING.day);
const ampm = WEDDING.hour < 12 ? '오전' : WEDDING.hour === 12 ? '낮' : '오후';
const hour12 = WEDDING.hour % 12 === 0 ? 12 : WEDDING.hour % 12;
export const timeKo = `${ampm} ${hour12}시${WEDDING.minute ? ` ${WEDDING.minute}분` : ''}`;
export const dateKo = `${WEDDING.year}년 ${WEDDING.month}월 ${WEDDING.day}일 ${WEEKDAYS[weddingDate.getDay()]}요일`;
export const venueFull = `${VENUE.place} ${VENUE.hall}`;

export const MAP_LINKS = {
  naver: `https://map.naver.com/p/search/${encodeURIComponent(VENUE.place)}`,
  kakao: `https://map.kakao.com/link/map/${encodeURIComponent(VENUE.place)},${VENUE.lat},${VENUE.lng}`,
};
