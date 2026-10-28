'use client';

import React, { useState } from 'react';
import { PRODUCTS_REGISTRY, ProductId, CurrencyMode } from './types';
import { CurrencyToggle } from './CurrencyToggle';

export interface NavbarProps {
  currentProduct?: ProductId;
  currencyMode: CurrencyMode;
  onCurrencyChange: (mode: CurrencyMode) => void;
  onOpenIntake: () => void;
  walletConnected?: boolean;
  onToggleWallet?: () => void;
}

export const RarewareLogoEmblem: React.FC<{ className?: string }> = ({ className = 'h-9 w-11' }) => (
  <svg className={className} viewBox="0 0 96 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Rareware Studio Emblem">
    <defs>
      <linearGradient id="rw-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2AFADF" />
        <stop offset="50%" stopColor="#00E5FF" />
        <stop offset="100%" stopColor="#0097B2" />
      </linearGradient>
    </defs>
    {/* Top Geometric Loop of R */}
    <path d="M18 12 H66 L82 28 L60 50 L50 40 L63 27 H28 Z" fill="url(#rw-cyan-grad)" />
    {/* Diagonal Leg of R */}
    <path d="M25 32 H42 L78 68 H61 Z" fill="url(#rw-cyan-grad)" />
    {/* Fragmented Digital Pixel Blocks on Left */}
    <rect x="24" y="42" width="9" height="9" fill="#00E5FF" />
    <rect x="16" y="54" width="7" height="7" fill="#2AFADF" />
    <rect x="30" y="54" width="9" height="16" fill="url(#rw-cyan-grad)" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  currentProduct = 'studio',
  currencyMode,
  onCurrencyChange,
  onOpenIntake,
  walletConnected = false,
  onToggleWallet,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const productList = Object.values(PRODUCTS_REGISTRY);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-obsidian/90 backdrop-blur-xl">
      {/* Top Chain Telemetry Bar */}
      <div className="border-b border-white/5 bg-void/60 px-4 py-1.5 text-[11px] font-mono text-gray-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
            </span>
            <span className="text-gray-300">
              NETWORK: <span className="text-teal font-semibold">BSC MAINNET (56)</span> • FINALITY:{' '}
              <span className="text-white">450ms</span> • opBNB:{' '}
              <span className="text-emerald font-semibold">LIVE (204)</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-gray-400">
            <span>SOLC: <span className="text-gray-300">0.8.28</span></span>
            <span>SHANGHAI EVM</span>
            <span>SAFE MULTISIG ENFORCED</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Official Rareware Studio Brand Lockup */}
        <a href="/" className="flex items-center gap-3.5 group">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <RarewareLogoEmblem className="h-9 w-11" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-extrabold tracking-[0.14em] text-white">
                RAREWARE
              </span>
              <span className="font-display text-xs font-bold tracking-[0.22em] text-teal">
                STUDIO
              </span>
            </div>
            <span className="font-mono text-[9px] text-gray-400 tracking-[0.16em]">
              BLOCKCHAIN PRODUCTS <span className="text-teal">MARKETPLACE</span>
            </span>
          </div>
        </a>

        {/* Desktop Product Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-panel/80 p-1 font-mono text-xs">
          <a
            href="/"
            className={`rounded-full px-3 py-1.5 transition ${
              currentProduct === 'studio'
                ? 'bg-teal text-void font-bold shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Studio
          </a>
          <a
            href="/raremint"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
              currentProduct === 'raremint'
                ? 'bg-teal text-void font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            RareMint
          </a>
          <a
            href="/raretoken"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
              currentProduct === 'raretoken'
                ? 'bg-amber text-void font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            RareToken
          </a>
          <a
            href="/rarechars"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
              currentProduct === 'rarechars'
                ? 'bg-violet text-white font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            RareChars
          </a>
          <a
            href="/rarepay"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
              currentProduct === 'rarepay'
                ? 'bg-blue text-white font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            RarePay
          </a>
          <a
            href="/rareagent"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
              currentProduct === 'rareagent'
                ? 'bg-orange text-white font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            RareAgent
          </a>
          <a
            href="/raredash"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
              currentProduct === 'raredash'
                ? 'bg-lime text-void font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            RareDash
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <CurrencyToggle mode={currencyMode} onChange={onCurrencyChange} />
          </div>

          <button
            onClick={onToggleWallet}
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold transition ${
              walletConnected
                ? 'border-teal bg-teal text-void'
                : 'border-white/15 bg-white/5 text-gray-300 hover:border-teal/50 hover:text-white'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                walletConnected ? 'bg-void' : 'bg-teal'
              }`}
            />
            <span>{walletConnected ? '0x71C...89A2 (BSC)' : 'Connect Wallet'}</span>
          </button>

          <button
            onClick={onOpenIntake}
            className="rounded-xl bg-teal px-4 py-2 font-display text-xs font-bold text-void shadow-lg shadow-teal/20 transition hover:bg-teal/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Project →
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg border border-white/15 bg-panel p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-obsidian p-4 space-y-3 font-mono text-xs">
          <div className="text-gray-400 uppercase text-[10px] tracking-wider mb-2">
            Standalone Products
          </div>
          <div className="grid grid-cols-2 gap-2">
            {productList.map((prod) => (
              <a
                key={prod.id}
                href={prod.route}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-lg border border-white/10 bg-panel flex items-center gap-2 ${
                  currentProduct === prod.id ? 'border-teal text-teal' : 'text-gray-300'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: prod.accentHex }}
                />
                <span className="font-semibold">{prod.name}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-gray-400">CURRENCY:</span>
            <CurrencyToggle mode={currencyMode} onChange={onCurrencyChange} />
          </div>
        </div>
      )}
    </header>
  );
};
