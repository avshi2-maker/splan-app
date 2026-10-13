'use client';
// ExclusiveBanner (app/components/ExclusiveBanner.jsx) · updated 13.10.2026 15:25 (Asia/Jerusalem)
import React, { useEffect, useState } from 'react';
import { Crown, BookOpen, X } from 'lucide-react';

const STEPS = [
  { t: 'ניווט', d: 'הלשוניות בראש העמוד מובילות לכל פרקי התוכנית: תמצית, מוצר, שוק ותחרות, Go-To-Market, מודל פיננסי, מכשירי אינפרא אדום, סימולטור ומחשבון ROI.' },
  { t: 'בחירת קו מוצר', d: 'בלשוניות שוק ותחרות, Go-To-Market ומודל פיננסי יש מתג בראש הדף: מראת כושר / אינפרא אדום. כל התוכן מתחלף לפי המוצר שנבחר.' },
  { t: 'סימון כתום "ממתין לנתונים"', d: 'כל מקום מסומן כך הוא נתון שחסר וצריך ממך – מחירים, עלויות, יעדים ומתחרים.' },
  { t: 'מודל פיננסי', d: 'הקלד מחיר מכירה, עלות ליחידה, יחידות, תקציב שיווק והוצאות קבועות לכל שנה – הכנסות ורווח מחושבים מיד. הנתונים נשמרים רק בדפדפן שלך, לכן שלח אותם אליי דרך כפתור משוב.' },
  { t: 'כפתור משוב (כתום, למטה משמאל)', d: 'זמין בכל עמוד. בחר סוג – הערה / בקשת שינוי / שאלה / רעיון, כתוב ולחץ וואטסאפ או Gmail. ההודעה נפתחת מוכנה עם שם העמוד – רק ללחוץ שלח.' },
  { t: 'הדפסה ו-PDF', d: 'כפתור הדפסה במודל הפיננסי ובמחשבון ROI – בחר "שמור כ-PDF" בחלון ההדפסה.' },
  { t: 'גרסה ועדכונים', d: 'מתחת לשעון מופיע מספר הגרסה ומספר העדכון. כל שינוי שאני מעלה מעלה את המספר – כך תדע שאתה רואה את הגרסה האחרונה (אם לא – רענן את הדף).' },
  { t: 'נייד', d: 'האפליקציה מותאמת לטלפון – אפשר לעבור ולהגיב גם מהנייד.' },
];

export default function ExclusiveBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="bg-gradient-to-l from-amber-500/15 via-amber-500/5 to-transparent border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-amber-300">
            <Crown className="w-5 h-5 shrink-0" /> תוכנית עסקית ירון ליבנה – בלעדי
          </p>
          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shrink-0">
            <BookOpen className="w-4 h-4" /> מדריך שימוש
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0F1522] border border-slate-700 shadow-2xl p-6" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-amber-400" />מדריך קצר לירון</h3>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <ol className="space-y-3">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex gap-3">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{s.t}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-xs text-slate-500 mt-5 border-t border-slate-800 pt-3">שאלות? כפתור משוב או וואטסאפ לאבשי – 050-5231042</p>
          </div>
        </div>
      )}
    </>
  );
}
