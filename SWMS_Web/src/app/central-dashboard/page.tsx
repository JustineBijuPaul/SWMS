'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, TrendingUp, Download, BarChart3, Users, MapPin, Award, Landmark } from 'lucide-react';

const states = [
  { name: 'Delhi', cities: 11, complaints: 28000, resolved: 24500, sla: 88, population: '2.1Cr' },
  { name: 'Maharashtra', cities: 36, complaints: 52000, resolved: 42000, sla: 81, population: '12.4Cr' },
  { name: 'Karnataka', cities: 30, complaints: 31000, resolved: 28000, sla: 90, population: '6.7Cr' },
  { name: 'Tamil Nadu', cities: 32, complaints: 29000, resolved: 26000, sla: 90, population: '7.7Cr' },
  { name: 'Uttar Pradesh', cities: 75, complaints: 68000, resolved: 51000, sla: 75, population: '23.5Cr' },
  { name: 'Gujarat', cities: 33, complaints: 24000, resolved: 22000, sla: 92, population: '6.3Cr' },
  { name: 'West Bengal', cities: 23, complaints: 35000, resolved: 27000, sla: 77, population: '9.9Cr' },
  { name: 'Rajasthan', cities: 33, complaints: 22000, resolved: 19000, sla: 86, population: '7.9Cr' },
];

export default function CentralDashboard() {
  const totalComplaints = states.reduce((acc, s) => acc + s.complaints, 0);
  const totalResolved = states.reduce((acc, s) => acc + s.resolved, 0);
  const totalCities = states.reduce((acc, s) => acc + s.cities, 0);
  const avgSLA = Math.round(states.reduce((acc, s) => acc + s.sla, 0) / states.length);

  const exportCSV = () => {
    const headers = 'State,Cities,Complaints,Resolved,SLA %,Population\n';
    const rows = states.map(s => `${s.name},${s.cities},${s.complaints},${s.resolved},${s.sla},${s.population}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swms_national_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Admin
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Globe className="w-8 h-8 text-indigo-400" /> Central Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Nation-wide waste management overview</p>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg font-medium text-sm text-white">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* National Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total States" value={states.length.toString()} icon={<Landmark className="w-5 h-5 text-purple-400" />} />
          <StatCard title="Total Cities" value={totalCities.toLocaleString()} icon={<MapPin className="w-5 h-5 text-indigo-400" />} />
          <StatCard title="Total Complaints" value={totalComplaints.toLocaleString()} icon={<BarChart3 className="w-5 h-5 text-blue-400" />} />
          <StatCard title="National SLA" value={`${avgSLA}%`} icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} />
        </div>

        {/* Resolution Rate Visual */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">National Resolution Rate</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.round((totalResolved / totalComplaints) * 100)}%` }}
              ></div>
            </div>
            <span className="text-2xl font-bold text-white">{Math.round((totalResolved / totalComplaints) * 100)}%</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">{totalResolved.toLocaleString()} of {totalComplaints.toLocaleString()} complaints resolved nationally</p>
        </div>

        {/* State Rankings Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
          <div className="px-6 py-5 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">State Performance Rankings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-sm">
                  <th className="px-6 py-4 font-medium">Rank</th>
                  <th className="px-6 py-4 font-medium">State</th>
                  <th className="px-6 py-4 font-medium">Cities</th>
                  <th className="px-6 py-4 font-medium">Complaints</th>
                  <th className="px-6 py-4 font-medium">Resolved</th>
                  <th className="px-6 py-4 font-medium">SLA Compliance</th>
                  <th className="px-6 py-4 font-medium">Population</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...states]
                  .sort((a, b) => b.sla - a.sla)
                  .map((state, i) => (
                  <tr key={state.name} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        i === 0 ? 'bg-amber-400/20 text-amber-400' :
                        i === 1 ? 'bg-slate-300/20 text-slate-300' :
                        i === 2 ? 'bg-orange-400/20 text-orange-400' :
                        'bg-slate-700 text-slate-400'
                      }`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{state.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{state.cities}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{state.complaints.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-emerald-400">{state.resolved.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${
                            state.sla >= 90 ? 'bg-emerald-500' :
                            state.sla >= 80 ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`} style={{ width: `${state.sla}%` }}></div>
                        </div>
                        <span className="text-sm text-slate-300">{state.sla}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{state.population}</td>
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
