"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut } from 'lucide-react';

export default function TopNav() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="glass fixed top-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">SW</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">SWMS</span>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link href="/map" className="text-slate-300 hover:text-white transition-colors">Map</Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-4">
          {!session?.user ? (
            <>
              <Link href="/login" className="px-5 py-2.5 rounded-lg text-white font-medium hover:bg-white/10 transition-colors">Log in</Link>
              <Link href="/register" className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors shadow">Get Started</Link>
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">{session.user?.name || session.user?.email}</span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-white/5 shadow-lg py-2">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-slate-100 hover:bg-white/5">Profile</Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-slate-100 hover:bg-white/5">Settings</Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-white/5 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
