'use client';
// CopyrightFooter (app/components/CopyrightFooter.jsx) · updated 13.10.2026 15:05 (Asia/Jerusalem)
import React, { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function CopyrightFooter() {
  // Copy deterrent: block right-click menu, copy and drag of content (form fields stay usable)
  useEffect(() => {
    const isField = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    const block = (e) => { if (!isField(e.target)) e.preventDefault(); };
    document.addEventListener('contextmenu', block);
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('dragstart', block);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('dragstart', block);
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p className="font-semibold text-slate-300">© {year} ירון ליבנה – כל הזכויות שמורות <span className="text-slate-600 font-normal mr-2">v1.1.0</span></p>
        <p className="flex items-center gap-1.5 text-rose-400 font-bold">
          <ShieldAlert className="w-4 h-4" />
          אין להעתיק, לשכפל, להפיץ או לעשות כל שימוש בתוכן ללא אישור בכתב מירון ליבנה
        </p>
      </div>
    </footer>
  );
}
