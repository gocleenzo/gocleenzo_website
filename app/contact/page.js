'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Outfit','DM Sans',sans-serif", background: '#fff', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .contact-input {
          width: 100%; border: 1.5px solid #e5e7eb; border-radius: 14px;
          padding: 13px 16px; font-size: 14px; font-family: 'Outfit', sans-serif;
          color: #111827; outline: none; transition: border-color .2s; background: #fff;
        }
        .contact-input:focus { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,.1); }
        .contact-input::placeholder { color: #9ca3af; }
        .submit-btn {
          width: 100%; background: #06b6d4; color: #fff; border: none;
          border-radius: 50px; padding: 14px; font-size: 15px; font-weight: 600;
          font-family: 'Outfit', sans-serif; cursor: pointer; transition: all .22s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) { background: #0891b2; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(6,182,212,.4); }
        .submit-btn:disabled { opacity: .7; cursor: not-allowed; }
        .info-card { display: flex; align-items: flex-start; gap: 14px; background: #f0fdfe; border: 1.5px solid #a5f3fc; border-radius: 16px; padding: 18px 20px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform: rotate(360deg) } }
        .fade-up { animation: fadeUp .6s ease both; }
        .spinner { width:18px;height:18px;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0; }
        @media(max-width:768px){ .contact-grid{grid-template-columns:1fr!important;} .name-row{grid-template-columns:1fr!important;} }
      `}</style>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(145deg,#f0fdfe,#e0f7fa)', padding: '72px 28px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute',top:-80,right:-80,width:300,height:300,background:'radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:-60,left:-60,width:250,height:250,background:'radial-gradient(circle,rgba(6,182,212,.08) 0%,transparent 70%)',pointerEvents:'none' }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize:11.5,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'#06b6d4',marginBottom:10 }}>Get in touch</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:'clamp(36px,5vw,56px)',color:'#0c4a6e',marginBottom:16,lineHeight:1.1 }}>
            We'd love to hear<br/>from you
          </h1>
          <p style={{ fontSize:17,color:'#374151',maxWidth:480,margin:'0 auto',lineHeight:1.75 }}>
            Have a question, feedback, or just want to say hello? Our team is here and happy to help.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ maxWidth:1060,margin:'0 auto',padding:'64px 28px 100px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start' }} className="contact-grid">

        {/* LEFT — contact info */}
        <div className="fade-up">
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:800,color:'#0c4a6e',marginBottom:10 }}>Contact information</h2>
          <p style={{ fontSize:15,color:'#6b7280',lineHeight:1.8,marginBottom:36 }}>
            Reach us through any of the channels below, or fill out the form and we'll respond within 24 hours.
          </p>
          <div style={{ display:'flex',flexDirection:'column',gap:14,marginBottom:44 }}>
            {[
              { icon:'📧', label:'Email us',  value:'gocleenzo@gmail.com',       sub:'We reply within 24 hours' },
              { icon:'📞', label:'Call us',   value:'+91 97027 28298' },
              { icon:'📍', label:'Based in',  value:'Mumbai, Maharashtra'},
            ].map(item => (
              <div key={item.label} className="info-card">
                <div style={{ width:44,height:44,background:'#fff',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0,boxShadow:'0 2px 8px rgba(6,182,212,.12)' }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize:11.5,fontWeight:700,color:'#06b6d4',letterSpacing:1.5,textTransform:'uppercase',marginBottom:3 }}>{item.label}</div>
                  <div style={{ fontSize:15,fontWeight:600,color:'#0c4a6e' }}>{item.value}</div>
                  <div style={{ fontSize:12.5,color:'#6b7280',marginTop:2 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:13,fontWeight:700,color:'#374151',marginBottom:12,letterSpacing:.5 }}>We currently serve</div>
            <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
              {['Mumbai'].map(city => (
                <span key={city} style={{ background:'#f0fdfe',border:'1.5px solid #a5f3fc',color:'#0e7490',borderRadius:50,padding:'6px 16px',fontSize:13,fontWeight:500 }}>{city}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{ background:'#fff',border:'1.5px solid #e5e7eb',borderRadius:28,padding:36,boxShadow:'0 12px 48px rgba(0,0,0,.06)' }} className="fade-up">
          {submitted ? (
            <div style={{ textAlign:'center',padding:'24px 0' }}>
              <div style={{ fontSize:56,marginBottom:18 }}>✅</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:800,color:'#0c4a6e',marginBottom:10 }}>Message sent!</h3>
              <p style={{ fontSize:15,color:'#6b7280',lineHeight:1.75 }}>
                Thanks for reaching out, <strong>{form.name.split(' ')[0]}</strong>!<br/>
                We'll get back to you at <strong style={{ color:'#06b6d4' }}>{form.email}</strong> within 24 hours.
              </p>
              <button onClick={() => { setForm({ name:'',email:'',phone:'',message:'' }); setSubmitted(false); }}
                style={{ marginTop:28,background:'#f0fdfe',border:'1.5px solid #a5f3fc',color:'#0e7490',borderRadius:50,padding:'10px 24px',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:"'Outfit',sans-serif" }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:'flex',flexDirection:'column',gap:18 }}>
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:'#0c4a6e',marginBottom:6 }}>Send us a message</h3>
                <p style={{ fontSize:13.5,color:'#9ca3af' }}>We'll respond within 24 hours.</p>
              </div>

              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }} className="name-row">
                <div>
                  <label style={{ display:'block',fontSize:12,fontWeight:600,color:'#374151',marginBottom:6,letterSpacing:.5 }}>YOUR NAME *</label>
                  <input className="contact-input" name="name" placeholder="Rahul Sharma" value={form.name} onChange={handle} required />
                </div>
                <div>
                  <label style={{ display:'block',fontSize:12,fontWeight:600,color:'#374151',marginBottom:6,letterSpacing:.5 }}>PHONE</label>
                  <input className="contact-input" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handle} />
                </div>
              </div>

              <div>
                <label style={{ display:'block',fontSize:12,fontWeight:600,color:'#374151',marginBottom:6,letterSpacing:.5 }}>EMAIL ADDRESS *</label>
                <input className="contact-input" type="email" name="email" placeholder="rahul@example.com" value={form.email} onChange={handle} required />
              </div>

              <div>
                <label style={{ display:'block',fontSize:12,fontWeight:600,color:'#374151',marginBottom:6,letterSpacing:.5 }}>YOUR MESSAGE *</label>
                <textarea className="contact-input" name="message" placeholder="Tell us how we can help..." rows={5} value={form.message} onChange={handle} required style={{ resize:'vertical',minHeight:120 }} />
              </div>

              {/* Error message */}
              {error && (
                <div style={{ background:'#fef2f2',border:'1.5px solid #fecaca',borderRadius:12,padding:'12px 16px',fontSize:13.5,color:'#dc2626',display:'flex',gap:8,alignItems:'center' }}>
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <><span className="spinner"/>Sending...</> : 'Send message →'}
              </button>

              <p style={{ fontSize:12,color:'#9ca3af',textAlign:'center',lineHeight:1.6 }}>
                By submitting you agree to our{' '}
                <a href="/privacy-policy" style={{ color:'#06b6d4',textDecoration:'none' }}>Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background:'linear-gradient(135deg,#0c4a6e,#0e7490)',padding:'60px 28px',textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:'clamp(24px,3.5vw,36px)',fontWeight:800,color:'#fff',marginBottom:12 }}>Ready to book a clean?</h2>
        <p style={{ color:'rgba(255,255,255,.75)',fontSize:16,marginBottom:28 }}>Download the Cleenzo app and get your home sparkling today.</p>
        <a href="/" style={{ display:'inline-block',background:'#06b6d4',color:'#fff',borderRadius:50,padding:'13px 32px',fontSize:15,fontWeight:600,textDecoration:'none',fontFamily:"'Outfit',sans-serif" }}>
          Back to home →
        </a>
      </section>
    </div>
  );
}