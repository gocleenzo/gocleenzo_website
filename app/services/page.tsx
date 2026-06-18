'use client';

import { useState } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────────────────
type TimeEstimate = { task: string; time: string };
type Faq = { q: string; a: string };

type Service = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  duration: string;
  popular: boolean;
  includes: string[];
  excludes: string[];
  timeEstimates: TimeEstimate[];
  faqs: Faq[];
  color: string;
  bg: string;
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  {
    id: 'bathroom-cleaning',
    name: 'Bathroom Cleaning',
    emoji: '🚿',
    tagline: 'Deep-clean your bathroom in under an hour.',
    duration: '40–60 min',
    popular: true,
    includes: [
      'Toilet bowl, seat & exterior scrub',
      'Sink, tap & mirror polish',
      'Floor tiles scrubbing & mopping',
      'Wall tiles wipe-down',
      'Dustbin cleaning',
      'Exhaust fan exterior wipe',
    ],
    excludes: [
      'Shower cubicle glass deep-clean',
      'Bathtub scrubbing',
      'Dry wiping of walls',
    ],
    timeEstimates: [
      { task: 'Toilet deep clean', time: '15 min' },
      { task: 'Sink & mirror', time: '10 min' },
      { task: 'Floor scrubbing', time: '15 min' },
      { task: 'Wall tiles wipe', time: '10 min' },
    ],
    faqs: [
      { q: 'Do I need to provide cleaning supplies?', a: 'No. Our Cleenzo Pros bring all equipment and products — mops, scrubbers, cleaners — everything.' },
      { q: 'How often should I book?', a: 'We recommend once a week for daily-use bathrooms and once a fortnight for guest bathrooms.' },
      { q: 'What if I am not satisfied?', a: 'We offer a free re-clean within 24 hours if you are not happy with the result.' },
    ],
    color: '#06b6d4',
    bg: '#f0fdfe',
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    emoji: '🍳',
    tagline: 'A grease-free kitchen that feels brand new.',
    duration: '60–90 min',
    popular: true,
    includes: [
      'Countertop wipe and sanitise',
      'Stovetop & burner scrub',
      'Chimney exterior wipe',
      'Sink deep clean & polish',
      'Cabinet exterior wipe',
      'Floor mopping',
      'Dustbin sanitise',
    ],
    excludes: [
      'Interior cabinet cleaning',
      'Refrigerator cleaning',
      'Utensils washing',
      'Chimney interior cleaning',
    ],
    timeEstimates: [
      { task: 'Countertop & stovetop', time: '20 min' },
      { task: 'Sink deep clean', time: '15 min' },
      { task: 'Cabinet exterior', time: '15 min' },
      { task: 'Floor mopping', time: '10 min' },
    ],
    faqs: [
      { q: 'Is the chimney interior included?', a: 'No — chimney interior is a specialised service. We clean only the exterior surfaces.' },
      { q: 'Will you wash utensils?', a: 'Utensil washing is a separate service. Kitchen Cleaning covers surfaces only.' },
    ],
    color: '#f97316',
    bg: '#fff7ed',
  },
  {
    id: 'full-home-cleaning',
    name: 'Full Home Cleaning',
    emoji: '🏠',
    tagline: 'Every room, every corner — completely refreshed.',
    duration: '3–4 hrs',
    popular: true,
    includes: [
      'All rooms swept & mopped',
      'Dusting of all surfaces & furniture',
      'Bathroom surface clean',
      'Kitchen surface clean',
      'Balcony sweep',
      'Ceiling fan exterior wipe',
      'Sofa exterior vacuum',
    ],
    excludes: [
      'Interior cabinet / wardrobe cleaning',
      'Window glass deep-clean',
      'Fridge / AC cleaning',
      'Utensil washing',
    ],
    timeEstimates: [
      { task: 'Sweeping all rooms', time: '40 min' },
      { task: 'Mopping all rooms', time: '30 min' },
      { task: 'Bathroom clean', time: '30 min' },
      { task: 'Kitchen surfaces', time: '30 min' },
      { task: 'Dusting & fans', time: '30 min' },
    ],
    faqs: [
      { q: 'How many Pros come?', a: 'For 2BHK and above we send 2 Pros so the job is done faster. For 1BHK, 1 Pro is usually sufficient.' },
      { q: 'How often should I do a full clean?', a: 'Monthly for regular maintenance, or before/after a special event or house move.' },
    ],
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    id: 'sweeping-mopping',
    name: 'Sweeping & Mopping',
    emoji: '🧹',
    tagline: 'Fresh floors every single day.',
    duration: '30–45 min',
    popular: false,
    includes: [
      'All rooms swept',
      'Wet mopping with floor cleaner',
      'Balcony & passage sweep',
      'Dustbin emptying',
    ],
    excludes: [
      'Deep scrubbing of tiles',
      'Furniture moving',
      'Bathroom or kitchen cleaning',
    ],
    timeEstimates: [
      { task: 'Sweeping all rooms', time: '20 min' },
      { task: 'Wet mopping', time: '20 min' },
    ],
    faqs: [
      { q: 'Is this good for daily bookings?', a: 'Yes! This is our most popular daily service. Many customers book it every morning.' },
    ],
    color: '#10b981',
    bg: '#f0fdf4',
  },
  {
    id: 'sofa-cleaning',
    name: 'Sofa Cleaning',
    emoji: '🛋️',
    tagline: 'Refresh your sofa — remove stains, dust & odour.',
    duration: '1–2 hrs',
    popular: false,
    includes: [
      'Full vacuum of all cushions & crevices',
      'Fabric stain pre-treatment',
      'Wet extraction clean (if fabric sofa)',
      'Cushion flipping & reshaping',
      'Odour neutraliser spray',
    ],
    excludes: [
      'Leather sofa conditioning (separate service)',
      'Structural repair',
      'Complete reupholstering',
    ],
    timeEstimates: [
      { task: 'Vacuum & prep', time: '20 min' },
      { task: 'Stain treatment', time: '20 min' },
      { task: 'Deep clean & dry', time: '40 min' },
    ],
    faqs: [
      { q: 'Will my sofa be wet after?', a: 'There will be slight moisture. We recommend keeping it in a ventilated area for 2–3 hours after cleaning.' },
      { q: 'Does this work for all sofa types?', a: 'Yes — fabric, velvet, and microfibre. Leather requires a separate specialised service.' },
    ],
    color: '#ec4899',
    bg: '#fdf2f8',
  },
  {
    id: 'balcony-cleaning',
    name: 'Balcony Cleaning',
    emoji: '🌿',
    tagline: 'A spotless outdoor space you\'ll love spending time in.',
    duration: '30–45 min',
    popular: false,
    includes: [
      'Floor sweep & scrub',
      'Railing wipe-down',
      'Wall surface wipe',
      'Removal of cobwebs',
      'Drain unclogging',
    ],
    excludes: [
      'Plant care & re-potting',
      'Outdoor furniture deep clean',
      'External window glass',
    ],
    timeEstimates: [
      { task: 'Sweep & scrub floor', time: '20 min' },
      { task: 'Railing & walls', time: '15 min' },
    ],
    faqs: [
      { q: 'Do you clean outdoor furniture?', a: 'Light wipe-down is included. Deep furniture cleaning is a separate add-on service.' },
    ],
    color: '#06b6d4',
    bg: '#f0fdfe',
  },
  {
    id: 'fan-cleaning',
    name: 'Fan Cleaning',
    emoji: '🌀',
    tagline: 'Dusty fans cleaned safely — no ladder needed.',
    duration: '15–20 min per fan',
    popular: false,
    includes: [
      'Each blade wiped with damp cloth',
      'Motor housing dusted',
      'Regulator panel wiped',
      'All dust collected & disposed',
    ],
    excludes: [
      'Exhaust fan interior (that is bathroom service)',
      'Electrical repairs',
      'AC fan cleaning',
    ],
    timeEstimates: [
      { task: 'Per ceiling fan', time: '15 min' },
    ],
    faqs: [
      { q: 'Do you bring a ladder?', a: 'Yes, our Pros carry their own step-ladder for fan cleaning.' },
      { q: 'How is pricing calculated?', a: 'Base price covers up to 2 fans. Additional fans are ₹75 each.' },
    ],
    color: '#0ea5e9',
    bg: '#f0f9ff',
  },
  {
    id: 'window-cleaning',
    name: 'Window Cleaning',
    emoji: '🪟',
    tagline: 'Crystal-clear windows, streak-free guaranteed.',
    duration: '45–60 min',
    popular: false,
    includes: [
      'Interior glass pane clean',
      'Window frame & sill wipe',
      'Streak-free squeegee finish',
      'Removal of cobwebs from frames',
    ],
    excludes: [
      'Exterior glass above ground floor',
      'Grill / mesh cleaning',
      'Window AC unit',
    ],
    timeEstimates: [
      { task: 'Per window (interior)', time: '8–10 min' },
    ],
    faqs: [
      { q: 'Do you clean exterior windows?', a: 'For safety reasons, we only clean interior-facing glass. Exterior cleaning above ground floor is not included.' },
    ],
    color: '#38bdf8',
    bg: '#f0f9ff',
  },
  {
    id: 'laundry',
    name: 'Laundry',
    emoji: '👕',
    tagline: 'Clothes washed, dried and ready to wear.',
    duration: '45–60 min (+ machine time)',
    popular: false,
    includes: [
      'Sorting of clothes by colour',
      'Machine wash with detergent (provided by us)',
      'Hang dry or tumble dry',
      'Basic fold & stack',
    ],
    excludes: [
      'Ironing (book Ironing & Folding separately)',
      'Dry-clean garments',
      'Hand-wash only delicates',
    ],
    timeEstimates: [
      { task: 'Sorting & loading', time: '15 min' },
      { task: 'Machine wash cycle', time: '40–60 min' },
      { task: 'Dry & fold', time: '20 min' },
    ],
    faqs: [
      { q: 'Do you bring detergent?', a: 'Yes. We carry standard detergent. If you have a preferred brand, leave it out and we will use yours.' },
      { q: 'Is ironing included?', a: 'No — book our Ironing & Folding service as a separate or combined booking.' },
    ],
    color: '#a78bfa',
    bg: '#f5f3ff',
  },
  {
    id: 'fridge-cleaning',
    name: 'Fridge Cleaning',
    emoji: '🧊',
    tagline: 'A hygienic, odour-free fridge inside and out.',
    duration: '45–60 min',
    popular: false,
    includes: [
      'All shelves & drawers removed & cleaned',
      'Interior wall wipe-down & sanitise',
      'Door seal & gasket cleaning',
      'Exterior surfaces wiped',
      'Drip tray cleaned',
      'Odour neutraliser applied',
    ],
    excludes: [
      'Coil or compressor cleaning',
      'Electrical repair',
      'Freezer defrosting (manual)',
    ],
    timeEstimates: [
      { task: 'Empty & shelf soak', time: '15 min' },
      { task: 'Interior wipe & sanitise', time: '25 min' },
      { task: 'Reassemble & exterior', time: '10 min' },
    ],
    faqs: [
      { q: 'Do I need to empty the fridge first?', a: 'Yes please. We recommend emptying it before the Pro arrives so they can get started immediately.' },
    ],
    color: '#06b6d4',
    bg: '#f0fdfe',
  },
  {
    id: 'ironing-folding',
    name: 'Ironing & Folding',
    emoji: '👔',
    tagline: 'Crisp, wrinkle-free clothes — every time.',
    duration: '30 min per 10 garments',
    popular: false,
    includes: [
      'Steam or dry ironing per garment',
      'Proper fold and stack',
      'Hanging of formal wear',
      'Collar & sleeve pressing',
    ],
    excludes: [
      'Dry-clean only garments',
      'Washing (book Laundry separately)',
      'Wardrobe organisation',
    ],
    timeEstimates: [
      { task: 'Per shirt / top', time: '4–5 min' },
      { task: 'Per trouser / salwar', time: '5–6 min' },
      { task: 'Per saree / dupatta', time: '8–10 min' },
    ],
    faqs: [
      { q: 'Do you bring an iron?', a: 'Yes, our Pros carry their own steam iron. If you prefer we use yours, just leave it out.' },
    ],
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    id: 'dusting-wiping',
    name: 'Dusting & Wiping',
    emoji: '🪣',
    tagline: 'Every surface dust-free and gleaming.',
    duration: '30–45 min',
    popular: false,
    includes: [
      'Furniture top & surface dusting',
      'TV & electronics exterior wipe',
      'Door & window frame dusting',
      'Light switches & sockets wipe',
      'Ceiling corner cobweb removal',
    ],
    excludes: [
      'Inside drawers or cabinets',
      'Book shelf organisation',
      'Window glass cleaning',
    ],
    timeEstimates: [
      { task: 'Furniture dusting', time: '20 min' },
      { task: 'Electronics & doors', time: '15 min' },
    ],
    faqs: [
      { q: 'Is this safe for electronics?', a: 'Yes — we use dry microfibre cloths on electronics. No wet wipes near screens or ports.' },
    ],
    color: '#10b981',
    bg: '#f0fdf4',
  },
];

