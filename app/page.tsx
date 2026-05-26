'use client';
import { useState, useEffect, useRef } from 'react';

// ─── SITE CONFIG ─────────────────────────────────────────────────────────────
const SITE = {
  name: 'Cleenzo',
  tagline: 'Trusted house help in minutes!',
  subTagline: 'Your home, professionally cleaned — exactly when you need it. Vetted Cleenzo Pros, transparent pricing, no hidden charges.',
  liveBadge: 'Now live in 6 Maharashtra cities',
  rating: '4.8',
  ratingCount: '12,400+',
  footerNote: 'Made with ❤️ in Mumbai, Maharashtra',
  copyright: '© 2026 Cleenzo. All rights reserved.',
  email: 'hello@cleenzo.in',
  privacyEmail: 'privacy@cleenzo.in',
  playStoreUrl: 'https://play.google.com/store',
  appStoreUrl: 'https://apps.apple.com',
};

const STATS = [
  { value: '50,000+', label: 'Happy customers' },
  { value: '6',       label: 'Cities served' },
  { value: '4.8 ★',  label: 'Average rating' },
  { value: '< 2 min', label: 'Avg booking time' },
];

const CITIES_MAP = {
  Nashik:     ['Gangapur Road','Cidco','Panchvati','College Road','Satpur','Ambad','Nashik Road','Trimbak Road','Indira Nagar','Deolali'],
  Pune:       ['Koregaon Park','Baner','Hinjewadi','Kothrud','Wakad','Viman Nagar','Hadapsar','Aundh','Magarpatta','Shivajinagar'],
  Mumbai:     ['Andheri','Bandra','Powai','Thane','Borivali','Malad','Goregaon','Kandivali','Dadar','Kurla'],
  Nagpur:     ['Dharampeth','Sitabuldi','Sadar','Civil Lines','Manish Nagar','Wardha Road','Hingna','Pratap Nagar'],
  Aurangabad: ['Cidco','Garkheda','Waluj','Osmanpura','Cantonment','Hudco','Paithan Road'],
  Kolhapur:   ['Tarabai Park','Shivaji Peth','Rajarampuri','Kasaba Bawda','Shahupuri'],
};

const SERVICES = [
  { id:'bathroom-cleaning', image:'/services/bathroom-cleaning.png',  name:'Bathroom Cleaning',  emoji:'🚿', duration:'40–60 min', popular:true,  bg:'#e0f7fa', color:'#06b6d4',
    tagline:'Deep-clean your bathroom in under an hour.',
    includes:['Toilet bowl, seat & exterior scrub','Sink, tap & mirror polish','Floor tiles scrubbing & mopping','Wall tiles wipe-down','Dustbin cleaning','Exhaust fan exterior wipe'],
    excludes:['Shower cubicle glass deep-clean','Bathtub scrubbing','Dry wiping of walls'],
    timeEstimates:[{task:'Toilet deep clean',time:'15 min'},{task:'Sink & mirror',time:'10 min'},{task:'Floor scrubbing',time:'15 min'},{task:'Wall tiles wipe',time:'10 min'}],
    faqs:[{q:'Do I need to provide cleaning supplies?',a:'No. Our Cleenzo Pros bring all equipment and products — everything included.'},{q:'How often should I book?',a:'Once a week for daily-use bathrooms, fortnightly for guest bathrooms.'},{q:'What if I am not satisfied?',a:'Free re-clean within 24 hours if you are not happy with the result.'}]},
  { id:'kitchen-cleaning', image:'/services/kitchen-cleaning.png',   name:'Kitchen Cleaning',   emoji:'🍳', duration:'60–90 min', popular:true,  bg:'#fff7ed', color:'#f97316',
    tagline:'A grease-free kitchen that feels brand new.',
    includes:['Countertop wipe and sanitise','Stovetop & burner scrub','Chimney exterior wipe','Sink deep clean & polish','Cabinet exterior wipe','Floor mopping','Dustbin sanitise'],
    excludes:['Interior cabinet cleaning','Refrigerator cleaning','Utensils washing','Chimney interior cleaning'],
    timeEstimates:[{task:'Countertop & stovetop',time:'20 min'},{task:'Sink deep clean',time:'15 min'},{task:'Cabinet exterior',time:'15 min'},{task:'Floor mopping',time:'10 min'}],
    faqs:[{q:'Is the chimney interior included?',a:'No — we clean only the exterior surfaces.'},{q:'Will you wash utensils?',a:'Utensil washing is a separate service.'}]},
  { id:'full-home-cleaning', image:'/services/full-home-cleaning.png', name:'Full Home Cleaning', emoji:'🏠', duration:'3–4 hrs',   popular:true,  bg:'#f5f3ff', color:'#8b5cf6',
    tagline:'Every room, every corner — completely refreshed.',
    includes:['All rooms swept & mopped','Dusting of all surfaces & furniture','Bathroom surface clean','Kitchen surface clean','Balcony sweep','Ceiling fan exterior wipe','Sofa exterior vacuum'],
    excludes:['Interior cabinet / wardrobe cleaning','Window glass deep-clean','Fridge / AC cleaning','Utensil washing'],
    timeEstimates:[{task:'Sweeping all rooms',time:'40 min'},{task:'Mopping all rooms',time:'30 min'},{task:'Bathroom clean',time:'30 min'},{task:'Kitchen surfaces',time:'30 min'},{task:'Dusting & fans',time:'30 min'}],
    faqs:[{q:'How many Pros come?',a:'For 2BHK and above we send 2 Pros. For 1BHK, 1 Pro is sufficient.'},{q:'How often?',a:'Monthly for maintenance, or before/after a special event.'}]},
  { id:'sweeping-mopping', image:'/services/sweeping-mopping.png',   name:'Sweeping & Mopping', emoji:'🧹', duration:'30–45 min', popular:false, bg:'#f0fdf4', color:'#10b981',
    tagline:'Fresh floors every single day.',
    includes:['All rooms swept','Wet mopping with floor cleaner','Balcony & passage sweep','Dustbin emptying'],
    excludes:['Deep scrubbing of tiles','Furniture moving','Bathroom or kitchen cleaning'],
    timeEstimates:[{task:'Sweeping all rooms',time:'20 min'},{task:'Wet mopping',time:'20 min'}],
    faqs:[{q:'Good for daily bookings?',a:'Yes! Our most popular daily service. Many customers book every morning.'}]},
  { id:'sofa-cleaning', image:'/services/sofa-cleaning.png',      name:'Sofa Cleaning',      emoji:'🛋️', duration:'1–2 hrs',   popular:false, bg:'#fdf2f8', color:'#ec4899',
    tagline:'Refresh your sofa — remove stains, dust & odour.',
    includes:['Full vacuum of all cushions & crevices','Fabric stain pre-treatment','Wet extraction clean','Cushion flipping & reshaping','Odour neutraliser spray'],
    excludes:['Leather sofa conditioning','Structural repair','Complete reupholstering'],
    timeEstimates:[{task:'Vacuum & prep',time:'20 min'},{task:'Stain treatment',time:'20 min'},{task:'Deep clean & dry',time:'40 min'}],
    faqs:[{q:'Will my sofa be wet after?',a:'Slight moisture — keep ventilated for 2–3 hours after cleaning.'},{q:'All sofa types?',a:'Yes — fabric, velvet, microfibre. Leather needs a separate service.'}]},
  { id:'balcony-cleaning', image:'/services/balcony-cleaning.png',   name:'Balcony Cleaning',   emoji:'🌿', duration:'30–45 min', popular:false, bg:'#f0fdfe', color:'#06b6d4',
    tagline:"A spotless outdoor space you'll love spending time in.",
    includes:['Floor sweep & scrub','Railing wipe-down','Wall surface wipe','Removal of cobwebs','Drain unclogging'],
    excludes:['Plant care & re-potting','Outdoor furniture deep clean','External window glass'],
    timeEstimates:[{task:'Sweep & scrub floor',time:'20 min'},{task:'Railing & walls',time:'15 min'}],
    faqs:[{q:'Outdoor furniture?',a:'Light wipe-down included. Deep furniture cleaning is a separate add-on.'}]},
  { id:'fan-cleaning', image:'/services/fan-cleaning.png',       name:'Fan Cleaning',       emoji:'🌀', duration:'15–20 min', popular:false, bg:'#f0f9ff', color:'#0ea5e9',
    tagline:'Dusty fans cleaned safely — no ladder needed.',
    includes:['Each blade wiped with damp cloth','Motor housing dusted','Regulator panel wiped','All dust collected & disposed'],
    excludes:['Exhaust fan interior','Electrical repairs','AC fan cleaning'],
    timeEstimates:[{task:'Per ceiling fan',time:'15 min'}],
    faqs:[{q:'Do you bring a ladder?',a:'Yes, our Pros carry their own step-ladder.'},{q:'Pricing?',a:'Base covers up to 2 fans. Additional fans at extra cost.'}]},
  { id:'window-cleaning', image:'/services/window-cleaning.png',    name:'Window Cleaning',    emoji:'🪟', duration:'45–60 min', popular:false, bg:'#f0f9ff', color:'#38bdf8',
    tagline:'Crystal-clear windows, streak-free guaranteed.',
    includes:['Interior glass pane clean','Window frame & sill wipe','Streak-free squeegee finish','Removal of cobwebs from frames'],
    excludes:['Exterior glass above ground floor','Grill / mesh cleaning','Window AC unit'],
    timeEstimates:[{task:'Per window (interior)',time:'8–10 min'}],
    faqs:[{q:'Exterior windows?',a:'Safety reasons — interior only. Exterior above ground floor not included.'}]},
  { id:'laundry', image:'/services/laundry.png',            name:'Laundry',            emoji:'👕', duration:'45–60 min', popular:false, bg:'#f5f3ff', color:'#a78bfa',
    tagline:'Clothes washed, dried and ready to wear.',
    includes:['Sorting by colour','Machine wash with detergent','Hang dry or tumble dry','Basic fold & stack'],
    excludes:['Ironing','Dry-clean garments','Hand-wash only delicates'],
    timeEstimates:[{task:'Sorting & loading',time:'15 min'},{task:'Machine wash cycle',time:'40–60 min'},{task:'Dry & fold',time:'20 min'}],
    faqs:[{q:'Do you bring detergent?',a:'Yes. Or leave yours out and we use it.'},{q:'Ironing included?',a:'No — book Ironing & Folding separately.'}]},
  { id:'fridge-cleaning', image:'/services/fridge-cleaning.png',    name:'Fridge Cleaning',    emoji:'🧊', duration:'45–60 min', popular:false, bg:'#f0fdfe', color:'#06b6d4',
    tagline:'A hygienic, odour-free fridge inside and out.',
    includes:['All shelves & drawers removed & cleaned','Interior wall wipe-down & sanitise','Door seal & gasket cleaning','Exterior surfaces wiped','Drip tray cleaned','Odour neutraliser applied'],
    excludes:['Coil or compressor cleaning','Electrical repair','Freezer defrosting'],
    timeEstimates:[{task:'Empty & shelf soak',time:'15 min'},{task:'Interior wipe & sanitise',time:'25 min'},{task:'Reassemble & exterior',time:'10 min'}],
    faqs:[{q:'Empty fridge first?',a:'Yes please — empty before Pro arrives so they start immediately.'}]},
  { id:'ironing-folding', image:'/services/ironing-folding.png',    name:'Ironing & Folding',  emoji:'👔', duration:'30 min/10', popular:false, bg:'#fffbeb', color:'#f59e0b',
    tagline:'Crisp, wrinkle-free clothes — every time.',
    includes:['Steam or dry ironing per garment','Proper fold and stack','Hanging of formal wear','Collar & sleeve pressing'],
    excludes:['Dry-clean only garments','Washing','Wardrobe organisation'],
    timeEstimates:[{task:'Per shirt / top',time:'4–5 min'},{task:'Per trouser / salwar',time:'5–6 min'},{task:'Per saree / dupatta',time:'8–10 min'}],
    faqs:[{q:'Do you bring an iron?',a:'Yes, Pros carry their own steam iron.'}]},
  { id:'dusting-wiping', image:'/services/dusting-wiping.png',     name:'Dusting & Wiping',   emoji:'🪣', duration:'30–45 min', popular:false, bg:'#f0fdf4', color:'#10b981',
    tagline:'Every surface dust-free and gleaming.',
    includes:['All furniture & shelf dusting','TV & electronics exterior wipe','Door & window frame dusting','Light switches & sockets wipe','Ceiling corner cobweb removal'],
    excludes:['Inside drawers or cabinets','Book shelf organisation','Window glass cleaning'],
    timeEstimates:[{task:'Furniture dusting',time:'20 min'},{task:'Electronics & doors',time:'15 min'}],
    faqs:[{q:'Safe for electronics?',a:'Yes — dry microfibre cloths on electronics. No wet wipes near screens.'}]},
];

