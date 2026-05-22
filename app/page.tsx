'use client';

import { useState } from 'react';

const CITIES: Record<string, string[]> = {
  Nashik: ['Gangapur Road', 'Cidco', 'Panchvati', 'College Road', 'Satpur', 'Ambad', 'Nashik Road', 'Trimbak Road', 'Indira Nagar', 'Deolali'],
  Pune: ['Koregaon Park', 'Baner', 'Hinjewadi', 'Kothrud', 'Wakad', 'Viman Nagar', 'Hadapsar', 'Aundh', 'Magarpatta', 'Shivajinagar'],
  Mumbai: ['Andheri', 'Bandra', 'Powai', 'Thane', 'Borivali', 'Malad', 'Goregaon', 'Kandivali', 'Dadar', 'Kurla'],
  Nagpur: ['Dharampeth', 'Sitabuldi', 'Sadar', 'Civil Lines', 'Manish Nagar', 'Wardha Road', 'Hingna', 'Pratap Nagar'],
  Aurangabad: ['Cidco', 'Garkheda', 'Waluj', 'Osmanpura', 'Cantonment', 'Hudco', 'Paithan Road'],
  Kolhapur: ['Tarabai Park', 'Shivaji Peth', 'Rajarampuri', 'Kasaba Bawda', 'Shahupuri'],
};

const SERVICES = [
  { name: 'Bathroom Cleaning', price: 299, duration: '45–60 min', icon: '🚿', popular: false },
  { name: 'Kitchen Cleaning', price: 399, duration: '60–90 min', icon: '🍳', popular: true },
  { name: 'Full Home Cleaning', price: 799, duration: '3–4 hrs', icon: '🏠', popular: true },
  { name: 'Sweeping & Mopping', price: 199, duration: '30–45 min', icon: '🧹', popular: false },
  { name: 'Sofa Cleaning', price: 499, duration: '1–2 hrs', icon: '🛋️', popular: false },
  { name: 'Bathroom + Kitchen', price: 599, duration: '2–2.5 hrs', icon: '✨', popular: false },
];

const REVIEWS = [
  { name: 'Priya M.', area: 'Gangapur Road, Nashik', text: 'Absolutely spotless bathroom in under an hour. The pro was polite, on time, and thorough. Best ₹299 I ever spent!', rating: 5, avatar: 'PM' },
  { name: 'Rahul S.', area: 'Baner, Pune', text: 'They even cleaned inside the cabinets! Great value, zero hidden charges. Already booked my 3rd session.', rating: 5, avatar: 'RS' },
  { name: 'Anjali K.', area: 'Andheri, Mumbai', text: 'Booked the full home package for Diwali. Team of 2 arrived exactly on time. My entire flat was transformed.', rating: 5, avatar: 'AK' },
];

