'use client';

import { CheckCircle, AlertTriangle, XCircle, Map, User, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WorkerDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/complaints')
      .then(res => res.json())
      .then(data => {
        // For MVP, worker sees all unresolved complaints or assigned complaints
        if (Array.isArray(data)) {
          setTasks(data.filter(c => c.status !== 'RESOLVED').map(c => ({
            id: c.id,
            complaintId: c.id.substring(0,8).toUpperCase(),
            location: c.location?.ward || 'Unknown',
            category: c.category,
            status: c.status === 'PENDING' ? 'Assigned' : c.status
          })));
        }
        setLoading(false);
      });
  }, []);

  const updateTaskStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update');
      
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (e) {
      alert('Error updating task');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-50">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center mt-8 bg-slate-900/50 p-6 rounded-3xl border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <User className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Hi, Ram Kumar</h1>
              <p className="text-slate-400">Zone B • 2 Tasks Today</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/10 flex items-center gap-2">
            <Map className="w-4 h-4" /> View Route
          </button>
        </header>

        <div>
          <h2 className="text-xl font-bold mb-4 px-2">Your Assigned Tasks</h2>
          <div className="grid gap-4">
            {tasks.map(task => (
              <div key={task.id} className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/30">
                        {task.complaintId}
                      </span>
                      <span className="text-sm font-medium text-slate-400">{task.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      {task.location}
                    </h3>
                  </div>
                  
                  {task.status === 'Assigned' ? (
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                      <button onClick={() => updateTaskStatus(task.id, 'Collected')} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-colors">
                        <CheckCircle className="w-4 h-4" /> Collected
                      </button>
                      <button onClick={() => updateTaskStatus(task.id, 'Escalated')} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl transition-colors">
                        <AlertTriangle className="w-4 h-4" /> Escalate
                      </button>
                      <button onClick={() => updateTaskStatus(task.id, 'Skipped')} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-colors">
                        <XCircle className="w-4 h-4" /> Skip
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-sm font-medium text-slate-300">
                        Status: <span className={task.status === 'Collected' ? 'text-emerald-400' : task.status === 'Skipped' ? 'text-red-400' : 'text-amber-400'}>{task.status}</span>
                      </div>
                      {task.status === 'Collected' && (
                        <button className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors" title="Upload Proof">
                          <Camera className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
