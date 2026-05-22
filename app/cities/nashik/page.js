export const metadata = {
  title: 'Home Cleaning Service in Nashik — Cleenzo',
  description: 'Professional home cleaning in Nashik. Serving Gangapur Road, Cidco, Panchvati, College Road, Satpur, Ambad. Book now.',
};

const areas = [
  'Gangapur Road', 'Cidco', 'Panchvati', 'College Road',
  'Satpur', 'Ambad', 'Nashik Road', 'Deolali', 'Adgaon',
  'Indira Nagar', 'Trimbak Road', 'Malegaon Road',
];

export default function NashikPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-3">
        Home Cleaning Service in Nashik
      </h1>
      <p className="text-gray-500 mb-8 text-lg">
        Cleenzo provides trusted, affordable home cleaning across Nashik.
        Our verified professionals serve all major areas of the city.
      </p>

      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-cyan-800 mb-1">Available in Nashik</h2>
        <p className="text-cyan-700 text-sm mb-4">We currently serve these areas in Nashik:</p>
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <span key={area} className="bg-white border border-cyan-200 text-cyan-800 text-sm px-3 py-1 rounded-full">
              {area}
            </span>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Why Nashik residents trust Cleenzo</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { title: 'Police-verified professionals', desc: 'Every cleaner goes through background verification before joining.' },
          { title: 'Transparent pricing', desc: 'The price you see is what you pay. No surprise charges.' },
          { title: 'On-time guarantee', desc: 'Our pros arrive within 15 minutes of the scheduled time.' },
          { title: 'Satisfaction guarantee', desc: 'Not happy? We will re-clean the area for free.' },
        ].map((item) => (
          <div key={item.title} className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}