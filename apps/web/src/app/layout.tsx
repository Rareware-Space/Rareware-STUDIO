import type { Metadata } from 'next';
import './globals.css';
import { Spotlight } from '@rareware/ui';

export const metadata: Metadata = {
  title: 'Rareware Studio — Cyber-Monumental Edition (BSC 56 / opBNB 204)',
  description:
    'Production-grade blockchain products, persistent AI NPCs (RareChars), non-custodial crypto checkout (RarePay), and cyber-monumental Web3 frontends for BSC and opBNB.',
  keywords: [
    'BSC',
    'opBNB',
    'Solidity 0.8.28',
    'RareChars',
    'RareMint',
    'RareToken',
    'RarePay',
    'RareAgent',
    'RareDash',
    'Web3 Studio',
    'AI Game Characters',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Unbounded:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grid-bg min-h-screen bg-void text-gray-100 font-sans selection:bg-teal selection:text-void antialiased">
        <Spotlight color="rgba(0, 245, 212, 0.07)" size={600} />
        {children}
      </body>
    </html>
  );
}