const STATS = [
  { value: '50,000+', label: 'Happy customers' },
  { value: '6', label: 'Cities served' },
  { value: '4.8★', label: 'Average rating' },
  { value: '2 min', label: 'Avg booking time' },
];

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [cityDropOpen, setCityDropOpen] = useState(false);
  const [areaDropOpen, setAreaDropOpen] = useState(false);
  const [bookedService, setBookedService] = useState('');
  const [toast, setToast] = useState('');

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }

  function handleCitySelect(city: string) {
    setSelectedCity(city);
    setSelectedArea('');
    setCityDropOpen(false);
  }

  function handleAreaSelect(area: string) {
    setSelectedArea(area);
    setAreaDropOpen(false);
  }

  function handleBook(serviceName: string) {
    if (!selectedCity) {
      showToast('👆 Please select your city first');
      return;
    }
    if (!selectedArea) {
      showToast('👆 Please select your area too');
      return;
    }
    setBookedService(serviceName);
    showToast(`✅ "${serviceName}" added! Download the app to confirm your booking.`);
  }

  function handleDownload() {
    showToast('🚀 App launching soon on Play Store! We\'ll notify you.');
  }

  function handleProSignup() {
    showToast('📋 Pro signup form coming soon! We\'ll be in touch.');
  }

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#fff', overflowX: 'hidden' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
          background: '#0e7490', color: '#fff', padding: '12px 24px', borderRadius: 50,
          fontSize: 14, fontWeight: 500, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          whiteSpace: 'nowrap', maxWidth: '90vw', textAlign: 'center',
          animation: 'fadeSlideIn 0.3s ease',
        }}>
          {toast}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Clash+Display:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlideIn { from { opacity:0; transform:translateX(-50%) translateY(-10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes floatUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .hero-title { font-family:'Clash Display','DM Sans',sans-serif; }
        .float1 { animation: floatUp 0.6s ease both; }
        .float2 { animation: floatUp 0.6s 0.1s ease both; }
        .float3 { animation: floatUp 0.6s 0.2s ease both; }
        .float4 { animation: floatUp 0.6s 0.3s ease both; }
        .float5 { animation: floatUp 0.6s 0.4s ease both; }
        .btn-primary {
          background: #06b6d4; color: #fff; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600;
          transition: all 0.2s; border-radius: 50px;
        }
        .btn-primary:hover { background: #0891b2; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(6,182,212,0.35); }
        .btn-outline {
          background: transparent; color: #0e7490; border: 2px solid #0e7490; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600;
          transition: all 0.2s; border-radius: 50px;
        }
        .btn-outline:hover { background: #0e7490; color: #fff; transform: translateY(-1px); }
        .service-card {
          border: 1.5px solid #e5e7eb; border-radius: 20px; padding: 24px;
          background: #fff; cursor: pointer; transition: all 0.25s;
          position: relative; overflow: hidden;
        }
        .service-card:hover { border-color: #06b6d4; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(6,182,212,0.15); }
        .drop-item:hover { background: #f0fdfe; color: #0e7490; }
        .nav-link { color: #374151; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.15s; }
        .nav-link:hover { color: #06b6d4; }
        .stat-card { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); border-radius: 16px; padding: 20px 24px; text-align: center; }
        .review-card { background: #f8fdff; border: 1.5px solid #e0f7fa; border-radius: 20px; padding: 24px; }
        .step-num { width: 44px; height: 44px; background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; font-family: 'Clash Display', sans-serif; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #06b6d4, #0e7490); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .city-badge { display: inline-flex; align-items: center; gap: 5px; background: #f0fdfe; color: #0e7490; border: 1px solid #a5f3fc; border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
        .city-badge:hover { background: #06b6d4; color: #fff; border-color: #06b6d4; }
        .section-label { font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #06b6d4; margin-bottom: 8px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f0f9ff', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #06b6d4, #0e7490)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🧹</div>
            <span style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Clash Display', sans-serif", color: '#0e7490' }}>Cleenzo</span>
          </div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <a href="#services" className="nav-link">Services</a>
            <a href="#howitworks" className="nav-link">How it works</a>
            <a href="#cities" className="nav-link">Cities</a>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }} onClick={handleDownload}>Download App</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #0e7490 40%, #06b6d4 100%)', padding: '72px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* decorative blobs */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="float1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 16px', fontSize: 13, color: '#fff', marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            Now serving 6 cities across Maharashtra
          </div>

          <h1 className="hero-title float2" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Your home, sparkling<br />
            <span style={{ color: '#67e8f9' }}>clean in 60 minutes</span>
          </h1>

          <p className="float3" style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.7 }}>
            Vetted, trained professionals. Transparent pricing.<br />No hidden charges. Book in under 60 seconds.
          </p>

          {/* CITY + AREA SELECTOR */}
          <div className="float4" style={{ background: '#fff', borderRadius: 20, padding: 8, display: 'inline-flex', gap: 8, alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 580, width: '100%' }}>

            {/* City Dropdown */}
            <div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
              <button onClick={() => { setCityDropOpen(!cityDropOpen); setAreaDropOpen(false); }}
                style={{ width: '100%', padding: '12px 16px', background: selectedCity ? '#f0fdfe' : '#f9fafb', border: `1.5px solid ${selectedCity ? '#06b6d4' : '#e5e7eb'}`, borderRadius: 12, fontSize: 14, fontWeight: 500, color: selectedCity ? '#0e7490' : '#6b7280', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'DM Sans', sans-serif" }}>
                <span>{selectedCity || '📍 Select city'}</span>
                <span style={{ fontSize: 10, color: '#9ca3af' }}>{cityDropOpen ? '▲' : '▼'}</span>
              </button>
              {cityDropOpen && (
                <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.12)', zIndex: 200, overflow: 'hidden' }}>
                  {Object.keys(CITIES).map(city => (
                    <div key={city} className="drop-item" onClick={() => handleCitySelect(city)}
                      style={{ padding: '11px 16px', fontSize: 14, cursor: 'pointer', transition: 'background 0.15s', color: '#374151' }}>
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Area Dropdown */}
            <div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
              <button onClick={() => { if (!selectedCity) { showToast('👆 Select a city first!'); return; } setAreaDropOpen(!areaDropOpen); setCityDropOpen(false); }}
                style={{ width: '100%', padding: '12px 16px', background: selectedArea ? '#f0fdfe' : '#f9fafb', border: `1.5px solid ${selectedArea ? '#06b6d4' : '#e5e7eb'}`, borderRadius: 12, fontSize: 14, fontWeight: 500, color: selectedArea ? '#0e7490' : '#6b7280', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'DM Sans', sans-serif", opacity: selectedCity ? 1 : 0.6 }}>
                <span>{selectedArea || '🏘️ Select area'}</span>
                <span style={{ fontSize: 10, color: '#9ca3af' }}>{areaDropOpen ? '▲' : '▼'}</span>
              </button>
              {areaDropOpen && selectedCity && (
                <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.12)', zIndex: 200, overflow: 'hidden', maxHeight: 220, overflowY: 'auto' }}>
                  {CITIES[selectedCity].map(area => (
                    <div key={area} className="drop-item" onClick={() => handleAreaSelect(area)}
                      style={{ padding: '11px 16px', fontSize: 14, cursor: 'pointer', transition: 'background 0.15s', color: '#374151' }}>
                      {area}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="btn-primary" style={{ padding: '12px 24px', fontSize: 14, borderRadius: 12, whiteSpace: 'nowrap' }}
              onClick={() => { if (!selectedCity || !selectedArea) { showToast('👆 Select city and area first!'); } else { showToast(`🎉 Searching services in ${selectedArea}, ${selectedCity}...`); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); } }}>
              Find cleaners →
            </button>
          </div>

          {selectedCity && selectedArea && (
            <div className="float5" style={{ marginTop: 16, color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
              ✅ Showing services available in <strong>{selectedArea}, {selectedCity}</strong>
            </div>
          )}
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: 'linear-gradient(90deg, #0c4a6e, #0e7490)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', fontFamily: "'Clash Display', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">What we offer</div>
            <h2 className="hero-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0c4a6e' }}>
              Professional cleaning services
            </h2>
            <p style={{ color: '#6b7280', marginTop: 10, fontSize: 16 }}>All equipment & products included. No surprises.</p>
            {selectedCity && selectedArea && (
              <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f0fdfe', border: '1px solid #a5f3fc', borderRadius: 50, padding: '6px 16px', fontSize: 13, color: '#0e7490', fontWeight: 500 }}>
                📍 Available in {selectedArea}, {selectedCity}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {SERVICES.map(s => (
              <div key={s.name} className="service-card">
                {s.popular && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(90deg, #06b6d4, #0891b2)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: 1 }}>
                    POPULAR
                  </div>
                )}
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0c4a6e', marginBottom: 6 }}>{s.name}</h3>
                <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>⏱ {s.duration} · All equipment included</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: 700, color: '#0e7490', fontFamily: "'Clash Display', sans-serif" }}>₹{s.price}</span>
                    <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 4 }}>onwards</span>
                  </div>
                  <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }} onClick={() => handleBook(s.name)}>
                    Book now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" style={{ background: 'linear-gradient(180deg, #f0fdfe 0%, #fff 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">Simple process</div>
            <h2 className="hero-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0c4a6e' }}>
              Book in 3 easy steps
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, position: 'relative' }}>
            {[
              { n: '01', icon: '📋', title: 'Choose your service', desc: 'Pick from our range of home cleaning services. See the exact price — no hidden charges.' },
              { n: '02', icon: '📅', title: 'Pick a time slot', desc: 'Choose instant, scheduled, or recurring. Pay securely via UPI, card, or wallet.' },
              { n: '03', icon: '🚀', title: 'Sit back & relax', desc: 'Your verified Cleenzo Pro arrives on time with all equipment. Track them live.' },
            ].map((step, i) => (
              <div key={step.n} style={{ position: 'relative' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div className="step-num">{step.n}</div>
                  <div style={{ fontSize: 32, marginTop: 4 }}>{step.icon}</div>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0c4a6e', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{step.desc}</p>
                {i < 2 && <div style={{ position: 'absolute', top: 22, right: -20, fontSize: 20, color: '#06b6d4', display: 'none' }}>→</div>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn-primary" style={{ padding: '14px 36px', fontSize: 16 }} onClick={handleDownload}>
              Download the app — it's free →
            </button>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section id="cities" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label">Coverage</div>
          <h2 className="hero-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0c4a6e', marginBottom: 12 }}>
            Serving Maharashtra
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 40, fontSize: 16 }}>Click a city to explore the areas we serve</p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
            {Object.keys(CITIES).map(city => (
              <button key={city} className="city-badge" onClick={() => { handleCitySelect(city); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ fontSize: 14, padding: '8px 20px', fontWeight: selectedCity === city ? 600 : 500, background: selectedCity === city ? '#06b6d4' : '#f0fdfe', color: selectedCity === city ? '#fff' : '#0e7490', border: selectedCity === city ? '1px solid #06b6d4' : '1px solid #a5f3fc' }}>
                {city}
              </button>
            ))}
          </div>

          {selectedCity && (
            <div style={{ background: '#f0fdfe', border: '1.5px solid #a5f3fc', borderRadius: 20, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0e7490', marginBottom: 16 }}>Areas we serve in {selectedCity}</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {CITIES[selectedCity].map(area => (
                  <button key={area} onClick={() => { handleAreaSelect(area); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                    style={{ background: selectedArea === area ? '#0e7490' : '#fff', color: selectedArea === area ? '#fff' : '#0e7490', border: '1px solid #a5f3fc', borderRadius: 50, padding: '6px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
                    {area}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: 'linear-gradient(180deg, #f0fdfe, #fff)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Customer love</div>
            <h2 className="hero-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0c4a6e' }}>
              What our customers say
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {REVIEWS.map(r => (
              <div key={r.name} className="review-card">
                <div style={{ color: '#f59e0b', fontSize: 16, marginBottom: 12 }}>{'★'.repeat(r.rating)}</div>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, marginBottom: 16, fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar">{r.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0c4a6e' }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{r.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN AS PRO */}
      <section style={{ background: '#0c4a6e', padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💼</div>
          <h2 className="hero-title" style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Become a Cleenzo Pro
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
            Earn ₹500–₹1,200 per day. Flexible hours. Weekly payouts.<br />Work in your own city and neighbourhood.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }} onClick={handleProSignup}>
              Apply to join →
            </button>
            <button className="btn-outline" style={{ padding: '14px 32px', fontSize: 15, borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              onClick={() => showToast('📞 We will call you within 24 hours!')}>
              We'll call you back
            </button>
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
        <h2 className="hero-title" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
          Download Cleenzo today
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 36 }}>
          Book, track and manage cleaning from your phone.<br />Available on Android — iOS coming soon.
        </p>
        <button onClick={handleDownload} style={{ background: '#fff', color: '#0e7490', border: 'none', borderRadius: 50, padding: '16px 40px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
          onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}>
          <span>▶</span> Get it on Google Play
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0c4a6e', padding: '40px 24px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, background: '#06b6d4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🧹</div>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Clash Display', sans-serif" }}>Cleenzo</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>Trusted home cleaning across Maharashtra. Vetted pros, transparent pricing.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#67e8f9', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase' }}>Services</h4>
              {['Bathroom Cleaning', 'Kitchen Cleaning', 'Full Home Cleaning', 'Sofa Cleaning'].map(s => (
                <div key={s} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, cursor: 'pointer' }}
                  onClick={() => showToast(`Opening ${s} details...`)}>{s}</div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#67e8f9', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase' }}>Cities</h4>
              {Object.keys(CITIES).map(city => (
                <div key={city} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, cursor: 'pointer' }}
                  onClick={() => { handleCitySelect(city); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{city}</div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#67e8f9', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase' }}>Company</h4>
              {[
                ['Privacy Policy', '/privacy-policy'],
                ['Terms of Service', '/terms'],
                ['Contact Us', '/contact'],
                ['Become a Pro', '#'],
                ['FAQ', '#'],
              ].map(([label, href]) => (
                <div key={label} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, cursor: 'pointer' }}
                  onClick={() => href === '#' ? showToast('Coming soon!') : window.location.href = href}>{label}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>© 2025 Cleenzo. All rights reserved.</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Made with ❤️ in Nashik, Maharashtra</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
