'use client';
// InfraredTab (app/components/plan/InfraredTab.jsx) · updated 13.10.2026 15:20 (Asia/Jerusalem)
import React from 'react';
import { Sun, ClipboardList, Send, Mail } from 'lucide-react';
import { Ph, SectionHead } from './Placeholder';

export default function InfraredTab({ p, request }) {
  const msg = `שלום ירון,\nכדי להשלים את התוכנית העסקית ותוכנית ה-Go-To-Market למכשירי האינפרא אדום ולמראת הכושר, אשמח לקבל:\n\n${request.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nתודה,\nאבשי ספיר`;
  const wa = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  const gm = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent('בקשת נתונים – תוכנית עסקית אינפרא אדום ומראת כושר')}&body=${encodeURIComponent(msg)}`;

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <SectionHead badge="קו מוצר שני" title={p.name} sub={p.status} />
        <div className="grid sm:grid-cols-2 gap-3">
          {p.profile.map((f) => (
            <div key={f.label} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-3">
              <span className="text-sm text-slate-300 flex items-center gap-2"><Sun className="w-4 h-4 text-orange-400 shrink-0" />{f.label}</span>
              <span className="text-sm font-bold text-white text-left"><Ph v={f.value} /></span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border-amber-500/30">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4"><ClipboardList className="w-5 h-5 text-amber-400" />נתונים נדרשים מירון ליבנה</h3>
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
