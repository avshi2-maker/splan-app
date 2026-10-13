'use client';
// HeaderClock (app/components/HeaderClock.jsx) · updated 13.10.2026 15:05 (Asia/Jerusalem)
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const pad = (n) => String(n).padStart(2, '0');

function israelNow() {
  const s = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
  return new Date(s);
}

export default function HeaderClock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(israelNow());
    const t = setInterval(() => setNow(israelNow()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return <div className="w-[150px] h-[42px]" />;

  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
      <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
      <div className="leading-tight text-left" dir="ltr">
        <div className="font-mono text-sm sm:text-base font-bold text-white tabular-nums tracking-wider">{time}</div>
        <div className="text-[10px] sm:text-[11px] text-slate-400 text-right" dir="rtl">יום {DAYS[now.getDay()]} · {date}</div>
      </div>
    </div>
  );
}
