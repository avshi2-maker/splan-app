'use client';
// Placeholder (app/components/plan/Placeholder.jsx) · updated 13.10.2026 15:20 (Asia/Jerusalem)
import React from 'react';
import { Hourglass } from 'lucide-react';

export function Ph({ v, suffix = '', prefix = '' }) {
  if (v === null || v === undefined || v === '') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-dashed border-amber-500/40 px-2 py-0.5 rounded-full whitespace-nowrap">
        <Hourglass className="w-3 h-3" /> ממתין לנתונים
      </span>
    );
  }
  return <span>{prefix}{v}{suffix}</span>;
}

export function SectionHead({ badge, title, sub }) {
  return (
    <div className="mb-6">
      {badge && <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{badge}</span>}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">{title}</h2>
      {sub && <p className="text-sm text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

export function EmptyList({ text = 'ממתין לנתונים מירון ליבנה' }) {
  return (
    <div className="border border-dashed border-amber-500/40 bg-amber-500/5 rounded-xl p-4 text-sm text-amber-400 flex items-center gap-2">
      <Hourglass className="w-4 h-4" /> {text}
    </div>
  );
}

export const shekel = (n) => (n === null || n === undefined || Number.isNaN(n) ? null : `₪${Math.round(n).toLocaleString('he-IL')}`);
