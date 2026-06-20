'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';

// ─── SITE CONFIG ─────────────────────────────────────────────────────────────
const SITE = {
  name: 'Cleenzo',
  tagline: 'Clean Home Happy You',
  subTagline: 'House Help in minutes',
  liveBadge: 'Now live in Mumbai, Maharashtra',
  rating: '4.8',
  ratingCount: '12,400+',
  footerNote: 'Made with ❤️ in Mumbai, Maharashtra',
  copyright: '© 2026 Cleenzo. All rights reserved.',
  email: 'gocleenzo@gmail.com',
  playStoreUrl: 'https://play.google.com/store',
  appStoreUrl: 'https://apps.apple.com',
};

const CITIES_MAP = {
  Mumbai:     ['Andheri','Vile Parle', 'Juhu'],
};

// Explicit shape for each entry in SERVICES. Declaring this up front (and
// annotating the array below as Service[]) means every `s` you get from
// `SERVICES.map(s => ...)` is typed correctly everywhere in the file —
// including `popular`, which isn't set on any entry yet but is read in JSX
// for a future "TOP" badge.
interface Service {
  id: string;
  image: string;
  name: string;
  emoji: string;
  duration: string;
  bg: string;
  color: string;
  tagline: string;
  includes: string[];
  excludes: string[];
  timeEstimates: { task: string; time: string }[];
  faqs: { q: string; a: string }[];
  popular?: boolean;
}

