import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'בוץ — יצירה מהאדמה | אברהם זיסמן',
  description: 'ערכות בוץ ביתיות וסדנאות יצירה מבוץ טבעי מהערבה. פיסול, כלים וחוויות.',
  keywords: 'ערכות בוץ, סדנאות בוץ, יצירה מבוץ, פיסול, אברהם זיסמן, ערבה',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="he" dir="rtl"><body style={{ margin: 0, padding: 0 }}>{children}</body></html>)
}
