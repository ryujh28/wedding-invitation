'use client';

import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  기본 정보 — 여기만 고치면 전체에 반영됩니다                           */
/* ------------------------------------------------------------------ */
const GROOM = { name: '류재현', en: 'Groom', parents: '류완석 · 이호연의 아들', photo: '/photos/01.jpg' };
const BRIDE = { name: '차지예', en: 'Bride', parents: '차우철 · 김기영의 딸', photo: '/photos/02.jpg' };

// 예식 일시 (월은 1~12 그대로)
const WEDDING = { year: 2027, month: 3, day: 20, hour: 12, minute: 00 };
const VENUE = { name: '크리스탈볼룸', address: '서울 송파구 올림픽로 240, 롯데호텔월드' };

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxfdaKBePphPrqCqrQqk-LoTQEceDJ9Ctuiq1IiBoSo1G379TOq5G20KQjSjHqwsKIZsw/exec';

// 메인 화면 슬라이드 (순서대로 크로스페이드)
const HERO_PHOTOS = ['/photos/04.jpg', '/photos/08.jpg', '/photos/06.jpg', '/photos/05.jpg', '/photos/09.jpg'];
// 갤러리 전체
const GALLERY = Array.from({ length: 10 }, (_, i) => `/photos/${String(i).padStart(2, '0')}.jpg`);

