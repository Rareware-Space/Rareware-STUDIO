import type { Metadata } from 'next';
import './globals.css';
import { Spotlight } from '@rareware/ui';
import { ReBoAssistant } from '@/components/ReBoAssistant';

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
  verification: {
    google: 'google34ed6b3e25d2b5c0',
  },
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
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grid-bg min-h-screen bg-void text-gray-100 font-sans selection:bg-teal selection:text-void antialiased">
        <Spotlight color="rgba(0, 245, 212, 0.07)" size={600} />
        {children}
        <ReBoAssistant />
      </body>
    </html>
  );
}
