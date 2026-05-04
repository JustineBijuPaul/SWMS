'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, LayoutDashboard, Map, Users, Settings, UserPlus, Search, Shield, Star } from 'lucide-react';

export default function WorkforceManagement() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/workers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setWorkers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addWorker = async () => {
    if (!newName || !newEmail) return;
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone, password: 'temp123', role: 'WORKER' }),
      });
      if (res.ok) {
        // Refetch the workers list
        const updated = await fetch('/api/workers').then(r => r.json());
        if (Array.isArray(updated)) setWorkers(updated);
        setShowAddModal(false);
        setNewName('');
        setNewEmail('');
        setNewPhone('');
      }
    } catch (e) {
      alert('Failed to add worker');
    }
  };

  const filteredWorkers = workers.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (w.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-slate-900/50 flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">SWMS Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" href="/dashboard" />
          <NavItem icon={<Map />} label="Wards & Zones" href="/admin/zones" />
          <NavItem icon={<Users />} label="Workforce" active />
        </nav>
        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<Home />} label="Back to Site" href="/" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-white/10 bg-slate-900/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">Workforce Management</h2>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg font-medium text-sm">
            <UserPlus className="w-4 h-4" /> Add Worker
          </button>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search workers by name or email..." className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-slate-400 py-12">Loading workforce...</div>
            ) : filteredWorkers.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-12">No workers found.</div>
            ) : filteredWorkers.map(worker => (
              <div key={worker.id} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {worker.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{worker.name}</h3>
                    <p className="text-slate-400 text-sm">{worker.email || worker.phone}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Zone</span>
                    <span className="text-indigo-400 font-medium">{worker.zone || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Rating</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.8
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Worker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-md w-full animate-slide-up">
            <h3 className="text-xl font-bold text-white mb-6">Add New Worker</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} type="text" placeholder="Ram Kumar" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" placeholder="worker@example.com" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                <input value={newPhone} onChange={e => setNewPhone(e.target.value)} type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium">Cancel</button>
              <button onClick={addWorker} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">Add Worker</button>
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