const SERVICES: Service[] = [
  { id:'bathroom-cleaning', image:'/services/bathroom-cleaning.png',  name:'Bathroom Cleaning',  emoji:'🚿', duration:'40–60 min',  bg:'#e0f7fa', color:'#06b6d4',
    tagline:'Deep-clean your bathroom in under an hour.',
    includes:['Cleaning of toilet bowl, seat, and rim', 'Cleaning of washbasin and faucet', 'Wiping of bathroom tiles and visible surfaces', 'Cleaning of taps and bathroom fixtures', 'Sweeping and mopping of bathroom floor', 'Final wipe-down and deodorizing', 'Basic stain removal', 'Dust removal from visible corners'],
    excludes:['Deep grout restoration', 'Heavy hard-water stain removal', 'Acid treatment for extreme scaling', 'Drain unclogging/plumbing work', 'Cleaning inside storage cabinets', 'Removal of construction debris', 'Shifting heavy bathroom items'],
    timeEstimates:[{task:'Toilet deep clean',time:'15 min'},{task:'Sink & mirror',time:'10 min'},{task:'Floor scrubbing',time:'15 min'},{task:'Wall tiles wipe',time:'10 min'}],
    faqs:[{q:'Do I need to provide cleaning supplies?',a:'No. Our Cleenzo Pros bring all equipment and products — everything included.'},{q:'How often should I book?',a:'Once a week for daily-use bathrooms, fortnightly for guest bathrooms.'},{q:'What if I am not satisfied?',a:'Free re-clean within 24 hours if you are not happy with the result.'}]},
  { id:'kitchen-cleaning', image:'/services/kitchen-cleaning.png',   name:'Kitchen Cleaning',   emoji:'🍳', duration:'60–90 min',  bg:'#fff7ed', color:'#f97316',
    tagline:'A grease-free kitchen that feels brand new.',
    includes:['Wiping and cleaning of kitchen countertops and slabs', 'Cleaning exterior surfaces of upper and lower kitchen cabinets', 'Cleaning exterior surfaces of cooking stove including burners, knobs, and drip trays', 'Wiping visible kitchen wall tiles and backsplash areas', 'Cleaning exterior surfaces of sink and faucet', 'Basic removal of visible grease, dust, and food residue from accessible surfaces'],
    excludes:['Washing, soaking, or arranging utensils and dishes', 'Rearranging or organizing utensils inside cabinets', 'Garbage disposal or removal of kitchen waste', 'Cleaning interiors of chimneys, microwaves, refrigerators, ovens, or air fryers', 'Deep grease removal or stain restoration', 'Interior cleaning of cabinets or drawers', 'Appliance repair or servicing'],
    timeEstimates:[{task:'Countertop & stovetop',time:'20 min'},{task:'Sink deep clean',time:'15 min'},{task:'Cabinet exterior',time:'15 min'},{task:'Floor mopping',time:'10 min'}],
    faqs:[{q:'Is the chimney interior included?',a:'No — we clean only the exterior surfaces.'},{q:'Will you wash utensils?',a:'Utensil washing is a separate service.'}]},
  { id:'full-home-cleaning', image:'/services/full-home-cleaning.png', name:'Full Home Cleaning', emoji:'🏠', duration:'3–4 hrs',   bg:'#f5f3ff', color:'#8b5cf6',
    tagline:'Every room, every corner — completely refreshed.',
    includes:['All rooms swept & mopped','Dusting of all surfaces & furniture','Bathroom surface clean','Kitchen surface clean','Balcony sweep','Ceiling fan exterior wipe','Sofa exterior vacuum'],
    excludes:['Interior cabinet / wardrobe cleaning','Window glass deep-clean','Fridge / AC cleaning','Utensil washing'],
    timeEstimates:[{task:'Sweeping all rooms',time:'40 min'},{task:'Mopping all rooms',time:'30 min'},{task:'Bathroom clean',time:'30 min'},{task:'Kitchen surfaces',time:'30 min'},{task:'Dusting & fans',time:'30 min'}],
    faqs:[{q:'How many Pros come?',a:'For 2BHK and above we send 2 Pros. For 1BHK, 1 Pro is sufficient.'},{q:'How often?',a:'Monthly for maintenance, or before/after a special event.'}]},
  { id:'sweeping-mopping', image:'/services/sweeping-mopping.png',   name:'Sweeping & Mopping', emoji:'🧹', duration:'30–45 min', bg:'#f0fdf4', color:'#10b981',
    tagline:'Fresh floors every single day.',
    includes:['Sweeping and mopping of floors in selected rooms', 'Removal of visible dust, dirt, and loose debris from floor surfaces', 'Cleaning of accessible corners and edges', 'Slight movement of lightweight movable items for cleaning access', 'Final floor wipe for a neat and refreshed appearance'],
    excludes:['Sweeping or mopping of balconies, terraces, or outdoor areas', 'Deep stain removal, floor scrubbing, or polishing', 'Moving heavy furniture such as beds, sofas, or cupboards', 'Vacuum cleaning of carpets or rugs', 'Cleaning of walls, furniture, or windows', 'Construction dust or renovation debris cleanup'],
    timeEstimates:[{task:'Sweeping all rooms',time:'20 min'},{task:'Wet mopping',time:'20 min'}],
    faqs:[{q:'Good for daily bookings?',a:'Yes! Our most popular daily service. Many customers book every morning.'}]},
  { id:'Utnesils-cleaning', image:'/services/Utensils-cleaning.png',      name:'Utensils Cleaning',      emoji:'🛋️', duration:'1–2 hrs', bg:'#fdf2f8', color:'#ec4899',
    tagline:'Sparkling clean utensils, ready to use.',
    includes:['Washing utensils using customer-provided cleaning supplies', 'Cleaning plates, cookware, glasses, and daily-use utensils', 'Drying and arranging utensils in rack/sink area', 'Cleaning sink and immediate surrounding area after completion', 'Basic oil and food residue removal'],
    excludes:['Cleaning kitchen slabs, countertops, or tiles', 'Garbage disposal or waste removal', 'Deep cleaning of burnt or heavily carbonized utensils', 'Chimney, stove, or appliance cleaning', 'Rust removal or metal polishing', 'Cleaning inside cabinets or storage areas'],
    timeEstimates:[{task:'Vacuum & prep',time:'20 min'},{task:'Stain treatment',time:'20 min'},{task:'Deep clean & dry',time:'40 min'}],
    faqs:[{q:'Will my sofa be wet after?',a:'Slight moisture — keep ventilated for 2–3 hours after cleaning.'},{q:'All sofa types?',a:'Yes — fabric, velvet, microfibre. Leather needs a separate service.'}]},
  { id:'balcony-cleaning', image:'/services/balcony-cleaning.png',   name:'Balcony Cleaning',   emoji:'🌿', duration:'30–45 min', bg:'#f0fdfe', color:'#06b6d4',
    tagline:"A spotless outdoor space you'll love spending time in.",
    includes:['Sweeping and mopping of balcony floor area', 'Cleaning and wiping of balcony railings, grills, and accessible metal surfaces', 'Cleaning and wiping of balcony parapet or parapet wall', 'Dusting of accessible balcony surfaces including light tables or chairs (if reachable and movable)', 'Removal of visible dust, dirt, and loose debris from accessible areas'],
    excludes:['Cleaning of balcony walls, ceiling, or overhead fixtures', 'Watering plants, gardening, or plant care services', 'Cleaning of terraces, rooftops, or exterior building walls', 'Moving heavy furniture, storage units, or large plant pots', 'Deep stain removal, pressure washing, or floor scrubbing', 'Pigeon waste, biohazard cleanup, or pest removal', 'Cleaning outside the balcony safety boundary'],
    timeEstimates:[{task:'Sweep & scrub floor',time:'20 min'},{task:'Railing & walls',time:'15 min'}],
    faqs:[{q:'Outdoor furniture?',a:'Light wipe-down included. Deep furniture cleaning is a separate add-on.'}]},
  { id:'fan-cleaning', image:'/services/fan-cleaning.png',       name:'Fan Cleaning',       emoji:'🌀', duration:'15–20 min', bg:'#f0f9ff', color:'#0ea5e9',
    tagline:'Dusty fans cleaned safely — no ladder needed.',
    includes:['Dust removal from fan blades and motor body (exterior surfaces only)', 'Wiping and cleaning of fan blades and accessible parts', 'Removal of visible dust buildup from reachable areas', 'Cleaning of fallen dust from surrounding floor area after service', 'Basic exterior cleaning for improved appearance and hygiene'],
    excludes:['Cleaning of room furniture, walls, ceilings, or other surfaces', 'Cleaning of fans requiring unsafe access or unstable ladder setup', 'Fan disassembly or internal motor cleaning', 'Cleaning of dismantled internal fan components', 'Cleaning of exhaust fans, pedestal fans, table fans, or tower fans', 'Moving heavy furniture to access the fan', 'Electrical repair, servicing, or wiring work'],
    timeEstimates:[{task:'Per ceiling fan',time:'15 min'}],
    faqs:[{q:'Do you bring a ladder?',a:'Yes, our Pros carry their own step-ladder.'},{q:'Pricing?',a:'Base covers up to 2 fans. Additional fans at extra cost.'}]},
  { id:'kitchen-cabinet-cleaning', image:'/services/cabinet.png',    name:'Kitchen Cabinet Cleaning',    emoji:'🪟', duration:'45–60 min', bg:'#f0f9ff', color:'#38bdf8',
    tagline:'Fresh, organized cabinets free of dust and grime.',
    includes:['Exterior cleaning of kitchen cabinet surfaces', 'Interior cleaning of shelves, compartments, and accessible corners', 'Dry and wet wiping of cabinet surfaces', 'Emptying cabinet contents for cleaning access', 'Neat rearranging of cabinet items after cleaning', 'Air drying of cabinet shelves before placing items back', 'Removal of visible dust, crumbs, and light residue'],
    excludes:['Deep oil, grease, or sticky residue removal', 'Washing utensils, containers, or food items', 'Cabinet repair, repainting, or hardware fixing', 'Removal of cement, rust, or permanent stains', 'Pest control, termite treatment, or Mold restoration', 'Cleaning inside sealed or inaccessible areas'],
    timeEstimates:[{task:'Per window (interior)',time:'8–10 min'}],
    faqs:[{q:'Exterior windows?',a:'Safety reasons — interior only. Exterior above ground floor not included.'}]},
  { id:'wardrobe cleaning', image:'/services/wardrobe.png',            name:'Wadrobe Cleaning',            emoji:'👕', duration:'45–60 min', bg:'#f5f3ff', color:'#a78bfa',
    tagline:'A fresh, dust-free wardrobe inside and out.',
    includes:['Dry dusting of wardrobe interiors and shelves', 'Interior surface cleaning and wiping', 'Emptying wardrobe items carefully for cleaning access', 'Rearranging items neatly after service', 'Cleaning wardrobe handles, corners, and edges', 'Air drying of cleaned surfaces before arranging items back'],
    excludes:['Cleaning or washing clothes and personal items', 'Ironing or folding services', 'Polish treatment for wardrobe exterior surfaces', 'Removal of permanent stains or Mold damage', 'Organising based on categories, labels, or styling', 'Moving heavy furniture or attached wardrobes', 'Pest control or termite treatment'],
    timeEstimates:[{task:'Sorting & loading',time:'15 min'},{task:'Machine wash cycle',time:'40–60 min'},{task:'Dry & fold',time:'20 min'}],
    faqs:[{q:'Do you bring detergent?',a:'Yes. Or leave yours out and we use it.'},{q:'Ironing included?',a:'No — book Ironing & Folding separately.'}]},
  { id:'fridge-cleaning', image:'/services/fridge-cleaning.png',    name:'Fridge Cleaning',    emoji:'🧊', duration:'45–60 min', bg:'#f0fdfe', color:'#06b6d4',
    tagline:'A hygienic, odour-free fridge inside and out.',
    includes:['Cleaning of one refrigerator unit only', 'Removing food items and placing them safely aside', 'Discarding expired or spoiled items (only as instructed by customer)', 'Cleaning shelves, trays, drawers, and compartments', 'Wiping interior surfaces including walls, door panels, and rubber lining', 'Basic deodorising of refrigerator interior', 'Cleaning refrigerator exterior (front and visible side surfaces only)', 'Drying surfaces before placing items back', 'Replacing food items neatly into the refrigerator'],
    excludes:['Moving or lifting the refrigerator', 'Cleaning rear panel, compressor, or condenser coils', 'Refrigerator repair or servicing', 'Handling excessive ice buildup requiring long defrosting time', 'Deep stain restoration caused by long-term neglect', 'Use of industrial-grade chemicals or specialised deodorising treatments', 'Food organisation, expiry labelling, or diet-based arrangement', 'Deep freezer cleaning', 'Handling raw meat or unhygienic food waste due to hygiene and safety concerns'],
    timeEstimates:[{task:'Empty & shelf soak',time:'15 min'},{task:'Interior wipe & sanitise',time:'25 min'},{task:'Reassemble & exterior',time:'10 min'}],
    faqs:[{q:'Empty fridge first?',a:'Yes please — empty before Pro arrives so they start immediately.'}]},
  { id:'dusting-wiping', image:'/services/dusting-wiping.png',     name:'Dusting & Wiping',   emoji:'🪣', duration:'30–45 min',bg:'#f0fdf4', color:'#10b981',
    tagline:'Every surface dust-free and gleaming.',
    includes:['Dry dusting of furniture surfaces, tables, shelves, and accessible areas', 'Dust removal from corners and reachable surfaces', 'Exterior dusting of light fixtures, bulbs, and tube lights', 'Dusting of electrical switches and plug points', 'Minor bed adjustment for dusting underneath (only if easily movable)', 'Basic dry wiping of visible surfaces using microfiber cloths', 'Rearranging lightweight items after cleaning'],
    excludes:['Dusting or cleaning of ceiling fans', 'Cleaning of windows, window glass, or window sills', 'Dusting in balcony, terrace, or outdoor areas', 'Wet cleaning, polishing, or stain removal on furniture', 'Cleaning of electrical appliance interiors', 'Moving heavy furniture or appliances', 'Deep cleaning of wardrobes or storage spaces'],
    timeEstimates:[{task:'Furniture dusting',time:'20 min'},{task:'Electronics & doors',time:'15 min'}],
    faqs:[{q:'Safe for electronics?',a:'Yes — dry microfibre cloths on electronics. No wet wipes near screens.'}]},
    { id:'Pre-party Cleaning', image:'/services/pre.png',    name:'Pre-party Cleaning',  emoji:'👔', duration:'30 min/10', bg:'#fffbeb', color:'#f59e0b',
    tagline:'A spotless home, ready to welcome your guests.',
    includes:['Cleaning of living room and dining area', 'Kitchen surface wipe-down and basic cleaning', 'Quick bathroom cleaning and deodorising', 'Full-house floor sweeping and mopping', 'Collection of visible trash/waste inside home', 'Washing of daily-use utensils', 'Dust removal from visible surfaces', 'Basic furniture arrangement and touch-up cleaning'],
    excludes:['Upholstery shampooing or deep sofa cleaning', 'Cleaning inside appliances, cabinets, or wardrobes', 'Chimney cleaning or balcony exterior cleaning', 'Heavy grease, stubborn stains, or hard-water removal', 'Construction debris or renovation cleanup', 'Bulk garbage disposal outside premises', 'Deep kitchen or bathroom cleaning', 'Services beyond booked duration or package scope'],
    timeEstimates:[{task:'Per shirt / top',time:'4–5 min'},{task:'Per trouser / salwar',time:'5–6 min'},{task:'Per saree / dupatta',time:'8–10 min'}],
    faqs:[{q:'Do you bring an iron?',a:'Yes, Pros carry their own steam iron.'}]},
    { id:'After-party Cleaning ', image:'/services/after.png',    name:'After-party Cleaning',  emoji:'👔', duration:'30 min/10', bg:'#fffbeb', color:'#f59e0b',
    tagline:'Hassle-free cleanup after the party over.',
    includes:['Floor cleaning and spill removal from accessible areas', 'Collection and disposal of visible trash, cans, and bottles', 'Kitchen reset including countertop, sink, and stovetop cleaning', 'Quick bathroom cleaning and deodorising', 'Living room tidying and furniture arrangement', 'Full-house floor sweeping and mopping', 'Washing of daily-use utensils', 'Basic surface wipe-down of common areas'],
    excludes:['Vomit, biohazard, or hazardous waste cleaning', 'Upholstery shampooing or deep sofa cleaning', 'Cleaning inside appliances, cabinets, or chimneys', 'Balcony exterior cleaning', 'Heavy grease, stubborn stains, or permanent spill restoration', 'Construction debris or renovation cleanup', 'Bulk garbage disposal outside premises', 'Deep cleaning services beyond package scope', 'Additional work beyond booked duration'],
    timeEstimates:[{task:'Per shirt / top',time:'4–5 min'},{task:'Per trouser / salwar',time:'5–6 min'},{task:'Per saree / dupatta',time:'8–10 min'}],
    faqs:[{q:'Do you bring an iron?',a:'Yes, Pros carry their own steam iron.'}]},
];

