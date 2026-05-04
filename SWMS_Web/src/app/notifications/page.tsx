'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, BellOff, Check, Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: string;
  read_status: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNotifications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const markAllRead = async () => {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    setNotifications(notifications.map(n => ({ ...n, read_status: true })));
  };

  const unread = notifications.filter(n => !n.read_status).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/citizen" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <p className="text-slate-400 mt-1">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-colors text-sm font-medium">
              <Check className="w-4 h-4" /> Mark all read
            </button>
          )}
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="glass-card p-8 rounded-2xl border border-white/5 text-center text-slate-400">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl border border-white/5 text-center">
              <BellOff className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300">No notifications yet</h3>
              <p className="text-slate-500 mt-2">You'll be notified when there are updates on your complaints.</p>
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`glass-card p-5 rounded-xl border transition-colors ${n.read_status ? 'border-white/5 opacity-70' : 'border-indigo-500/20 bg-indigo-500/5'}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">{getIcon(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm leading-relaxed">{n.message}</p>
                    <p className="text-slate-500 text-xs mt-2">{new Date(n.created_at).toLocaleString()}</p>
                  </div>
                  {!n.read_status && (
                    <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full flex-shrink-0 mt-2"></span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
