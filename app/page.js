import Link from 'next/link';
import { Star, Shield, Clock } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

const services = [
  { name: 'Bathroom Cleaning', price: 299, duration: 60, icon: '🚿' },
  { name: 'Kitchen Cleaning', price: 399, duration: 90, icon: '🍳' },
  { name: 'Sweeping & Mopping', price: 199, duration: 45, icon: '🧹' },
  { name: 'Sofa Cleaning', price: 499, duration: 120, icon: '🛋️' },
  { name: 'Full Home Cleaning', price: 799, duration: 180, icon: '🏠' },
  { name: 'Bathroom + Kitchen', price: 599, duration: 120, icon: '✨' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Trusted home cleaning<br />in Nashik
          </h1>
          <p className="text-cyan-100 text-lg mb-8 max-w-xl mx-auto">
            Book a vetted cleaner in 60 seconds. Transparent pricing.
            No hidden charges. Cancel anytime.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="https://play.google.com/store"
              className="bg-white text-cyan-600 font-semibold px-6 py-3 rounded-full text-sm hover:bg-cyan-50 transition"
            >
              Download on Android
            </Link>
            <Link
              href="/services"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition"
            >
              View all services
            </Link>
          </div>
          <div className="flex gap-6 justify-center mt-10 text-cyan-100 text-sm flex-wrap">
            <span className="flex items-center gap-1"><Star size={14} /> 4.8 avg rating</span>
            <span className="flex items-center gap-1"><Shield size={14} /> Police-verified pros</span>
            <span className="flex items-center gap-1"><Clock size={14} /> Book in 60 seconds</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Our services</h2>
        <p className="text-gray-500 text-center mb-8">
          All services include equipment and cleaning products
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>
      </section>

        {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">How Cleenzo works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { step: '1', title: 'Choose a service', desc: 'Pick from our list of home cleaning services. See the exact price upfront.', icon: '📋' },
              { step: '2', title: 'Book in 60 seconds', desc: 'Select a time that works for you. Pay securely via UPI, card, or wallet.', icon: '📅' },
              { step: '3', title: 'We come to you', desc: 'A verified Cleenzo Pro arrives on time with all equipment included.', icon: '🚀' },
            ].map((item) => (
              <div key={item.step}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">What our customers say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Priya M.', area: 'Gangapur Road', text: 'The bathroom was spotless in under an hour. The cleaner was polite and professional. Will book again!', rating: 5 },
            { name: 'Rahul S.', area: 'Cidco, Nashik', text: 'Very impressed with the kitchen cleaning. They cleaned inside the cabinets too! Great value for ₹399.', rating: 5 },
            { name: 'Anjali K.', area: 'College Road', text: 'Booked for the full home package. Team of 2 came on time and did a thorough job. Highly recommend.', rating: 5 },
          ].map((t) => (
            <div key={t.name} className="border border-gray-200 rounded-2xl p-5">
              <div className="flex text-yellow-400 mb-3">
                {'★'.repeat(t.rating)}
              </div>
              <p className="text-gray-600 text-sm mb-4 italic">"{t.text}"</p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.area}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Download CTA */}
      <section className="bg-cyan-500 text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Download the Cleenzo app</h2>
          <p className="text-cyan-100 mb-6">Book, track, and manage your cleaning from your phone.</p>
          <Link
            href="https://play.google.com/store"
            className="bg-white text-cyan-600 font-semibold px-8 py-3 rounded-full inline-block hover:bg-cyan-50 transition"
          >
            Get it on Google Play
          </Link>
        </div>
      </section>
    </>
  );
}