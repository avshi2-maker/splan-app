'use client';
// DeviceCard (app/components/plan/DeviceCard.jsx) · updated 13.10.2026 15:40 (Asia/Jerusalem)
import React from 'react';
import { Sun, Timer, Tag, Users } from 'lucide-react';
import { Ph } from './Placeholder';

export default function DeviceCard({ d }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-3 hover:border-orange-500/40 transition">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-bold text-white leading-snug">{d.name}</h4>
          <p className="text-[11px] text-slate-500" dir="ltr">{d.en}</p>
        </div>
        <span className="text-[10px] font-bold text-orange-300 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full whitespace-nowrap">{d.cat}</span>
      </div>

      <ul className="space-y-1 flex-1">
        {d.specs.map((s) => (
          <li key={s} className="text-xs text-slate-300 flex gap-1.5"><Sun className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />{s}</li>
        ))}
      </ul>

      <p className="text-xs text-cyan-300 flex gap-1.5"><Users className="w-3.5 h-3.5 shrink-0 mt-0.5" />{d.fit}</p>

      <div className="border-t border-slate-800 pt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400"><Timer className="w-3.5 h-3.5" /><Ph v={d.session} /></div>
        <div className="flex items-center gap-1.5 text-slate-400"><Tag className="w-3.5 h-3.5" /><span className="text-white font-bold"><Ph v={d.price} /></span></div>
      </div>
    </div>
  );
}
