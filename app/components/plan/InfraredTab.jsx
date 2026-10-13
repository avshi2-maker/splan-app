'use client';
// InfraredTab (app/components/plan/InfraredTab.jsx) · updated 13.10.2026 15:35 (Asia/Jerusalem)
import React, { useState } from 'react';
import { Building2, Filter } from 'lucide-react';
import { SectionHead } from './Placeholder';
import DeviceCard from './DeviceCard';

export default function InfraredTab({ p }) {
  const cats = ['הכל', ...Array.from(new Set(p.catalog.map((d) => d.cat)))];
  const [cat, setCat] = useState('הכל');
  const list = cat === 'הכל' ? p.catalog : p.catalog.filter((d) => d.cat === cat);

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <SectionHead badge="קו מוצר שני" title={p.name} sub={p.source} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {p.company.map((f) => (
            <div key={f.label} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-cyan-400" />{f.label}</span>
              <p className="text-sm font-bold text-white mt-1">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h3 className="text-lg font-bold text-white">קטלוג מכשירים ({p.catalog.length})</h3>
          <div className="flex flex-wrap gap-1.5 items-center">
            <Filter className="w-4 h-4 text-slate-500" />
            {cats.map((c) => {
              const cls = c === cat ? 'bg-orange-500 text-black border-orange-500' : 'bg-slate-900 text-slate-300 border-slate-700';
              return <button key={c} onClick={() => setCat(c)} className={`text-xs px-2.5 py-1 rounded-full border transition ${cls}`}>{c}</button>;
            })}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((d) => <DeviceCard key={d.en} d={d} />)}
        </div>
      </div>
    </div>
  );
}
