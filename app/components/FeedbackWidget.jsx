'use client';
// FeedbackWidget (app/components/FeedbackWidget.jsx) · updated 13.10.2026 15:05 (Asia/Jerusalem)
import React, { useEffect, useState } from 'react';
import { MessageSquarePlus, X, Send, Mail } from 'lucide-react';

const WA_NUMBER = '972505231042';
const GMAIL_TO = 'avshi2@gmail.com';
const TYPES = ['הערה', 'בקשת שינוי', 'שאלה', 'רעיון / תוספת'];
const pad = (n) => String(n).padStart(2, '0');

function stamp() {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function FeedbackWidget({ pageLabel }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('ירון ליבנה');
  const [type, setType] = useState(TYPES[0]);
  const [text, setText] = useState('');
  const [sent, setSent] = useState('');

  useEffect(() => { setSent(''); }, [pageLabel, open]);

  const body = () =>
    `משוב על אפליקציית SPlan\n` +
    `עמוד: ${pageLabel}\n` +
    `סוג: ${type}\n` +
    `מאת: ${name}\n` +
    `תאריך: ${stamp()}\n\n` +
    `${text.trim()}`;

  const canSend = text.trim().length > 0;

  const sendWhatsApp = () => {
    if (!canSend) return;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body())}`, '_blank');
    setSent('נפתח וואטסאפ – לחץ שלח בוואטסאפ');
  };

  const sendGmail = () => {
    if (!canSend) return;
    const su = `משוב SPlan – ${pageLabel} – ${type}`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_TO}&su=${encodeURIComponent(su)}&body=${encodeURIComponent(body())}`, '_blank');
    setSent('נפתח Gmail – לחץ שלח במייל');
  };

  const fabCls = 'fixed bottom-5 left-5 z-[60] flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-black font-bold text-sm shadow-xl shadow-orange-500/30 hover:scale-105 transition';
  const panelCls = 'fixed bottom-20 left-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl bg-[#0F1522] border border-slate-700 shadow-2xl p-4 space-y-3';
  const inputCls = 'w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500';

  return (
    <>
      <button onClick={() => setOpen(!open)} className={fabCls} title={`משוב על עמוד: ${pageLabel}`}>
        {open ? <X className="w-4 h-4" /> : <MessageSquarePlus className="w-4 h-4" />}
        <span>משוב</span>
      </button>

      {open && (
        <div className={panelCls} dir="rtl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">משוב / בקשת שינוי</h3>
            <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">{pageLabel}</span>
          </div>

          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="שם" />

          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => {
              const on = t === type;
              const cls = on ? 'bg-amber-500 text-black border-amber-500' : 'bg-slate-900 text-slate-300 border-slate-700';
              return (
                <button key={t} onClick={() => setType(t)} className={`text-xs px-2.5 py-1 rounded-full border transition ${cls}`}>{t}</button>
              );
            })}
          </div>

          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className={inputCls} placeholder="כתוב כאן את ההערה או השינוי המבוקש לעמוד זה..." />

          <div className="grid grid-cols-2 gap-2">
            <button onClick={sendWhatsApp} disabled={!canSend} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black text-sm font-bold transition">
              <Send className="w-4 h-4" /> וואטסאפ
            </button>
            <button onClick={sendGmail} disabled={!canSend} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 disabled:opacity-40 text-black text-sm font-bold transition">
              <Mail className="w-4 h-4" /> Gmail
            </button>
          </div>

          {sent && <p className="text-xs text-emerald-400 text-center">{sent}</p>}
          <p className="text-[10px] text-slate-500 text-center">ההודעה תישלח לאבשי ספיר · 050-5231042</p>
        </div>
      )}
    </>
  );
}
