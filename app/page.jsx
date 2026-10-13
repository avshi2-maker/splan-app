'use client';
// page (app/page.jsx) · updated 13.10.2026 15:05 (Asia/Jerusalem)

import React, { useState, useEffect } from 'react';
import businessData from '../public/business_plan.json';
import HeaderClock from './components/HeaderClock';
import FeedbackWidget from './components/FeedbackWidget';
import CopyrightFooter from './components/CopyrightFooter';
import { 
  Activity, Dumbbell, ShieldCheck, Zap, Maximize2, Layers, 
  Users, TrendingUp, Phone, Mail, MapPin, Globe, CheckCircle2, 
  Cpu, Sparkles, Calculator, ChevronRight, HelpCircle, ExternalLink,
  Printer, Play, RotateCcw, Award, Flame, Gauge, ArrowUpRight, Copy, Check,
  Send, MessageSquare, Bookmark, Trash2, Download, Save, FileText
} from 'lucide-react';

const TABS = [
              { id: 'summary', label: 'תמצית מנהלים', icon: Sparkles },
              { id: 'product', label: 'מוצר וטכנולוגיה', icon: Cpu },
              { id: 'problem_solution', label: 'אתגר ופתרון', icon: ShieldCheck },
              { id: 'simulator', label: 'סימולטור אימונים', icon: Dumbbell, highlight: true },
              { id: 'calculator', label: 'מחשבון ROI ושטח', icon: Calculator },
              { id: 'audience', label: 'קהל יעד ומסע לקוח', icon: Users },
              { id: 'contact', label: 'יבואן ויצירת קשר', icon: MapPin },
            ];