const ACCOUNTS = {
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

const SCHEDULE = [
  { time: '12:00', event: '결혼식' },
  { time: '13:00', event: '2부 예식' }
];

/* ------------------------------------------------------------------ */

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const pad = (n: number) => String(n).padStart(2, '0');
const weddingDate = new Date(WEDDING.year, WEDDING.month - 1, WEDDING.day, WEDDING.hour, WEDDING.minute);
const ampm = WEDDING.hour < 12 ? '오전' : '오후';
const hour12 = WEDDING.hour % 12 === 0 ? 12 : WEDDING.hour % 12;
const timeKo = `${ampm} ${hour12}시${WEDDING.minute ? ` ${WEDDING.minute}분` : ''}`;
const dateKo = `${WEDDING.year}년 ${WEDDING.month}월 ${WEDDING.day}일 ${WEEKDAYS[weddingDate.getDay()]}요일`;

/* 스크롤 시 서서히 나타나는 효과 */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* 사진 띠 패럴랙스 */
function useParallax() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const box = el.parentElement!.getBoundingClientRect();
        const progress = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translate3d(0, ${progress * -60}px, 0) scale(1.15)`;
      });
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

function HeroSlideshow() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_PHOTOS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hero-slides" aria-hidden>
      {HERO_PHOTOS.map((src, i) => (
        <div key={src} className={`hero-slide ${i === idx ? 'active' : ''}`} style={{ backgroundImage: `url(${src})` }} />
      ))}
    </div>
  );
}

function Petals() {
  // 은은하게 떨어지는 꽃잎/빛 입자 (CSS 애니메이션)
  const petals = Array.from({ length: 14 }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i * 1.3) % 9,
    duration: 9 + ((i * 7) % 6),
    size: 5 + ((i * 3) % 6),
  }));
  return (
    <div className="petals" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function PhotoBand({ src, children }: { src: string; children?: React.ReactNode }) {
  return (
    <div className="photo-band">
      <img data-parallax src={src} alt="" loading="lazy" />
      {children && <div className="photo-band-text">{children}</div>}
    </div>
  );
}

function Calendar() {
  const first = new Date(WEDDING.year, WEDDING.month - 1, 1).getDay();
  const days = new Date(WEDDING.year, WEDDING.month, 0).getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const [dday, setDday] = useState<number | null>(null);
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(WEDDING.year, WEDDING.month - 1, WEDDING.day);
    setDday(Math.round((target.getTime() - today.getTime()) / 86400000));
  }, []);
  return (
    <div className="calendar reveal">
      <p className="cal-month">{WEDDING.month}월</p>
      <div className="cal-grid">
        {WEEKDAYS.map((w, i) => (
          <span key={w} className={`cal-head ${i === 0 ? 'sun' : ''}`}>
            {w}
          </span>
        ))}
        {cells.map((d, i) => (
          <span key={i} className={`cal-day ${i % 7 === 0 ? 'sun' : ''} ${d === WEDDING.day ? 'on' : ''}`}>
            {d ?? ''}
          </span>
        ))}
      </div>
      {dday !== null && (
        <p className="dday">
          {GROOM.name} ♥ {BRIDE.name}의 결혼식이{' '}
          {dday > 0 ? (
            <>
              <b>{dday}일</b> 남았습니다
            </>
          ) : dday === 0 ? (
            <b>오늘입니다</b>
          ) : (
            <>
              <b>{-dday}일</b> 지났습니다
            </>
          )}
        </p>
      )}
    </div>
  );
}

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const touchX = useRef<number | null>(null);
  const shown = showAll ? GALLERY : GALLERY.slice(0, 9);
  const move = (d: number) => setOpen((o) => (o === null ? o : (o + d + GALLERY.length) % GALLERY.length));

  useEffect(() => {
    document.body.style.overflow = open !== null ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <div className="gallery reveal">
        {shown.map((src, i) => (
          <button key={src} className="gallery-item" onClick={() => setOpen(i)} aria-label={`사진 ${i + 1} 크게 보기`}>
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      {!showAll && GALLERY.length > 9 && (
        <button className="more-btn" onClick={() => setShowAll(true)}>
          더 보기 ⌄
        </button>
      )}
      {open !== null && (
        <div
          className="lightbox"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <img key={open} src={GALLERY[open]} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lb-nav lb-prev" onClick={(e) => (e.stopPropagation(), move(-1))} aria-label="이전">
            ‹
          </button>
          <button className="lb-nav lb-next" onClick={(e) => (e.stopPropagation(), move(1))} aria-label="다음">
            ›
          </button>
          <p className="lb-count">
            {open + 1} / {GALLERY.length}
          </p>
        </div>
      )}
    </>
  );
}

function AccountGroup({ title, list, side }: { title: string; list: typeof ACCOUNTS.groom; side: 'groom' | 'bride' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div className={`acc ${side} ${open ? 'open' : ''}`}>
      <button className="acc-head" onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        <span className="chev">⌄</span>
      </button>
      <div className="acc-body">
        <div>
          {list.map((a) => (
            <div key={a.role} className="acc-row">
              <div>
                <p className="acc-role">
                  {a.role} <b>{a.name}</b>
                </p>
                <p className="acc-num">
                  {a.bank} {a.number}
                </p>
              </div>
              <button className="copy-btn" onClick={() => copy(`${a.bank} ${a.number}`)}>
                {copied === `${a.bank} ${a.number}` ? '복사됨' : '복사'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const EMPTY_RSVP = { name: '', side: '', attending: 'yes', guestCount: '1' };

export default function Home() {
  const [rsvp, setRsvp] = useState(EMPTY_RSVP);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const rsvpRef = useRef<HTMLElement>(null);
  useReveal();
  useParallax();

  const set = (k: keyof typeof EMPTY_RSVP, v: string) => setRsvp((p) => ({ ...p, [k]: v }));

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvp.side) {
      alert('신랑측 / 신부측을 선택해주세요.');
      return;
    }
    setLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          name: rsvp.name,
          side: rsvp.side,
          attending: rsvp.attending,
          guestCount: rsvp.attending === 'yes' ? rsvp.guestCount : '0',
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
      setRsvp(EMPTY_RSVP);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('RSVP 제출 오류:', error);
      alert('제출에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      {/* Hero */}
      <section className="hero">
        <HeroSlideshow />
        <div className="hero-shade" />
        <Petals />
        <div className="hero-content">
          <p className="hero-kicker">
            <span>Our</span> <em>Wedding</em> <span>Day</span>
          </p>
          <h1 className="hero-names">
            {GROOM.name}
            <span className="amp">&</span>
            {BRIDE.name}
          </h1>
          <p className="hero-date">
            {WEDDING.year}. {pad(WEDDING.month)}. {pad(WEDDING.day)} · {timeKo}
          </p>
          <p className="hero-venue">{VENUE.name}</p>
        </div>
        <div className="scroll-hint" aria-hidden>
          <span />
        </div>
      </section>

      {/* Greeting */}
      <section className="section">
        <p className="eyebrow reveal">INVITATION</p>
        <h2 className="title reveal">초대합니다</h2>
        <p className="body-text reveal">
          처음 만났을 때부터 특별했던 순간들이 모여,
          <br />
          이제 함께 새로운 장을 시작하려 합니다.
          <br />
          <br />
          소중한 분들을 초대하여
          <br />
          우리의 행복을 나누고 싶습니다.
        </p>

        <div className="couple">
          {[GROOM, BRIDE].map((p, i) => (
            <div key={p.en} className={`couple-card reveal ${i ? 'from-right' : 'from-left'}`}>
              <div className="couple-photo">
                <img src={p.photo} alt="" loading="lazy" />
              </div>
              <p className="couple-role">{i ? '신부' : '신랑'}</p>
              <p className="couple-name">{p.name}</p>
              <p className="couple-parents">{p.parents}</p>
            </div>
          ))}
        </div>
      </section>

      <PhotoBand src="/photos/00.jpg" />

      {/* Info */}
      <section className="section">
        <p className="eyebrow reveal">WEDDING DAY</p>
        <h2 className="title reveal">예식 안내</h2>
        <p className="body-text reveal">
          {dateKo} {timeKo}
          <br />
          {VENUE.name}
        </p>
        <Calendar />

        <div className="timeline reveal">
          {SCHEDULE.map((item) => (
            <div key={item.time} className="tl-item">
              <span className="tl-time">{item.time}</span>
              <span className="tl-dot" />
              <span className="tl-event">{item.event}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <p className="eyebrow reveal">GALLERY</p>
        <h2 className="title reveal">갤러리</h2>
        <Gallery />
      </section>

      {/* Location */}
      <section className="section">
        <p className="eyebrow reveal">LOCATION</p>
        <h2 className="title reveal">오시는 길</h2>
        <div className="reveal">
          <p className="loc-name">{VENUE.name}</p>
          <p className="loc-addr">{VENUE.address}</p>
          <div className="loc-map">지도 위치</div>
          <div className="loc-info">
            <p className="loc-label">지하철</p>
            <p>강남역 6번 출구</p>
            <p className="loc-label">주차</p>
            <p>지하 주차장 완비</p>
          </div>
        </div>
      </section>

      <PhotoBand src="/photos/07.jpg" />

      {/* RSVP */}
      <section className="section" ref={rsvpRef}>
        <p className="eyebrow reveal">R.S.V.P.</p>
        <h2 className="title reveal">참석 의사 전달</h2>
        <p className="body-text small reveal">
          축하의 마음으로 참석해주시는 분들을 위해
          <br />
          원활한 준비를 할 수 있도록 알려주세요.
        </p>

        {submitted ? (
          <div className="success">
            <p className="success-icon">✓</p>
            <p>참석 의사가 전달되었습니다.</p>
            <p className="small">감사합니다.</p>
          </div>
        ) : (
          <form onSubmit={handleRsvpSubmit} className="form reveal">
            <div className="field">
              <label className="label">어느 쪽 하객이신가요?</label>
              <div className="seg">
                {[
                  ['groom', '신랑측'],
                  ['bride', '신부측'],
                ].map(([v, t]) => (
                  <button
                    type="button"
                    key={v}
                    className={`seg-btn ${v} ${rsvp.side === v ? 'on' : ''}`}
                    onClick={() => set('side', v)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="rsvp-name">
                성함
              </label>
              <input
                id="rsvp-name"
                className="input"
                value={rsvp.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="성함을 입력해주세요"
                required
              />
            </div>

            <div className="field">
              <label className="label">참석 여부</label>
              <div className="seg">
                {[
                  ['yes', '참석합니다'],
                  ['no', '참석이 어려워요'],
                ].map(([v, t]) => (
                  <button
                    type="button"
                    key={v}
                    className={`seg-btn ${rsvp.attending === v ? 'on' : ''}`}
                    onClick={() => set('attending', v)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {rsvp.attending === 'yes' && (
              <div className="field">
                <label className="label" htmlFor="rsvp-count">
                  참석 인원 (본인 포함)
                </label>
                <select
                  id="rsvp-count"
                  className="input"
                  value={rsvp.guestCount}
                  onChange={(e) => set('guestCount', e.target.value)}
                >
                  <option value="1">1명</option>
                  <option value="2">2명</option>
                  <option value="3">3명</option>
                  <option value="4">4명 이상</option>
                </select>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? '전달 중...' : '참석 의사 전달하기'}
            </button>
          </form>
        )}
      </section>

      {/* Account */}
      <section className="section">
        <p className="eyebrow reveal">WITH LOVE</p>
        <h2 className="title reveal">마음 전하실 곳</h2>
        <p className="body-text small reveal">
          멀리서도 축하의 마음을 전하고 싶으신 분들을 위해
          <br />
          계좌번호를 안내드립니다.
          <br />
          <br />
          보내주시는 따뜻한 마음에 깊이 감사드립니다.
        </p>
        <div className="reveal">
          <AccountGroup title="신랑측" list={ACCOUNTS.groom} side="groom" />
          <AccountGroup title="신부측" list={ACCOUNTS.bride} side="bride" />
        </div>
      </section>

      {/* Ending */}
      <PhotoBand src="/photos/08.jpg">
        <p>축하해주신 만큼 잘 살겠습니다</p>
        <p>감사합니다</p>
      </PhotoBand>

      <footer className="footer">
        <p>Thank you for being part of our story</p>
      </footer>

      <button onClick={() => rsvpRef.current?.scrollIntoView({ behavior: 'smooth' })} className="floating">
        RSVP
      </button>
    </main>
  );
}
