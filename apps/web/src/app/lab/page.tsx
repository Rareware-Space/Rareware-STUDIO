'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar,
  Footer,
  Badge,
  IntakeWizardModal,
  CurrencyMode,
  Reveal,
} from '@rareware/ui';
import { HeroParticleCanvas } from '../../components/HeroParticleCanvas';
import { LiveProtocolTerminal } from '../../components/LiveProtocolTerminal';
import { ProjectCostEstimator } from '../../components/ProjectCostEstimator';

export default function LabPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-teal selection:text-void bg-void text-gray-100">
      {/* Decorative Cyber HUD Corner Brackets */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      <Navbar
        currentProduct="studio"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      {/* TOP LAB HUD WARNING BANNER */}
      <div className="border-b border-amber/30 bg-amber/10 px-4 py-2.5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold tracking-wider">LABORATORY &amp; INTERACTIVE SIMULATION ZONE</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-amber-200">
            <Badge variant="amber">SIMULATED DEMO</Badge>
            <span>All telemetry, feeds, and cost models on this page are client-side simulations.</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 w-full">
        {/* LAB HERO HEADER */}
        <Reveal>
          <div className="space-y-4 max-w-3xl">
            <div className="font-mono text-xs text-teal uppercase tracking-wider">
              /Rareware Studio Laboratory
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Protocol Sandbox &amp; Interactive Simulations
            </h1>
            <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed">
              Explore our experimental protocol interfaces, GPU particle networks, simulated 450ms block feeds, and multi-tier project cost modeling engines.
            </p>
          </div>
        </Reveal>

        {/* 1. SIMULATED TICKER MARQUEE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-gray-400 border-b border-white/10 pb-2">
            <span>/01 SIMULATED NETWORK TICKER FEED</span>
            <Badge variant="amber">SIMULATED DEMO</Badge>
          </div>

          <div className="ticker-strip">
            <div className="ticker-track">
              <div className="ticker-item"><span className="t-symbol">BNB/USDT</span> $648.32 <span className="t-up">+3.45%</span> <span className="t-tag">450ms FERMI BLOCK</span></div>
              <div className="ticker-item"><span className="t-symbol">BTC/USDT</span> $104,890.15 <span className="t-up">+2.84%</span></div>
              <div className="ticker-item"><span className="t-symbol">ETH/USDT</span> $3,450.40 <span className="t-up">+1.92%</span></div>
              <div className="ticker-item"><span className="t-symbol">opBNB GAS</span> 0.000008 BNB <span className="t-up">&lt;$0.001/tx</span></div>
              <div className="ticker-item"><span className="t-symbol">PONDER RPC</span> 99.98% SYNCED <span className="t-up">16.4ms LATENCY</span></div>
              <div className="ticker-item"><span className="t-symbol">FOUNDRY SUITE</span> 17/17 PASSED <span className="t-up">16,384 INVARIANTS</span></div>
              {/* Loop track */}
              <div className="ticker-item"><span className="t-symbol">BNB/USDT</span> $648.32 <span className="t-up">+3.45%</span> <span className="t-tag">450ms FERMI BLOCK</span></div>
              <div className="ticker-item"><span className="t-symbol">BTC/USDT</span> $104,890.15 <span className="t-up">+2.84%</span></div>
              <div className="ticker-item"><span className="t-symbol">ETH/USDT</span> $3,450.40 <span className="t-up">+1.92%</span></div>
              <div className="ticker-item"><span className="t-symbol">opBNB GAS</span> 0.000008 BNB <span className="t-up">&lt;$0.001/tx</span></div>
              <div className="ticker-item"><span className="t-symbol">PONDER RPC</span> 99.98% SYNCED <span className="t-up">16.4ms LATENCY</span></div>
              <div className="ticker-item"><span className="t-symbol">FOUNDRY SUITE</span> 17/17 PASSED <span className="t-up">16,384 INVARIANTS</span></div>
            </div>
          </div>
        </div>

        {/* 2. REAL-TIME INTERACTIVE PARTICLE CANVAS */}
        <Reveal>
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-gray-400 border-b border-white/10 pb-2">
              <span>/02 GPU PARTICLE NETWORK PHYSICS</span>
              <span className="text-teal font-mono">INTERACTIVE MOUSE ATTRACTION</span>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-panel h-80 sm:h-96 overflow-hidden cyber-card">
              <HeroParticleCanvas />
              <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-gray-400 px-3 py-1 rounded-full bg-void/80 border border-white/10 backdrop-blur-md">
                Move pointer to deflect particle vectors
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. LIVE PROTOCOL TELEMETRY TERMINAL */}
        <Reveal>
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-gray-400 border-b border-white/10 pb-2">
              <span>/03 PROTOCOL TELEMETRY TERMINAL</span>
              <Badge variant="amber">SIMULATED DEMO</Badge>
            </div>

            <LiveProtocolTerminal />
          </div>
        </Reveal>

        {/* 4. INTERACTIVE PROJECT COST ESTIMATOR */}
        <Reveal>
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-gray-400 border-b border-white/10 pb-2">
              <span>/04 PROJECT COST &amp; ARCHITECTURE ESTIMATOR</span>
              <Badge variant="teal">INDICATIVE ESTIMATES</Badge>
            </div>

            <ProjectCostEstimator onOpenIntake={() => setIntakeOpen(true)} />
          </div>
        </Reveal>

        {/* RETURN CTA */}
        <div className="text-center pt-8 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs hover:border-teal hover:text-teal transition"
          >
            ← Return to Editorial Homepage
          </Link>
        </div>
      </main>

      <Footer />

      <IntakeWizardModal
        isOpen={intakeOpen}
        onClose={() => setIntakeOpen(false)}
      />
    </div>
  );
}
