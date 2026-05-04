'use client';

import Link from 'next/link';
import { ArrowLeft, Recycle, Trash2, AlertTriangle, Droplets, Leaf, Package } from 'lucide-react';

const categories = [
  {
    title: 'Wet Waste',
    icon: <Droplets className="w-8 h-8" />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    items: ['Kitchen food scraps & leftovers', 'Fruit & vegetable peels', 'Tea bags & coffee grounds', 'Eggshells', 'Meat & fish waste', 'Stale or expired cooked food'],
    tip: 'Use a green bin. Wrap in newspaper if dripping. Compost at home to create organic fertilizer!',
  },
  {
    title: 'Dry Waste',
    icon: <Package className="w-8 h-8" />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    items: ['Paper, cardboard & cartons', 'Plastic bottles, bags & packaging', 'Metal cans & foil', 'Glass bottles & jars', 'Cloth, fabric & old clothes', 'Rubber & leather items'],
    tip: 'Use a blue bin. Rinse containers before disposal. Flatten cardboard to save space.',
  },
  {
    title: 'Sanitary Waste',
    icon: <Trash2 className="w-8 h-8" />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    items: ['Diapers & sanitary napkins', 'Cotton swabs & bandages', 'Condoms & gloves', 'Expired medicines', 'Used masks', 'Razor blades (wrapped)'],
    tip: 'Wrap securely in newspaper or a biodegradable bag. Mark as "Sanitary Waste" to protect waste workers.',
  },
  {
    title: 'Hazardous Waste',
    icon: <AlertTriangle className="w-8 h-8" />,
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    items: ['Batteries & electronic waste (e-waste)', 'Paint, solvents & chemicals', 'Fluorescent bulbs & tubes', 'Motor oil & fuel cans', 'Pesticides & herbicides', 'Thermometers & mercury items'],
    tip: 'NEVER mix with regular waste. Contact your local e-waste collection center. Many stores offer take-back programs.',
  },
];

const dos = [
  'Segregate waste at source into wet, dry, and hazardous bins.',
  'Compost kitchen waste at home whenever possible.',
  'Rinse and clean recyclable containers before disposal.',
  'Keep waste bins covered to prevent flies and odors.',
  'Hand over e-waste only to authorized recyclers.',
  'Report overflowing or missed bin collections on the SWMS app.',
];

const donts = [
  'Do NOT burn waste — it releases toxic fumes.',
  'Do NOT dump waste in drains, water bodies, or open land.',
  'Do NOT mix medical/sanitary waste with household waste.',
  'Do NOT throw batteries or electronics in regular bins.',
  'Do NOT use single-use plastics where alternatives exist.',
  'Do NOT ignore collection schedules — keep waste ready on time.',
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Recycle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Waste Segregation Guide</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Learn how to properly sort your waste. Correct segregation helps keep our city clean,
            protects waste workers, and ensures materials are recycled properly.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {categories.map(cat => (
            <div key={cat.title} className={`p-6 rounded-2xl border ${cat.bg} transition-all hover:scale-[1.02]`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={cat.color}>{cat.icon}</div>
                <h2 className={`text-xl font-bold ${cat.color}`}>{cat.title}</h2>
              </div>
              <ul className="space-y-2 mb-5">
                {cat.items.map((item, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-slate-600 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-slate-900/50 rounded-lg border border-white/5">
                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">💡 Tip: </span>
                  {cat.tip}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/20">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5" /> Do's ✅
            </h3>
            <ul className="space-y-3">
              {dos.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-red-500/20">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Don'ts ❌
            </h3>
            <ul className="space-y-3">
              {donts.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center glass-card p-8 rounded-2xl border border-white/5">
          <h3 className="text-2xl font-bold text-white mb-3">See an Issue?</h3>
          <p className="text-slate-400 mb-6">Help keep the city clean by reporting waste management issues in your area.</p>
          <Link href="/report" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold text-lg shadow-lg hover:opacity-90 transition-opacity">
            Report Now
          </Link>
        </div>
      </div>
    </div>
  );
}
