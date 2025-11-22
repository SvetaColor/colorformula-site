import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colorformula App',
  description: 'Доступ к ИИ-помощнику ColorFormula',
  openGraph: {
    title: 'Colorformula App',
    description: 'Доступ к ИИ-помощнику ColorFormula',
    type: 'website',
    url: 'https://colorformula-site.vercel.app',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