const REVIEWS = [
  { name:'Priya M.',  area:'Gangapur Road, Nashik', text:'Spotless bathroom in under an hour. The pro was polite, on time, and thorough. Absolutely loved the experience!', rating:5, avatar:'PM', color:'#06b6d4' },
  { name:'Rahul S.',  area:'Baner, Pune',           text:'They even cleaned inside the cabinets! Great value, zero hidden charges. Already booked my 3rd session.', rating:5, avatar:'RS', color:'#0891b2' },
  { name:'Anjali K.', area:'Andheri, Mumbai',       text:'Full home package for Diwali. Team arrived exactly on time. My entire flat was completely transformed!', rating:5, avatar:'AK', color:'#0e7490' },
  { name:'Suresh P.', area:'Civil Lines, Nagpur',   text:'The fridge cleaning was incredible — smells brand new. Super easy booking process, loved every step!', rating:5, avatar:'SP', color:'#0c4a6e' },
];

const HOW_STEPS = [
  { n:'01', emoji:'📋', title:'Choose your service',    desc:'Pick from 12 cleaning services. See the exact flat price upfront — no hidden charges ever.' },
  { n:'02', emoji:'📅', title:'Pick a time slot',       desc:'Instant, scheduled, or recurring. Pay via UPI, card, or wallet in under 60 seconds.' },
  { n:'03', emoji:'✅', title:'Sit back & relax',       desc:'A verified Cleenzo Pro arrives on time with all equipment. Track them live on the map.' },
];

const FAQ_ITEMS = [
  {
    category:'Booking', icon:'📅',
    questions:[
      { q:'How do I book a Cleenzo service?', a:'Download the Cleenzo app, choose your service, pick a time slot and pay in under 60 seconds. You can also book via our website. A verified Pro will be assigned instantly.' },
      { q:'Can I schedule a recurring booking?', a:'Yes! You can set up daily, weekly, or monthly recurring bookings at a discounted rate. Manage everything from the app — pause, reschedule, or cancel anytime.' },
      { q:'How far in advance can I book?', a:'You can book up to 30 days in advance. For same-day bookings, we recommend booking at least 2 hours before your preferred time slot.' },
    ],
  },
  {
    category:'Services', icon:'🧹',
    questions:[
      { q:'Do Cleenzo Pros bring their own supplies?', a:'Yes — all cleaning equipment and products are included in every booking. You do not need to provide anything. Just make sure the space is accessible.' },
      { q:'What if I am not satisfied with the service?', a:'We offer a 100% satisfaction guarantee. Report any issue within 24 hours and we will arrange a free re-clean within 48 hours at no extra cost.' },
      { q:'Are the Cleenzo Pros verified?', a:'Every Cleenzo Pro goes through background verification, in-person training, and a quality assessment before they are allowed on the platform.' },
    ],
  },
  {
    category:'Payments', icon:'💳',
    questions:[
      { q:'What payment methods do you accept?', a:'We accept UPI (GPay, PhonePe, Paytm), credit and debit cards, and all major digital wallets. Cash is not accepted to keep things safe and transparent.' },
      { q:'Are there any hidden charges?', a:'Never. The price you see is the price you pay. All equipment and products are included. No service fees, no surge pricing, no surprises.' },
      { q:'How does the cancellation refund work?', a:'Cancel more than 2 hours before your booking and get a full refund instantly. Cancellations within 2 hours incur a 50% fee. If the Pro cancels, you get a 100% refund.' },
    ],
  },
  {
    category:'Cities', icon:'📍',
    questions:[
      { q:'Which cities does Cleenzo serve?', a:'We currently serve Nashik, Pune, Mumbai, Nagpur, Aurangabad, and Kolhapur. We are expanding rapidly — drop us a message if you want Cleenzo in your city!' },
      { q:'Will Cleenzo come to my area?', a:'We cover most areas in our active cities. Enter your address in the app to instantly check availability. If we are not there yet, you can join the waitlist.' },
    ],
  },
];

