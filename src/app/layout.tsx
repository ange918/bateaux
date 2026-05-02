import type { Metadata } from 'next';
import { Montserrat, Kaushan_Script } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-kaushan',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ProformaAfrica — Générez vos factures en 2 minutes',
  description:
    'Créez et téléchargez instantanément vos factures, devis et proformas en PDF.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${kaushan.variable}`}>
      <body>{children}</body>
    </html>
  );
}
