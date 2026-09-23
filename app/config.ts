/* ------------------------------------------------------------------ */
/*  기본 정보 — 여기만 고치면 청첩장 본문과 카톡 미리보기에 모두 반영됩니다  */
/* ------------------------------------------------------------------ */

// 배포 주소 (카톡 미리보기 이미지 주소를 만들 때 사용)
export const SITE_URL = 'https://wedding-invitation-ryujh28.vercel.app';

// name: 첫 화면·카톡 미리보기에 쓰는 전체 이름 / first: 혼주 소개에 쓰는 이름
export const GROOM = { name: '류재현', first: '재현', parents: '류완석 · 이호연', relation: '아들', photo: '/photos/01.jpg' };
export const BRIDE = { name: '차지예', first: '지예', parents: '차우철 · 김기영', relation: '딸', photo: '/photos/02.jpg' };

// 인사말 (문단 단위, 문단 안 줄바꿈은 \n)
export const GREETING = [
  '봄의 문턱에서\n저희 두 사람은 앞으로 함께 맞이할\n모든 계절을 약속합니다.',
  '봄의 설렘도, 여름의 눈부심도,\n가을의 깊음도, 겨울의 고요함도\n변함없는 마음으로 함께하겠습니다.',
  '저희의 작은 시작에 함께하시어\n기쁜 마음으로 축복해주시면 감사하겠습니다.',
];

// 예식 일시 (월은 1~12 그대로)
export const WEDDING = { year: 2027, month: 3, day: 20, hour: 12, minute: 0 };

export const VENUE = {
  place: '롯데호텔월드', // 지도 검색·링크에 쓰는 이름
  floor: '3층',
  hall: '크리스탈볼룸',
  address: '서울 송파구 올림픽로 240',
  // 지도 핀 위치 — 핀이 어긋나 있으면 이 좌표만 고치면 됩니다
  lat: 37.5113,
  lng: 127.0983,
};

// 예식장 문의
export const CONTACT = { label: '웨딩센터', tel: '02-411-7450' };

// 교통 안내 (필요한 만큼 추가/삭제)
export const TRANSPORT = [
  { label: '지하철', lines: ['2, 8호선 잠실역 3번 출구'] },
  {
    label: '버스',
    lines: [
      '잠실역, 롯데월드 하차',
      '간선  301, 341, 345, 360',
      '지선  2415, 3217, 3313, 3314, 3315, 3317, 3323, 3411, 3414, 4319',
    ],
  },
  {
    label: '자가용',
    lines: [
      '롯데호텔월드 주차장 B2층 H, D구역',
      'B2층 만차 시 B3층에 주차 후 순환카 호출 (02-411-5577 / 대기 약 10분), 호텔 입구까지 이동 (무료)',
      '차량 등록: 예식장 입구 접수대 및 로비 주차 인증데스크 (4시간 무료)',
      '롯데호텔 1층 입구 유료 발렛 가능 (30,000원)',
    ],
  },
];


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
const ampm = WEDDING.hour < 12 ? '오전' : '오후';
const hour12 = WEDDING.hour % 12 === 0 ? 12 : WEDDING.hour % 12;
export const timeKo = `${ampm} ${hour12}시${WEDDING.minute ? ` ${WEDDING.minute}분` : ''}`;
export const dateKo = `${WEDDING.year}년 ${WEDDING.month}월 ${WEDDING.day}일 ${WEEKDAYS[weddingDate.getDay()]}요일`;
export const venueFull = `${VENUE.place} ${VENUE.floor} ${VENUE.hall}`;

export const MAP_LINKS = {
  naver: `https://naver.me/xOxHski3`,
  kakao: `https://map.kakao.com/link/map/${encodeURIComponent(VENUE.place)},${VENUE.lat},${VENUE.lng}`,
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${VENUE.place} ${VENUE.address}`)}`,
};

// 청첩장 안에 보여줄 구글 지도 (API 키 불필요)
export const GOOGLE_MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${VENUE.place} ${VENUE.address}`
)}&z=16&hl=ko&output=embed`;
