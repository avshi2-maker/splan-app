'use client';
// login page (app/login/page.jsx) · updated 13.10.2026 15:55 (Asia/Jerusalem)
import React, { useState } from 'react';
import { Lock, Mail, KeyRound, LogIn, Crown } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, pass }) });
      if (r.ok) { window.location.href = '/'; return; }
      setErr(r.status === 503 ? 'הכניסה אינה מוגדרת בשרת – פנה לאבשי' : 'אימייל או סיסמה שגויים');
    } catch (e2) {
      setErr('שגיאת תקשורת – נסה שוב');
    }
    setBusy(false);
  };

  const inputCls = 'w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-500';

  return (
    <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center p-4" dir="rtl">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-[#0F1522] border border-slate-800 shadow-2xl p-7 space-y-5">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Lock className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-xl font-extrabold text-white">SPlan – תוכנית עסקית</h1>
          <p className="text-sm text-amber-300 font-bold flex items-center justify-center gap-1.5"><Crown className="w-4 h-4" />בלעדי לירון ליבנה</p>
        </div>

        <label className="block relative">
          <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="אימייל" autoComplete="username" required className={inputCls} dir="ltr" />
        </label>

        <label className="block relative">
          <KeyRound className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="סיסמה" autoComplete="current-password" required className={inputCls} dir="ltr" />
        </label>

        {err && <p className="text-sm text-rose-400 text-center">{err}</p>}

        <button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black font-bold disabled:opacity-50">
          <LogIn className="w-4 h-4" /> {busy ? 'בודק...' : 'כניסה'}
        </button>

        <p className="text-[11px] text-slate-500 text-center">© ירון ליבנה – כל הזכויות שמורות · אין להעתיק</p>
      </form>
    </div>
  );
}
