'use client';

const TERMS = [
  {
    title: '1. Acceptance of Terms',
    content: `By downloading the Cleenzo app, visiting our website, or booking any service, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our platform. These terms apply to all users including customers and Cleenzo Pros. Cleenzo is operated by Cubicle Ventures Private Limited ("we", "us", "our"), a company registered in Yavatmal, Maharashtra, India.`,
  },
  {
    title: '2. Description of Services',
    content: `Cleenzo is a technology platform that connects customers with independent home cleaning professionals ("Cleenzo Pros") across Maharashtra. We currently operate in Nashik, Pune, Mumbai, Nagpur, Aurangabad, and Kolhapur. Cleenzo facilitates the booking process but the cleaning services are performed by independent Pros, not Cleenzo employees.`,
  },
  {
    title: '3. Booking & Payments',
    content: `All bookings must be made through the Cleenzo app or website. Prices displayed are flat rates with no hidden charges. Payment is collected at the time of booking via UPI, credit/debit card, or supported wallets, processed securely through our payment partner, Razorpay. We do not store your full card, UPI, or bank details. Bookings are confirmed only upon successful payment. Cleenzo reserves the right to update pricing at any time; changes will not affect already-confirmed bookings.`,
  },
  {
    title: '4. Cancellation & Rescheduling',
    content: `You may cancel or reschedule a booking up to 2 hours before the scheduled start time at no charge. Cancellations made within 2 hours of the booking are subject to a cancellation fee of 50% of the service price. No-shows (customer not present at the time of service) will be charged the full service amount. In case of cancellation by the Cleenzo Pro, you will receive a full refund or the option to reschedule at no extra cost.`,
  },
  {
    title: '5. Satisfaction Guarantee',
    content: `We stand behind the quality of every Cleenzo Pro. If you are not satisfied with a completed service, report it within 24 hours of the booking end time via the app or by emailing support@gocleenzo.com. We will arrange a free re-clean of the reported areas within 48 hours. The satisfaction guarantee does not apply to services outside the listed scope of the booked package.`,
  },
  {
    title: '6. Customer Responsibilities',
    content: `You agree to ensure the service location is accessible at the scheduled time, provide a safe working environment for the Pro, secure or remove valuables and fragile items before the Pro arrives, and not request services outside the booked package directly from the Pro. Cleenzo is not responsible for damage caused by pre-existing conditions or items not properly secured by the customer.`,
  },
  {
    title: '7. Cleenzo Pro Conduct',
    content: `All Cleenzo Pros are background-verified, trained, and held to a professional code of conduct. They are independent service providers and not employees of Cleenzo. Cleenzo is not liable for the acts or omissions of Pros beyond what is covered by our satisfaction guarantee. Any misconduct by a Pro should be reported immediately to support@gocleenzo.com.`,
  },
  {
    title: '8. Liability Limitation',
    content: `Cleenzo's total liability for any claim arising out of or relating to a booking shall not exceed the amount paid for that specific booking. We are not liable for indirect, incidental, or consequential damages. We do not guarantee uninterrupted availability of our platform or services, and reserve the right to suspend or discontinue services in any area with reasonable notice.`,
  },
  {
    title: '9. Intellectual Property',
    content: `All content on the Cleenzo platform — including the brand name, logo, app design, website content, and service descriptions — is owned by Cleenzo and protected under applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any Cleenzo content without prior written permission.`,
  },
  {
    title: '10. Privacy',
    content: `Your use of Cleenzo is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services you consent to the collection and use of your data as described in the Privacy Policy.`,
  },
  {
    title: '11. Changes to Terms',
    content: `Cleenzo reserves the right to modify these Terms at any time. We will notify users of significant changes via the app or registered email. Continued use of the platform after changes are posted constitutes your acceptance of the updated Terms. We recommend reviewing this page periodically.`,
  },
  {
    title: '12. Governing Law',
    content: `These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of Cleenzo services shall be subject to the exclusive jurisdiction of the courts of Yavatmal, Maharashtra.`,
  },
  {
    title: '13. Grievance Officer',
    content: `In accordance with the Information Technology Act, 2000 and applicable rules, the Grievance Officer for Cleenzo is: Rushabh Bora, reachable at +91 9890178904. Any complaints regarding these Terms or your use of the platform may be addressed to the Grievance Officer, who will acknowledge receipt within 24 hours and aim to resolve the matter within 15 days.`,
  },
  {
    title: '14. Contact Us',
    content: `Cleenzo is operated by Cubicle Ventures Private Limited. If you have any questions about these Terms of Service, please contact us at legal@gocleenzo.com or write to us at Cubicle Ventures Private Limited, Yavatmal, Maharashtra, India.`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ fontFamily:"'Outfit','DM Sans',sans-serif", background:'#fff', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .toc-link {
          display:block; font-size:13px; color:#0e7490; text-decoration:none;
          padding:7px 12px; border-radius:9px; transition:background .15s,color .15s;
          font-family:'Outfit',sans-serif; line-height:1.4;
        }
        .toc-link:hover { background:#f0fdfe; color:#0c4a6e; }
        .bottom-link {
          display:block; font-size:13px; color:#06b6d4; text-decoration:none;
          font-weight:600; padding:7px 12px; border-radius:9px; transition:background .15s;
        }
        .bottom-link:hover { background:#f0fdfe; }
        @media(max-width:900px){ .terms-grid{grid-template-columns:1fr!important;} .toc-col{display:none!important;} }
      `}</style>

      {/* Hero */}
      <section style={{ background:'linear-gradient(145deg,#f0fdfe,#e0f7fa)', padding:'72px 28px 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-80,right:-80,width:320,height:320,background:'radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:-60,left:-60,width:250,height:250,background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 70%)',pointerEvents:'none' }}/>
        <div style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ fontSize:11.5,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'#06b6d4',marginBottom:12 }}>Legal</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:'clamp(36px,5vw,56px)',color:'#0c4a6e',marginBottom:16,lineHeight:1.1 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize:16,color:'#374151',lineHeight:1.8,maxWidth:560 }}>
            Please read these terms carefully before using Cleenzo. They govern your use of our platform and services across Maharashtra.
          </p>
          <p style={{ fontSize:13.5,color:'#0e7490',lineHeight:1.7,maxWidth:560,marginTop:10 }}>
            Cleenzo is operated by Cubicle Ventures Private Limited, referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; throughout these Terms.
          </p>
          <div style={{ display:'flex',gap:12,marginTop:24,flexWrap:'wrap' }}>
            <span style={{ background:'#fff',border:'1.5px solid #a5f3fc',color:'#0e7490',borderRadius:50,padding:'6px 16px',fontSize:13,fontWeight:500 }}>Last updated: May 2025</span>
            <span style={{ background:'#fff',border:'1.5px solid #a5f3fc',color:'#0e7490',borderRadius:50,padding:'6px 16px',fontSize:13,fontWeight:500 }}>Effective: May 2025</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'60px 28px 100px', display:'grid', gridTemplateColumns:'1fr 260px', gap:64, alignItems:'start' }} className="terms-grid">

        {/* Main */}
        <div>
          {/* Summary box */}
          <div style={{ background:'#f0fdfe',border:'1.5px solid #a5f3fc',borderRadius:18,padding:'22px 26px',marginBottom:48,display:'flex',gap:16,alignItems:'flex-start' }}>
            <span style={{ fontSize:28,flexShrink:0 }}>📋</span>
            <div>
              <div style={{ fontSize:14,fontWeight:700,color:'#0c4a6e',marginBottom:5 }}>Summary (not a substitute for the full terms)</div>
              <p style={{ fontSize:13.5,color:'#374151',lineHeight:1.75 }}>
                Use Cleenzo fairly and honestly. Pay for bookings. Cancel at least 2 hours in advance to avoid fees. Report issues within 24 hours for a free re-clean. Don&apos;t misuse the platform or our Pros. We keep your data safe and never sell it.
              </p>
            </div>
          </div>

          {/* Sections */}
          {TERMS.map((section, i) => (
            <div
              key={i}
              id={`section-${i}`}
              style={{ paddingBottom:36, marginBottom:36, borderBottom: i < TERMS.length - 1 ? '1.5px solid #f0f0f0' : 'none' }}
            >
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:800,color:'#0c4a6e',marginBottom:14,lineHeight:1.2 }}>
                {section.title}
              </h2>
              <p style={{ fontSize:15,color:'#374151',lineHeight:1.85 }}>
                {section.content}
              </p>
            </div>
          ))}

          {/* Bottom CTA */}
          <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0e7490)',borderRadius:22,padding:'32px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:20,marginTop:16 }}>
            <div>
              <div style={{ fontSize:16,fontWeight:700,color:'#fff',marginBottom:5 }}>Questions about these terms?</div>
              <div style={{ fontSize:13.5,color:'rgba(255,255,255,.7)' }}>Email us at legal@gocleenzo.com and we&apos;ll respond within 48 hours.</div>
            </div>
            <div style={{ display:'flex',gap:10,flexWrap:'wrap' }}>
              <a href="/privacy-policy" style={{ background:'rgba(255,255,255,.12)',border:'1.5px solid rgba(255,255,255,.25)',color:'#fff',borderRadius:50,padding:'9px 20px',fontSize:13,fontWeight:600,textDecoration:'none',fontFamily:"'Outfit',sans-serif" }}>
                Privacy Policy
              </a>
              <a href="/contact" style={{ background:'#06b6d4',color:'#fff',borderRadius:50,padding:'9px 20px',fontSize:13,fontWeight:600,textDecoration:'none',fontFamily:"'Outfit',sans-serif" }}>
                Contact us →
              </a>
            </div>
          </div>
        </div>

        {/* TOC Sidebar — no event handlers, pure CSS hover */}
        <div className="toc-col" style={{ position:'sticky', top:100 }}>
          <div style={{ background:'#fff',border:'1.5px solid #e5e7eb',borderRadius:20,padding:22,boxShadow:'0 8px 32px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:'uppercase',color:'#9ca3af',marginBottom:14 }}>On this page</div>
            <nav style={{ display:'flex',flexDirection:'column',gap:2 }}>
              {TERMS.map((section, i) => (
                <a key={i} href={`#section-${i}`} className="toc-link">
                  {section.title}
                </a>
              ))}
            </nav>
            <div style={{ marginTop:20,paddingTop:16,borderTop:'1px solid #f0f0f0' }}>
              <a href="/privacy-policy" className="bottom-link">→ Privacy Policy</a>
              <a href="/contact" className="bottom-link">→ Contact Us</a>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}