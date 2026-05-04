'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Building2, Award, AlertTriangle, BarChart3, MapPin } from 'lucide-react';

const cities = [
  { name: 'New Delhi', complaints: 4520, resolved: 4100, pending: 420, sla: 91, trend: 'up' },
  { name: 'Mumbai', complaints: 6200, resolved: 5100, pending: 1100, sla: 82, trend: 'down' },
  { name: 'Bengaluru', complaints: 3800, resolved: 3500, pending: 300, sla: 92, trend: 'up' },
  { name: 'Chennai', complaints: 2900, resolved: 2600, pending: 300, sla: 90, trend: 'up' },
  { name: 'Hyderabad', complaints: 3100, resolved: 2700, pending: 400, sla: 87, trend: 'down' },
  { name: 'Pune', complaints: 2200, resolved: 2000, pending: 200, sla: 91, trend: 'up' },
  { name: 'Kolkata', complaints: 3500, resolved: 2800, pending: 700, sla: 80, trend: 'down' },
  { name: 'Jaipur', complaints: 1800, resolved: 1600, pending: 200, sla: 89, trend: 'up' },
];

export default function StateDashboard() {
  const [selectedState, setSelectedState] = useState('All States');

  const totalComplaints = cities.reduce((acc, c) => acc + c.complaints, 0);
  const totalResolved = cities.reduce((acc, c) => acc + c.resolved, 0);
  const totalPending = cities.reduce((acc, c) => acc + c.pending, 0);
  const avgSLA = Math.round(cities.reduce((acc, c) => acc + c.sla, 0) / cities.length);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Admin
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">State Dashboard</h1>
            <p className="text-slate-400 mt-1">Cross-city performance aggregation</p>
          </div>
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All States</option>
            <option>Delhi NCR</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Complaints" value={totalComplaints.toLocaleString()} icon={<BarChart3 className="w-5 h-5 text-indigo-400" />} />
          <StatCard title="Resolved" value={totalResolved.toLocaleString()} icon={<Award className="w-5 h-5 text-emerald-400" />} />
          <StatCard title="Pending" value={totalPending.toLocaleString()} icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} />
          <StatCard title="Avg SLA Compliance" value={`${avgSLA}%`} icon={<TrendingUp className="w-5 h-5 text-blue-400" />} />
        </div>

        {/* City Rankings Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
          <div className="px-6 py-5 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">City Performance Rankings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-sm">
                  <th className="px-6 py-4 font-medium">Rank</th>
                  <th className="px-6 py-4 font-medium">City</th>
                  <th className="px-6 py-4 font-medium">Total Complaints</th>
                  <th className="px-6 py-4 font-medium">Resolved</th>
                  <th className="px-6 py-4 font-medium">Pending</th>
                  <th className="px-6 py-4 font-medium">SLA Compliance</th>
                  <th className="px-6 py-4 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...cities]
                  .sort((a, b) => b.sla - a.sla)
                  .map((city, i) => (
                  <tr key={city.name} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-300">#{i + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-400" /> {city.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{city.complaints.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-emerald-400">{city.resolved.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-amber-400">{city.pending.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" style={{ width: `${city.sla}%` }}></div>
                        </div>
                        <span className="text-sm text-slate-300 font-medium">{city.sla}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {city.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-5 rounded-2xl border border-white/5">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-slate-900/50">{icon}</div>
      </div>
      <h4 className="text-slate-400 text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
