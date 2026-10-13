'use client';
// FinanceTab (app/components/plan/FinanceTab.jsx) · updated 13.10.2026 15:20 (Asia/Jerusalem)
import React, { useEffect, useState } from 'react';
import { Coins, RotateCcw, Printer } from 'lucide-react';
import { Ph, SectionHead, shekel } from './Placeholder';

const YEARS = ['שנה 1', 'שנה 2', 'שנה 3'];
const toStr = (v) => (v === null || v === undefined ? '' : String(v));
const num = (s) => (s === '' || s === null || s === undefined ? null : Number(s));

function initFrom(f) {
  return { price: toStr(f.price), cost: toStr(f.cost), units: f.units.map(toStr), marketing: f.marketing.map(toStr), opex: f.opex.map(toStr) };
}

export default function FinanceTab({ productId, p }) {
  const key = `splan_fin_${productId}`;
  const [d, setD] = useState(() => initFrom(p.finance));

  useEffect(() => {
    try {
      const s = localStorage.getItem(key);
      setD(s ? JSON.parse(s) : initFrom(p.finance));
    } catch (e) { setD(initFrom(p.finance)); }
  }, [key]);

  const save = (next) => { setD(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch (e) {} };
  const setTop = (k, v) => save({ ...d, [k]: v });
  const setArr = (k, i, v) => { const a = [...d[k]]; a[i] = v; save({ ...d, [k]: a }); };
  const reset = () => { try { localStorage.removeItem(key); } catch (e) {} setD(initFrom(p.finance)); };

  const price = num(d.price);
  const cost = num(d.cost);
  const rows = YEARS.map((y, i) => {
    const u = num(d.units[i]);
    const mk = num(d.marketing[i]);
    const ox = num(d.opex[i]);
    const revenue = u !== null && price !== null ? u * price : null;
    const gross = u !== null && price !== null && cost !== null ? u * (price - cost) : null;
    const net = gross !== null && mk !== null && ox !== null ? gross - mk - ox : null;
    return { y, revenue, gross, net };
  });
  let cum = 0;
  const cumul = rows.map((r) => { if (r.net === null || cum === null) { cum = null; return null; } cum += r.net; return cum; });
  const margin = price && cost !== null ? Math.round(((price - cost) / price) * 100) : null;
  const maxRev = Math.max(1, ...rows.map((r) => Math.abs(r.revenue || 0)), ...rows.map((r) => Math.abs(r.net || 0)));

  const inCls = 'w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white text-left focus:outline-none focus:border-cyan-500 placeholder:text-amber-500/60';
  const inp = (val, on) => <input type="number" inputMode="numeric" value={val} onChange={(e) => on(e.target.value)} placeholder="ממתין" className={inCls} dir="ltr" />;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <SectionHead badge="מודל פיננסי" title={`תחזית 3 שנים – ${p.short}`} sub="הזן הנחות – החישוב מתעדכן מיד ונשמר בדפדפן" />
        <div className="flex gap-2 print:hidden">
          <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200"><Printer className="w-4 h-4" />הדפס / PDF</button>
          <button onClick={reset} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200"><RotateCcw className="w-4 h-4" />איפוס</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <label className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-2"><span>מחיר מכירה ליחידה (₪)</span>{inp(d.price, (v) => setTop('price', v))}</label>
        <label className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-2"><span>עלות ליחידה (₪)</span>{inp(d.cost, (v) => setTop('cost', v))}</label>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs text-slate-400"><span>רווח גולמי ליחידה</span><div className="text-xl font-extrabold text-white mt-2"><Ph v={margin !== null ? `${shekel(price - cost)} · ${margin}%` : null} /></div></div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm min-w-[560px]">
          <thead className="bg-slate-900 text-slate-400 text-xs">
            <tr><th className="text-right p-3 w-40">הנחה / תוצאה</th>{YEARS.map((y) => <th key={y} className="text-right p-3">{y}</th>)}</tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-t border-slate-800"><td className="p-3">יחידות נמכרות</td>{YEARS.map((y, i) => <td key={y} className="p-2">{inp(d.units[i], (v) => setArr('units', i, v))}</td>)}</tr>
            <tr className="border-t border-slate-800"><td className="p-3">תקציב שיווק (₪)</td>{YEARS.map((y, i) => <td key={y} className="p-2">{inp(d.marketing[i], (v) => setArr('marketing', i, v))}</td>)}</tr>
            <tr className="border-t border-slate-800"><td className="p-3">הוצאות קבועות (₪)</td>{YEARS.map((y, i) => <td key={y} className="p-2">{inp(d.opex[i], (v) => setArr('opex', i, v))}</td>)}</tr>
            <tr className="border-t border-slate-700 bg-slate-900/50"><td className="p-3 font-bold text-white">הכנסות</td>{rows.map((r) => <td key={r.y} className="p-3 font-bold text-white"><Ph v={shekel(r.revenue)} /></td>)}</tr>
            <tr className="border-t border-slate-800 bg-slate-900/50"><td className="p-3">רווח גולמי</td>{rows.map((r) => <td key={r.y} className="p-3"><Ph v={shekel(r.gross)} /></td>)}</tr>
            <tr className="border-t border-slate-800 bg-slate-900/50"><td className="p-3 font-bold text-white">רווח תפעולי</td>{rows.map((r) => <td key={r.y} className={`p-3 font-bold ${r.net < 0 ? 'text-rose-400' : 'text-emerald-400'}`}><Ph v={shekel(r.net)} /></td>)}</tr>
            <tr className="border-t border-slate-800 bg-slate-900/50"><td className="p-3">מצטבר</td>{cumul.map((c, i) => <td key={i} className="p-3"><Ph v={shekel(c)} /></td>)}</tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Coins className="w-5 h-5 text-cyan-400" />הכנסות מול רווח תפעולי</h3>
        <div className="grid grid-cols-3 gap-4 items-end h-48 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          {rows.map((r) => {
            const hR = r.revenue ? Math.max(4, (Math.abs(r.revenue) / maxRev) * 130) : 4;
            const hN = r.net ? Math.max(4, (Math.abs(r.net) / maxRev) * 130) : 4;
            const netCls = r.net < 0 ? 'bg-rose-500' : 'bg-emerald-500';
            return (
              <div key={r.y} className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1.5 h-[130px]">
                  <div className="w-6 rounded-t bg-cyan-500" style={{ height: hR }} title="הכנסות" />
                  <div className={`w-6 rounded-t ${netCls}`} style={{ height: hN }} title="רווח תפעולי" />
                </div>
                <span className="text-xs text-slate-400">{r.y}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 text-xs text-slate-400 mt-2"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cyan-500" />הכנסות</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" />רווח תפעולי</span></div>
      </div>
    </div>
  );
}
