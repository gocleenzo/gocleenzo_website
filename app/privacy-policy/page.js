'use client';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    icon: '📥',
    content: `We collect information you provide directly when you register for the Cleenzo app or website. This includes your full name, phone number, email address, and home address for service delivery. We also collect booking history, service preferences, payment confirmation records (not full card details), and any feedback or ratings you submit after a service.`,
  },
  {
    title: '2. Information Collected Automatically',
    icon: '📡',
    content: `When you use the Cleenzo app or website, we automatically collect certain technical data including your device type and operating system, IP address, app usage data and navigation patterns, location data (only when you grant permission, used to show nearby Pros and confirm service areas), and crash reports to help us fix bugs and improve performance.`,
  },
  {
    title: '3. How We Use Your Information',
    icon: '⚙️',
    content: `We use your information to match you with available Cleenzo Pros in your area, process and confirm bookings, send you booking confirmations and updates via SMS, email, and push notifications, process payments securely, respond to your support queries, improve our platform and services based on usage patterns, and send you occasional promotional offers (you can opt out at any time).`,
  },
  {
    title: '4. Data Sharing',
    icon: '🤝',
    content: `We share your name and address with the assigned Cleenzo Pro solely for the purpose of completing your booking. We do not sell, rent, or trade your personal data to third parties. We may share anonymised, aggregated data (not linked to any individual) for analytics purposes. We may disclose your data if required by law, court order, or government authority.`,
  },
  {
    title: '5. Data Storage & Security',
    icon: '🔒',
    content: `Your data is stored securely using Supabase, which complies with international data security standards including AES-256 encryption at rest and TLS encryption in transit. We restrict access to personal data to authorised Cleenzo staff only, on a need-to-know basis. Payment transactions are processed through PCI-DSS compliant payment gateways — we never store your full card details.`,
  },
  {
    title: '6. Data Retention',
    icon: '🗓️',
    content: `We retain your personal data for as long as your account is active or as needed to provide our services. If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required to retain it for legal or financial compliance purposes (e.g., transaction records retained for 7 years under Indian accounting laws).`,
  },
  {
    title: '7. Your Rights',
    icon: '✅',
    content: `You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your account and associated data, opt out of marketing communications at any time via the app settings or by emailing privacy@cleenzo.in, and lodge a complaint with the relevant data protection authority if you believe your rights have been violated.`,
  },
  {
    title: '8. Cookies & Tracking',
    icon: '🍪',
    content: `Our website uses cookies to remember your preferences, keep you signed in, and understand how visitors use our site. You can control cookie settings through your browser. We use Google Analytics to understand website traffic patterns — this data is anonymised and not linked to your personal identity. We do not use third-party advertising cookies.`,
  },
  {
    title: '9. Children\'s Privacy',
    icon: '👶',
    content: `Cleenzo services are intended for users aged 18 and above. We do not knowingly collect personal data from children under 18. If we become aware that a child under 18 has provided us with personal information, we will delete it immediately. If you believe a child has submitted their data to us, please contact privacy@cleenzo.in.`,
  },
  {
    title: '10. Third-Party Links',
    icon: '🔗',
    content: `Our app and website may contain links to third-party websites or services. This Privacy Policy applies only to Cleenzo. We are not responsible for the privacy practices of any third-party sites. We encourage you to read the privacy policies of any external sites you visit.`,
  },
  {
    title: '11. Changes to This Policy',
    icon: '📝',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes via the app or your registered email address. The "last updated" date at the top of this page will always reflect the most recent revision. Continued use of our services after changes are posted means you accept the updated policy.`,
  },
  {
    title: '12. Contact Us',
    icon: '📧',
    content: `If you have any questions, concerns, or requests related to your privacy or this policy, please reach out to us at privacy@cleenzo.in. You can also write to us at: Cleenzo, Nashik, Maharashtra, India. We aim to respond to all privacy-related queries within 48 hours.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ fontFamily:"'Outfit','DM Sans',sans-serif", background:'#fff', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .toc-link {
          display:block; font-size:13px; color:#0e7490; text-decoration:none;
          padding:7px 12px; border-radius:9px; transition:background .15s, color .15s;
          font-family:'Outfit',sans-serif; line-height:1.4;
        }
        .toc-link:hover { background:#f0fdfe; color:#0c4a6e; }
        .bottom-link {
          display:block; font-size:13px; color:#06b6d4; text-decoration:none;
          font-weight:600; padding:7px 12px; border-radius:9px; transition:background .15s;
        }
        .bottom-link:hover { background:#f0fdfe; }
        @media(max-width:900px) { .privacy-grid{grid-template-columns:1fr!important;} .toc-col{display:none!important;} }
      `}</style>

      {/* Hero */}
      <section style={{ background:'linear-gradient(145deg,#f0fdfe,#e0f7fa)', padding:'72px 28px 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-80,right:-80,width:320,height:320,background:'radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:-60,left:-60,width:250,height:250,background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 70%)',pointerEvents:'none' }}/>
        <div style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ fontSize:11.5,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'#06b6d4',marginBottom:12 }}>Legal</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:'clamp(36px,5vw,56px)',color:'#0c4a6e',marginBottom:16,lineHeight:1.1 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize:16,color:'#374151',lineHeight:1.8,maxWidth:560 }}>
            Your privacy matters to us. This policy explains what data we collect, how we use it, and the rights you have over your information.
          </p>
          <div style={{ display:'flex',gap:12,marginTop:24,flexWrap:'wrap' }}>
            <span style={{ background:'#fff',border:'1.5px solid #a5f3fc',color:'#0e7490',borderRadius:50,padding:'6px 16px',fontSize:13,fontWeight:500 }}>Last updated: May 2025</span>
            <span style={{ background:'#fff',border:'1.5px solid #a5f3fc',color:'#0e7490',borderRadius:50,padding:'6px 16px',fontSize:13,fontWeight:500 }}>Effective: May 2025</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'60px 28px 100px', display:'grid', gridTemplateColumns:'1fr 260px', gap:64, alignItems:'start' }} className="privacy-grid">

        {/* Main */}
        <div>

          {/* Summary box */}
          <div style={{ background:'#f0fdfe',border:'1.5px solid #a5f3fc',borderRadius:18,padding:'22px 26px',marginBottom:48,display:'flex',gap:16,alignItems:'flex-start' }}>
            <span style={{ fontSize:28,flexShrink:0 }}>🔐</span>
            <div>
              <div style={{ fontSize:14,fontWeight:700,color:'#0c4a6e',marginBottom:5 }}>The short version</div>
              <p style={{ fontSize:13.5,color:'#374151',lineHeight:1.75 }}>
                We collect only what's needed to run the service. We never sell your data. We share your address with your assigned Pro only for your booking. You can request deletion of your data at any time by emailing privacy@cleenzo.in.
              </p>
            </div>
          </div>

          {/* Key highlights */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:14,marginBottom:48 }}>
            {[
              { icon:'🚫', label:'We never sell your data' },
              { icon:'🔒', label:'AES-256 encryption at rest' },
              { icon:'🗑️', label:'Delete your data anytime' },
              { icon:'📵', label:'Opt out of marketing easily' },
            ].map(item => (
              <div key={item.label} style={{ background:'#fff',border:'1.5px solid #e0f7fa',borderRadius:14,padding:'14px 16px',display:'flex',alignItems:'center',gap:10 }}>
                <span style={{ fontSize:20 }}>{item.icon}</span>
                <span style={{ fontSize:13.5,fontWeight:600,color:'#0c4a6e' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Sections */}
          {SECTIONS.map((section, i) => (
            <div
              key={i}
              id={`section-${i}`}
              style={{ paddingBottom:36, marginBottom:36, borderBottom: i < SECTIONS.length - 1 ? '1.5px solid #f0f0f0' : 'none' }}
            >
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:14 }}>
                <div style={{ width:40,height:40,background:'#f0fdfe',border:'1.5px solid #a5f3fc',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>
                  {section.icon}
                </div>
                <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:800,color:'#0c4a6e',lineHeight:1.2 }}>
                  {section.title}
                </h2>
              </div>
              <p style={{ fontSize:15,color:'#374151',lineHeight:1.85,paddingLeft:52 }}>
                {section.content}
              </p>
            </div>
          ))}

          {/* Bottom CTA */}
          <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0e7490)',borderRadius:22,padding:'32px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:20,marginTop:16 }}>
            <div>
              <div style={{ fontSize:16,fontWeight:700,color:'#fff',marginBottom:5 }}>Questions about your privacy?</div>
              <div style={{ fontSize:13.5,color:'rgba(255,255,255,.7)' }}>Email us at privacy@cleenzo.in — we respond within 48 hours.</div>
            </div>
            <div style={{ display:'flex',gap:10,flexWrap:'wrap' }}>
              <a href="/terms" style={{ background:'rgba(255,255,255,.12)',border:'1.5px solid rgba(255,255,255,.25)',color:'#fff',borderRadius:50,padding:'9px 20px',fontSize:13,fontWeight:600,textDecoration:'none',fontFamily:"'Outfit',sans-serif" }}>
                Terms of Service
              </a>
              <a href="/contact" style={{ background:'#06b6d4',color:'#fff',borderRadius:50,padding:'9px 20px',fontSize:13,fontWeight:600,textDecoration:'none',fontFamily:"'Outfit',sans-serif" }}>
                Contact us →
              </a>
            </div>
          </div>
        </div>

        {/* TOC Sidebar */}
        <div className="toc-col" style={{ position:'sticky', top:100 }}>
          <div style={{ background:'#fff',border:'1.5px solid #e5e7eb',borderRadius:20,padding:22,boxShadow:'0 8px 32px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:'uppercase',color:'#9ca3af',marginBottom:14 }}>On this page</div>
            <nav style={{ display:'flex',flexDirection:'column',gap:2 }}>
              {SECTIONS.map((section, i) => (
                <a key={i} href={`#section-${i}`} className="toc-link">
                  {section.title}
                </a>
              ))}
            </nav>
            <div style={{ marginTop:20,paddingTop:16,borderTop:'1px solid #f0f0f0' }}>
              <a href="/terms" className="bottom-link">→ Terms of Service</a>
              <a href="/contact" className="bottom-link">→ Contact Us</a>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}