const HOW_STEPS = [
  { n:'01', emoji:'📋', title:'Choose your service',    desc:'Pick from cleaning services. See the exact flat price upfront.' },
  { n:'02', emoji:'📅', title:'Pick a time slot',       desc:'Instant, scheduled. Pay via UPI or Card.' },
  { n:'03', emoji:'✅', title:'Sit back & relax',       desc:'A verified Cleenzo Professional arrives on time.' },
];

const FAQ_ITEMS = [
  {
    category:'Booking', icon:'📅',
    questions:[
      { q:'How do I book a Cleenzo service?', a:'Download the Cleenzo app, choose your service, pick a time slot and pay. A verified Partner will be assigned instantly.' },
      { q:'Can I schedule a recurring booking?', a:'Yes! You can set up daily, weekly, or monthly recurring bookings at a discounted rate. Manage everything from the app — pause, reschedule, or cancel anytime.' },
      { q: 'What types of bookings are available?', a: 'We offer two types of bookings: Scheduled Booking and Instant Booking.'},
      { q: 'What is the difference between Scheduled Booking and Instant Booking?', a: 'Instant Booking provides a house help within approximately 10 minutes of placing your request. Scheduled Booking allows you to choose a preferred date and time slot, and a house help will be assigned for that specific schedule.'},
      { q:'How far in advance can I book?', a:'You can book up to 5 days in advance. For same-day bookings, we recommend booking at least 2 hours before your preferred time slot.' },
    ],
  },
  {
    category:'Services', icon:'🧹',
    questions:[
      { q:'Do Cleenzo Partner bring their own supplies?', a:'No, Our service partners do not bring cleaning equipment or products. Customers are requested to provide all necessary items.' },
      { q:'What if I am not satisfied with the service?', a:'We offer a 100% satisfaction guarantee.' },
      { q:'Are the Cleenzo Partner verified?', a:'Every Cleenzo Partner goes through background verification, in-person training, and a quality assessment before they are allowed on the platform.' },
    ],
  },
  {
    category:'Payments', icon:'💳',
    questions:[
      { q:'What payment methods do you accept?', a:'We accept UPI (GPay, PhonePe, Paytm), credit and debit cards, and all major digital wallets. Cash is not accepted to keep things safe and transparent.' },
      { q:'Are there any hidden charges?', a:'Never. The price you see is the price you pay.' },
      { q:'How does the cancellation refund work?', a:'Cancel more than 2 hours before your booking and get a full refund instantly. Cancellations within 2 hours incur a 50% fee. If the Pro cancels, you get a 100% refund.' },
    ],
  },
  {
    category:'Cities', icon:'📍',
    questions:[
      { q:'Which cities does Cleenzo serve?', a:'We currently serve in Mumbai - Andheri, Vile Parle and Juhu.' },
    ],
  },
];

// ─── HISTORY STATE TYPE ───────────────────────────────────────────────────────
// What we push into window.history so the back/forward buttons can restore it.
type ViewName = 'home' | 'services' | 'detail';
type HistoryState = {
  cleenzoView: ViewName;
  serviceId?: string;
};

