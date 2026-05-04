'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, MapPin, FileText } from 'lucide-react';

export default function TrackComplaint() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="min-h-screen bg-slate-950 p-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/citizen" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </Link>

        <div className="glass-card p-8 rounded-3xl border border-white/5">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-indigo-400 font-medium mb-1">COMPLAINT ID</p>
              <h1 className="text-3xl font-bold text-white">{id || 'CMP-7829'}</h1>
            </div>
            <span className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
              PENDING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-slate-400 mb-2"><MapPin className="w-4 h-4" /> Location</div>
              <p className="text-white font-medium">Ward 12, Main Street, Near Central Park</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-slate-400 mb-2"><FileText className="w-4 h-4" /> Category</div>
              <p className="text-white font-medium">Wet Waste</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-6">Status Timeline</h3>
          
          <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pb-4">
            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <h4 className="text-lg font-semibold text-white">Complaint Logged</h4>
              <p className="text-slate-400 text-sm mt-1">Oct 24, 2026 - 10:30 AM</p>
              <p className="text-slate-300 mt-2">Your complaint has been successfully registered in the system.</p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              </div>
              <h4 className="text-lg font-semibold text-white">Assigned to Worker</h4>
              <p className="text-slate-400 text-sm mt-1">Oct 24, 2026 - 11:15 AM</p>
              <p className="text-slate-300 mt-2">Worker Ram Kumar has been assigned to this issue.</p>
            </div>

            <div className="relative pl-8 opacity-50">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-700"></div>
              <h4 className="text-lg font-semibold text-white">In Progress</h4>
              <p className="text-slate-400 text-sm mt-1">Pending</p>
            </div>

            <div className="relative pl-8 opacity-50">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-700"></div>
              <h4 className="text-lg font-semibold text-white">Resolved</h4>
              <p className="text-slate-400 text-sm mt-1">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
