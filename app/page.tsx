'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [rsvpData, setRsvpData] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    guestCount: 1,
    dietary: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const rsvpRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRsvpData(prev => ({ ...prev, [name]: value }));
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: new URLSearchParams({
          name: rsvpData.name,
          phone: rsvpData.phone,
          attending: rsvpData.attending,
          guestCount: String(rsvpData.guestCount),
          dietary: rsvpData.dietary,
          timestamp: new Date().toISOString(),
        }),
      });

      setSubmitted(true);
      setRsvpData({ name: '', phone: '', attending: 'yes', guestCount: 1, dietary: '' });
      
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('RSVP 제출 오류:', error);
      alert('제출에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToRsvp = () => {
    rsvpRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      {/* Hero */}
      <section style={styles.hero}>
        <p style={styles.subtitle}>We invite you to celebrate our marriage</p>
        <h1 style={styles.mainTitle}>
          <span style={styles.nameSpan}>신랑이름</span>
          <span style={styles.ampersand}>&</span>
          <span style={styles.nameSpan}>신부이름</span>
        </h1>
        <p style={styles.weddingDate}>2024년 6월 1일 토요일</p>
      </section>

      {/* Info */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <p style={styles.infoLabel}>일시</p>
              <p style={styles.infoValue}>2024.06.01</p>
              <p style={styles.infoTime}>오후 4시 30분</p>
            </div>
            <div style={styles.infoCard}>
              <p style={styles.infoLabel}>장소</p>
              <p style={styles.infoValue}>그랜드 볼룸</p>
              <p style={styles.infoTime}>서울시 강남구</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>우리의 이야기</h2>
          <p style={styles.storyText}>
            처음 만났을 때부터 특별했던 순간들이 모여,<br/>
            이제 함께 새로운 장을 시작하려 합니다.<br/>
            <br/>
            소중한 분들을 초대하여 우리의 행복을 나누고 싶습니다.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>예식 순서</h2>
          <div style={styles.timeline}>
            {[
              { time: '16:00', event: '예식장 입장' },
              { time: '16:30', event: '결혼식' },
              { time: '17:00', event: '사진 촬영' },
              { time: '17:30', event: '폐백' },
              { time: '18:00', event: '만찬' },
            ].map((item, idx) => (
              <div key={idx} style={styles.timelineItem}>
                <div style={styles.timelineDot}></div>
                <div style={styles.timelineContent}>
                  <p style={styles.timelineTime}>{item.time}</p>
                  <p style={styles.timelineEvent}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>갤러리</h2>
          <div style={styles.gallery}>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} style={styles.galleryItem}>
                <div style={styles.galleryPlaceholder}>Photo {idx}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>오시는 길</h2>
          <div style={styles.locationInfo}>
            <p style={styles.locationTitle}>그랜드 볼룸</p>
            <p style={styles.locationAddress}>서울시 강남구 테헤란로 123</p>
            <div style={styles.locationMap}>지도 위치</div>
            <div style={styles.transportInfo}>
              <p><strong>지하철:</strong> 강남역 6번 출구</p>
              <p><strong>주차:</strong> 지하 주차장 완비</p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section style={styles.rsvpSection} ref={rsvpRef}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>참석 의사 표시</h2>
          
          {submitted ? (
            <div style={styles.successMessage}>
              <p style={styles.successIcon}>✓</p>
              <p style={styles.successText}>참석 의사 표시가 완료되었습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>이름</label>
                <input
                  type="text"
                  name="name"
                  value={rsvpData.name}
                  onChange={handleInputChange}
                  placeholder="성함을 입력해주세요"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>연락처</label>
                <input
                  type="tel"
                  name="phone"
                  value={rsvpData.phone}
                  onChange={handleInputChange}
                  placeholder="01012345678"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>참석 여부</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={rsvpData.attending === 'yes'}
                      onChange={handleInputChange}
                    />
                    참석하겠습니다
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={rsvpData.attending === 'no'}
                      onChange={handleInputChange}
                    />
                    불참입니다
                  </label>
                </div>
              </div>

              {rsvpData.attending === 'yes' && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>동반 인원</label>
                    <select
                      name="guestCount"
                      value={rsvpData.guestCount}
                      onChange={handleInputChange}
                      style={styles.select}
                    >
                      <option value="1">1명</option>
                      <option value="2">2명</option>
                      <option value="3">3명</option>
                      <option value="4">4명 이상</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>식단 제한사항</label>
                    <textarea
                      name="dietary"
                      value={rsvpData.dietary}
                      onChange={handleInputChange}
                      placeholder="알레르기나 제한사항"
                      style={styles.textarea}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{...styles.submitButton, opacity: loading ? 0.6 : 1}}
              >
                {loading ? '제출 중...' : '참석 의사 표시'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Account */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>축의금</h2>
          <div style={styles.accountGrid}>
            <div style={styles.accountCard}>
              <p style={styles.accountName}>신랑 이름</p>
              <p style={styles.accountBank}>국민은행 123-456-789012</p>
            </div>
            <div style={styles.accountCard}>
              <p style={styles.accountName}>신부 이름</p>
              <p style={styles.accountBank}>우리은행 123-456-789012</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section style={styles.footer}>
        <p style={styles.footerText}>Thank you for being part of our story</p>
      </section>

      {/* RSVP Button */}
      <button onClick={scrollToRsvp} style={styles.floatingButton}>RSVP</button>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#faf8f5',
    color: '#2c2c2c',
  },
  hero: {
    background: 'linear-gradient(135deg, #e8ddd0 0%, #f5f1eb 100%)',
    padding: '60px 20px',
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: '14px',
    letterSpacing: '2px',
    color: '#7a6d5f',
    marginBottom: '20px',
    fontWeight: 300,
  },
  mainTitle: {
    fontSize: '48px',
    fontWeight: 300,
    marginBottom: '15px',
    lineHeight: 1.2,
  },
  nameSpan: {
    display: 'block' as const,
  },
  ampersand: {
    display: 'block' as const,
    fontSize: '32px',
    color: '#b89968',
    margin: '10px 0',
  },
  weddingDate: {
    fontSize: '16px',
    color: '#7a6d5f',
    letterSpacing: '1px',
  },
  section: {
    padding: '50px 20px',
    borderBottom: '1px solid #e8e8e8',
  },
  rsvpSection: {
    padding: '50px 20px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e8e8e8',
  },
  sectionInner: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 300,
    marginBottom: '30px',
    textAlign: 'center' as const,
    paddingBottom: '15px',
    borderBottom: '2px solid #b89968',
    display: 'inline-block',
    width: '100%',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#b89968',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  infoValue: {
    fontSize: '20px',
    fontWeight: 300,
    marginBottom: '5px',
  },
  infoTime: {
    fontSize: '14px',
    color: '#7a6d5f',
  },
  storyText: {
    fontSize: '16px',
    lineHeight: 1.8,
    color: '#4a4a4a',
    textAlign: 'center' as const,
  },
  timeline: {
    position: 'relative' as const,
    paddingLeft: '40px',
  },
  timelineItem: {
    display: 'flex',
    marginBottom: '30px',
    position: 'relative' as const,
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    backgroundColor: '#b89968',
    borderRadius: '50%',
    position: 'absolute' as const,
    left: '-47px',
    top: '5px',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTime: {
    fontSize: '14px',
    color: '#b89968',
    fontWeight: 600,
  },
  timelineEvent: {
    fontSize: '16px',
    color: '#2c2c2c',
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginTop: '20px',
  },
  galleryItem: {
    aspectRatio: '1',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  galleryPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e8ddd0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#b89968',
  },
  locationInfo: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '8px',
  },
  locationTitle: {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '8px',
  },
  locationAddress: {
    fontSize: '14px',
    color: '#7a6d5f',
    marginBottom: '20px',
  },
  locationMap: {
    backgroundColor: '#e8ddd0',
    height: '200px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    color: '#7a6d5f',
  },
  transportInfo: {
    fontSize: '14px',
    color: '#4a4a4a',
    lineHeight: 1.8,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
  },
  input: {
    padding: '12px 15px',
    fontSize: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontFamily: 'inherit',
    backgroundColor: '#fafafa',
  },
  select: {
    padding: '12px 15px',
    fontSize: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontFamily: 'inherit',
    backgroundColor: '#fafafa',
  },
  textarea: {
    padding: '12px 15px',
    fontSize: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontFamily: 'inherit',
    minHeight: '100px',
    backgroundColor: '#fafafa',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  submitButton: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: '#b89968',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    marginTop: '10px',
  },
  successMessage: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    backgroundColor: '#f0f5f0',
    borderRadius: '8px',
  },
  successIcon: {
    fontSize: '48px',
    color: '#7a9f7a',
    marginBottom: '15px',
  },
  successText: {
    fontSize: '18px',
    fontWeight: 500,
  },
  accountGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  accountCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  accountName: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  accountBank: {
    fontSize: '13px',
    color: '#7a6d5f',
    fontFamily: 'monospace',
  },
  footer: {
    padding: '40px 20px',
    textAlign: 'center' as const,
    backgroundColor: '#ffffff',
  },
  footerText: {
    fontSize: '14px',
    color: '#b89968',
  },
  floatingButton: {
    position: 'fixed' as const,
    bottom: '30px',
    right: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#b89968',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(184, 153, 104, 0.3)',
    zIndex: 999,
  },
};
