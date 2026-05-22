export const metadata = {
  title: 'Cleaning Services in Nashik — Cleenzo',
  description: 'Browse all home cleaning services by Cleenzo. Bathroom, kitchen, full home, sofa cleaning in Nashik. Transparent pricing.',
};

const services = [
  {
    name: 'Bathroom Cleaning',
    price: 299,
    duration: '45–60 min',
    includes: ['Toilet deep clean', 'Sink & mirror', 'Floor scrubbing', 'Tiles cleaning'],
  },
  {
    name: 'Kitchen Cleaning',
    price: 399,
    duration: '60–90 min',
    includes: ['Countertops', 'Stovetop & chimney exterior', 'Sink', 'Cabinet exteriors', 'Floor mopping'],
  },
  {
    name: 'Full Home Cleaning',
    price: 799,
    duration: '3–4 hours',
    includes: ['All rooms swept & mopped', 'Kitchen surface clean', 'Bathroom clean', 'Dusting all surfaces'],
  },
  {
    name: 'Sweeping & Mopping',
    price: 199,
    duration: '30–45 min',
    includes: ['All rooms swept', 'Wet mopping', 'Balcony/passage'],
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Our cleaning services</h1>
      <p className="text-gray-500 mb-10">
        All services available in Nashik. Equipment and products included. No hidden charges.
      </p>
      <div className="flex flex-col gap-5">
        {services.map((s) => (
          <div key={s.name} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-gray-400 text-sm">{s.duration}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-cyan-600">₹{s.price}</div>
                <div className="text-xs text-gray-400">all-inclusive</div>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-1">
              {s.includes.map((item) => (
                <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-cyan-500">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))} 
      </div>
      <div className="mt-10 bg-cyan-50 border border-cyan-200 rounded-2xl p-6 text-center">
        <h3 className="font-semibold text-cyan-800 mb-2">Ready to book?</h3>
        <p className="text-cyan-700 text-sm mb-4">Download the Cleenzo app and book your first cleaning in under a minute.</p>
        <a href="https://play.google.com/store" className="bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold inline-block">
          Download on Android
        </a>
      </div>
    </div>
  );
}