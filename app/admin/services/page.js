'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm]         = useState({ name: '', price: '', duration_min: '', description: '' });
  const [saving, setSaving]     = useState(false);

  useEffect(() => { fetchServices(); }, []);

  async function fetchServices() {
    const { data } = await supabase.from('services').select('*').order('price');
    setServices(data || []);
  }

  async function addService(e) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('services').insert({
      name: form.name,
      price: parseInt(form.price),
      duration_min: parseInt(form.duration_min),
      description: form.description,
      is_active: true,
    });
    if (error) toast.error(error.message);
    else {
      toast.success('Service added!');
      setForm({ name: '', price: '', duration_min: '', description: '' });
      fetchServices();
    }
    setSaving(false);
  }

  async function toggleService(id, currentStatus) {
    await supabase.from('services').update({ is_active: !currentStatus }).eq('id', id);
    fetchServices();
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-xl font-bold mb-6">Manage Services</h1>

      {/* Add service form */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-4">Add new service</h2>
        <form onSubmit={addService} className="grid grid-cols-2 gap-3">
          <input placeholder="Service name" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm col-span-2" required />
          <input placeholder="Price (₹)" type="number" value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm" required />
          <input placeholder="Duration (minutes)" type="number" value={form.duration_min}
            onChange={e => setForm({...form, duration_min: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm" required />
          <textarea placeholder="Description (optional)" value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm col-span-2 resize-none" rows={2} />
          <button type="submit" disabled={saving}
            className="col-span-2 bg-cyan-500 text-white rounded-lg py-2 text-sm font-semibold hover:bg-cyan-600 disabled:opacity-50">
            {saving ? 'Adding...' : 'Add service'}
          </button>
        </form>
      </div>

      {/* Services list */}
      <div className="flex flex-col gap-3">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-gray-400 text-sm">₹{s.price} · {s.duration_min} min</div>
            </div>
            <button
              onClick={() => toggleService(s.id, s.is_active)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition ${s.is_active ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 text-gray-400'}`}
            >
              {s.is_active ? 'Active' : 'Hidden'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}