export default function SPlanBusinessPlanApp() {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedMode, setSelectedMode] = useState(0);

  // ROI Calculator State
  const [unitsCount, setUnitsCount] = useState(2);
  const [sqmPrice, setSqmPrice] = useState(120);
  const [traditionalGymSqm, setTraditionalGymSqm] = useState(45);

  // Workout Simulator State
  const [simMuscle, setSimMuscle] = useState('chest');
  const [simWeight, setSimWeight] = useState(35);
  const [simMode, setSimMode] = useState(0); // 0: Standard, 1: Eccentric, 2: Isokinetic, 3: Fluid
  const [simReps, setSimReps] = useState(10);

  const plan = businessData.business_plan;

  // ROI Calculations
  const splanRequiredSqm = unitsCount * 3;
  const savedSqm = Math.max(0, traditionalGymSqm - splanRequiredSqm);
  const monthlyRealEstateSavings = savedSqm * sqmPrice;
  const yearlyRealEstateSavings = monthlyRealEstateSavings * 12;
  const threeYearSavings = yearlyRealEstateSavings * 3;

  const contact = plan.go_to_market_and_operations.importer_details.contact;

  // Lead Generation & Saved Simulations State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSegment, setLeadSegment] = useState('B2C - שוק ביתי פרימיום');
  const [leadNotes, setLeadNotes] = useState('אשמח לתאם הדגמה חיה באולם התצוגה בחיפה ולקבל הצעת מחיר מפורטת.');
  const [includeRoiInLead, setIncludeRoiInLead] = useState(true);
  const [copiedWhatsAppMsg, setCopiedWhatsAppMsg] = useState(false);
  const [savedSimulations, setSavedSimulations] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('splan_saved_simulations');
      if (stored) setSavedSimulations(JSON.parse(stored));
    } catch (e) { console.error(e); }
  }, []);

  const saveSimulation = (type, title, details) => {
    const newSim = { id: Date.now(), type, title, date: new Date().toLocaleDateString('he-IL'), details };
    const updated = [newSim, ...savedSimulations];
    setSavedSimulations(updated);
    try { localStorage.setItem('splan_saved_simulations', JSON.stringify(updated)); } catch (e) {}
    setToastMsg(`הסימולציה "${title}" שנשמרה בהצלחה!`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const deleteSimulation = (id) => {
    const updated = savedSimulations.filter(s => s.id !== id);
    setSavedSimulations(updated);
    try { localStorage.setItem('splan_saved_simulations', JSON.stringify(updated)); } catch (e) {}
  };

  const buildWhatsAppMessage = () => {
    let msg = `שלום חברת קייפטאון (יבואן SPlan Model Y),\n\n`;
    msg += `ברצוני לקבל מידע נוסף והצעת מחיר עבור מערכת SPlan Model Y.\n\n`;
    msg += `📋 *פרטי הפנייה:*\n• שם: ${leadName || 'לא צוין'}\n• טלפון: ${leadPhone || 'לא צוין'}\n• מגזר: ${leadSegment}\n• כמות יחידות: ${unitsCount}\n\n`;
    if (includeRoiInLead) {
      msg += `📊 *נתוני ROI מהמחשבון:*\n• שטח נחסך: ${savedSqm} מ"ר\n• חיסכון שנתי: ₪${yearlyRealEstateSavings.toLocaleString()}\n\n`;
    }
    if (leadNotes) msg += `💬 *הודעה:* ${leadNotes}\n\n`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    const cleanPhone = contact.whatsapp.replace(/[^0-9]/g, '');
    const prefix = 'https://' + 'wa.me/972';
    const waUrl = prefix + (cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone) + "?text=" + encodeURIComponent(msg);
    window.open(waUrl, '_blank');
  };


  // Muscle Group Simulator Data
  const muscleGroups = {
    chest: {
      name: 'חזה וכתף קדמית',
      exercise: 'לחיצת חזה עם מוט ברבל / ידיות אחיזה',
      accessory: 'ספת כושר מתכווננת + מוט ברבל (x2) / ידיות אחיזה',
      caloriesPerMin: 8.5,
      tip: 'במצב Eccentric העומס השלילי עולה אוטומטית ב-30% לגירוי היפרטרופיה מקסימלי ללא צורך במאמן שישמור.'
    },
    back: {
      name: 'גב ורחב גבי (Lats)',
      exercise: 'חתירה בישיבה / משיכת פולי עליון',
      accessory: 'מוט T (x1) / ידיות אחיזה (x2) / ספת כושר',
      caloriesPerMin: 9.2,
      tip: 'מנוע ה-PMSM מבטיח מתח אקטיבי רציף לאורך כל טווח התנועה ללא השאירויות ונקודות מתות.'
    },
    legs: {
      name: 'רגליים וארבע ראשי',
      exercise: 'סקוואט עם מוט ברבל / מכרעיים קדמיים',
      accessory: 'מוטות ברבל (x2) + רצועות רגליים (x2)',
      caloriesPerMin: 11.0,
      tip: 'מצב Isokinetic מתאים אינטליגנטית את ההתנגדות למהירות התקף התנועה של המתאמן.'
    },
    shoulders: {
      name: 'כתפיים וטרפזים',
      exercise: 'לחיצת כתפיים בישיבה / הרחקת זרועות',
      accessory: 'ידיות אחיזה (x2) / תושבות Y',
      caloriesPerMin: 7.8,
      tip: 'השתמש בכפתור ה-Bluetooth Smart Button לשחרור מיידי של המשקל בלחיצה בסיום הסט.'
    },
    arms: {
      name: 'זרועות (ביצפס / טריצפס)',
      exercise: 'פשטת מרפקים בחבל / כפילת מרפקים במוט T',
      accessory: 'חבל לאימון טריספס (x1) / מוט T (x1)',
      caloriesPerMin: 7.0,
      tip: 'עבודה מבודדת מדויקת מ-2 ק"ג ועד עומס גבוה, המונעת פציעות מרפקים ושורש כף יד.'
    },
    core: {
      name: 'בטן וליבה (Core)',
      exercise: 'רוטציות אלכסונים / קיפול בטן בעומס',
      accessory: 'ידיות אחיזה (x2) / רצועות (x2)',
      caloriesPerMin: 6.5,
      tip: 'מצב Fluid מספק תחושת התנגדות זורמת המפעילה את מייצבי הליבה העמוקים.'
    },
    glutes: {
      name: 'ישבן והמסטרינגס',
      exercise: 'דחיקת אגן (Hip Thrust) / דדליפט רומני',
      accessory: 'ספת כושר מתכווננת + מוט ברבל + משקל חכם',
      caloriesPerMin: 10.5,
      tip: 'סנכרון מלא עם המשקל החכם הכלול בערכה למעקב אחר שינויי מסת שריר ואחוז שומן.'
    }
  };

  const currentMuscle = muscleGroups[simMuscle] || muscleGroups.chest;

  // Simulator Computed Metrics
  const peakForceNewtons = Math.round(simWeight * 9.81);
  const eccentricWeight = simMode === 1 ? Math.round(simWeight * 1.3) : simWeight;
  const setVolumeKg = simWeight * simReps;
  const estCalories15Min = Math.round((currentMuscle.caloriesPerMin * (simWeight / 30)) * 15);
  const muscleActivationPct = Math.min(100, Math.round(70 + (simWeight / 100) * 22 + (simMode === 1 ? 8 : 0)));


  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <title>SPlan Model Y - דוח ניתוח ROI וחיסכון בשטח</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
          .header { border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 24px; font-weight: bold; color: #0284c7; }
          .title { font-size: 22px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { font-size: 14px; color: #64748b; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
          .card-title { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; }
          .card-value { font-size: 24px; font-weight: bold; color: #0f172a; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 30px; }
          th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: right; }
          th { background: #f1f5f9; font-weight: bold; }
          .highlight { background: #e0f2fe; color: #0369a1; font-weight: bold; }
          .footer { margin-top: 50px; border-top: 1px solid #e2e8f0; pt-20px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">SPlan Model Y - דוח כדאיות וחיסכון נדל"ני</div>
            <div class="subtitle">הופק ע"י אפליקציית התוכנית העסקית | היבואן הרשמי: קייפטאון</div>
          </div>
          <div class="logo">SPlan Y</div>
        </div>

        <div class="grid">
          <div class="card">
            <div class="card-title">יחידות SPlan מתוכננות</div>
            <div class="card-value">${unitsCount} יחידות</div>
          </div>
          <div class="card">
            <div class="card-title">שטח נדל"ן שנחסך במתחם</div>
            <div class="card-value">${savedSqm} מ"ר</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>פרמטר ניתוח</th>
              <th>ערך שנבחר</th>
              <th>תוצאה / חיסכון</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>שטח שהוקצה לחדר כושר מסורתי</td>
              <td>${traditionalGymSqm} מ"ר</td>
              <td>חלופת ציוד כבד</td>
            </tr>
            <tr>
              <td>שטח מבוקש למערכות SPlan (${unitsCount} יחידות)</td>
              <td>${splanRequiredSqm} מ"ר</td>
              <td>3 מ"ר בלבד ליחידה באימון</td>
            </tr>
            <tr>
              <td>עלות נדל"ן משוערת למ"ר</td>
              <td>₪${sqmPrice} / מ"ר בחודש</td>
              <td>בסיס חישוב חודשי</td>
            </tr>
            <tr class="highlight">
              <td>חיסכון נדל"ני חודשי משוער</td>
              <td>-</td>
              <td>₪${monthlyRealEstateSavings.toLocaleString()}</td>
            </tr>
            <tr class="highlight">
              <td>חיסכון נדל"ני שנתי מצטבר</td>
              <td>-</td>
              <td>₪${yearlyRealEstateSavings.toLocaleString()}</td>
            </tr>
            <tr class="highlight">
              <td>חיסכון מצטבר ל-3 שנים</td>
              <td>-</td>
              <td>₪${threeYearSavings.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div class="card">
          <div class="card-title">סיכום והמלצה מנהלית</div>
          <p style="font-size: 13px; margin-top: 8px;">
            התקנת ${unitsCount} יחידות SPlan Model Y מעניקה פתרון אימון מלא ל-250+ תרגילים בשטח של ${splanRequiredSqm} מ"ר בלבד, תוך שחרור ${savedSqm} מ"ר של נדל"ן יקר ערך. החיסכון הכספי המצטבר בנדל"ן לבדו מכסה את עלות המכשירים תוך חודשים ספורים.
          </p>
        </div>

        <div class="footer">
          קייפטאון – יבואן רשמי בלעדי SPlan Model Y | שד׳ ההסתדרות 236, חיפה | טלפון: ${contact.phone} | אתר: ${contact.website}
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 pb-16 font-sans" dir="rtl">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0A0E17]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl text-black shadow-lg shadow-cyan-500/20">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                SPlan Model Y
                <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-normal">
                  {plan.executive_summary.official_importer}
                </span>
              </h1>
              <p className="text-xs text-slate-400">תוכנית עסקית ומערכת ניהול מוצר</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HeaderClock />

            <a href={`tel:${contact.phone}`} className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{contact.phone}</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <nav className="flex space-x-1 space-x-reverse border-t border-slate-800/80 pt-2 pb-3">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : tab.highlight
                      ? 'text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {tab.label}
                  {tab.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* HERO STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
            <p className="text-xs text-slate-400 font-medium">התנגדות דיגיטלית</p>
            <p className="text-2xl font-extrabold text-white mt-1">2–100 <span className="text-sm font-normal text-cyan-400">ק"ג</span></p>
            <p className="text-[11px] text-slate-500 mt-1">ללא צלחות משקל ורעש</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
            <p className="text-xs text-slate-400 font-medium">חיסכון בשטח</p>
            <p className="text-2xl font-extrabold text-white mt-1">0.08 <span className="text-sm font-normal text-blue-400">מ"ר</span></p>
            <p className="text-[11px] text-slate-500 mt-1">תפוסת רצפה במצב מראה</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
            <p className="text-xs text-slate-400 font-medium">כוח חישוב מנוע</p>
            <p className="text-2xl font-extrabold text-white mt-1">10,000 <span className="text-sm font-normal text-purple-400">חישובים/שנייה</span></p>
            <p className="text-[11px] text-slate-500 mt-1">התאמת עומס מדויקת בזמן אמת</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
            <p className="text-xs text-slate-400 font-medium">תרגילים ומעקב</p>
            <p className="text-2xl font-extrabold text-white mt-1">250+ <span className="text-sm font-normal text-emerald-400">תרגילים</span></p>
            <p className="text-[11px] text-slate-500 mt-1">מאמן במסך + אפליקציה בנייד</p>
          </div>
        </div>

        {/* TAB 1: EXECUTIVE SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  {plan.executive_summary.title}
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-4 leading-tight">
                  {plan.executive_summary.vision}
                </h2>
                <p className="text-slate-300 mt-4 leading-relaxed text-base">
                  מערכת <strong className="text-cyan-300">SPlan Model Y</strong> משנה את תפיסת הכושר הביתית והמוסדית. המכשיר מחליף חדר כושר שלם התופס עשרות מטרים רבועים באמצעות מראת גוף יוקרתית צמודת קיר הכוללת טכנולוגיית מנוע מתקדמת, עומס דיגיטלי נשלט ומערכת אימון חכמה.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  עיקרי הבשורה העסקית
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plan.executive_summary.key_highlights.map((highlight, index) => (
                    <div key={index} className="glass-card p-4 rounded-xl flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-slate-200 leading-snug">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  גב תפעולי ויבואן בלעדי
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  הפתרון מופץ בישראל בלעדית על ידי חברת <strong className="text-white">{plan.executive_summary.official_importer}</strong>, המספקת מעטפת מקצה לקצה: החל מאולם תצוגה להתרשמות, דרך התקנה מקצועית צמודת קיר או סטנד, ועד הדרכה ואחריות מלאה לשנתיים.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  הזדמנות בשוק הנדל"ן והבוטיק
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  מעבר לשוק ה-B2C הביתי, המכשיר מהווה מנוע צמיחה עבור יזמי מגדלי מגורים, מלונות בוטיק ומתחמי משרדים הרוצים להציע מתחם כושר יוקרתי בעלות נמוכה ובניצול שטח מקסימלי.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT & TECH */}
        {activeTab === 'product' && (
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                    מפרט טכנולוגי ומנוע חשמלי
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">טכנולוגיית מנוע PMSM כפול מוגנת בלמעלה מ-40 פטנטים בינלאומיים</p>
                </div>
                <span className="bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs px-3 py-1.5 rounded-full font-medium">
                  {plan.product_and_technology.specifications.patents}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "מסך תצוגה", value: plan.product_and_technology.specifications.display, icon: Maximize2 },
                  { label: "טווח התנגדות", value: plan.product_and_technology.specifications.resistance_range, icon: Dumbbell },
                  { label: "טכנולוגיית מנוע", value: plan.product_and_technology.specifications.motor, icon: Cpu },
                  { label: "כוח חישוב מנוע", value: plan.product_and_technology.specifications.processing_power, icon: Activity },
                  { label: "מידות מכשיר", value: plan.product_and_technology.specifications.dimensions, icon: Layers },
                  { label: "משקל עצמי", value: plan.product_and_technology.specifications.weight, icon: Dumbbell },
                  { label: "משקל מתאמן מרבי", value: plan.product_and_technology.specifications.max_user_weight, icon: Users },
                  { label: "שטח מבוקש", value: plan.product_and_technology.specifications.space_required, icon: Maximize2 },
                ].map((spec, i) => {
                  const Icon = spec.icon;
                  return (
                    <div key={i} className="glass-card p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                        <Icon className="w-4 h-4" />
                        {spec.label}
                      </div>
                      <p className="text-sm font-bold text-white">{spec.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                4 מצבי התנגדות אימוניים חכמים
              </h3>
              <p className="text-xs text-slate-400 mb-6">לחץ על אחד המצבים כדי לראות את אופן הפעולה והערך הפיזיולוגי למתאמן</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {plan.product_and_technology.resistance_modes.map((mode, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMode(index)}
                    className={`p-4 rounded-xl text-right transition border ${
                      selectedMode === index
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/10'
                        : 'glass-card border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-400 uppercase">מצב {index + 1}</div>
                    <div className="text-lg font-bold text-white mt-1">{mode.mode}</div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    מצב נבחר: {plan.product_and_technology.resistance_modes[selectedMode].mode}
                  </span>
                  <p className="text-lg font-bold text-white mt-1">
                    {plan.product_and_technology.resistance_modes[selectedMode].description}
                  </p>
                </div>
                <div className="text-xs text-slate-400 bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
                  שליטה מלאה בלחיצת כפתור: <strong className="text-cyan-300">{plan.product_and_technology.control_system}</strong>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-cyan-400" />
                    ערכת 10 אביזרים נלווים מקיפה
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">כל האביזרים הנדרשים לביצוע למעלה מ-250 תרגילים מגוונים</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-full font-bold">
                  כלול בערכה המלאה
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {plan.product_and_technology.accessories_kit.items.map((item, idx) => (
                  <div key={idx} className="glass-card p-3.5 rounded-xl border border-slate-800/80 text-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                      #{idx + 1}
                    </div>
                    <p className="text-xs font-semibold text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROBLEM & SOLUTION */}
        {activeTab === 'problem_solution' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-white">אתגרי השוק מול פתרון SPlan Model Y</h2>
              <p className="text-xs text-slate-400 mt-2">השוואה יורדת לפרטים בין חדר כושר מסורתי למערכת הדיגיטלית החכמה</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-3xl border border-red-500/20 bg-red-950/10">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-red-400" />
                  האתגרים בציוד כושר מסורתי
                </h3>
                <div className="space-y-3">
                  {plan.market_problem_and_solution.problems.map((prob, i) => (
                    <div key={i} className="bg-slate-900/60 p-4 rounded-xl border border-red-500/10">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wider">{prob.category}</span>
                      <p className="text-sm text-slate-300 mt-1">{prob.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-cyan-950/10">
                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  הפתרון הדיגיטלי של SPlan
                </h3>
                <div className="space-y-3">
                  {plan.market_problem_and_solution.solutions.map((sol, i) => (
                    <div key={i} className="bg-slate-900/60 p-4 rounded-xl border border-cyan-500/20">
                      <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">{sol.feature}</span>
                      <p className="text-sm text-slate-200 mt-1">{sol.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NEW INTERACTIVE WORKOUT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  רכיב אינטראקטיבי חדש
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-3 flex items-center gap-3">
                  <Dumbbell className="w-7 h-7 text-cyan-400" />
                  סימולטור אימונים ועומס דיגיטלי בזמן אמת
                </h2>
                <p className="text-slate-300 mt-2 text-sm">
                  בחר קבוצת שרירים, כוונן את המשקל הדיגיטלי (2–100 ק"ג) והתאם את מצב ההתנגדות כדי לראות את חישובי המנוע, האביזרים המומלצים ומדדי הביצועים.
                </p>
              </div>

              {/* Muscle Selector Tabs */}
              <div className="mb-8">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">1. בחר קבוצת שרירים לאימון:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {Object.entries(muscleGroups).map(([key, group]) => {
                    const isSelected = simMuscle === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSimMuscle(key)}
                        className={`p-3 rounded-2xl text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 border ${
                          isSelected
                            ? 'bg-gradient-to-b from-cyan-500/30 to-blue-600/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                            : 'glass-card border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Activity className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="text-center">{group.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controls & Real-time Visualizer */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Sliders and Mode Selector */}
                <div className="lg:col-span-6 space-y-6 glass-card p-6 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-300">התנגדות דיגיטלית (ק"ג):</label>
                      <span className="text-2xl font-black text-cyan-400">{simWeight} <span className="text-xs text-slate-400">ק"ג</span></span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="100" 
                      value={simWeight} 
                      onChange={(e) => setSimWeight(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>2 ק"ג (מינימום)</span>
                      <span>50 ק"ג</span>
                      <span>100 ק"ג (עומס שיא)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">מצב התנגדות מנוע:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {plan.product_and_technology.resistance_modes.map((mode, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSimMode(idx)}
                          className={`p-3 rounded-xl text-right text-xs transition border ${
                            simMode === idx
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold">{mode.mode}</div>
                          <div className="text-[10px] text-slate-400 truncate">{mode.description.substring(0, 22)}...</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-300">חזרות מתוכננות לסט:</label>
                      <span className="text-lg font-bold text-white">{simReps} חזרות</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={simReps} 
                      onChange={(e) => setSimReps(Number(e.target.value))}
                      className="w-full accent-blue-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>
                </div>

                {/* Output Metrics & Exercise Card */}
                <div className="lg:col-span-6 space-y-4">
                  
                  {/* Primary Exercise Card */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 rounded-2xl border border-cyan-500/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">קבוצת שרירים: {currentMuscle.name}</span>
                        <h3 className="text-xl font-bold text-white mt-1">{currentMuscle.exercise}</h3>
                      </div>
                      <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Dumbbell className="w-5 h-5" />
                      </span>
                    </div>

                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 mb-4">
                      <p className="text-xs text-slate-300">
                        <strong className="text-cyan-300">אביזר מומלץ מהערכה: </strong>
                        {currentMuscle.accessory}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 italic bg-slate-800/30 p-3 rounded-lg border border-slate-700/40 leading-relaxed">
                      💡 {currentMuscle.tip}
                    </p>
                  </div>

                  {/* Real-time Computed Gauges */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                        כוח מנוע בשיא (ניוטון)
                      </div>
                      <p className="text-2xl font-black text-white">{peakForceNewtons} <span className="text-xs font-normal text-slate-400">N</span></p>
                      <p className="text-[10px] text-slate-500 mt-1">חישוב לפי g=9.81 m/s²</p>
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                        עומס שלילי (Eccentric)
                      </div>
                      <p className="text-2xl font-black text-yellow-400">{eccentricWeight} <span className="text-xs font-normal text-slate-400">ק"ג</span></p>
                      <p className="text-[10px] text-slate-500 mt-1">{simMode === 1 ? '+30% עומס שלילי אקטיבי' : 'שווה לעומס הקדימה'}</p>
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        שריפת קלוריות (15 דק')
                      </div>
                      <p className="text-2xl font-black text-amber-400">~{estCalories15Min} <span className="text-xs font-normal text-slate-400">קאל</span></p>
                      <p className="text-[10px] text-slate-500 mt-1">משוער לפי עומס וסוג תרגיל</p>
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        אחוז גיוס סיבי שריר
                      </div>
                      <p className="text-2xl font-black text-emerald-400">{muscleActivationPct}%</p>
                      <p className="text-[10px] text-slate-500 mt-1">גיוס מוגבר בעומס גבוה</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">נפח עבודה כולל לסט:</span>
                    <span className="font-bold text-white text-sm">{setVolumeKg} ק"ג מצטבר</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INTERACTIVE ROI CALCULATOR + PDF EXPORT */}
        {activeTab === 'calculator' && (
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    סימולטור חיסכון עסקי ונדל"ני
                  </span>
                  <h2 className="text-3xl font-extrabold text-white mt-3">מחשבון ניצול שטח וחיסכון בעלויות</h2>
                  <p className="text-xs text-slate-400 mt-1">חשב את חיסכון הנדל"ן החודשי והשנתי על ידי החלפת ציוד כושר כבד במערכות SPlan Model Y</p>
                </div>

                <button
                  onClick={handlePrintPDF}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-90 transition shrink-0"
                >
                  <Printer className="w-4 h-4" />
                  <span>ייצא דוח ROI כ-PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-6 glass-card p-6 rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">
                      מספר מכשירי SPlan מתוכננים: <span className="text-cyan-400 text-sm font-extrabold">{unitsCount}</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={unitsCount} 
                      onChange={(e) => setUnitsCount(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">
                      שטח שהוקצה לחדר כושר מסורתי (מ"ר): <span className="text-cyan-400 text-sm font-extrabold">{traditionalGymSqm} מ"ר</span>
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="150" 
                      step="5"
                      value={traditionalGymSqm} 
                      onChange={(e) => setTraditionalGymSqm(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">
                      עלות מ"ר נדל"ן חודשית (ש"ח/מ"ר): <span className="text-cyan-400 text-sm font-extrabold">{sqmPrice} ש"ח</span>
                    </label>
                    <input 
                      type="range" 
                      min="50" 
                      max="300" 
                      step="10"
                      value={sqmPrice} 
                      onChange={(e) => setSqmPrice(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400">שטח נדרש ל-SPlan ({unitsCount} יחידות)</p>
                      <p className="text-2xl font-black text-cyan-400 mt-1">{splanRequiredSqm} מ"ר</p>
                      <p className="text-[11px] text-slate-500 mt-1">3 מ"ר בלבד ליחידה באימון</p>
                    </div>

                    <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400">שטח מפתח שנחסך</p>
                      <p className="text-2xl font-black text-emerald-400 mt-1">{savedSqm} מ"ר</p>
                      <p className="text-[11px] text-slate-500 mt-1">ששוחררו לשימושים אחרים</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-950/30 via-slate-900 to-blue-950/30 p-6 rounded-2xl border border-cyan-500/30">
                    <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">חיסכון נדל"ני משוער</p>
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-800 pb-4">
                      <span className="text-sm text-slate-300">חיסכון חודשי:</span>
                      <span className="text-2xl font-black text-white">₪{monthlyRealEstateSavings.toLocaleString()}</span>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <span className="text-sm text-slate-300">חיסכון שנתי מצטבר:</span>
                      <span className="text-3xl font-black text-emerald-400">₪{yearlyRealEstateSavings.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-3 border-t border-slate-800/80">
                      <span className="text-xs text-slate-400">חיסכון מצטבר ל-3 שנים:</span>
                      <span className="text-lg font-bold text-cyan-300">₪{threeYearSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AUDIENCE & JOURNEY */}
        {activeTab === 'audience' && (
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                מגזרי שוק וקהלי יעד מרכזיים
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plan.target_audience.segments.map((seg, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 relative">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center text-sm mb-4">
                      0{idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{seg.segment}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{seg.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-cyan-400" />
                מסע הלקוח ומעטפת השירות (5 שלבים)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
                {plan.go_to_market_and_operations.customer_journey_steps.map((step) => (
                  <div key={step.step} className="glass-card p-5 rounded-2xl border border-slate-800 relative">
                    <div className="text-2xl font-black text-cyan-400 mb-2">#{step.step}</div>
                    <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-400">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                אחריות מורחבת: <strong className="text-cyan-300">{plan.go_to_market_and_operations.warranty}</strong>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CONTACT & IMPORTER */}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 mx-auto flex items-center justify-center font-black text-2xl text-black shadow-xl shadow-cyan-500/20 mb-4">
                S
              </div>
              <h2 className="text-2xl font-bold text-white">{plan.go_to_market_and_operations.importer_details.name}</h2>
              <p className="text-xs text-cyan-400 font-medium mt-1">יבואן בלעדי ומרכז שירות ארצי</p>

              <div className="mt-8 space-y-4 text-right">
                <div className="glass-card p-4 rounded-xl flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">אולם תצוגה מרכזי:</span>
                    <span className="text-sm font-bold text-white">{plan.go_to_market_and_operations.importer_details.showroom}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href={`tel:${contact.phone}`} className="glass-card p-4 rounded-xl flex items-center gap-3 hover:border-cyan-500/40 transition">
                    <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block">טלפון משרד:</span>
                      <span className="text-sm font-bold text-white">{contact.phone}</span>
                    </div>
                  </a>

                  <div className="glass-card p-4 rounded-xl flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block">ווטסאפ מהיר:</span>
                      <span className="text-sm font-bold text-white">{contact.whatsapp}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href={`mailto:${contact.email}`} className="glass-card p-4 rounded-xl flex items-center gap-3 hover:border-cyan-500/40 transition">
                    <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block">דוא"ל פניות:</span>
                      <span className="text-sm font-bold text-white">{contact.email}</span>
                    </div>
                  </a>

                  <a href={`https://${contact.website}`} target="_blank" rel="noreferrer" className="glass-card p-4 rounded-xl flex items-center gap-3 hover:border-cyan-500/40 transition">
                    <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block">אתר אינטרנט:</span>
                      <span className="text-sm font-bold text-white">{contact.website}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <CopyrightFooter />
      <FeedbackWidget pageLabel={(TABS.find((t) => t.id === activeTab) || TABS[0]).label} />
    </div>
  );
}