export default function CleanzoWebsite() {
  const [view, setView]                       = useState<ViewName>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  // Only the setter is used (footer "city" click) — destructuring just the
  // setter avoids an unused-variable warning on the read side.
  const [, setSelectedCity]                   = useState('');
  const [serviceCity, setServiceCity]         = useState('');
  const [openFaq, setOpenFaq]                 = useState<number | null>(null);
  const [toast, setToast]                     = useState('');
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [scrolled, setScrolled]               = useState(false);
  const [faqTab, setFaqTab]                   = useState(0);
  const [openFaqId, setOpenFaqId]             = useState<string | null>(null);

  const CITY_LIST = Object.keys(CITIES_MAP);

  // Guard so the popstate handler doesn't re-push history while it's
  // just reacting to a back/forward navigation that already happened.
  const isPopRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── BROWSER BACK/FORWARD SUPPORT ────────────────────────────────────────
  // 1) On first mount, replace the current (single) history entry with one
  //    that carries our 'home' state, so there's always something to read.
  // 2) Listen for popstate (back/forward button) and update the React view
  //    state to match — WITHOUT pushing a new entry (that would create a loop).
  useEffect(() => {
    // Seed the initial entry so Back from "home" doesn't leave the app.
    window.history.replaceState({ cleenzoView: 'home' } as HistoryState, '', window.location.pathname);

    const onPopState = (e: PopStateEvent) => {
      const state = e.state as HistoryState | null;
      isPopRef.current = true;

      if (!state || state.cleenzoView === 'home') {
        setView('home');
        setSelectedService(null);
      } else if (state.cleenzoView === 'services') {
        setView('services');
        setSelectedService(null);
      } else if (state.cleenzoView === 'detail') {
        const svc = SERVICES.find(s => s.id === state.serviceId) || null;
        setSelectedService(svc);
        setView(svc ? 'detail' : 'services');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      // release the guard on next tick so subsequent manual navigation pushes normally
      setTimeout(() => { isPopRef.current = false; }, 0);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Helper: push a new history entry for a given app "page".
  // Skipped when we're the ones reacting to a popstate event.
  const pushHistory = useCallback((state: HistoryState) => {
    if (isPopRef.current) return;
    window.history.pushState(state, '', window.location.pathname);
  }, []);

  const showToast  = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const goHome     = () => {
    setView('home');
    setSelectedService(null);
    pushHistory({ cleenzoView: 'home' });
    window.scrollTo({top:0,behavior:'smooth'});
  };

  const goServices = () => {
    setView('services');
    pushHistory({ cleenzoView: 'services' });
    window.scrollTo({top:0,behavior:'smooth'});
  };

  const openDetail = (s: Service) => {
    setSelectedService(s);
    setOpenFaq(null);
    setView('detail');
    pushHistory({ cleenzoView: 'detail', serviceId: s.id });
    window.scrollTo({top:0,behavior:'smooth'});
  };

  const goBack     = () => {
    // Prefer the real browser back so the history stack stays clean —
    // our popstate listener will pick up the resulting state change.
    window.history.back();
  };

  const scrollTo   = (id: string) => { goHome(); setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth'}), 100); };
  // store param removed — handleApp doesn't branch on it yet, so keeping an
  // unused parameter just to look "future-proof" was tripping the linter.
  // Re-add `(store: 'play' | 'ios')` here if/when deep-linking is implemented.
  const handleApp  = () => {
    showToast("🚀 App launching soon! We'll notify you.");
  };
  const toggleFaq  = (id: string) => setOpenFaqId(openFaqId === id ? null : id);

  return (
    <div style={{fontFamily:"'Outfit','DM Sans','Segoe UI',sans-serif",background:'#fff',minHeight:'100vh'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&family=Poppins:ital,wght@1,800;1,900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        :root{--cy:#06b6d4;--cy2:#0891b2;--cy3:#0e7490;--cy4:#164e63;--cy5:#0c4a6e;--light:#f0fdfe;--light2:#e0f7fa;}
        html{scroll-behavior:smooth;overflow-x:clip;}
        body{font-family:'Outfit',sans-serif;overflow-x:clip;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.45)}70%{box-shadow:0 0 0 10px rgba(6,182,212,0)}}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes faqSlide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideInRight{from{opacity:.4;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
        .a1{animation:fadeUp .7s .05s both}.a2{animation:fadeUp .7s .18s both}.a3{animation:fadeUp .7s .32s both}
        .a4{animation:fadeUp .7s .46s both}.a5{animation:fadeUp .7s .58s both}
        .float-a{animation:floatA 4s ease-in-out infinite}
        .float-b{animation:floatB 5s ease-in-out infinite 1s}
        .nav-link{color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;padding:0;letter-spacing:.2px;transition:opacity .18s,transform .18s;opacity:.92;}
        .nav-link:hover{opacity:1;transform:translateY(-1px);color:#063b4c}
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
        .ocard-thumb{width:48px;height:48px;border-radius:12px;overflow:hidden;flex-shrink:0;position:relative;}
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

        /* default service grids — 2 columns minimum baseline */
        .home-services-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(195px,1fr));gap:16px;}
        .all-services-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:18px;}

        /* ─── TABLET ─── */
        @media(max-width:900px){
          .home-services-grid{grid-template-columns:repeat(3,1fr)!important;}
          .all-services-grid{grid-template-columns:repeat(3,1fr)!important;}
        }

        /* ─── MOBILE ─── */
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important;}
          /* show the model photo BELOW the text on mobile, scaled to fit */
          .hero-img-col{display:flex!important;height:380px!important;margin-top:8px!important;}
          .hero-dots{display:none!important;}
          .hero-circle-1{width:270px!important;height:270px!important;top:20px!important;}
          .hero-circle-2{width:270px!important;height:270px!important;top:20px!important;}
          .hero-model-box{width:290px!important;height:360px!important;}
          .hero-float-testimonial{bottom:54px!important;left:0!important;max-width:165px!important;padding:12px 14px!important;}
          .hero-float-reviewer{bottom:16px!important;right:0!important;}
          .detail-grid{grid-template-columns:1fr!important;gap:28px!important;}
          .detail-sidebar{display:none!important;}
          .detail-hero-grid{grid-template-columns:1fr!important;gap:30px!important;}
          .incl-grid{grid-template-columns:1fr!important;gap:32px!important;}
          .nav-desktop{display:none!important;}
          .hamburger{display:flex!important;}
          .how-grid{grid-template-columns:1fr!important;}
          .faq-tabs{flex-wrap:wrap!important;}

          /* services → 2 columns (2 x N) on mobile */
          .home-services-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important;}
          .all-services-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important;}

          /* tighter section padding so content fits the screen */
          .sec-pad{padding-top:60px!important;padding-bottom:60px!important;padding-left:16px!important;padding-right:16px!important;}
          .hero-sec{padding-left:16px!important;padding-right:16px!important;min-height:auto!important;}
          .hero-inner{padding:48px 0!important;gap:28px!important;}
          .nav-pad{padding-left:18px!important;padding-right:18px!important;}
          .svc-header-row{flex-direction:column!important;align-items:flex-start!important;}
          .svc-header-row .btn-outline{width:100%;text-align:center;}
          .svcview-header{padding:36px 16px 32px!important;}
          .svcview-headrow{flex-direction:column!important;align-items:flex-start!important;}
          .detail-wrap{padding:28px 16px 64px!important;}
          .detail-subbar{top:64px!important;padding-left:16px!important;padding-right:16px!important;}
          .cta-card{padding:32px 22px!important;}
          .cta-inner{padding:48px 16px!important;}
          .footer-pad{padding:44px 18px 24px!important;}
          .footer-bottom{flex-direction:column!important;align-items:flex-start!important;gap:8px!important;}
          .services-cta-banner{padding:32px 22px!important;}
          .detail-hero{padding:32px 22px!important;gap:20px!important;}
          /* first-order offer banner → features + stub restack on mobile */
          .offer-section{padding-left:16px!important;padding-right:16px!important;}
          .offer-band{padding:5px!important;}
          .offer-inner{flex-direction:column!important;align-items:stretch!important;}
          .offer-left{min-width:100%!important;padding:28px 22px 24px!important;}
          .offer-head{font-size:28px!important;}
          .offer-features{width:100%!important;flex-wrap:wrap!important;gap:18px 12px!important;padding:8px 16px 26px!important;border-top:2px dashed rgba(255,255,255,0.35)!important;}
          .offer-stub{width:100%!important;align-self:auto!important;border-left:none!important;border-top:2px dashed rgba(255,255,255,0.55)!important;flex-direction:row!important;gap:18px!important;padding:22px 18px!important;}
          .offer-stub-text{margin-top:0!important;text-align:left!important;}
          .offer-notch-1{top:-13px!important;left:-13px!important;bottom:auto!important;}
          .offer-notch-2{top:-13px!important;left:auto!important;right:-13px!important;bottom:auto!important;}
        }

        /* ─── SMALL PHONES ─── */
        @media(max-width:480px){
          .home-svc-card{padding:14px 12px!important;}
          .home-svc-card .svc-img-wrap{height:104px!important;}
          .svc-card .svc-img-wrap{height:118px!important;}
          .nav-bar-inner{height:62px!important;}
          .faq-light-q{padding:16px 16px!important;}
          .faq-light-a{padding:0 16px 18px 16px!important;}
          .offer-head{font-size:24px!important;}
          .offer-head span{font-size:32px!important;}
          .offer-left{padding:24px 18px 22px!important;}
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
      <nav className="nav-pad" style={{position:'sticky',top:0,zIndex:100,background:scrolled?'rgba(7,182,213,.95)':'#07B6D5',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderBottom:scrolled?'1px solid rgba(255,255,255,.25)':'1px solid rgba(255,255,255,.12)',padding:'0 28px',boxShadow:scrolled?'0 6px 28px rgba(8,80,110,.22)':'none',transition:'box-shadow .3s,background .3s,border-color .3s'}}>
        <div className="nav-bar-inner" style={{maxWidth:1180,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:72}}>
          <button onClick={goHome} style={{display:'flex',alignItems:'center',background:'none',border:'none',cursor:'pointer',padding:0}}>
            <CleenzoLogo height={34} wordColor="#0c4a6e" accentColor="#ffffff" />
          </button>
          <div className="nav-desktop" style={{display:'flex',gap:40,alignItems:'center'}}>
            <button className="nav-link" onClick={goServices}>Services</button>
            <button className="nav-link" onClick={() => scrollTo('howitworks')}>How it works</button>
            <button className="nav-link" onClick={() => scrollTo('faq')}>FAQ</button>
          </div>
          <div className="nav-desktop" style={{display:'flex',gap:12,alignItems:'center'}}>
            <button onClick={() => handleApp()} style={{padding:'10px 22px',fontSize:15,fontWeight:600,color:'#fff',background:'transparent',border:'2px solid rgba(255,255,255,.7)',borderRadius:50,cursor:'pointer',fontFamily:"'Outfit',sans-serif",transition:'all .2s'}}
              onMouseOver={e=>{e.currentTarget.style.background='rgba(255,255,255,.16)';}} onMouseOut={e=>{e.currentTarget.style.background='transparent';}}>Get the app</button>
            <button onClick={goServices} style={{padding:'11px 26px',fontSize:15,fontWeight:700,color:'#0e7490',background:'#fff',border:'none',borderRadius:50,cursor:'pointer',fontFamily:"'Outfit',sans-serif",boxShadow:'0 6px 18px rgba(0,0,0,.14)',transition:'transform .2s'}}
              onMouseOver={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>Book now →</button>
          </div>
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}
            style={{background:'none',border:'none',cursor:'pointer',fontSize:26,color:'#fff',display:'none',alignItems:'center'}}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
        {mobileOpen && (
          <div style={{background:'#fff',borderTop:'1px solid #f0f0f0',padding:'16px 28px',display:'flex',flexDirection:'column',gap:14,margin:'0 -18px',animation:'slideInRight .34s cubic-bezier(.22,1,.36,1) both',willChange:'transform'}}>
            {['Services','How it works','Cities','Reviews','FAQ'].map(l => (
              <button key={l} style={{textAlign:'left',padding:'8px 18px',fontSize:15,fontWeight:600,color:'#0c4a6e',background:'none',border:'none',cursor:'pointer',fontFamily:"'Outfit',sans-serif"}} onClick={() => { setMobileOpen(false); if (l==='Services') goServices(); else scrollTo(l.toLowerCase().replace(/ /g,'')); }}>{l}</button>
            ))}
            <button className="btn-primary" style={{padding:'12px',fontSize:14,marginTop:4,margin:'4px 18px 0'}} onClick={() => { setMobileOpen(false); handleApp(); }}>Download App</button>
          </div>
        )}
      </nav>

      {/* ═══ HOME ═══ */}
      {view === 'home' && <>

        {/* HERO */}
        <section className="hero-sec" style={{background:'linear-gradient(160deg,#eafaff 0%,#d8f3fb 55%,#c4edf7 100%)',padding:'0 28px',overflow:'hidden',minHeight:'92vh',display:'flex',alignItems:'center',position:'relative'}}>
          <div className="blob" style={{width:520,height:520,background:'#a5f3fc',top:'-140px',right:'-60px'}}/>
          <div className="blob" style={{width:320,height:320,background:'#67e8f9',bottom:'-80px',left:'6%'}}/>
          <div className="hero-pattern"/>
          <div className="hero-grid hero-inner" style={{maxWidth:1180,margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'1.02fr .98fr',gap:48,alignItems:'center',padding:'64px 0',position:'relative',zIndex:1}}>

            {/* LEFT */}
            <div>
              <div className="a1" style={{display:'inline-flex',alignItems:'center',gap:9,background:'rgba(6,182,212,.13)',border:'1.5px solid rgba(6,182,212,.35)',borderRadius:50,padding:'8px 20px',fontSize:13.5,color:'#0e7490',fontWeight:700,marginBottom:26,letterSpacing:.3}}>
                <span style={{width:8,height:8,background:'#22c55e',borderRadius:'50%',display:'inline-block',boxShadow:'0 0 0 4px rgba(34,197,94,.25)',animation:'pulse 2s infinite'}}/>
                Professional Cleaning Service Company
              </div>
              <h1 className="a2" style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:'clamp(34px,8vw,68px)',lineHeight:1.08,letterSpacing:'-1px',color:'#0c2740',marginBottom:22}}>
                Clean Home{' '}
                <span style={{background:'linear-gradient(90deg,#06b6d4,#0891b2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Happy You!</span><br/>
              </h1>
              <p className="a3" style={{fontSize:17,color:'#475569',lineHeight:1.75,marginBottom:34,maxWidth:480}}>
                Trusted home cleaning across Mumbai — verified pros, transparent flat pricing, and spotless results. Book in minutes.
              </p>
              <div className="a4" style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:34}}>
                <button onClick={goServices}
                  style={{padding:'15px 32px',fontSize:15.5,fontWeight:700,color:'#fff',background:'linear-gradient(135deg,#06b6d4,#0891b2)',border:'none',borderRadius:50,cursor:'pointer',fontFamily:"'Outfit',sans-serif",boxShadow:'0 10px 28px rgba(6,182,212,.38)',transition:'transform .2s'}}
                  onMouseOver={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>
                  Get Started →
                </button>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}
                  style={{padding:'15px 30px',fontSize:15.5,fontWeight:600,color:'#0e7490',background:'#fff',border:'2px solid #a5e8f3',borderRadius:50,cursor:'pointer',fontFamily:"'Outfit',sans-serif",transition:'all .2s'}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor='#06b6d4';e.currentTarget.style.transform='translateY(-2px)';}} onMouseOut={e=>{e.currentTarget.style.borderColor='#a5e8f3';e.currentTarget.style.transform='translateY(0)';}}>
                  Explore Services
                </button>
              </div>
              <div className="a5" style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{display:'flex'}}>
                </div>
                <div>
                </div>
              </div>
            </div>

            {/* RIGHT — model image with floating cards */}
            <div className="hero-img-col" style={{position:'relative',height:640,display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
              {/* dotted decoration */}
              <div className="hero-dots" style={{position:'absolute',top:24,right:4,width:130,height:100,backgroundImage:'radial-gradient(rgba(8,145,178,.35) 2px,transparent 2px)',backgroundSize:'18px 18px',opacity:.6,pointerEvents:'none'}}/>
              {/* circles sit behind the upper body */}
              <div className="hero-circle-1" style={{position:'absolute',top:40,left:'50%',transform:'translateX(-50%)',width:470,height:470,borderRadius:'50%',background:'linear-gradient(135deg,#22b8e0,#0e7aa0)',boxShadow:'0 30px 80px rgba(14,116,144,.3)'}}/>
              <div className="hero-circle-2" style={{position:'absolute',top:40,left:'50%',transform:'translateX(-50%) scale(1.1)',width:470,height:470,borderRadius:'50%',border:'2px dashed rgba(255,255,255,.45)',pointerEvents:'none'}}/>
              {/* model image — bigger, anchored to the bottom (drop your photo at /public/hero-model.png) */}
              <div className="hero-model-box" style={{position:'relative',width:520,height:620,zIndex:2,display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
                <HeroImage src="/hero-model.png" />
              </div>
              {/* testimonial card */}
              <div className="float-a hero-float-testimonial" style={{position:'absolute',bottom:96,left:-12,background:'#fff',borderRadius:18,padding:'16px 18px',boxShadow:'0 16px 44px rgba(6,182,212,.2)',zIndex:5,maxWidth:210}}>
                <div style={{width:30,height:30,borderRadius:8,background:'#e0f7fa',display:'flex',alignItems:'center',justifyContent:'center',color:'#0891b2',fontWeight:800,fontSize:22,lineHeight:1,marginBottom:8}}>&ldquo;</div>
                <div style={{fontSize:13,fontWeight:600,color:'#0c4a6e',lineHeight:1.5}}>Best cleaning service for your home and office.</div>
              </div>
              {/* reviewer chip */}
              <div className="float-b hero-float-reviewer" style={{position:'absolute',bottom:40,right:-10,background:'#fff',borderRadius:16,padding:'12px 16px',boxShadow:'0 14px 40px rgba(0,0,0,.12)',zIndex:5,display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,#06b6d4,#0e7490)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13}}>PM</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#0c4a6e'}}>Priya M.</div>
                  <div style={{display:'flex',gap:1}}>{'★★★★★'.split('').map((s,i)=><span key={i} style={{color:'#f59e0b',fontSize:11}}>{s}</span>)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FIRST-ORDER OFFER BANNER ═══ */}
        <section className="offer-section" style={{background:'#ffffff',padding:'44px 28px 8px'}}>
          <div style={{maxWidth:1180,margin:'0 auto'}}>
            <div className="offer-band" style={{position:'relative',overflow:'hidden',borderRadius:26,padding:6,background:'linear-gradient(135deg,#0e7490,#06b6d4 45%,#22d3ee)',boxShadow:'0 24px 60px rgba(6,182,212,0.4)'}}>
              <div style={{position:'absolute',top:-60,left:-40,width:220,height:220,borderRadius:'50%',background:'rgba(255,255,255,0.12)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',bottom:-80,right:80,width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,0.10)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.16) 1.5px,transparent 1.5px)',backgroundSize:'22px 22px',opacity:.5,pointerEvents:'none'}}/>

              <div className="offer-inner" style={{position:'relative',zIndex:1,display:'flex',alignItems:'center',flexWrap:'wrap',border:'2px dashed rgba(255,255,255,0.55)',borderRadius:22,overflow:'hidden'}}>

                {/* LEFT — offer copy + button */}
                <div className="offer-left" style={{flex:'1 1 360px',minWidth:300,padding:'34px 32px'}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'#fde047',color:'#854d0e',borderRadius:50,padding:'7px 16px',fontSize:12.5,fontWeight:800,letterSpacing:1,textTransform:'uppercase',boxShadow:'0 6px 16px rgba(0,0,0,0.18)'}}>
                    ⚡ Limited time deal
                  </div>
                  <div className="offer-head" style={{fontSize:34,fontWeight:900,color:'#fff',lineHeight:1.12,letterSpacing:'-0.6px',marginTop:18}}>
                    Your first clean for just{' '}
                    <span style={{display:'inline-block',background:'#fff',color:'#0e7490',padding:'4px 18px',borderRadius:16,fontSize:40,fontWeight:900,boxShadow:'0 8px 20px rgba(0,0,0,0.2)',marginTop:8}}>₹25</span>
                  </div>
                  <p style={{fontSize:15,color:'rgba(255,255,255,0.94)',margin:'18px 0 22px',lineHeight:1.6,maxWidth:380}}>
                    Book <b>any</b> cleaning service — verified pros, all equipment &amp; products included.
                  </p>
                  <button onClick={goServices} style={{display:'inline-flex',alignItems:'center',gap:9,background:'#fff',color:'#0e7490',border:'none',borderRadius:50,padding:'15px 36px',fontSize:16,fontWeight:800,fontFamily:"'Outfit',sans-serif",cursor:'pointer',boxShadow:'0 10px 26px rgba(0,0,0,0.22)'}}>
                    Grab the deal →
                  </button>
                </div>

                {/* MIDDLE — trust features */}
                <div className="offer-features" style={{display:'flex',alignItems:'flex-start',justifyContent:'center',gap:26,padding:'24px 26px'}}>
                  <OfferFeature l1="Background" l2="Verified">
                    <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z"/>
                    <path d="M9 12l2 2 4-4.2"/>
                  </OfferFeature>
                  <OfferFeature l1="Satisfaction" l2="Guaranteed">
                    <circle cx="12" cy="9.5" r="5.5"/>
                    <path d="M12 7l1.1 2.2 2.4.3-1.8 1.7.5 2.4L12 12.6 9.8 13.6l.5-2.4-1.8-1.7 2.4-.3z"/>
                    <path d="M9 14.5L8 21l4-2 4 2-1-6.5"/>
                  </OfferFeature>
                  <OfferFeature l1="Instant &" l2="Affordable">
                    <circle cx="12" cy="12" r="8"/>
                    <path d="M12 7.5V12l3 2"/>
                  </OfferFeature>
                </div>

                {/* RIGHT — discount stub */}
                <div className="offer-stub" style={{position:'relative',width:200,alignSelf:'stretch',background:'rgba(255,255,255,0.14)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'30px 18px',borderLeft:'2px dashed rgba(255,255,255,0.55)'}}>
                  <div className="offer-notch-1" style={{position:'absolute',top:-13,left:-13,width:26,height:26,borderRadius:'50%',background:'#ffffff'}}/>
                  <div className="offer-notch-2" style={{position:'absolute',bottom:-13,left:-13,width:26,height:26,borderRadius:'50%',background:'#ffffff'}}/>
                  <div style={{width:84,height:84,borderRadius:'50%',background:'#fde047',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#854d0e',boxShadow:'0 8px 20px rgba(0,0,0,0.22)',transform:'rotate(-8deg)',lineHeight:1,flexShrink:0}}>
                    <span style={{fontSize:10,fontWeight:800,letterSpacing:1}}>UP TO</span>
                    <span style={{fontSize:28,fontWeight:900,margin:'1px 0'}}>80%</span>
                    <span style={{fontSize:11,fontWeight:800,letterSpacing:1.5}}>OFF</span>
                  </div>
                  <div className="offer-stub-text" style={{marginTop:16,textAlign:'center',color:'#fff'}}>
                    <div style={{fontSize:13,fontWeight:700,display:'flex',alignItems:'center',gap:5,justifyContent:'center'}}>⏱ New users only</div>
                    <div style={{fontSize:12,color:'rgba(255,255,255,0.8)',marginTop:5}}>First booking · One per user</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="sec-pad" style={{padding:'100px 28px',background:'#fafafa',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-100,right:-100,width:400,height:400,background:'radial-gradient(circle,rgba(6,182,212,.055) 0%,transparent 70%)',pointerEvents:'none'}}/>
          <div style={{maxWidth:1180,margin:'0 auto'}}>
            <div className="svc-header-row" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:56,flexWrap:'wrap',gap:20}}>
              <div>
                <div className="section-eyebrow">What we offer</div>
                <h2 className="section-heading" style={{fontSize:'clamp(28px,7vw,46px)'}}>Book trained and verified Househelp.</h2>
                <p style={{color:'#6b7280',marginTop:11,fontSize:16,maxWidth:460}}>{SERVICES.length} services · Flat pricing · Equipment included</p>
              </div>
              <button className="btn-outline" style={{padding:'12px 28px',fontSize:14}} onClick={goServices}>View all {SERVICES.length} services →</button>
            </div>
            <div className="home-services-grid">
              {SERVICES.map(s => (
                <div key={s.id} className="home-svc-card" onClick={() => openDetail(s)}>
                  <div className="svc-img-wrap" style={{height:130,borderRadius:16,overflow:'hidden',marginBottom:15,position:'relative',background:s.bg}}>
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
        <section id="howitworks" className="sec-pad" style={{padding:'100px 28px',background:'#fff'}}>
          <div style={{maxWidth:1060,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:60}}>
              <div className="section-eyebrow">Simple process</div>
              <h2 className="section-heading" style={{fontSize:'clamp(28px,7vw,46px)'}}>Booked in 3 easy steps</h2>
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
              <button className="btn-primary" style={{padding:'15px 40px',fontSize:15}} onClick={() => handleApp()}>Download the app — it&apos;s free →</button>
            </div>
          </div>
        </section>

        {/* ═══ FAQ — LIGHT BLUE THEME ═══ */}
        <section id="faq" className="sec-pad" style={{padding:'100px 28px',background:'linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 40%,#f0fdfe 100%)',position:'relative',overflow:'hidden'}}>
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
              <h2 className="section-heading" style={{fontSize:'clamp(28px,7vw,48px)',marginBottom:14,color:'#0c4a6e'}}>
                Frequently asked<br/>questions
              </h2>
              <p style={{color:'#374151',fontSize:16,maxWidth:460,margin:'0 auto',lineHeight:1.75}}>
                Everything you need to know about Cleenzo.{' '}
                <a href="/contact" style={{color:'#0891b2',fontWeight:600,textDecoration:'none'}}>Can&apos;t find an answer? Ask us →</a>
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
          <Image
            src="/cleenzo-pros.png"
            alt="Cleenzo Pros cleaning"
            fill
            sizes="100vw"
            style={{objectFit:'cover',objectPosition:'center'}}
          />
          <div className="cta-inner" style={{position:'relative',zIndex:2,width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:'60px 28px'}}>
            <div className="cta-card" style={{background:'rgba(255,255,255,0.72)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',border:'1.5px solid rgba(255,255,255,.85)',borderRadius:32,padding:'44px 52px',textAlign:'center',maxWidth:480,boxShadow:'0 20px 64px rgba(6,182,212,.18)'}}>
              <div style={{display:'flex',justifyContent:'center',gap:3,marginBottom:10}}>
                {[1,2,3,4,5].map(i=><span key={i} style={{color:'#f59e0b',fontSize:22}}>★</span>)}
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:'clamp(24px,6vw,42px)',color:'#0c4a6e',lineHeight:1.12,marginBottom:12}}>
                India&apos;s Trusted<br/>Cleaning App
              </h2>
              <p style={{color:'#374151',fontSize:15.5,marginBottom:32,lineHeight:1.75}}>
                On-demand home services to keep your house spotless — anytime, anywhere.
              </p>
              <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                <button onClick={() => handleApp()} style={{display:'inline-flex',alignItems:'center',gap:11,background:'#0c4a6e',color:'#fff',border:'none',borderRadius:14,padding:'12px 20px',cursor:'pointer',transition:'all .22s',fontFamily:"'Outfit',sans-serif",boxShadow:'0 6px 20px rgba(12,74,110,.28)'}}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#4CAF50"/>
                    <path d="M3 3.5L13.5 12 8.5 17 3 3.5Z" fill="#2196F3"/>
                    <path d="M13.5 12L21 7.5 16.5 12 21 16.5 13.5 12Z" fill="#FFC107"/>
                    <path d="M3 20.5L8.5 17 13.5 12 3 20.5Z" fill="#F44336"/>
                  </svg>
                  <div style={{textAlign:'left'}}><div style={{fontSize:9,opacity:.7,letterSpacing:.8,textTransform:'uppercase'}}>Get it on</div><div style={{fontSize:15,fontWeight:700}}>Google Play</div></div>
                </button>
                <button onClick={() => handleApp()} style={{display:'inline-flex',alignItems:'center',gap:11,background:'#0c4a6e',color:'#fff',border:'none',borderRadius:14,padding:'12px 20px',cursor:'pointer',transition:'all .22s',fontFamily:"'Outfit',sans-serif",boxShadow:'0 6px 20px rgba(12,74,110,.28)'}}>
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
        <footer className="footer-pad" style={{background:'#0c4a6e',padding:'56px 28px 28px'}}>
          <div style={{maxWidth:1180,margin:'0 auto'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:40,marginBottom:44}}>
              <div>
                <div style={{marginBottom:16}}>
                  <CleenzoLogo height={30} wordColor="#ffffff" accentColor="#67e8f9" />
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
            <div className="footer-bottom" style={{borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:22,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
              <p style={{fontSize:12,color:'rgba(255,255,255,.3)'}}>{SITE.copyright}</p>
              <p style={{fontSize:12,color:'rgba(255,255,255,.3)'}}>{SITE.footerNote}</p>
            </div>
          </div>
        </footer>
      </>}

      {/* ═══ SERVICES VIEW ═══ */}
      {view === 'services' && (
        <div style={{background:'#fafafa',minHeight:'100vh'}}>
          <div className="svcview-header" style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'52px 28px 44px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-80,right:-80,width:320,height:320,background:'radial-gradient(circle,rgba(6,182,212,.055) 0%,transparent 70%)',pointerEvents:'none'}}/>
            <div style={{maxWidth:1180,margin:'0 auto',position:'relative',zIndex:1}}>
              <button onClick={goHome} style={{fontSize:13,color:'#06b6d4',background:'none',border:'none',cursor:'pointer',fontWeight:600,display:'inline-flex',alignItems:'center',gap:5,marginBottom:22,fontFamily:"'Outfit',sans-serif",padding:0}}>← Back to home</button>
              <div className="svcview-headrow" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:20}}>
                <div>
                  <div className="section-eyebrow">All services</div>
                  <h1 className="section-heading" style={{fontSize:'clamp(30px,8vw,56px)'}}>Book trusted<br/>house help.</h1>
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
          <div className="detail-wrap" style={{maxWidth:1180,margin:'0 auto',padding:'44px 28px 88px'}}>
            <div className="all-services-grid">
              {SERVICES.map(s => (
                <div key={s.id} className="svc-card" onClick={() => openDetail(s)}>
                  <div className="svc-img-wrap" style={{height:160,overflow:'hidden',position:'relative',background:s.bg}}>
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
            <div className="services-cta-banner" style={{marginTop:64,background:'linear-gradient(135deg,#0c4a6e,#0e7490)',borderRadius:28,padding:'44px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
              <div>
                <h3 style={{fontSize:22,fontWeight:800,fontFamily:"'Playfair Display',serif",color:'#fff',marginBottom:8}}>Get trusted house help in minutes.</h3>
                <p style={{fontSize:14,color:'rgba(255,255,255,.65)'}}>Download the Cleenzo app and book your first service today.</p>
              </div>
              <button className="btn-white" style={{padding:'14px 30px',fontSize:15,flexShrink:0}} onClick={() => handleApp()}>Download the app →</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ SERVICE DETAIL VIEW ═══ */}
      {view === 'detail' && selectedService && (() => {
        const s = selectedService;
        const others = SERVICES.filter(x=>x.id!==s.id).slice(0,6);
        return (
          <div style={{background:'#fff',minHeight:'100vh'}}>
            {/* ── HERO BAND ── */}
            <div style={{position:'relative',overflow:'hidden',background:'linear-gradient(160deg,#f0fdfe 0%,#e0f7fa 55%,#ffffff 100%)'}}>
              <div style={{position:'absolute',top:-90,left:-70,width:360,height:360,background:'radial-gradient(circle,rgba(6,182,212,.14) 0%,transparent 70%)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(6,182,212,.10) 1.5px,transparent 1.5px)',backgroundSize:'26px 26px',opacity:.5,pointerEvents:'none'}}/>
              <div className="detail-wrap" style={{maxWidth:1180,margin:'0 auto',padding:'28px 28px 64px',position:'relative',zIndex:1}}>

                {/* breadcrumb */}
                <div style={{display:'flex',alignItems:'center',gap:10,fontSize:14,fontWeight:600,marginBottom:34,flexWrap:'wrap'}}>
                  <button onClick={goHome} style={{background:'none',border:'none',cursor:'pointer',color:'#0891b2',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:14,padding:0}}>Home</button>
                  <span style={{color:'#94a3b8'}}>/</span>
                  <button onClick={goBack} style={{background:'none',border:'none',cursor:'pointer',color:'#0891b2',fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:14,padding:0}}>Services</button>
                  <span style={{color:'#94a3b8'}}>/</span>
                  <span style={{color:'#0c4a6e'}}>{s.name}</span>
                </div>

                {/* hero grid */}
                <div className="detail-hero-grid" style={{display:'grid',gridTemplateColumns:'1.05fr .95fr',gap:48,alignItems:'center'}}>
                  <div>
                    <h1 style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:'clamp(40px,8vw,80px)',lineHeight:1.04,letterSpacing:'-1px',color:'#0c2740',margin:'0 0 22px'}}>{s.name}</h1>
                    <p style={{fontSize:18,color:'#475569',lineHeight:1.7,maxWidth:520,marginBottom:26}}>{s.tagline} Book a verified Cleenzo Pro in the app, on your schedule.</p>
                    <div style={{display:'flex',gap:9,flexWrap:'wrap',marginBottom:30}}>
                      <span style={{background:'#fff',border:`1.5px solid ${s.color}`,color:s.color,borderRadius:50,padding:'6px 16px',fontSize:13,fontWeight:600}}>⏱ {s.duration}</span>
                      <span style={{background:'#fff',border:'1.5px solid #e5e7eb',color:'#374151',borderRadius:50,padding:'6px 16px',fontSize:13}}>✅ Satisfaction guarantee</span>
                    </div>
                    <div style={{display:'flex',gap:13,flexWrap:'wrap',alignItems:'center'}}>
                      <button onClick={() => handleApp()} style={{display:'inline-flex',alignItems:'center',gap:11,background:'#0c4a6e',color:'#fff',border:'none',borderRadius:14,padding:'12px 20px',cursor:'pointer',fontFamily:"'Outfit',sans-serif",boxShadow:'0 6px 20px rgba(12,74,110,.28)'}}>
                        <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                          <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#4CAF50"/>
                          <path d="M3 3.5L13.5 12 8.5 17 3 3.5Z" fill="#2196F3"/>
                          <path d="M13.5 12L21 7.5 16.5 12 21 16.5 13.5 12Z" fill="#FFC107"/>
                          <path d="M3 20.5L8.5 17 13.5 12 3 20.5Z" fill="#F44336"/>
                        </svg>
                        <div style={{textAlign:'left'}}><div style={{fontSize:9,opacity:.7,letterSpacing:.8,textTransform:'uppercase'}}>Get it on</div><div style={{fontSize:15,fontWeight:700}}>Google Play</div></div>
                      </button>
                      <button onClick={() => handleApp()} style={{display:'inline-flex',alignItems:'center',gap:11,background:'#0c4a6e',color:'#fff',border:'none',borderRadius:14,padding:'12px 20px',cursor:'pointer',fontFamily:"'Outfit',sans-serif",boxShadow:'0 6px 20px rgba(12,74,110,.28)'}}>
                        <svg width="21" height="21" viewBox="0 0 24 24" fill="white">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <div style={{textAlign:'left'}}><div style={{fontSize:9,opacity:.7,letterSpacing:.8,textTransform:'uppercase'}}>Download on the</div><div style={{fontSize:15,fontWeight:700}}>App Store</div></div>
                      </button>
                      <button onClick={goBack} style={{display:'inline-flex',alignItems:'center',gap:8,background:'#fff',color:'#0e7490',border:'2px solid #a5e8f3',borderRadius:50,padding:'12px 24px',fontSize:14.5,fontWeight:700,cursor:'pointer',fontFamily:"'Outfit',sans-serif",transition:'all .2s'}}
                        onMouseOver={e=>{e.currentTarget.style.borderColor='#06b6d4';}} onMouseOut={e=>{e.currentTarget.style.borderColor='#a5e8f3';}}>
                        All {SERVICES.length} Cleenzo services
                      </button>
                    </div>
                  </div>

                  {/* image card */}
                  <div className="detail-hero-img" style={{position:'relative'}}>
                    <div style={{position:'absolute',top:-28,right:-18,width:140,height:140,borderRadius:'50%',background:`${s.color}22`,pointerEvents:'none'}}/>
                    <div style={{position:'relative',borderRadius:30,overflow:'hidden',background:s.bg,boxShadow:'0 24px 60px rgba(6,182,212,.20)',border:'1px solid rgba(255,255,255,.7)',aspectRatio:'4 / 3'}}>
                      <ServiceImage src={s.image} alt={s.name} bg={s.bg} color={s.color}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── BODY ── */}
            <div className="detail-wrap" style={{maxWidth:1180,margin:'0 auto',padding:'56px 28px 88px'}}>

              {/* included / not included */}
              <div className="incl-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px 56px',marginBottom:56}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
                    <div style={{width:44,height:44,borderRadius:'50%',background:'#dcfce7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(24px,5vw,30px)',fontWeight:800,color:'#0c4a6e',margin:0}}>What&apos;s included</h2>
                  </div>
                  {s.includes.map(i => (
                    <div key={i} style={{display:'flex',gap:13,alignItems:'flex-start',marginBottom:15,fontSize:15.5,color:'#374151',lineHeight:1.5}}>
                      <span style={{width:7,height:7,borderRadius:'50%',background:'#06b6d4',marginTop:8,flexShrink:0}}/>{i}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
                    <div style={{width:44,height:44,borderRadius:'50%',background:'#fee2e2',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </div>
                    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(24px,5vw,30px)',fontWeight:800,color:'#0c4a6e',margin:0}}>Not included</h2>
                  </div>
                  {s.excludes.map(i => (
                    <div key={i} style={{display:'flex',gap:13,alignItems:'flex-start',marginBottom:15,fontSize:15.5,color:'#6b7280',lineHeight:1.5}}>
                      <span style={{width:7,height:7,borderRadius:'50%',background:'#f87171',marginTop:8,flexShrink:0}}/>{i}
                    </div>
                  ))}
                </div>
              </div>

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
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:11}}>
                  {others.map(os => (
                    <div key={os.id} className="ocard" onClick={() => openDetail(os)}>
                      <div className="ocard-thumb" style={{background:os.bg}}>
                        <ServiceImage src={os.image} alt={os.name} bg={os.bg} color={os.color}/>
                      </div>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:'#0c4a6e'}}>{os.name}</div>
                        <div style={{fontSize:12,color:'#9ca3af',marginTop:2}}>{os.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </DetailSection>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── CLEENZO LOGO (pure code — no PNG) ────────────────────────────────────────
//  "Cleen" -> wordColor   |   "z" + "o" -> accentColor
//  custom "o" = open ring (the CUT) + a 4-point sparkle (the STAR)
//  Navbar (light bg): wordColor navy,  accentColor white
//  Footer (dark bg):  wordColor white, accentColor cyan
function CleenzoLogo({
  height = 30,
  wordColor = '#0c4a6e',
  accentColor = '#ffffff',
  fontFamily = "'Poppins','Outfit',sans-serif",
}: {
  height?: number;
  wordColor?: string;
  accentColor?: string;
  fontFamily?: string;
}) {
  const VB_H = 80;
  const FONT_SIZE = 60;
  const X0 = 4;          // left padding
  const BASELINE = 58;   // text baseline

  const textRef = useRef<SVGTextElement>(null);
  // measured full width of "Cleenzo" — used to place the sparkle over the "o"
  const [w, setW] = useState(232);

  useEffect(() => {
    const measure = () => {
      const el = textRef.current;
      if (el) setW(el.getComputedTextLength());
    };
    measure();
    // re-measure once the web font has finished loading
    const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
    if (fonts?.ready) fonts.ready.then(measure).catch(() => {});
  }, []);

  const VB_W = X0 + w + 26;       // room for the sparkle on the right
  const sparkleX = X0 + w - 4;    // upper-RIGHT of the final "o"
  const sparkleY = 12;            // raised above the letters

  return (
    <svg
      role="img"
      aria-label="Cleenzo"
      height={height}
      width={height * (VB_W / VB_H)}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* full wordmark — "Cleen" in wordColor, "zo" in accentColor */}
      <text
        ref={textRef}
        x={X0}
        y={BASELINE}
        fontFamily={fontFamily}
        fontWeight={800}
        fontStyle="italic"
        fontSize={FONT_SIZE}
        letterSpacing="-1.5"
      >
        <tspan fill={wordColor}>C</tspan>
        <tspan fill={wordColor}>leen</tspan>
        <tspan fill={accentColor}>zo</tspan>
      </text>

      {/* 4-point sparkle / star over the top-right of the "o" */}
      <g transform={`translate(${sparkleX} ${sparkleY}) scale(1.25)`}>
        <path
          d="M0,-9 C1.2,-3 3,-1.2 9,0 C3,1.2 1.2,3 0,9 C-1.2,3 -3,1.2 -9,0 C-3,-1.2 -1.2,-3 0,-9 Z"
          fill={accentColor}
        />
      </g>
    </svg>
  );
}

// ─── OFFER FEATURE (circular outline icon + 2-line label) ─────────────────────
function OfferFeature({ l1, l2, children }: { l1: string; l2: string; children: ReactNode }) {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:11,width:96}}>
      <div style={{width:62,height:62,borderRadius:'50%',border:'1.5px solid rgba(255,255,255,0.55)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {children}
        </svg>
      </div>
      <div style={{fontSize:11,fontWeight:700,color:'#fff',textAlign:'center',letterSpacing:.4,lineHeight:1.35,textTransform:'uppercase'}}>
        {l1}<br/>{l2}
      </div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{marginBottom:44}}>
      <h2 style={{fontSize:20,fontWeight:800,fontFamily:"'Playfair Display',serif",color:'#0c4a6e',marginBottom:18,paddingBottom:13,borderBottom:'1.5px solid #f0f0f0'}}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── HERO IMAGE (your photo, with placeholder fallback) ──────────────────────
function HeroImage({ src }: { src: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,textAlign:'center',padding:24}}>
        <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.3">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
        <div style={{fontSize:13.5,fontWeight:600,color:'rgba(255,255,255,.95)',lineHeight:1.6,maxWidth:230}}>
          Add your hero photo at <span style={{background:'rgba(255,255,255,.2)',padding:'2px 7px',borderRadius:6,fontFamily:'monospace'}}>/public/hero-model.png</span>
        </div>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt="Cleenzo cleaning professional"
      fill
      sizes="(max-width: 768px) 290px, 520px"
      onError={() => setErr(true)}
      style={{objectFit:'contain',filter:'drop-shadow(0 22px 34px rgba(0,0,0,.22))'}}
    />
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
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 50vw, 220px"
      onError={() => setErr(true)}
      style={{objectFit:'cover',objectPosition:'center',transition:'transform .35s ease'}}
      onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
      onMouseOut={e  => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );
}