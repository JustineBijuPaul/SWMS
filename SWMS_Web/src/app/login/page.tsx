'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const [method, setMethod] = useState<'otp' | 'email'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (method === 'email') {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push('/citizen');
      }
    } else {
      // OTP logic placeholder
      setError('OTP login is coming soon.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl animate-slide-up border border-white/5">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400 mb-8">Sign in to the SWMS Platform.</p>

        <div className="flex gap-2 mb-6 bg-slate-900/50 p-1 rounded-xl">
          <button 
            type="button"
            onClick={() => setMethod('otp')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${method === 'otp' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            OTP Login
          </button>
          <button 
            type="button"
            onClick={() => setMethod('email')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${method === 'email' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Email Login
          </button>
        </div>

        {error && <div className="p-3 mb-4 text-sm text-red-400 bg-red-400/10 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {method === 'otp' ? (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mobile Number</label>
              <input type="tel" required placeholder="+91" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </>
          )}

          <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold text-lg shadow-lg hover:opacity-90 transition-opacity">
            {method === 'otp' ? 'Send OTP' : 'Sign In'}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-400 text-sm">
          Don't have an account? <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Register here</Link>
        </p>
      </div>
    </div>
  );
}
