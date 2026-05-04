'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserPlus, Map, CheckCircle, Activity, Briefcase } from 'lucide-react';

export default function ContractorDashboard() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this fetches users where role = 'WORKER'
    fetch('/api/workers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setWorkers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-slate-900/50 flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Contractor Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<Briefcase />} label="Overview" active />
          <NavItem icon={<Users />} label="My Workforce" />
          <NavItem icon={<Map />} label="Zone Assignments" />
          <NavItem icon={<Activity />} label="Performance (SLA)" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-white/10 bg-slate-900/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">Workforce Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg font-medium">
            <UserPlus className="w-4 h-4" /> Add Worker
          </button>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {/* Workforce Table */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-slate-900/80">
              <h3 className="text-lg font-semibold text-white">Active Workers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-sm">
                    <th className="px-6 py-4 font-medium">Worker Name</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium">Assigned Zone</th>
                    <th className="px-6 py-4 font-medium">Active Tasks</th>
                    <th className="px-6 py-4 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-4 text-center text-slate-400">Loading workforce...</td></tr>
                  ) : workers.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-4 text-center text-slate-400">No workers found. Click 'Add Worker' to build your team.</td></tr>
                  ) : workers.map(worker => (
                    <tr key={worker.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">{worker.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{worker.phone || worker.email}</td>
                      <td className="px-6 py-4 text-sm text-indigo-400">{worker.zone || 'Unassigned'}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">3 Pending</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-emerald-400 text-sm">
                          <CheckCircle className="w-4 h-4" /> 98% SLA
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
