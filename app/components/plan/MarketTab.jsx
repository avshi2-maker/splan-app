'use client';
// MarketTab (app/components/plan/MarketTab.jsx) · updated 13.10.2026 15:20 (Asia/Jerusalem)
import React from 'react';
import { TrendingUp, Target, Swords, Star } from 'lucide-react';
import { Ph, SectionHead, EmptyList } from './Placeholder';

export default function MarketTab({ p }) {
  const m = p.market;
  const sizes = [m.tam, m.sam, m.som];

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8">
      <SectionHead badge="ניתוח שוק" title={`שוק ותחרות – ${p.short}`} sub="גודל שוק, מגמות, מתחרים ויתרון יחסי" />

      <div className="grid sm:grid-cols-3 gap-4">
        {sizes.map((s) => (
          <div key={s.label} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs text-slate-400"><Target className="w-4 h-4 text-cyan-400" />{s.label}</div>
            <div className="text-2xl font-extrabold text-white mt-2"><Ph v={s.value} /></div>
            <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><TrendingUp className="w-5 h-5 text-cyan-400" />מגמות שוק</h3>
        {m.trends.length ? (
          <ul className="grid sm:grid-cols-2 gap-2">
            {m.trends.map((t) => <li key={t} className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300">{t}</li>)}
          </ul>
        ) : <EmptyList />}
      </div>

      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Swords className="w-5 h-5 text-cyan-400" />מתחרים</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-slate-400 text-xs">
              <tr><th className="text-right p-3">מתחרה</th><th className="text-right p-3">סוג</th><th className="text-right p-3">מחיר</th><th className="text-right p-3">חולשה / הערה</th></tr>
            </thead>
            <tbody>
              {m.competitors.map((c, i) => (
                <tr key={i} className="border-t border-slate-800 text-slate-300">
                  <td className="p-3 font-bold text-white"><Ph v={c.name} /></td>
                  <td className="p-3"><Ph v={c.type} /></td>
                  <td className="p-3"><Ph v={c.price} /></td>
                  <td className="p-3"><Ph v={c.edge} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Star className="w-5 h-5 text-cyan-400" />היתרון היחסי שלנו</h3>
        {m.usp.length ? (
          <ul className="space-y-2">
            {m.usp.map((u) => <li key={u} className="flex gap-2 text-sm text-slate-300"><span className="text-emerald-400">✔</span>{u}</li>)}
          </ul>
        ) : <EmptyList />}
      </div>
    </div>
  );
}