const CITIES = ['Nashik', 'Pune', 'Mumbai', 'Nagpur', 'Aurangabad', 'Kolhapur'];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [toast, setToast] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState('');

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function handleBook() {
    if (!selectedCity) { showToast('👆 Select your city first'); return; }
    showToast(`✅ "${selected?.name}" — Download the app to confirm!`);
  }

  if (selected) {
    return <ServiceDetail
      service={selected}
      onBack={() => { setSelected(null); setOpenFaq(null); }}
      openFaq={openFaq}
      setOpenFaq={setOpenFaq}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      onBook={handleBook}
      toast={toast}
      allServices={SERVICES}
      onSelectService={(s: Service) => { setSelected(s); setOpenFaq(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
    />;
  }

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: '#fafafa', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .scard { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 20px; padding: 0; cursor: pointer; transition: all 0.22s; overflow: hidden; }
        .scard:hover { border-color: #06b6d4; transform: translateY(-5px); box-shadow: 0 16px 48px rgba(6,182,212,0.13); }
        .scard:hover .sarrow { color: #06b6d4; transform: translateX(3px); }
        .sarrow { transition: all 0.2s; color: #9ca3af; font-size: 18px; }
        .btn-cy { background: #06b6d4; color: #fff; border: none; border-radius: 50px; font-family: 'DM Sans',sans-serif; font-weight: 600; cursor: pointer; transition: all 0.18s; }
        .btn-cy:hover { background: #0891b2; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(6,182,212,0.3); }
      `}</style>

      {toast && <Toast msg={toast} />}

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <a href="/" style={{ fontSize: 13, color: '#06b6d4', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>← Back to home</a>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: '#06b6d4', textTransform: 'uppercase', marginBottom: 8 }}>All services</p>
              <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, color: '#0c4a6e', lineHeight: 1.1, margin: 0 }}>
                Book trusted<br />house help.
              </h1>
              <p style={{ color: '#6b7280', marginTop: 12, fontSize: 15, maxWidth: 480 }}>
                {SERVICES.length} services, transparent flat pricing. Everything you need to keep your home spotless.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdfe', border: '1.5px solid #a5f3fc', borderRadius: 14, padding: '10px 16px' }}>
              <span style={{ fontSize: 13, color: '#0e7490', fontWeight: 500 }}>📍</span>
              <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: 14, fontWeight: 500, color: '#0e7490', fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', outline: 'none' }}>
                <option value="">Select your city</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {SERVICES.map(s => (
            <div key={s.id} className="scard" onClick={() => { setSelected(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              {/* image area */}
              <div style={{ height: 140, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: 56 }}>{s.emoji}</span>
                {s.popular && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: s.color, color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, letterSpacing: 1 }}>
                    POPULAR
                  </div>
                )}
              </div>
              {/* footer */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>{s.name}</div>
                  </div>
                  <span className="sarrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 60, background: 'linear-gradient(135deg,#0c4a6e,#0e7490)', borderRadius: 24, padding: '40px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Get trusted house help in minutes.</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Download the Cleenzo app and book your first service today.</p>
          </div>
          <button className="btn-cy" style={{ padding: '14px 32px', fontSize: 15, flexShrink: 0 }}
            onClick={() => showToast('🚀 App launching soon on Play Store!')}>
            Download the app →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICE DETAIL ───────────────────────────────────────────────────────────
type ServiceDetailProps = {
  service: Service;
  onBack: () => void;
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  onBook: () => void;
  toast: string;
  allServices: Service[];
  onSelectService: (s: Service) => void;
};

function ServiceDetail({ service, onBack, openFaq, setOpenFaq, selectedCity, setSelectedCity, onBook, toast, allServices, onSelectService }: ServiceDetailProps) {
  const others = allServices.filter((s) => s.id !== service.id).slice(0, 6);

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: '#fafafa', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .btn-cy { background: #06b6d4; color: #fff; border: none; border-radius: 50px; font-family: 'DM Sans',sans-serif; font-weight: 600; cursor: pointer; transition: all 0.18s; }
        .btn-cy:hover { background: #0891b2; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(6,182,212,0.3); }
        .btn-outline { background: transparent; color: #0e7490; border: 2px solid #a5f3fc; border-radius: 50px; font-family: 'DM Sans',sans-serif; font-weight: 600; cursor: pointer; transition: all 0.18s; }
        .btn-outline:hover { background: #f0fdfe; border-color: #06b6d4; }
        .check-item::before { content: "✓"; color: #10b981; font-weight: 700; margin-right: 8px; }
        .cross-item::before { content: "✕"; color: #f87171; font-weight: 700; margin-right: 8px; }
        .faq-item { border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden; margin-bottom: 10px; }
        .faq-q { padding: 16px 20px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #fff; transition: background 0.15s; }
        .faq-q:hover { background: #f9fafb; }
        .faq-a { padding: 0 20px 16px; font-size: 14px; color: #6b7280; line-height: 1.7; }
        .ocard { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 16px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 12px; }
        .ocard:hover { border-color: #06b6d4; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(6,182,212,0.1); }
        .city-chip { display: inline-block; padding: 6px 16px; border: 1px solid #a5f3fc; border-radius: 50px; font-size: 13px; font-weight: 500; color: #0e7490; background: #f0fdfe; text-decoration: none; transition: all 0.15s; cursor: pointer; }
        .city-chip:hover { background: #06b6d4; color: #fff; border-color: #06b6d4; }
      `}</style>

      {toast && <Toast msg={toast} />}

      {/* Sticky booking bar (mobile-style) */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f0f0f0', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: '#f0fdfe', border: '1px solid #a5f3fc', borderRadius: 10, padding: '7px 14px', fontSize: 13, color: '#0e7490', cursor: 'pointer', fontWeight: 500, fontFamily: "'DM Sans',sans-serif" }}>
              ← All services
            </button>
            <div style={{ fontSize: 20 }}>{service.emoji}</div>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#0c4a6e' }}>{service.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              style={{ border: '1.5px solid #a5f3fc', background: '#f0fdfe', borderRadius: 10, padding: '8px 12px', fontSize: 13, color: '#0e7490', fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', outline: 'none' }}>
              <option value="">📍 Select city</option>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button className="btn-cy" style={{ padding: '9px 22px', fontSize: 14 }} onClick={onBook}>
              Book now
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div>
          {/* Hero */}
          <div style={{ background: service.bg, borderRadius: 24, padding: '48px 40px', marginBottom: 40, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 80 }}>{service.emoji}</span>
            <div>
              <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, color: '#0c4a6e', margin: '0 0 10px' }}>{service.name}</h1>
              <p style={{ fontSize: 17, color: '#374151', marginBottom: 16, lineHeight: 1.6 }}>{service.tagline}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ background: '#fff', border: `1.5px solid ${service.color}`, color: service.color, borderRadius: 50, padding: '5px 14px', fontSize: 13, fontWeight: 600 }}>
                  ⏱ {service.duration}
                </span>
                <span style={{ background: '#fff', border: '1.5px solid #e5e7eb', color: '#374151', borderRadius: 50, padding: '5px 14px', fontSize: 13, fontWeight: 500 }}>
                  🧴 Products included
                </span>
                <span style={{ background: '#fff', border: '1.5px solid #e5e7eb', color: '#374151', borderRadius: 50, padding: '5px 14px', fontSize: 13, fontWeight: 500 }}>
                  ✅ Satisfaction guarantee
                </span>
              </div>
            </div>
          </div>

          {/* What's included */}
          <Section title="What's included">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {service.includes.map((item) => (
                <div key={item} className="check-item" style={{ fontSize: 14, color: '#374151', display: 'flex', alignItems: 'flex-start', background: '#f0fdf4', borderRadius: 10, padding: '10px 14px' }}>
                  <span style={{ color: '#10b981', fontWeight: 700, marginRight: 8, flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </Section>

          {/* Not included */}
          <Section title="Does not include">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {service.excludes.map((item) => (
                <div key={item} style={{ fontSize: 14, color: '#6b7280', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#f87171', fontWeight: 700, flexShrink: 0 }}>✕</span>
                  {item}
                </div>
              ))}
            </div>
          </Section>

          {/* Time estimates */}
          <Section title="How long does it take?">
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Estimations are based on a standard 2BHK.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1.5px solid #e5e7eb', borderRadius: 16, overflow: 'hidden' }}>
              {service.timeEstimates.map((t, i) => (
                <div key={t.task} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: i % 2 === 0 ? '#fff' : '#fafafa', fontSize: 14 }}>
                  <span style={{ color: '#374151', fontWeight: 500 }}>{t.task}</span>
                  <span style={{ color: '#06b6d4', fontWeight: 600 }}>{t.time}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* FAQs */}
          <Section title="Frequently asked questions">
            {service.faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ color: '#0c4a6e' }}>
                  {faq.q}
                  <span style={{ color: '#9ca3af', fontSize: 18, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                </div>
                {openFaq === i && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </Section>

          {/* Available cities */}
          <Section title={`Available in ${CITIES.length} Maharashtra cities`}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CITIES.map(city => (
                <span key={city} className="city-chip" onClick={() => setSelectedCity(city)}>{city}</span>
              ))}
            </div>
          </Section>

          {/* Other services */}
          <Section title="More ways to keep your home clean">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
              {others.map((s) => (
                <div key={s.id} className="ocard" onClick={() => onSelectService(s)}>
                  <span style={{ fontSize: 28 }}>{s.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0c4a6e' }}>{s.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* RIGHT STICKY CARD */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 24, padding: 28, boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>{service.emoji}</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0c4a6e', marginBottom: 4 }}>{service.name}</h2>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>⏱ {service.duration} · All products included</p>

            {/* City select */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>YOUR CITY</label>
              <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: '11px 14px', fontSize: 14, fontFamily: "'DM Sans',sans-serif", color: '#374151', outline: 'none', cursor: 'pointer' }}>
                <option value="">Select city</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button className="btn-outline" style={{ width: '100%', padding: '12px', fontSize: 14, borderRadius: 14 }}
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onBack(); }}>
              ← View all services
            </button>

            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f0f0f0' }}>
              {[
                ['🛡️', 'Satisfaction guarantee'],
                ['🧴', 'Equipment & products included'],
                ['✅', 'Verified & trained Pros'],
                ['⏰', 'On-time guarantee'],
              ].map(([icon, label]) => (
                <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, fontSize: 13, color: '#6b7280' }}>
                  <span>{icon}</span>{label}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0c4a6e', marginBottom: 16, paddingBottom: 12, borderBottom: '1.5px solid #f0f0f0' }}>{title}</h2>
      {children}
    </div>
  );
}

function Toast({ msg }: { msg: string }) {
  return (
    <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#0e7490', color: '#fff', padding: '12px 24px', borderRadius: 50, fontSize: 14, fontWeight: 500, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', whiteSpace: 'nowrap', maxWidth: '90vw', textAlign: 'center' }}>
      {msg}
    </div>
  );
}