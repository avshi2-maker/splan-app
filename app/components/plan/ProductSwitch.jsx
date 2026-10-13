'use client';
// ProductSwitch (app/components/plan/ProductSwitch.jsx) · updated 13.10.2026 15:20 (Asia/Jerusalem)
import React from 'react';
import { Layers, Sun } from 'lucide-react';

const OPTS = [
  { id: 'mirror', label: 'מראת כושר', icon: Layers },
  { id: 'infrared', label: 'אינפרא אדום', icon: Sun },
];

export default function ProductSwitch({ value, onChange, status }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
        {OPTS.map((o) => {
          const on = o.id === value;
          const Icon = o.icon;
          const cls = on ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-black' : 'text-slate-300 hover:text-white';
          return (
            <button key={o.id} onClick={() => onChange(o.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition ${cls}`}>
              <Icon className="w-4 h-4" /> {o.label}
            </button>
          );
        })}
      </div>
      {status && <span className="text-xs text-slate-400">סטטוס: {status}</span>}
    </div>
  );
}
