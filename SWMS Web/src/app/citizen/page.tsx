'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Search, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'PENDING').length;
  const resolved = complaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
            <p className="text-slate-400">Track and manage your reported issues.</p>
          </div>
          <Link href="/report" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Report New Issue
            <ArrowRight className="w-5 h-5" />
          </Link>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className="p-4 bg-indigo-500/20 rounded-xl"><AlertTriangle className="w-6 h-6 text-indigo-400" /></div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Reported</p>
              <h3 className="text-2xl font-bold text-white">{total}</h3>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className="p-4 bg-amber-500/20 rounded-xl"><Clock className="w-6 h-6 text-amber-400" /></div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending</p>
              <h3 className="text-2xl font-bold text-white">{pending}</h3>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className="p-4 bg-emerald-500/20 rounded-xl"><CheckCircle className="w-6 h-6 text-emerald-400" /></div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Resolved</p>
              <h3 className="text-2xl font-bold text-white">{resolved}</h3>
            </div>
          </div>
        </div>

        {/* Complaint History */}
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-white">Complaint History</h2>
            <div className="relative w-full md:w-64">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search ID..." className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {loading ? <div className="p-6 text-center text-slate-400">Loading your history...</div> : complaints.length === 0 ? <div className="p-6 text-center text-slate-400">You haven't reported any issues yet.</div> : complaints.map(cmp => (
              <div key={cmp.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-white/5 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${cmp.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400' : cmp.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {cmp.status === 'RESOLVED' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{cmp.id.substring(0,8).toUpperCase()} - {cmp.category}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {cmp.location?.ward || 'Unknown location'}</span>
                      <span>{new Date(cmp.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/track/${cmp.id}`} className="px-6 py-2 rounded-lg border border-indigo-500/30 text-indigo-400 font-medium hover:bg-indigo-500/10 transition-colors">
                  Track Status
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
