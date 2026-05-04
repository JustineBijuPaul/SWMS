'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, LayoutDashboard, Map, Users, Settings, Plus, Trash2, Edit } from 'lucide-react';

export default function ZoneManagement() {
  const [zones, setZones] = useState([
    { id: '1', ward: 'Ward 1', zone: 'Zone A', city: 'New Delhi', workers: 5, status: 'Active' },
    { id: '2', ward: 'Ward 2', zone: 'Zone B', city: 'New Delhi', workers: 3, status: 'Active' },
    { id: '3', ward: 'Ward 3', zone: 'Zone C', city: 'New Delhi', workers: 7, status: 'Active' },
    { id: '4', ward: 'Ward 4', zone: 'Zone D', city: 'New Delhi', workers: 2, status: 'Under-staffed' },
    { id: '5', ward: 'Ward 5', zone: 'Zone E', city: 'New Delhi', workers: 0, status: 'Inactive' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newWard, setNewWard] = useState('');
  const [newZone, setNewZone] = useState('');

  const addZone = () => {
    if (!newWard || !newZone) return;
    setZones([...zones, { 
      id: Date.now().toString(), 
      ward: newWard, 
      zone: newZone, 
      city: 'New Delhi', 
      workers: 0, 
      status: 'Inactive' 
    }]);
    setNewWard('');
    setNewZone('');
    setShowAddModal(false);
  };

  const deleteZone = (id: string) => {
    setZones(zones.filter(z => z.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-slate-900/50 flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">SWMS Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" href="/dashboard" />
          <NavItem icon={<Map />} label="Wards & Zones" active />
          <NavItem icon={<Users />} label="Workforce" href="/admin/workforce" />
        </nav>
        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<Home />} label="Back to Site" href="/" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-white/10 bg-slate-900/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">Wards & Zone Management</h2>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg font-medium text-sm">
            <Plus className="w-4 h-4" /> Add Zone
          </button>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl border bg-indigo-500/10 border-indigo-500/20">
              <h4 className="text-slate-400 font-medium mb-1">Total Zones</h4>
              <div className="text-3xl font-bold text-white">{zones.length}</div>
            </div>
            <div className="p-6 rounded-2xl border bg-emerald-500/10 border-emerald-500/20">
              <h4 className="text-slate-400 font-medium mb-1">Active Zones</h4>
              <div className="text-3xl font-bold text-white">{zones.filter(z => z.status === 'Active').length}</div>
            </div>
            <div className="p-6 rounded-2xl border bg-amber-500/10 border-amber-500/20">
              <h4 className="text-slate-400 font-medium mb-1">Total Workers Assigned</h4>
              <div className="text-3xl font-bold text-white">{zones.reduce((acc, z) => acc + z.workers, 0)}</div>
            </div>
          </div>

          {/* Zone Table */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-sm">
                    <th className="px-6 py-4 font-medium">Ward</th>
                    <th className="px-6 py-4 font-medium">Zone</th>
                    <th className="px-6 py-4 font-medium">City</th>
                    <th className="px-6 py-4 font-medium">Workers</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {zones.map(zone => (
                    <tr key={zone.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">{zone.ward}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{zone.zone}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{zone.city}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{zone.workers}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          zone.status === 'Active' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                          zone.status === 'Under-staffed' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                          'text-slate-400 bg-slate-400/10 border-slate-400/20'
                        }`}>
                          {zone.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteZone(zone.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Zone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-md w-full animate-slide-up">
            <h3 className="text-xl font-bold text-white mb-6">Add New Zone</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ward Name</label>
                <input value={newWard} onChange={e => setNewWard(e.target.value)} type="text" placeholder="e.g. Ward 6" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Zone Name</label>
                <input value={newZone} onChange={e => setNewZone(e.target.value)} type="text" placeholder="e.g. Zone F" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium">Cancel</button>
              <button onClick={addZone} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">Create Zone</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active = false, href = '#' }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
