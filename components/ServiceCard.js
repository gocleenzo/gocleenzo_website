import Link from 'next/link';

export default function ServiceCard({ name, price, duration, icon }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-md transition group">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-800 text-sm mb-1">{name}</h3>
      <p className="text-gray-400 text-xs mb-3">~{duration} min</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-cyan-600">from ₹{price}</span>
        <Link
          href="/services"
          className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition"
        >
          Book
        </Link>
      </div>
    </div>
  );
}