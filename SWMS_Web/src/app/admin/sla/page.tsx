'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, LayoutDashboard, Map, Users, Settings, Clock, AlertTriangle, CheckCircle, Download, Shield } from 'lucide-react';

export default function SLAManagement() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const downloadCSV = () => {
    window.open('/api/reports?format=csv', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading SLA data...</p>
      </div>
    );
  }

  const sla = report?.sla || { total_resolved: 0, within_sla: 0, compliance_rate: 100 };
  const byStatus = report?.byStatus || {};
  const byCategory = report?.byCategory || {};

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
          <NavItem icon={<Users />} label="Workforce" href="/admin/workforce" />
          <NavItem icon={<Shield />} label="SLA Management" active />
        </nav>
        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<Home />} label="Back to Site" href="/" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-white/10 bg-slate-900/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">SLA Management</h2>
          <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg font-medium text-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {/* SLA Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-2xl border bg-indigo-500/10 border-indigo-500/20">
              <h4 className="text-slate-400 font-medium mb-1">Total Complaints</h4>
              <div className="text-3xl font-bold text-white">{report?.total || 0}</div>
            </div>
            <div className="p-6 rounded-2xl border bg-emerald-500/10 border-emerald-500/20">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="text-slate-400 font-medium">Within SLA</h4>
              </div>
              <div className="text-3xl font-bold text-white">{sla.within_sla}</div>
            </div>
            <div className="p-6 rounded-2xl border bg-amber-500/10 border-amber-500/20">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-slate-400 font-medium">SLA Breached</h4>
              </div>
              <div className="text-3xl font-bold text-white">{sla.total_resolved - sla.within_sla}</div>
            </div>
            <div className="p-6 rounded-2xl border bg-blue-500/10 border-blue-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-blue-400" />
                <h4 className="text-slate-400 font-medium">Compliance Rate</h4>
              </div>
              <div className="text-3xl font-bold text-white">{sla.compliance_rate}%</div>
            </div>
          </div>

          {/* SLA Progress Bar */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">SLA Compliance (48-hour Resolution Target)</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-6 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    sla.compliance_rate >= 90 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                    sla.compliance_rate >= 70 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                    'bg-gradient-to-r from-red-500 to-red-400'
                  }`}
                  style={{ width: `${sla.compliance_rate}%` }}
                ></div>
              </div>
              <span className={`text-2xl font-bold ${
                sla.compliance_rate >= 90 ? 'text-emerald-400' :
                sla.compliance_rate >= 70 ? 'text-amber-400' :
                'text-red-400'
              }`}>{sla.compliance_rate}%</span>
            </div>
          </div>

          {/* Breakdown Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Status */}
            <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="font-semibold text-white">Breakdown by Status</h3>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(byStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">{status}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${report?.total ? ((count as number) / report.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium text-sm w-8 text-right">{count as number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Category */}
            <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="font-semibold text-white">Breakdown by Category</h3>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(byCategory).map(([cat, count]) => {
                  const colors: Record<string, string> = {
                    WET: 'bg-emerald-500',
                    DRY: 'bg-blue-500',
                    SANITARY: 'bg-amber-500',
                    HAZARDOUS: 'bg-red-500',
                  };
                  return (
                    <div key={cat} className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">{cat}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${colors[cat] || 'bg-slate-500'}`}
                            style={{ width: `${report?.total ? ((count as number) / report.total) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium text-sm w-8 text-right">{count as number}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
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
