'use client';
// GtmTab (app/components/plan/GtmTab.jsx) · updated 13.10.2026 15:20 (Asia/Jerusalem)
import React from 'react';
import { Rocket, Megaphone, CalendarRange } from 'lucide-react';
import { Ph, SectionHead, EmptyList } from './Placeholder';

export default function GtmTab({ p }) {
  const g = p.gtm;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8">
      <SectionHead badge="Go-To-Market" title={`תוכנית חדירה לשוק – ${p.short}`} sub="שלבי השקה, ערוצי מכירה ויעדים רבעוניים · הפעולות הן הצעה לאישור ירון" />

      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Rocket className="w-5 h-5 text-cyan-400" />שלבי השקה</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {g.phases.map((ph, i) => (
            <div key={ph.name} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 relative">
              <div className="absolute -top-3 right-4 w-7 h-7 rounded-full bg-cyan-500 text-black font-bold text-sm flex items-center justify-center">{i + 1}</div>
              <h4 className="font-bold text-white mt-2">{ph.name}</h4>
              <p className="text-xs text-cyan-400 mb-3">{ph.period}</p>
              {ph.actions.length ? (
                <ul className="space-y-1.5">{ph.actions.map((a) => <li key={a} className="text-sm text-slate-300 flex gap-2"><span className="text-cyan-500">•</span>{a}</li>)}</ul>
              ) : <EmptyList text="ממתין לפעולות" />}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Megaphone className="w-5 h-5 text-cyan-400" />ערוצי מכירה ושיווק</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-slate-400 text-xs">
              <tr><th className="text-right p-3">ערוץ</th><th className="text-right p-3">תיאור</th><th className="text-right p-3">חלק מתקציב השיווק</th></tr>
            </thead>
            <tbody>
              {g.channels.map((c, i) => (
                <tr key={i} className="border-t border-slate-800 text-slate-300">
                  <td className="p-3 font-bold text-white"><Ph v={c.name} /></td>
                  <td className="p-3"><Ph v={c.desc} /></td>
                  <td className="p-3"><Ph v={c.share} suffix="%" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><CalendarRange className="w-5 h-5 text-cyan-400" />יעדים – שנה ראשונה</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {g.quarters.map((q) => (
            <div key={q.q} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <div className="text-sm font-bold text-white mb-2">{q.q}</div>
              <div className="text-xs text-slate-400 flex justify-between gap-2 mb-1"><span>לידים</span><Ph v={q.leads} /></div>
              <div className="text-xs text-slate-400 flex justify-between gap-2"><span>יחידות</span><Ph v={q.units} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
