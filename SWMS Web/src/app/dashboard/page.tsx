'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, LayoutDashboard, Map, Users, Settings, Bell, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Admin dashboard fetches all complaints
    fetch('/api/complaints')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComplaints(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalPending = complaints.filter(c => c.status === 'PENDING').length;
  const totalInProgress = complaints.filter(c => c.status === 'IN_PROGRESS' || c.status === 'ASSIGNED').length;
  const totalResolved = complaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-slate-900/50 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">SWMS Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<Map />} label="Wards & Zones" />
          <NavItem icon={<Users />} label="Workforce" />
          <NavItem icon={<Bell />} label="Complaints" />
        </nav>
        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings />} label="Settings" />
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors mt-2">
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-white/10 bg-slate-900/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">Overview</h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-slate-300" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-slate-800"></div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard 
              title="Pending Issues" 
              value={totalPending.toString()} 
              trend="Real-time"
              icon={<AlertTriangle className="w-6 h-6 text-amber-400" />}
              color="amber"
            />
            <MetricCard 
              title="In Progress" 
              value={totalInProgress.toString()} 
              trend="Real-time"
              icon={<Clock className="w-6 h-6 text-blue-400" />}
              color="blue"
            />
            <MetricCard 
              title="Resolved" 
              value={totalResolved.toString()} 
              trend="Real-time"
              icon={<CheckCircle className="w-6 h-6 text-emerald-400" />}
              color="emerald"
            />
          </div>

          {/* Recent Complaints Table */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Recent Complaints</h3>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-sm">
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-4 text-center text-slate-400">Loading complaints...</td></tr>
                  ) : complaints.map(cmp => (
                    <TableRow 
                      key={cmp.id} 
                      id={cmp.id.substring(0,8).toUpperCase()} 
                      category={cmp.category} 
                      location={cmp.location?.ward || 'Unknown location'} 
                      status={cmp.status} 
                      date={new Date(cmp.created_at).toLocaleDateString()} 
                    />
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

function MetricCard({ title, value, trend, icon, color }: { title: string, value: string, trend: string, icon: React.ReactNode, color: 'amber' | 'blue' | 'emerald' }) {
  const bgColors = {
    amber: 'bg-amber-500/10 border-amber-500/20',
    blue: 'bg-blue-500/10 border-blue-500/20',
    emerald: 'bg-emerald-500/10 border-emerald-500/20',
  };

  return (
    <div className={`p-6 rounded-2xl border ${bgColors[color]} flex flex-col`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-slate-900/50 shadow-inner">
          {icon}
        </div>
      </div>
      <h4 className="text-slate-400 font-medium mb-1">{title}</h4>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm text-slate-500 mt-auto">{trend}</div>
    </div>
  );
}

function TableRow({ id, category, location, status, date }: { id: string, category: string, location: string, status: string, date: string }) {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'In Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Resolved': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-6 py-4 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{id}</td>
      <td className="px-6 py-4 text-sm text-slate-400">{category}</td>
      <td className="px-6 py-4 text-sm text-slate-400">{location}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">{date}</td>
    </tr>
  );
}
