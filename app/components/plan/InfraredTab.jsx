'use client';
// InfraredTab (app/components/plan/InfraredTab.jsx) · updated 13.10.2026 15:40 (Asia/Jerusalem)
import React, { useState } from 'react';
import { Building2, ClipboardList, Send, Mail, Filter } from 'lucide-react';
import { SectionHead } from './Placeholder';
import DeviceCard from './DeviceCard';

export default function InfraredTab({ p, request }) {
  const cats = ['הכל', ...Array.from(new Set(p.catalog.map((d) => d.cat)))];
  const [cat, setCat] = useState('הכל');
  const list = cat === 'הכל' ? p.catalog : p.catalog.filter((d) => d.cat === cat);

  const msg = `שלום ירון,\nקלטתי את 13 המכשירים מאתר קייפטאון לתוכנית העסקית ותוכנית ה-Go-To-Market. כדי להשלים את המודל הפיננסי אשמח לקבל:\n\n${request.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nתודה,\nאבשי ספיר`;
  const wa = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  const gm = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent('בקשת נתונים – תוכנית עסקית אינפרא אדום ומראת כושר')}&body=${encodeURIComponent(msg)}`;

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

      <div className="glass-card rounded-2xl p-6 sm:p-8 border-amber-500/30">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4"><ClipboardList className="w-5 h-5 text-amber-400" />עדיין חסר מירון ליבנה</h3>
        <ol className="space-y-2 mb-6">
          {request.map((r, i) => (
            <li key={r} className="flex gap-3 text-sm text-slate-300">
              <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</span>{r}
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-2">
          <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-black text-sm font-bold"><Send className="w-4 h-4" />שלח בקשה בוואטסאפ</a>
          <a href={gm} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 text-black text-sm font-bold"><Mail className="w-4 h-4" />שלח בקשה ב-Gmail</a>
        </div>
      </div>
    </div>
  );
}
