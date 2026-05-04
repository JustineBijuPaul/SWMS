'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Filter } from 'lucide-react';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function ComplaintMapPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/complaints')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComplaints(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Generate synthetic lat/lng from complaint ids for MVP demo
  // In production, locations would have real coordinates stored in the DB.
  const markers = complaints
    .filter(c => filter === 'ALL' || c.status === filter)
    .map((c, i) => {
      // Scatter points around New Delhi for demo
      const hash = c.id.charCodeAt(0) + c.id.charCodeAt(1);
      return {
        id: c.id,
        lat: 28.5 + (hash % 30) * 0.008,
        lng: 77.1 + ((hash * 3) % 40) * 0.006,
        category: c.category,
        status: c.status,
        description: c.description || 'No description',
      };
    });

  const counts = {
    ALL: complaints.length,
    PENDING: complaints.filter(c => c.status === 'PENDING').length,
    ASSIGNED: complaints.filter(c => c.status === 'ASSIGNED').length,
    IN_PROGRESS: complaints.filter(c => c.status === 'IN_PROGRESS').length,
    RESOLVED: complaints.filter(c => c.status === 'RESOLVED').length,
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/citizen" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-white">Complaint Map</h1>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {(['ALL', 'PENDING', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                filter === status
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {status.replace('_', ' ')} ({counts[status]})
            </button>
          ))}
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-lg">Loading map data...</p>
          </div>
        ) : (
          <MapView markers={markers} />
        )}

        {/* Legend overlay */}
        <div className="absolute bottom-6 left-6 glass-card p-4 rounded-xl border border-white/10 space-y-2 z-[1000]">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Legend</h4>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Pending
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> Assigned
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> In Progress
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Resolved
          </div>
        </div>
      </div>
    </div>
  );
}
