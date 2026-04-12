import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'בָּבּוֹץ | אברהם זיסמן — ערכות בוץ טבעי',
  description: 'ערכות בוץ טבעי לשימוש ביתי ולקליניקות טיפוליות — חומר גלם אמיתי מהאדמה.',
  keywords: 'בוץ, ערכות בוץ, טיפול בבוץ, בוץ טבעי, ערכה ביתית, קליניקה, ריפוי בעיסוק',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="he" dir="rtl"><body style={{ margin: 0, padding: 0 }}>{children}</body></html>)
}
