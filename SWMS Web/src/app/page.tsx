import Link from 'next/link';
import { ArrowRight, Leaf, Shield, Activity, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-900/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/30 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="glass fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">SWMS</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How it works</Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login" className="px-5 py-2.5 rounded-lg text-white font-medium hover:bg-white/10 transition-colors">
              Log in
            </Link>
            <Link href="/register" className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 px-6">
        <div className="max-w-5xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-emerald-500/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-emerald-300">Smart City Initiative</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            The Future of <br/>
            <span className="text-gradient">Waste Management</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            An open, scalable, multi-tenant civic platform empowering citizens and governments to build cleaner, smarter cities together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/report" className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-lg transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 group">
              Report an Issue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/dashboard" className="px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:bg-white/5 transition-all flex items-center gap-2">
              Explore Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="w-full max-w-7xl mx-auto mt-40 mb-32 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<MapPin className="w-8 h-8 text-indigo-400" />}
            title="Geo-tagged Reporting"
            description="Instantly report waste issues with precise location data and image evidence for quick resolution."
          />
          <FeatureCard 
            icon={<Activity className="w-8 h-8 text-emerald-400" />}
            title="Real-time Tracking"
            description="Monitor the status of your complaints and workforce operations in real-time through dynamic dashboards."
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-blue-400" />}
            title="Transparent Governance"
            description="Multi-level analytics and SLA tracking ensuring complete accountability across all organizational tiers."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="text-emerald-500 w-5 h-5" />
            <span className="font-semibold text-white">SWMS Platform</span>
          </div>
          <p>© 2026 Smart Waste Management System. Open Source.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
      <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
