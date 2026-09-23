'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ACCOUNTS,
  BRIDE,
  CONTACT,
  GALLERY,
  GREETING,
  GROOM,
  HERO_PHOTOS,
  MAP_LINKS,
  NAVER_MAP_CLIENT_ID,
  SCHEDULE,
  SCRIPT_URL,
  TRANSPORT,
  VENUE,
  WEDDING,
  WEEKDAYS,
  dateKo,
  pad,
  timeKo,
  venueFull,
} from './config';

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

/* 네이버 지도 (Client ID가 있을 때만 표시) */
declare global {
  interface Window {
    naver?: any;
    navermap_authFailure?: () => void;
  }
}

function NaverMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!NAVER_MAP_CLIENT_ID || !ref.current) return;
    window.navermap_authFailure = () => setFailed(true);

    const draw = () => {
      const { maps } = window.naver;
      const pos = new maps.LatLng(VENUE.lat, VENUE.lng);
      const map = new maps.Map(ref.current, {
        center: pos,
        zoom: 16,
        draggable: false, // 모바일에서 지도가 페이지 스크롤을 가로채지 않도록
        pinchZoom: false,
        scrollWheel: false,
        keyboardShortcuts: false,
        disableDoubleTapZoom: true,
        disableDoubleClickZoom: true,
        zoomControl: false,
        mapDataControl: false,
        scaleControl: false,
      });
      new maps.Marker({ position: pos, map });
    };

    if (window.naver?.maps) {
      draw();
      return;
    }
    const id = 'naver-map-sdk';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', draw);
    script.addEventListener('error', () => setFailed(true));
    return () => script?.removeEventListener('load', draw);
  }, []);

  if (!NAVER_MAP_CLIENT_ID || failed) return null;
  return (
    <a href={MAP_LINKS.naver} target="_blank" rel="noopener noreferrer" className="loc-map" aria-label="네이버 지도에서 보기">
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
    </a>
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
          <p className="hero-venue">{venueFull}</p>
        </div>
        <div className="scroll-hint" aria-hidden>
          <span />
        </div>
      </section>

      {/* Greeting */}
      <section className="section">
        <p className="eyebrow reveal">INVITATION</p>
        <h2 className="title reveal">초대합니다</h2>
        <div className="greeting reveal">
          {GREETING.map((para) => (
            <p key={para} className="body-text">
              {para.split('\n').map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className="parents reveal">
          {[GROOM, BRIDE].map((p) => (
            <p key={p.first}>
              {p.parents} <span className="parents-rel">의 {p.relation}</span> <b>{p.first}</b>
            </p>
          ))}
        </div>

        <div className="couple">
          {[GROOM, BRIDE].map((p, i) => (
            <div key={p.first} className={`couple-card reveal ${i ? 'from-right' : 'from-left'}`}>
              <div className="couple-photo">
                <img src={p.photo} alt="" loading="lazy" />
              </div>
              <p className="couple-role">{i ? '신부' : '신랑'}</p>
              <p className="couple-name">{p.first}</p>
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
          {venueFull}
        </p>
        <p className="contact reveal">
          문의 <a href={`tel:${CONTACT.tel}`}>{CONTACT.tel}</a> ({CONTACT.label})
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
          <p className="loc-name">{venueFull}</p>
          <p className="loc-addr">{VENUE.address}</p>
          <p className="contact loc-contact">
            문의 <a href={`tel:${CONTACT.tel}`}>{CONTACT.tel}</a> ({CONTACT.label})
          </p>
          <NaverMap />
          <div className="map-links">
            <a href={MAP_LINKS.naver} target="_blank" rel="noopener noreferrer" className="map-link">
              <span className="map-dot naver" />
              네이버 지도
            </a>
            <a href={MAP_LINKS.kakao} target="_blank" rel="noopener noreferrer" className="map-link">
              <span className="map-dot kakao" />
              카카오맵
            </a>
          </div>
          <div className="loc-info">
            {TRANSPORT.map((t) => (
              <div key={t.label}>
                <p className="loc-label">{t.label}</p>
                {t.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            ))}
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
        참석
        <br />
        의사
      </button>
    </main>
  );
}
