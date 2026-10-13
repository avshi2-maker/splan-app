// layout (app/layout.jsx) · updated 13.10.2026 14:40 (Asia/Jerusalem)
import './globals.css';

export const metadata = {
  title: 'S-Plan | תוכנית עסקית',
  description: 'תוכנית עסקית אינטראקטיבית — מחשבון ROI, סימולטור אימון וטופס לידים',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
