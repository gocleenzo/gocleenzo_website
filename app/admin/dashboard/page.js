'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

const STATUS_COLORS = {
  pending:     'bg-yellow-100 text-yellow-800',
  confirmed:   'bg-cyan-100 text-cyan-800',
  in_progress: 'bg-blue-100 text-blue-800',
  done:        'bg-green-100 text-green-800',
  cancelled:   'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [bookings, setBookings]   = useState([]);
  const [filter, setFilter]       = useState('all');
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetchBookings();
    const channel = supabase
      .channel('bookings-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, fetchBookings)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchBookings() {
    const { data } = await supabase
      .from('bookings')
      .select('*, users!bookings_customer_id_fkey(name, phone)')
      .order('created_at', { ascending: false })
      .limit(50);
    setBookings(data || []);
    setLoading(false);
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const todayStr = new Date().toDateString();
  const todayBookings = bookings.filter(b => new Date(b.created_at).toDateString() === todayStr);
  const todayRevenue  = todayBookings.filter(b => b.status === 'done').reduce((sum, b) => sum + (b.total_price || 0), 0);
  const pendingCount  = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-52 bg-cyan-900 text-white flex flex-col">
        <div className="p-4 border-b border-cyan-800 font-bold text-lg">Cleenzo Admin</div>
        {[
          ['Dashboard', '/admin/dashboard'],
          ['All Bookings', '/admin/bookings'],
          ['Customers', '/admin/customers'],
          ['Workers', '/admin/workers'],
          ['Services', '/admin/services'],
          ['Revenue', '/admin/revenue'],
        ].map(([label, href]) => (
          <a key={label} href={href} className="px-4 py-3 text-sm text-cyan-100 hover:bg-cyan-800 transition">{label}</a>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-5">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Today's bookings", value: todayBookings.length },
            { label: "Today's revenue", value: `₹${todayRevenue.toLocaleString('en-IN')}` },
            { label: 'Pending now', value: pendingCount },
            { label: 'Total bookings', value: bookings.length },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-cyan-600">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {['all','pending','confirmed','in_progress','done','cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition ${filter === s ? 'bg-cyan-500 text-white border-cyan-500' : 'border-gray-200 text-gray-600 hover:border-cyan-300'}`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-400">Loading bookings...</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-400">No bookings yet</td></tr>
              )}
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{b.users?.name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-gray-500">{b.users?.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{b.service_name || '—'}</td>
                  <td className="px-4 py-3 font-semibold text-cyan-700">₹{b.total_price || 0}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(b.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[b.status] || ''}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}