export default function CleanzoWebsite() {
  const [view, setView]                       = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCity, setSelectedCity]       = useState('');
  const [selectedArea, setSelectedArea]       = useState('');
  const [serviceCity, setServiceCity]         = useState('');
  const [openFaq, setOpenFaq]                 = useState(null);
  const [toast, setToast]                     = useState('');
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [scrolled, setScrolled]               = useState(false);
  const [faqTab, setFaqTab]                   = useState(0);
  const [openFaqId, setOpenFaqId]             = useState(null);

  const CITY_LIST = Object.keys(CITIES_MAP);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast  = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };
  const goHome     = () => { setView('home'); setSelectedService(null); window.scrollTo({top:0,behavior:'smooth'}); };
  const goServices = () => { setView('services'); window.scrollTo({top:0,behavior:'smooth'}); };
  const openDetail = (s) => { setSelectedService(s); setOpenFaq(null); setView('detail'); window.scrollTo({top:0,behavior:'smooth'}); };
  const goBack     = () => { setView('services'); setSelectedService(null); window.scrollTo({top:0,behavior:'smooth'}); };
  const scrollTo   = (id) => { goHome(); setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth'}), 100); };
  const handleBook = () => { if (!serviceCity) { showToast('👆 Select your city first'); return; } showToast(`✅ "${selectedService?.name}" — Download the app to confirm!`); };
  const handleApp  = (store='play') => {
    const url = store === 'ios' ? SITE.appStoreUrl : SITE.playStoreUrl;
    showToast("🚀 App launching soon! We'll notify you.");
  };
  const toggleFaq  = (id) => setOpenFaqId(openFaqId === id ? null : id);

  return (
    <div style={{fontFamily:"'Outfit','DM Sans','Segoe UI',sans-serif",background:'#fff',overflowX:'hidden',minHeight:'100vh'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        :root{--cy:#06b6d4;--cy2:#0891b2;--cy3:#0e7490;--cy4:#164e63;--cy5:#0c4a6e;--light:#f0fdfe;--light2:#e0f7fa;}
        html{scroll-behavior:smooth;}
        body{font-family:'Outfit',sans-serif;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.45)}70%{box-shadow:0 0 0 10px rgba(6,182,212,0)}}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes faqSlide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .a1{animation:fadeUp .7s .05s both}.a2{animation:fadeUp .7s .18s both}.a3{animation:fadeUp .7s .32s both}
        .a4{animation:fadeUp .7s .46s both}.a5{animation:fadeUp .7s .58s both}
        .float-a{animation:floatA 4s ease-in-out infinite}
        .float-b{animation:floatB 5s ease-in-out infinite 1s}
        .nav-link{color:#374151;text-decoration:none;font-size:14px;font-weight:500;background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;padding:0;letter-spacing:.3px;transition:color .15s;}
        .nav-link:hover{color:var(--cy)}
        .btn-primary{background:var(--cy);color:#fff;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:600;transition:all .22s;border-radius:50px;letter-spacing:.2px;}
        .btn-primary:hover{background:var(--cy2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(6,182,212,.4);}
        .btn-primary:active{transform:translateY(0);}
        .btn-white{background:#fff;color:var(--cy3);border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;transition:all .22s;border-radius:50px;}
        .btn-white:hover{background:#f0fdfe;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.15);}
        .btn-outline{background:transparent;color:var(--cy3);border:2px solid var(--cy);cursor:pointer;font-family:'Outfit',sans-serif;font-weight:600;transition:all .22s;border-radius:50px;}
        .btn-outline:hover{background:var(--cy);color:#fff;transform:translateY(-1px);}
        .svc-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:22px;overflow:hidden;cursor:pointer;transition:all .25s;}
        .svc-card:hover{border-color:var(--cy);transform:translateY(-6px);box-shadow:0 20px 56px rgba(6,182,212,.16);}
        .svc-card:hover .card-arrow{color:var(--cy);transform:translateX(4px);}
        .card-arrow{transition:all .22s;color:#9ca3af;font-size:18px;}
        .home-svc-card{background:#fff;border:1.5px solid #f3f4f6;border-radius:22px;padding:22px 20px;cursor:pointer;transition:all .25s;}
        .home-svc-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(6,182,212,.14);border-color:rgba(6,182,212,.4);}
        .home-svc-card:hover .svc-name{color:var(--cy3);}
        .review-card{background:#fff;border:1.5px solid #f0f9ff;border-radius:24px;padding:28px;transition:all .25s;}
        .review-card:hover{box-shadow:0 12px 40px rgba(6,182,212,.12);transform:translateY(-3px);border-color:rgba(6,182,212,.25);}
        .how-card{background:#fff;border:1.5px solid #f0f0f0;border-radius:24px;padding:32px;transition:all .25s;position:relative;overflow:hidden;}
        .how-card::before{content:'';position:absolute;top:-60px;right:-60px;width:140px;height:140px;background:radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 70%);pointer-events:none;}
        .how-card:hover{border-color:var(--cy);box-shadow:0 12px 40px rgba(6,182,212,.1);transform:translateY(-3px);}
        .ocard{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;padding:16px;cursor:pointer;transition:all .22s;display:flex;align-items:center;gap:12px;}
        .ocard:hover{border-color:var(--cy);transform:translateY(-2px);box-shadow:0 8px 24px rgba(6,182,212,.1);}
        .city-pill{display:inline-flex;align-items:center;padding:7px 18px;border:1.5px solid #e5e7eb;border-radius:50px;font-size:13px;font-weight:500;color:#374151;background:#fff;cursor:pointer;transition:all .18s;font-family:'Outfit',sans-serif;}
        .city-pill:hover{border-color:var(--cy);color:var(--cy3);background:var(--light);}
        .city-pill.active{background:var(--cy);color:#fff;border-color:var(--cy);}
        .faq-item{border:1.5px solid #e5e7eb;border-radius:16px;overflow:hidden;margin-bottom:10px;transition:border-color .2s;}
        .faq-item:hover{border-color:rgba(6,182,212,.4);}
        .faq-q{padding:17px 20px;font-weight:600;font-size:14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;background:#fff;color:#0c4a6e;}
        .faq-q:hover{background:#fafeff;}
        .faq-a{padding:0 20px 17px;font-size:14px;color:#6b7280;line-height:1.8;}
        .store-btn{display:inline-flex;align-items:center;gap:11px;background:#0c4a6e;color:#fff;border:none;border-radius:14px;padding:12px 22px;cursor:pointer;transition:all .22s;font-family:'Outfit',sans-serif;}
        .store-btn:hover{background:#0e5a85;transform:translateY(-2px);box-shadow:0 8px 24px rgba(12,74,110,.35);}
        .section-eyebrow{font-size:11.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--cy);margin-bottom:10px;}
        .section-heading{font-family:'Playfair Display',serif;font-weight:800;color:#0c4a6e;line-height:1.1;}
        .stat-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:22px 28px;text-align:center;transition:all .22s;}
        .stat-box:hover{background:rgba(255,255,255,.14);transform:translateY(-2px);}
        .blob{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;opacity:.32;}
        .hero-pattern{position:absolute;inset:0;background-image:radial-gradient(rgba(6,182,212,.07) 1.5px,transparent 1.5px);background-size:28px 28px;pointer-events:none;}
        /* FAQ light theme */
        .faq-light-item{background:#fff;border:1.5px solid #dbeafe;border-radius:20px;overflow:hidden;transition:all .28s;margin-bottom:12px;box-shadow:0 2px 12px rgba(6,182,212,.04);}
        .faq-light-item:hover{border-color:#93c5fd;box-shadow:0 8px 32px rgba(6,182,212,.12);}
        .faq-light-item.open{border-color:#06b6d4;box-shadow:0 8px 36px rgba(6,182,212,.16);}
        .faq-light-q{width:100%;background:transparent;border:none;padding:20px 24px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;font-family:'Outfit',sans-serif;text-align:left;}
        .faq-light-q:hover{background:rgba(219,234,254,.2);}
        .faq-light-icon{width:34px;height:34px;border-radius:50%;flex-shrink:0;background:#dbeafe;border:1.5px solid #93c5fd;display:flex;align-items:center;justify-content:center;color:#0891b2;font-size:18px;font-weight:700;transition:all .3s;}
        .faq-light-item.open .faq-light-icon{background:#06b6d4;border-color:#06b6d4;color:#fff;transform:rotate(45deg);}
        .faq-light-a{padding:0 24px 20px 24px;font-size:14.5px;color:#374151;line-height:1.85;animation:faqSlide .25s ease;border-top:1px solid #e0f2fe;}
        .faq-tab-btn{padding:9px 20px;border-radius:50px;font-size:13px;font-weight:600;border:1.5px solid #bfdbfe;background:#fff;color:#1d4ed8;cursor:pointer;transition:all .22s;font-family:'Outfit',sans-serif;display:inline-flex;align-items:center;gap:7px;}
        .faq-tab-btn:hover{border-color:#60a5fa;background:#eff6ff;color:#1d4ed8;}
        .faq-tab-btn.active{background:linear-gradient(135deg,#0ea5e9,#0284c7);border-color:transparent;color:#fff;box-shadow:0 4px 14px rgba(6,182,212,.3);}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important;}
          .hero-img-col{display:none!important;}
          .detail-grid{grid-template-columns:1fr!important;}
          .detail-sidebar{display:none!important;}
          .nav-desktop{display:none!important;}
          .hamburger{display:flex!important;}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .how-grid{grid-template-columns:1fr!important;}
          .faq-tabs{flex-wrap:wrap!important;}
        }
        @media(min-width:769px){.hamburger{display:none!important;}}
      `}</style>

      {/* TOAST */}
      {toast && (
        <div style={{position:'fixed',top:22,left:'50%',transform:'translateX(-50%)',background:'#0e7490',color:'#fff',padding:'13px 26px',borderRadius:50,fontSize:14,fontWeight:500,zIndex:9999,boxShadow:'0 8px 36px rgba(0,0,0,.18)',whiteSpace:'nowrap',maxWidth:'90vw',textAlign:'center',animation:'toastIn .3s ease'}}>
          {toast}
        </div>
      )}

      {/* ═══ NAVBAR ═══ */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,.97)',backdropFilter:'blur(20px)',borderBottom:'1px solid #f0f9ff',padding:'0 28px',boxShadow:scrolled?'0 4px 24px rgba(6,182,212,.08)':'none',transition:'box-shadow .3s'}}>
        <div style={{maxWidth:1180,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:70}}>
          <button onClick={goHome} style={{display:'flex',alignItems:'center',gap:10,background:'none',border:'none',cursor:'pointer',padding:0}}>
            <div style={{width:38,height:38,background:'linear-gradient(135deg,#06b6d4,#0e7490)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 4px 14px rgba(6,182,212,.3)'}}>🧹</div>
            <span style={{fontSize:22,fontWeight:800,fontFamily:"'Playfair Display',serif",color:'#0e7490',letterSpacing:'-0.5px'}}>{SITE.name}</span>
          </button>
          <div className="nav-desktop" style={{display:'flex',gap:36,alignItems:'center'}}>
            <button className="nav-link" onClick={goServices}>Services</button>
            <button className="nav-link" onClick={() => scrollTo('howitworks')}>How it works</button>
            <button className="nav-link" onClick={() => scrollTo('cities')}>Cities</button>
            <button className="nav-link" onClick={() => scrollTo('reviews')}>Reviews</button>
            <button className="nav-link" onClick={() => scrollTo('faq')}>FAQ</button>
          </div>
          <div className="nav-desktop" style={{display:'flex',gap:10,alignItems:'center'}}>
            <button className="btn-outline" style={{padding:'8px 20px',fontSize:13}} onClick={() => handleApp('play')}>Get the app</button>
            <button className="btn-primary" style={{padding:'9px 22px',fontSize:13}} onClick={goServices}>Book now →</button>
          </div>
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}
            style={{background:'none',border:'none',cursor:'pointer',fontSize:24,color:'#374151',display:'none',alignItems:'center'}}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
        {mobileOpen && (
          <div style={{background:'#fff',borderTop:'1px solid #f0f0f0',padding:'16px 28px',display:'flex',flexDirection:'column',gap:14}}>
            {['Services','How it works','Cities','Reviews','FAQ'].map(l => (
              <button key={l} className="nav-link" style={{textAlign:'left',padding:'5px 0',fontSize:15}} onClick={() => { setMobileOpen(false); if (l==='Services') goServices(); else scrollTo(l.toLowerCase().replace(' ','')); }}>{l}</button>
            ))}
            <button className="btn-primary" style={{padding:'11px',fontSize:14,marginTop:4}} onClick={() => handleApp('play')}>Download App</button>
          </div>
        )}
      </nav>

      {/* ═══ HOME ═══ */}
      {view === 'home' && <>

        {/* HERO */}
        <section style={{background:'linear-gradient(145deg,#f0fdfe 0%,#e0f7fa 45%,#cff3f9 100%)',padding:'0 28px',overflow:'hidden',minHeight:'92vh',display:'flex',alignItems:'center',position:'relative'}}>
          <div className="blob" style={{width:500,height:500,background:'#a5f3fc',top:'-120px',right:'-80px'}}/>
          <div className="blob" style={{width:300,height:300,background:'#67e8f9',bottom:'-60px',left:'10%'}}/>
          <div className="hero-pattern"/>
          <div style={{maxWidth:1180,margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'1.05fr .95fr',gap:48,alignItems:'center',padding:'72px 0',position:'relative',zIndex:1}} className="hero-grid">
            <div>
              <div className="a1" style={{display:'inline-flex',alignItems:'center',gap:9,background:'rgba(6,182,212,.13)',border:'1.5px solid rgba(6,182,212,.35)',borderRadius:50,padding:'7px 18px',fontSize:13,color:'#0e7490',fontWeight:600,marginBottom:32}}>
                <span style={{width:8,height:8,background:'#22c55e',borderRadius:'50%',display:'inline-block',boxShadow:'0 0 0 4px rgba(34,197,94,.25)',animation:'pulse 2s infinite'}}/>
                {SITE.liveBadge}
              </div>
              <h1 className="a2 section-heading" style={{fontSize:'clamp(44px,5.5vw,74px)',marginBottom:22,color:'#0c4a6e'}}>
                Trusted house<br/>
                <span style={{background:'linear-gradient(90deg,#06b6d4,#0891b2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                  help in minutes!
                </span>
              </h1>
              <p className="a3" style={{fontSize:17.5,color:'#374151',lineHeight:1.8,marginBottom:36,maxWidth:500}}>{SITE.subTagline}</p>
              <div className="a4" style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:32}}>
                <button className="store-btn" onClick={() => handleApp('play')}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#4CAF50"/>
                    <path d="M3 3.5L13.5 12 8.5 17 3 3.5Z" fill="#2196F3"/>
                    <path d="M13.5 12L21 7.5 16.5 12 21 16.5 13.5 12Z" fill="#FFC107"/>
                    <path d="M3 20.5L8.5 17 13.5 12 3 20.5Z" fill="#F44336"/>
                  </svg>
                  <div style={{textAlign:'left'}}><div style={{fontSize:9.5,opacity:.7,letterSpacing:.8,textTransform:'uppercase'}}>Get it on</div><div style={{fontSize:15,fontWeight:700}}>Google Play</div></div>
                </button>
                <button className="store-btn" onClick={() => handleApp('ios')}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div style={{textAlign:'left'}}><div style={{fontSize:9.5,opacity:.7,letterSpacing:.8,textTransform:'uppercase'}}>Download on the</div><div style={{fontSize:15,fontWeight:700}}>App Store</div></div>
                </button>
              </div>
              <div className="a4" style={{display:'flex',alignItems:'center',gap:12,marginBottom:36}}>
                <div style={{display:'flex',gap:1}}>{'★★★★★'.split('').map((s,i)=><span key={i} style={{color:'#f59e0b',fontSize:20}}>{s}</span>)}</div>
                <span style={{fontSize:16,fontWeight:700,color:'#0c4a6e'}}>{SITE.rating}</span>
                <span style={{fontSize:13.5,color:'#6b7280'}}>from {SITE.ratingCount} ratings</span>
              </div>
              <div className="a5">
                <p style={{fontSize:11,fontWeight:700,letterSpacing:2.5,color:'#9ca3af',textTransform:'uppercase',marginBottom:12}}>Live in</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {CITY_LIST.slice(0,4).map(c => (
                    <button key={c} className={`city-pill${selectedCity===c?' active':''}`}
                      onClick={() => { setSelectedCity(c); setSelectedArea(''); document.getElementById('services')?.scrollIntoView({behavior:'smooth'}); }}>{c}</button>
                  ))}
                  <button className="city-pill" onClick={() => document.getElementById('cities')?.scrollIntoView({behavior:'smooth'})}>
                    + {CITY_LIST.length-4} more →
                  </button>
                </div>
              </div>
            </div>
            <div className="hero-img-col" style={{position:'relative',height:580,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{position:'absolute',width:460,height:460,background:'linear-gradient(135deg,rgba(6,182,212,.12),rgba(14,116,144,.08))',borderRadius:'50%'}}/>
              <div className="float-a" style={{position:'relative',background:'#fff',borderRadius:28,padding:28,boxShadow:'0 28px 80px rgba(6,182,212,.22)',width:310,zIndex:3}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                  <div>
                    <div style={{fontSize:11,color:'#9ca3af',marginBottom:3,letterSpacing:.5}}>Booking confirmed</div>
                    <div style={{fontSize:16,fontWeight:700,color:'#0c4a6e'}}>Bathroom Cleaning</div>
                  </div>
                  <div style={{width:46,height:46,background:'#f0fdfe',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🚿</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12,padding:'13px 0',borderTop:'1px solid #f0f0f0',borderBottom:'1px solid #f0f0f0',marginBottom:16}}>
                  <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#06b6d4,#0e7490)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:14}}>SP</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:'#0c4a6e'}}>Sunita Pawar</div>
                    <div style={{display:'flex',gap:2,alignItems:'center'}}>
                      {'★★★★★'.split('').map((s,i)=><span key={i} style={{color:'#f59e0b',fontSize:11}}>{s}</span>)}
                      <span style={{fontSize:11,color:'#9ca3af',marginLeft:3}}>4.9</span>
                    </div>
                  </div>
                  <div style={{marginLeft:'auto',background:'#f0fdfe',borderRadius:9,padding:'4px 10px',fontSize:11,fontWeight:600,color:'#0e7490'}}>On way →</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                  <span style={{color:'#6b7280'}}>Gangapur Road, Nashik</span>
                  <span style={{background:'#0e7490',color:'#fff',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:600}}>Live ●</span>
                </div>
                <div style={{marginTop:16,background:'#f0f0f0',borderRadius:50,height:6,overflow:'hidden'}}>
                  <div style={{width:'65%',height:'100%',background:'linear-gradient(90deg,#06b6d4,#0891b2)',borderRadius:50}}/>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:7,fontSize:10.5,color:'#9ca3af'}}>
                  <span>Booked</span><span style={{color:'#06b6d4',fontWeight:600}}>On the way</span><span>Arrived</span><span>Done</span>
                </div>
              </div>
              <div className="float-b" style={{position:'absolute',top:55,right:5,background:'#fff',borderRadius:18,padding:'14px 18px',boxShadow:'0 10px 36px rgba(0,0,0,.1)',zIndex:4,minWidth:158}}>
                <div style={{fontSize:10.5,color:'#9ca3af',marginBottom:4}}>Service rated</div>
                <div style={{fontSize:13,fontWeight:700,color:'#0c4a6e',marginBottom:7}}>Kitchen Cleaning</div>
                <div style={{display:'flex',gap:2}}>{'★★★★★'.split('').map((s,i)=><span key={i} style={{color:'#f59e0b',fontSize:16}}>{s}</span>)}</div>
              </div>
              <div style={{position:'absolute',bottom:90,left:5,background:'linear-gradient(135deg,#0e7490,#0c4a6e)',borderRadius:18,padding:'14px 18px',boxShadow:'0 10px 36px rgba(14,116,144,.32)',zIndex:4}}>
                <div style={{fontSize:10.5,color:'rgba(255,255,255,.65)',marginBottom:6}}>Cleenzo Pros nearby</div>
                <div style={{display:'flex'}}>
                  {['SP','RK','AM','NJ'].map((init,i)=>(
                    <div key={i} style={{width:28,height:28,borderRadius:'50%',background:`hsl(${190+i*15},65%,48%)`,border:'2.5px solid #0e7490',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff',marginLeft:i?-9:0}}>{init}</div>
                  ))}
                </div>
                <div style={{fontSize:12.5,fontWeight:600,color:'#fff',marginTop:7}}>4 Pros available now</div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{background:'linear-gradient(90deg,#0c4a6e,#0e7490)',padding:'32px 28px'}}>
          <div style={{maxWidth:1060,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}} className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} className="stat-box">
                <div style={{fontSize:28,fontWeight:800,color:'#fff',fontFamily:"'Playfair Display',serif"}}>{s.value}</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,.6)',marginTop:5}}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{padding:'100px 28px',background:'#fafafa',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-100,right:-100,width:400,height:400,background:'radial-gradient(circle,rgba(6,182,212,.055) 0%,transparent 70%)',pointerEvents:'none'}}/>
          <div style={{maxWidth:1180,margin:'0 auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:56,flexWrap:'wrap',gap:20}}>
              <div>
                <div className="section-eyebrow">What we offer</div>
                <h2 className="section-heading" style={{fontSize:'clamp(30px,3.5vw,46px)'}}>Book trusted house help.</h2>
                <p style={{color:'#6b7280',marginTop:11,fontSize:16,maxWidth:460}}>{SERVICES.length} services · Flat pricing · Equipment included</p>
              </div>
              <button className="btn-outline" style={{padding:'12px 28px',fontSize:14}} onClick={goServices}>View all {SERVICES.length} services →</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(195px,1fr))',gap:16}}>
              {SERVICES.map(s => (
                <div key={s.id} className="home-svc-card" onClick={() => openDetail(s)}>
                  <div style={{height:130,borderRadius:16,overflow:'hidden',marginBottom:15,position:'relative',background:s.bg}}>
                    <ServiceImage src={s.image} alt={s.name} bg={s.bg} color={s.color}/>
                    {s.popular && <div style={{position:'absolute',top:8,right:8,background:s.color,color:'#fff',fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20,letterSpacing:1.2,zIndex:2}}>TOP</div>}
                  </div>
                  <div className="svc-name" style={{fontSize:14,fontWeight:600,color:'#111827',marginBottom:5,transition:'color .2s'}}>{s.name}</div>
                  <div style={{fontSize:12,color:'#9ca3af'}}>{s.duration}</div>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center',marginTop:44}}>
              <button className="btn-primary" style={{padding:'15px 40px',fontSize:15}} onClick={goServices}>Explore all services →</button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="howitworks" style={{padding:'100px 28px',background:'#fff'}}>
          <div style={{maxWidth:1060,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:60}}>
              <div className="section-eyebrow">Simple process</div>
              <h2 className="section-heading" style={{fontSize:'clamp(30px,3.5vw,46px)'}}>Booked in 3 easy steps</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}} className="how-grid">
              {HOW_STEPS.map((step,i) => (
                <div key={i} className="how-card">
                  <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:20}}>
                    <div style={{width:50,height:50,background:'linear-gradient(135deg,#06b6d4,#0891b2)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:800,color:'#fff',fontFamily:"'Playfair Display',serif",flexShrink:0,boxShadow:'0 6px 18px rgba(6,182,212,.3)'}}>{step.n}</div>
                    <span style={{fontSize:34}}>{step.emoji}</span>
                  </div>
                  <h3 style={{fontSize:17,fontWeight:700,color:'#0c4a6e',marginBottom:10}}>{step.title}</h3>
                  <p style={{fontSize:14.5,color:'#6b7280',lineHeight:1.8}}>{step.desc}</p>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center',marginTop:52}}>
              <button className="btn-primary" style={{padding:'15px 40px',fontSize:15}} onClick={() => handleApp('play')}>Download the app — it's free →</button>
            </div>
          </div>
        </section>

        {/* CITIES */}
        <section id="cities" style={{padding:'100px 28px',background:'#fafafa'}}>
          <div style={{maxWidth:960,margin:'0 auto',textAlign:'center'}}>
            <div className="section-eyebrow">Coverage</div>
            <h2 className="section-heading" style={{fontSize:'clamp(30px,3.5vw,46px)',marginBottom:14}}>Serving Maharashtra</h2>
            <p style={{color:'#6b7280',marginBottom:44,fontSize:16}}>Click a city to see the areas we serve</p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:32}}>
              {CITY_LIST.map(city => (
                <button key={city} className={`city-pill${selectedCity===city?' active':''}`}
                  onClick={() => { setSelectedCity(selectedCity===city?'':city); setSelectedArea(''); }}>{city}</button>
              ))}
            </div>
            {selectedCity && (
              <div style={{background:'#fff',border:'1.5px solid #e0f7fa',borderRadius:24,padding:28,animation:'fadeUp .35s ease'}}>
                <h3 style={{fontSize:15,fontWeight:700,color:'#0e7490',marginBottom:16}}>Areas we serve in {selectedCity}</h3>
                <div style={{display:'flex',gap:9,flexWrap:'wrap',justifyContent:'center'}}>
                  {CITIES_MAP[selectedCity].map(area => (
                    <button key={area}
                      onClick={() => { setSelectedArea(area); document.getElementById('services')?.scrollIntoView({behavior:'smooth'}); }}
                      style={{background:selectedArea===area?'#0e7490':'#f0fdfe',color:selectedArea===area?'#fff':'#0e7490',border:`1.5px solid ${selectedArea===area?'#0e7490':'#a5f3fc'}`,borderRadius:50,padding:'7px 18px',fontSize:13,fontWeight:500,cursor:'pointer',transition:'all .15s',fontFamily:"'Outfit',sans-serif"}}>
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" style={{padding:'100px 28px',background:'#fff',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',bottom:-60,left:-60,width:300,height:300,background:'radial-gradient(circle,rgba(6,182,212,.055) 0%,transparent 70%)',pointerEvents:'none'}}/>
          <div style={{maxWidth:1180,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:56}}>
              <div className="section-eyebrow">Customer love</div>
              <h2 className="section-heading" style={{fontSize:'clamp(30px,3.5vw,46px)'}}>What our customers say</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:24}}>
              {REVIEWS.map(r => (
                <div key={r.name} className="review-card">
                  <div style={{display:'flex',marginBottom:16,gap:2}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:'#f59e0b',fontSize:18}}>★</span>)}</div>
                  <p style={{fontSize:15,color:'#374151',lineHeight:1.85,marginBottom:22,fontStyle:'italic'}}>"{r.text}"</p>
                  <div style={{display:'flex',alignItems:'center',gap:13}}>
                    <div style={{width:44,height:44,borderRadius:'50%',background:`linear-gradient(135deg,${r.color},#0c4a6e)`,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13,flexShrink:0}}>{r.avatar}</div>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:'#0c4a6e'}}>{r.name}</div>
                      <div style={{fontSize:12,color:'#9ca3af'}}>{r.area}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ — LIGHT BLUE THEME ═══ */}
        <section id="faq" style={{padding:'100px 28px',background:'linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 40%,#f0fdfe 100%)',position:'relative',overflow:'hidden'}}>
          {/* Decorative blobs */}
          <div style={{position:'absolute',top:-80,right:-80,width:360,height:360,background:'radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 70%)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:-60,left:-60,width:280,height:280,background:'radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',top:'40%',left:'50%',width:500,height:500,background:'radial-gradient(circle,rgba(186,230,255,.2) 0%,transparent 70%)',transform:'translate(-50%,-50%)',pointerEvents:'none'}}/>

          <div style={{maxWidth:860,margin:'0 auto',position:'relative',zIndex:1}}>

            {/* Header */}
            <div style={{textAlign:'center',marginBottom:52}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(6,182,212,.1)',border:'1.5px solid rgba(6,182,212,.3)',borderRadius:50,padding:'6px 18px',fontSize:12,fontWeight:700,color:'#0891b2',letterSpacing:2,textTransform:'uppercase',marginBottom:16}}>
                💬 Got questions?
              </div>
              <h2 className="section-heading" style={{fontSize:'clamp(30px,3.5vw,48px)',marginBottom:14,color:'#0c4a6e'}}>
                Frequently asked<br/>questions
              </h2>
              <p style={{color:'#374151',fontSize:16,maxWidth:460,margin:'0 auto',lineHeight:1.75}}>
                Everything you need to know about Cleenzo.{' '}
                <a href="/contact" style={{color:'#0891b2',fontWeight:600,textDecoration:'none'}}>Can't find an answer? Ask us →</a>
              </p>
            </div>

            {/* Category tabs */}
            <div style={{display:'flex',gap:10,justifyContent:'center',marginBottom:40,flexWrap:'wrap'}} className="faq-tabs">
              {FAQ_ITEMS.map((cat,i) => (
                <button key={cat.category} className={`faq-tab-btn${faqTab===i?' active':''}`}
                  onClick={() => { setFaqTab(i); setOpenFaqId(null); }}>
                  <span>{cat.icon}</span>{cat.category}
                </button>
              ))}
            </div>

            {/* Questions */}
            <div>
              {FAQ_ITEMS[faqTab].questions.map((item,i) => {
                const id = `${faqTab}-${i}`;
                const isOpen = openFaqId === id;
                return (
                  <div key={id} className={`faq-light-item${isOpen?' open':''}`}>
                    <button className="faq-light-q" onClick={() => toggleFaq(id)}>
                      <div style={{display:'flex',alignItems:'center',gap:14,flex:1}}>
                        <div style={{width:36,height:36,borderRadius:12,background:isOpen?'linear-gradient(135deg,#0ea5e9,#0284c7)':'#e0f2fe',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0,transition:'all .3s'}}>
                          {isOpen ? <span style={{color:'#fff'}}>✓</span> : <span style={{color:'#0891b2'}}>{i+1}</span>}
                        </div>
                        <span style={{fontSize:15,fontWeight:600,color:isOpen?'#0284c7':'#0c4a6e',lineHeight:1.4,transition:'color .2s'}}>{item.q}</span>
                      </div>
                      <span className="faq-light-icon">+</span>
                    </button>
                    {isOpen && (
                      <div className="faq-light-a">
                        <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                          <div style={{width:4,background:'linear-gradient(180deg,#06b6d4,#0284c7)',borderRadius:4,alignSelf:'stretch',flexShrink:0,minHeight:40}}/>
                          <p style={{margin:0,paddingTop:12}}>{item.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div style={{marginTop:52,background:'#fff',border:'1.5px solid #bae6fd',borderRadius:28,padding:'36px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24,boxShadow:'0 8px 40px rgba(6,182,212,.1)'}}>
              <div style={{display:'flex',alignItems:'center',gap:18}}>
                <div style={{width:52,height:52,background:'linear-gradient(135deg,#e0f2fe,#bae6fd)',borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>💬</div>
                <div>
                  <div style={{fontSize:16,fontWeight:700,color:'#0c4a6e',marginBottom:4}}>Still have a question?</div>
                  <div style={{fontSize:13.5,color:'#6b7280'}}>Our team is available Mon–Sat, 9 AM – 7 PM IST</div>
                </div>
              </div>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                <a href="/contact" style={{background:'linear-gradient(135deg,#06b6d4,#0284c7)',color:'#fff',borderRadius:50,padding:'11px 24px',fontSize:14,fontWeight:600,textDecoration:'none',fontFamily:"'Outfit',sans-serif",display:'inline-block',boxShadow:'0 4px 16px rgba(6,182,212,.3)'}}>
                  Contact us →
                </a>
                <a href={`mailto:${SITE.email}`} style={{background:'#f0f9ff',border:'1.5px solid #bae6fd',color:'#0891b2',borderRadius:50,padding:'11px 24px',fontSize:14,fontWeight:600,textDecoration:'none',fontFamily:"'Outfit',sans-serif",display:'inline-block'}}>
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD CTA */}
        <section style={{position:'relative',overflow:'hidden',minHeight:520,display:'flex',alignItems:'center',padding:'0'}}>
          <img src="/cleenzo-pros.png" alt="Cleenzo Pros cleaning" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}}/>
          <div style={{position:'relative',zIndex:2,width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:'60px 28px'}}>
            <div style={{background:'rgba(255,255,255,0.72)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',border:'1.5px solid rgba(255,255,255,.85)',borderRadius:32,padding:'44px 52px',textAlign:'center',maxWidth:480,boxShadow:'0 20px 64px rgba(6,182,212,.18)'}}>
              <div style={{display:'flex',justifyContent:'center',gap:3,marginBottom:10}}>
                {[1,2,3,4,5].map(i=><span key={i} style={{color:'#f59e0b',fontSize:22}}>★</span>)}
              </div>
              <div style={{fontSize:14,color:'#0e7490',fontWeight:600,marginBottom:24}}>
                <strong style={{fontSize:19,color:'#0c4a6e'}}>{SITE.rating}</strong> &nbsp;·&nbsp; {SITE.ratingCount} Ratings Combined
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:'clamp(26px,3vw,42px)',color:'#0c4a6e',lineHeight:1.12,marginBottom:12}}>
                Maharashtra's Trusted<br/>Cleaning App
              </h2>
              <p style={{color:'#374151',fontSize:15.5,marginBottom:32,lineHeight:1.75}}>
                On-demand home services to keep your<br/>house spotless — anytime, anywhere.
              </p>
              <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                <button onClick={() => handleApp('play')} style={{display:'inline-flex',alignItems:'center',gap:11,background:'#0c4a6e',color:'#fff',border:'none',borderRadius:14,padding:'12px 20px',cursor:'pointer',transition:'all .22s',fontFamily:"'Outfit',sans-serif",boxShadow:'0 6px 20px rgba(12,74,110,.28)'}}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#4CAF50"/>
                    <path d="M3 3.5L13.5 12 8.5 17 3 3.5Z" fill="#2196F3"/>
                    <path d="M13.5 12L21 7.5 16.5 12 21 16.5 13.5 12Z" fill="#FFC107"/>
                    <path d="M3 20.5L8.5 17 13.5 12 3 20.5Z" fill="#F44336"/>
                  </svg>
                  <div style={{textAlign:'left'}}><div style={{fontSize:9,opacity:.7,letterSpacing:.8,textTransform:'uppercase'}}>Get it on</div><div style={{fontSize:15,fontWeight:700}}>Google Play</div></div>
                </button>
                <button onClick={() => handleApp('ios')} style={{display:'inline-flex',alignItems:'center',gap:11,background:'#0c4a6e',color:'#fff',border:'none',borderRadius:14,padding:'12px 20px',cursor:'pointer',transition:'all .22s',fontFamily:"'Outfit',sans-serif",boxShadow:'0 6px 20px rgba(12,74,110,.28)'}}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div style={{textAlign:'left'}}><div style={{fontSize:9,opacity:.7,letterSpacing:.8,textTransform:'uppercase'}}>Download on the</div><div style={{fontSize:15,fontWeight:700}}>App Store</div></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{background:'#0c4a6e',padding:'56px 28px 28px'}}>
          <div style={{maxWidth:1180,margin:'0 auto'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:40,marginBottom:44}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:16}}>
                  <div style={{width:32,height:32,background:'#06b6d4',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15}}>🧹</div>
                  <span style={{fontSize:21,fontWeight:800,color:'#fff',fontFamily:"'Playfair Display',serif"}}>{SITE.name}</span>
                </div>
                <p style={{fontSize:13,color:'rgba(255,255,255,.45)',lineHeight:1.9}}>Trusted home cleaning across Maharashtra. Vetted pros, transparent pricing.</p>
                <p style={{fontSize:13,color:'rgba(255,255,255,.35)',marginTop:12}}>{SITE.email}</p>
              </div>
              <div>
                <h4 style={{fontSize:11,fontWeight:700,color:'#67e8f9',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>Services</h4>
                {SERVICES.slice(0,5).map(s => (
                  <div key={s.id} style={{fontSize:13,color:'rgba(255,255,255,.5)',marginBottom:10,cursor:'pointer',transition:'color .15s'}}
                    onMouseOver={e=>e.currentTarget.style.color='rgba(255,255,255,.9)'}
                    onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,.5)'}
                    onClick={() => openDetail(s)}>{s.name}</div>
                ))}
              </div>
              <div>
                <h4 style={{fontSize:11,fontWeight:700,color:'#67e8f9',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>Cities</h4>
                {CITY_LIST.map(city => (
                  <div key={city} style={{fontSize:13,color:'rgba(255,255,255,.5)',marginBottom:10,cursor:'pointer',transition:'color .15s'}}
                    onMouseOver={e=>e.currentTarget.style.color='rgba(255,255,255,.9)'}
                    onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,.5)'}
                    onClick={() => { setSelectedCity(city); window.scrollTo({top:0,behavior:'smooth'}); }}>{city}</div>
                ))}
              </div>
              <div>
                <h4 style={{fontSize:11,fontWeight:700,color:'#67e8f9',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>Company</h4>
                {[['Privacy Policy','/privacy-policy'],['Terms of Service','/terms'],['Contact Us','/contact'],['FAQ','#faq']].map(([l,h]) => (
                  <div key={l} style={{fontSize:13,color:'rgba(255,255,255,.5)',marginBottom:10,cursor:'pointer',transition:'color .15s'}}
                    onMouseOver={e=>e.currentTarget.style.color='rgba(255,255,255,.9)'}
                    onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,.5)'}
                    onClick={() => h.startsWith('#') ? document.getElementById(h.slice(1))?.scrollIntoView({behavior:'smooth'}) : (window.location.href=h)}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:22,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
              <p style={{fontSize:12,color:'rgba(255,255,255,.3)'}}>{SITE.copyright}</p>
              <p style={{fontSize:12,color:'rgba(255,255,255,.3)'}}>{SITE.footerNote}</p>
            </div>
          </div>
        </footer>
      </>}

      {/* ═══ SERVICES VIEW ═══ */}
      {view === 'services' && (
        <div style={{background:'#fafafa',minHeight:'100vh'}}>
          <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'52px 28px 44px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-80,right:-80,width:320,height:320,background:'radial-gradient(circle,rgba(6,182,212,.055) 0%,transparent 70%)',pointerEvents:'none'}}/>
            <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
              <button onClick={goHome} style={{fontSize:13,color:'#06b6d4',background:'none',border:'none',cursor:'pointer',fontWeight:600,display:'inline-flex',alignItems:'center',gap:5,marginBottom:22,fontFamily:"'Outfit',sans-serif",padding:0}}>← Back to home</button>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:20}}>
                <div>
                  <div className="section-eyebrow">All services</div>
                  <h1 className="section-heading" style={{fontSize:'clamp(34px,5vw,56px)'}}>Book trusted<br/>house help.</h1>
                  <p style={{color:'#6b7280',marginTop:13,fontSize:15,maxWidth:500}}>{SERVICES.length} services · Transparent flat pricing · Equipment included</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:9,background:'#f0fdfe',border:'1.5px solid #a5f3fc',borderRadius:16,padding:'11px 18px'}}>
                  <span style={{fontSize:14,color:'#0e7490'}}>📍</span>
                  <select value={serviceCity} onChange={e=>setServiceCity(e.target.value)}
                    style={{border:'none',background:'transparent',fontSize:14,fontWeight:500,color:'#0e7490',fontFamily:"'Outfit',sans-serif",cursor:'pointer',outline:'none'}}>
                    <option value="">Select your city</option>
                    {CITY_LIST.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div style={{maxWidth:1180,margin:'0 auto',padding:'44px 28px 88px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:18}}>
              {SERVICES.map(s => (
                <div key={s.id} className="svc-card" onClick={() => openDetail(s)}>
                  <div style={{height:160,overflow:'hidden',position:'relative',background:s.bg}}>
                    <ServiceImage src={s.image} alt={s.name} bg={s.bg} color={s.color}/>
                    {s.popular && <div style={{position:'absolute',top:11,right:11,background:s.color,color:'#fff',fontSize:9,fontWeight:700,padding:'3px 9px',borderRadius:20,letterSpacing:1.2,zIndex:2}}>TOP</div>}
                  </div>
                  <div style={{padding:'15px 18px',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:'#111827',lineHeight:1.3}}>{s.name}</div>
                      <div style={{fontSize:12,color:'#9ca3af',marginTop:4}}>{s.duration}</div>
                    </div>
                    <span className="card-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:64,background:'linear-gradient(135deg,#0c4a6e,#0e7490)',borderRadius:28,padding:'44px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
              <div>
                <h3 style={{fontSize:22,fontWeight:800,fontFamily:"'Playfair Display',serif",color:'#fff',marginBottom:8}}>Get trusted house help in minutes.</h3>
                <p style={{fontSize:14,color:'rgba(255,255,255,.65)'}}>Download the Cleenzo app and book your first service today.</p>
              </div>
              <button className="btn-white" style={{padding:'14px 30px',fontSize:15,flexShrink:0}} onClick={() => handleApp('play')}>Download the app →</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ SERVICE DETAIL VIEW ═══ */}
      {view === 'detail' && selectedService && (() => {
        const s = selectedService;
        const others = SERVICES.filter(x=>x.id!==s.id).slice(0,6);
        return (
          <div style={{background:'#fafafa',minHeight:'100vh'}}>
            <div style={{position:'sticky',top:70,zIndex:50,background:'rgba(255,255,255,.97)',backdropFilter:'blur(16px)',borderBottom:'1px solid #f0f0f0',padding:'12px 28px'}}>
              <div style={{maxWidth:1180,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,flexWrap:'wrap'}}>
                <div style={{display:'flex',alignItems:'center',gap:13}}>
                  <button onClick={goBack} style={{background:'#f0fdfe',border:'1.5px solid #a5f3fc',borderRadius:12,padding:'7px 16px',fontSize:13,color:'#0e7490',cursor:'pointer',fontWeight:600,fontFamily:"'Outfit',sans-serif"}}>← All services</button>
                  <span style={{fontSize:21}}>{s.emoji}</span>
                  <span style={{fontSize:15,fontWeight:700,color:'#0c4a6e'}}>{s.name}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:11}}>
                  <select value={serviceCity} onChange={e=>setServiceCity(e.target.value)}
                    style={{border:'1.5px solid #a5f3fc',background:'#f0fdfe',borderRadius:12,padding:'8px 14px',fontSize:13,color:'#0e7490',fontFamily:"'Outfit',sans-serif",cursor:'pointer',outline:'none'}}>
                    <option value="">📍 City</option>
                    {CITY_LIST.map(c=><option key={c}>{c}</option>)}
                  </select>
                  <button className="btn-primary" style={{padding:'10px 24px',fontSize:14}} onClick={handleBook}>Book now</button>
                </div>
              </div>
            </div>
            <div style={{maxWidth:1180,margin:'0 auto',padding:'44px 28px 88px',display:'grid',gridTemplateColumns:'1fr 330px',gap:44,alignItems:'start'}} className="detail-grid">
              <div>
                <div style={{background:s.bg,borderRadius:28,padding:'48px 40px',marginBottom:44,display:'flex',gap:32,alignItems:'center',flexWrap:'wrap',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:-40,right:-40,width:180,height:180,background:`${s.color}18`,borderRadius:'50%',pointerEvents:'none'}}/>
                  <div style={{width:110,height:110,borderRadius:22,overflow:'hidden',flexShrink:0,position:'relative',zIndex:1,boxShadow:'0 8px 28px rgba(0,0,0,.12)'}}>
                    <ServiceImage src={s.image} alt={s.name} bg={s.bg} color={s.color}/>
                  </div>
                  <div style={{position:'relative',zIndex:1}}>
                    <h1 style={{fontSize:'clamp(28px,3.5vw,42px)',fontWeight:800,fontFamily:"'Playfair Display',serif",color:'#0c4a6e',margin:'0 0 11px'}}>{s.name}</h1>
                    <p style={{fontSize:16,color:'#374151',marginBottom:18,lineHeight:1.65}}>{s.tagline}</p>
                    <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
                      <span style={{background:'#fff',border:`1.5px solid ${s.color}`,color:s.color,borderRadius:50,padding:'5px 15px',fontSize:13,fontWeight:600}}>⏱ {s.duration}</span>
                      <span style={{background:'#fff',border:'1.5px solid #e5e7eb',color:'#374151',borderRadius:50,padding:'5px 15px',fontSize:13}}>🧴 Products included</span>
                      <span style={{background:'#fff',border:'1.5px solid #e5e7eb',color:'#374151',borderRadius:50,padding:'5px 15px',fontSize:13}}>✅ Satisfaction guarantee</span>
                    </div>
                  </div>
                </div>
                <DetailSection title="What's included">
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
                    {s.includes.map(i => (
                      <div key={i} style={{display:'flex',alignItems:'flex-start',gap:9,background:'#f0fdf4',borderRadius:12,padding:'10px 14px',fontSize:13.5,color:'#374151'}}>
                        <span style={{color:'#10b981',fontWeight:700,flexShrink:0}}>✓</span>{i}
                      </div>
                    ))}
                  </div>
                </DetailSection>
                <DetailSection title="Does not include">
                  {s.excludes.map(i => (
                    <div key={i} style={{display:'flex',gap:9,alignItems:'flex-start',fontSize:14,color:'#6b7280',marginBottom:9}}>
                      <span style={{color:'#f87171',fontWeight:700,flexShrink:0}}>✕</span>{i}
                    </div>
                  ))}
                </DetailSection>
                <DetailSection title="How long does it take?">
                  <p style={{fontSize:13,color:'#9ca3af',marginBottom:16}}>Estimates based on standard 2BHK.</p>
                  <div style={{border:'1.5px solid #e5e7eb',borderRadius:16,overflow:'hidden'}}>
                    {s.timeEstimates.map((t,i) => (
                      <div key={t.task} style={{display:'flex',justifyContent:'space-between',padding:'14px 20px',background:i%2===0?'#fff':'#fafafa',fontSize:14,borderBottom:i<s.timeEstimates.length-1?'1px solid #f0f0f0':'none'}}>
                        <span style={{color:'#374151',fontWeight:500}}>{t.task}</span>
                        <span style={{color:'#06b6d4',fontWeight:700}}>{t.time}</span>
                      </div>
                    ))}
                  </div>
                </DetailSection>
                <DetailSection title="Frequently asked questions">
                  {s.faqs.map((faq,i) => (
                    <div key={i} className="faq-item">
                      <div className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                        {faq.q}
                        <span style={{color:'#9ca3af',fontSize:22,transition:'transform .2s',transform:openFaq===i?'rotate(45deg)':'none',display:'inline-block'}}>+</span>
                      </div>
                      {openFaq===i && <div className="faq-a">{faq.a}</div>}
                    </div>
                  ))}
                </DetailSection>
                <DetailSection title={`Available in ${CITY_LIST.length} Maharashtra cities`}>
                  <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
                    {CITY_LIST.map(city => (
                      <button key={city} className={`city-pill${serviceCity===city?' active':''}`} onClick={() => setServiceCity(city)}>{city}</button>
                    ))}
                  </div>
                </DetailSection>
                <DetailSection title="More ways to keep your home clean">
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))',gap:11}}>
                    {others.map(os => (
                      <div key={os.id} className="ocard" onClick={() => openDetail(os)}>
                        <span style={{fontSize:27}}>{os.emoji}</span>
                        <div>
                          <div style={{fontSize:13,fontWeight:600,color:'#0c4a6e'}}>{os.name}</div>
                          <div style={{fontSize:12,color:'#9ca3af',marginTop:2}}>{os.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DetailSection>
              </div>
              <div className="detail-sidebar" style={{position:'sticky',top:148}}>
                <div style={{background:'#fff',border:'1.5px solid #e5e7eb',borderRadius:28,padding:28,boxShadow:'0 12px 48px rgba(0,0,0,.06)'}}>
                  <div style={{fontSize:40,marginBottom:10}}>{s.emoji}</div>
                  <h2 style={{fontSize:20,fontWeight:800,fontFamily:"'Playfair Display',serif",color:'#0c4a6e',marginBottom:5}}>{s.name}</h2>
                  <p style={{fontSize:13,color:'#9ca3af',marginBottom:24}}>⏱ {s.duration} · All products included</p>
                  <label style={{fontSize:11,fontWeight:700,color:'#374151',display:'block',marginBottom:7,letterSpacing:.8}}>YOUR CITY</label>
                  <select value={serviceCity} onChange={e=>setServiceCity(e.target.value)}
                    style={{width:'100%',border:'1.5px solid #e5e7eb',borderRadius:14,padding:'12px 16px',fontSize:14,fontFamily:"'Outfit',sans-serif",color:'#374151',outline:'none',cursor:'pointer',marginBottom:16}}>
                    <option value="">Select city</option>
                    {CITY_LIST.map(c=><option key={c}>{c}</option>)}
                  </select>
                  <button className="btn-primary" style={{width:'100%',padding:'14px',fontSize:15,borderRadius:16,marginBottom:11}} onClick={handleBook}>Book now</button>
                  <button className="btn-outline" style={{width:'100%',padding:'12px',fontSize:14,borderRadius:16}} onClick={goBack}>← View all services</button>
                  <div style={{marginTop:20,paddingTop:20,borderTop:'1px solid #f0f0f0'}}>
                    {[['🛡️','Satisfaction guarantee'],['🧴','Equipment & products included'],['✅','Verified & trained Pros'],['⏰','On-time guarantee']].map(([icon,label]) => (
                      <div key={label} style={{display:'flex',gap:10,alignItems:'center',marginBottom:10,fontSize:13,color:'#6b7280'}}>
                        <span>{icon}</span>{label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <div style={{marginBottom:44}}>
      <h2 style={{fontSize:20,fontWeight:800,fontFamily:"'Playfair Display',serif",color:'#0c4a6e',marginBottom:18,paddingBottom:13,borderBottom:'1.5px solid #f0f0f0'}}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── SERVICE IMAGE COMPONENT ──────────────────────────────────────────────────
function ServiceImage({ src, alt, bg, color }: {
  src: string; alt: string; bg: string; color: string;
}) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div style={{width:'100%',height:'100%',background:bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8}}>
        <div style={{width:48,height:48,borderRadius:14,background:color+'22',border:`1.5px dashed ${color}55`,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
        </div>
        <span style={{fontSize:11,color:color,fontWeight:600,opacity:.7}}>Image coming soon</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block',transition:'transform .35s ease'}}
      onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
      onMouseOut={e  => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );
}