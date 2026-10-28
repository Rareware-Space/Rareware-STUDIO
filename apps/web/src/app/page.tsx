'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar,
  Footer,
  Badge,
  TiltCard,
  IntakeWizardModal,
  CurrencyMode,
  formatPrice,
} from '@rareware/ui';

export default function StudioHomePage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const services = [
    {
      title: 'Token Launch Kit',
      scope: 'ERC-20, Cliff/Linear Vesting, Timestamp Staking, Tests & Safe Handover',
      timeline: '1–2 Weeks',
      baseUsd: 3000,
      rangeUsd: '$2,000 – $6,000',
      badge: 'TOKENOMICS',
      accent: 'amber',
    },
    {
      title: 'NFT Collection + Mint Site',
      scope: 'ERC-721/1155, Merkle Allowlist, Commit-Reveal, Cinematic GSAP Mint Terminal',
      timeline: '1–3 Weeks',
      baseUsd: 2500,
      rangeUsd: '$1,500 – $5,000',
      badge: 'CINEMA MINT',
      accent: 'teal',
    },
    {
      title: 'AI x Chain Integration',
      scope: 'Persistent AI Agent or NPC with EIP-712 Signed On-Chain Actions & RAG Memory',
      timeline: '3–6 Weeks',
      baseUsd: 7500,
      rangeUsd: '$5,000 – $15,000',
      badge: 'AI INFRA',
      accent: 'violet',
    },
    {
      title: 'dApp / Marketplace Suite',
      scope: 'Custom Solidity Contracts, Ponder Indexer, Sub-Second Next.js Frontend',
      timeline: '4–8 Weeks',
      baseUsd: 12000,
      rangeUsd: '$8,000 – $25,000',
      badge: 'FULL STACK',
      accent: 'blue',
    },
    {
      title: 'Pre-Audit Hardening',
      scope: 'Slither/Aderyn Static Analysis, 1,000-Run Fuzz + Invariant Verification & Fixes',
      timeline: '1 Week',
      baseUsd: 1500,
      rangeUsd: '$1,000 – $3,000',
      badge: 'SECURITY',
      accent: 'orange',
    },
    {
      title: 'Studio Engineering Retainer',
      scope: 'Dedicated Monorepo Upgrades, Ponder Node Monitoring & Priority Advisory',
      timeline: 'Monthly',
      baseUsd: 1000,
      rangeUsd: '$500 – $1,500 / mo',
      badge: 'RETAINER',
      accent: 'lime',
    },
  ];

  const faqs = [
    {
      q: 'Why build for BSC (56) and opBNB (204) first?',
      a: 'Following the 2025–2026 hardforks (Maxwell/Pascal), BSC block time dropped to 450ms with sub-second finality. However, 90% of contract shops still write contracts with block.number assumptions and hardcode 6-decimal assumptions that break on BSC USDT/USDC (18 decimals). We build chain-native, timestamp-invariant contracts optimized for this new high-throughput landscape.',
    },
    {
      q: 'How does Rareware ensure zero-custody safety for client funds?',
      a: 'Rareware operates strictly as a non-custodial software engineering studio. All deployed contracts, admin keys, and treasury vaults transfer directly to your team’s Gnosis Safe multisig with an optional timelock. Rareware never holds client private keys or custodial fund pools.',
    },
    {
      q: 'What is the "Zero-Key" AI Safety architecture in RareChars?',
      a: 'The LLM (Claude API / ReadyPI) never touches private keys or broadcasts transactions. When an NPC decides to reward a player or unlock a quest item, it proposes an action to the backend API. The API validates daily quotas and issues a typed EIP-712 signed intent that the game contract (RareCharsVerifier.sol) cryptographically checks before executing.',
    },
    {
      q: 'Do you provide formal third-party audit reports?',
      a: 'We provide rigorous Pre-Audit Hardening (1,000-run fuzzing, stateful invariants, and static analysis triage). However, per Hard Rule #2, we never claim an internal check replaces a formal independent security audit. For any contract holding user deposits, we facilitate and coordinate with top audit firms.',
    },
    {
      q: 'How do project billing and milestone deliverables work?',
      a: 'Client projects run on structured milestone escrows (typically 40% Kickoff & Architecture / 40% Verified Testnet Deployment & UI Demo / 20% Safe Multisig Mainnet Handover). You can pay in USD wire or directly on-chain in BNB / USDT.',
    },
    {
      q: 'Can our project integrate ReadyPI with RareChars?',
      a: 'Yes! ReadyPI is our proprietary multi-model AI API gateway supporting 150+ LLMs with high throughput, low latency, and automatic fallbacks. RareChars uses ReadyPI as its primary inference backend to keep character dialogue margins predictable.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentProduct="studio"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 lg:p-16 overflow-hidden">
          {/* Radial Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-teal/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-violet/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-teal/10 border border-teal/30 text-teal font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span>LUMINA MONOLITH PRO MAX</span>
              <span>•</span>
              <span className="text-gray-300">BSC (56) &amp; opBNB (204) NATIVE</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              WHERE CINEMATIC MOTION MEETS{' '}
              <span className="text-teal">AUDITED WEB3 INFRASTRUCTURE</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
              Rareware Studio ships production-grade blockchain products, persistent AI game characters, and cinema-grade Web3 frontends. Built with an AI-assisted, security-first pipeline—every state-changing function ships with fuzzing, invariants, and Safe multisig handovers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setIntakeOpen(true)}
                className="px-7 py-3.5 rounded-xl bg-teal text-void font-display font-bold text-sm hover:opacity-95 transition glow-teal shadow-xl shadow-teal/20"
              >
                Start Project Intake (/start) →
              </button>
              <Link
                href="/raremint"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:border-teal/50 hover:bg-white/10 transition"
              >
                Launch RareMint Demo
              </Link>
              <Link
                href="/rarechars"
                className="px-6 py-3.5 rounded-xl bg-violet/10 border border-violet/30 text-violet font-display font-medium text-sm hover:bg-violet/20 transition"
              >
                Test RareChars AI NPCs
              </Link>
            </div>

            {/* Quick Live Telemetry Strip */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">BSC BLOCK TIME</span>
                <span className="text-teal font-bold text-sm">450ms Fast Finality</span>
              </div>
              <div>
                <span className="text-gray-500 block">SOLIDITY VERSION</span>
                <span className="text-white font-bold text-sm">0.8.28 (Shanghai)</span>
              </div>
              <div>
                <span className="text-gray-500 block">STABLECOIN SAFETY</span>
                <span className="text-teal font-bold text-sm">18-Dec USDT/USDC</span>
              </div>
              <div>
                <span className="text-gray-500 block">ADMIN GOVERNANCE</span>
                <span className="text-white font-bold text-sm">Gnosis Safe + Timelock</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE PILLARS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                01 // Architectural Foundations
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                The Four Studio Pillars
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-500">
              Security Over Speed • Craft Over Clutter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard glowColor="rgba(0, 245, 212, 0.2)" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="teal">PILLAR 01</Badge>
                  <span className="font-mono text-xs text-gray-500">BSC 56 / opBNB</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">CHAIN-FIRST</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Engineered specifically for post-Maxwell 450ms BSC block times and opBNB sub-second transactions. Never uses block.number for time math; guarantees 18-decimal dynamic token normalization.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-teal">
                ✓ Dynamic IERC20Metadata.decimals()
              </div>
            </TiltCard>

            <TiltCard glowColor="rgba(139, 92, 246, 0.2)" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="violet">PILLAR 02</Badge>
                  <span className="font-mono text-xs text-gray-500">EIP-712</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">AI-NATIVE</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Persistent AI game NPCs (RareChars) and guarded autonomous agents (RareAgent). Zero AI keys: models propose actions, and smart contracts cryptographically verify typed intents.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-violet">
                ✓ Supabase pgvector + EIP-712 Verifier
              </div>
            </TiltCard>

            <TiltCard glowColor="rgba(0, 245, 212, 0.2)" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="teal">PILLAR 03</Badge>
                  <span className="font-mono text-xs text-gray-500">Next.js + GSAP</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">CINEMATIC FRONTENDS</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Most smart contract shops deliver ugly, templated UIs. Motion is our defensible moat: high-craft Next.js App Router, GSAP timelines, Framer Motion, and hardware-accelerated 3D viewports.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-teal">
                ✓ 60fps Micro-interactions &amp; Tilt
              </div>
            </TiltCard>

            <TiltCard glowColor="rgba(245, 158, 11, 0.2)" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="amber">PILLAR 04</Badge>
                  <span className="font-mono text-xs text-gray-500">Foundry Suite</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">SECURITY-FIRST</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Every state-changing function undergoes test-first Foundry validation, 1,000-run property fuzzing, stateful invariant testing, and Slither/Aderyn static analysis before testnet deployment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-amber">
                ✓ 256 Invariant Runs • Safe Handover
              </div>
            </TiltCard>
          </div>
        </section>

        {/* 6 STANDALONE PRODUCT PORTALS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                02 // Productized Developer Kits &amp; SaaS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Six Standalone Products
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-400">
              Open-Source Cores &amp; Managed Turnkey Infrastructure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* RareMint */}
            <div className="rounded-2xl border border-white/10 bg-panel p-6 specular-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">RareMint</span>
                  <Badge variant="teal">OPEN-SOURCE CORE</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Zero-gas-war NFT collection kit with Merkle allowlists, delayed reveal choreography, and EIP-2981 Safe royalties.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">RareMint.sol</span>
                <Link href="/raremint" className="text-teal hover:underline font-semibold">
                  Open Product Page →
                </Link>
              </div>
            </div>

            {/* RareToken */}
            <div className="rounded-2xl border border-white/10 bg-panel p-6 specular-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">RareToken</span>
                  <Badge variant="amber">OPEN-SOURCE CORE</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Fixed-supply ERC-20 with timestamp-based cliff/linear vesting and Synthetix-style APY staking safe from BSC block drift.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">RareToken.sol + Vesting</span>
                <Link href="/raretoken" className="text-amber hover:underline font-semibold">
                  Open Product Page →
                </Link>
              </div>
            </div>

            {/* RareChars */}
            <div className="rounded-2xl border border-violet/30 bg-panel p-6 specular-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">RareChars</span>
                  <Badge variant="violet">FLAGSHIP API + SDK</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Persistent AI NPCs for Web3 games with pgvector RAG memory and cryptographically verified on-chain action intents on opBNB.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">RareCharsVerifier.sol</span>
                <Link href="/rarechars" className="text-violet hover:underline font-semibold">
                  Open Product Page →
                </Link>
              </div>
            </div>

            {/* RarePay */}
            <div className="rounded-2xl border border-white/10 bg-panel p-6 specular-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">RarePay</span>
                  <Badge variant="blue">NON-CUSTODIAL SAAS</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Crypto checkout on BSC &amp; opBNB (USDT/USDC/BNB) with on-chain 18-decimal validation and signed HMAC webhooks.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">RarePayRouter.sol</span>
                <Link href="/rarepay" className="text-blue hover:underline font-semibold">
                  Open Product Page →
                </Link>
              </div>
            </div>

            {/* RareAgent */}
            <div className="rounded-2xl border border-white/10 bg-panel p-6 specular-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">RareAgent</span>
                  <Badge variant="orange">ERC-4337 ACCOUNT</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Autonomous AI agent smart accounts with scoped session keys, contract allowlists, daily spend caps, and kill-switches.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">Session Key Module</span>
                <Link href="/rareagent" className="text-orange hover:underline font-semibold">
                  Open Product Page →
                </Link>
              </div>
            </div>

            {/* RareDash */}
            <div className="rounded-2xl border border-white/10 bg-panel p-6 specular-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">RareDash</span>
                  <Badge variant="lime">ANALYTICS SAAS</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Sub-second Ponder-indexed contract telemetry, whale alert webhooks, and live on-chain holder intelligence.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">Ponder v0.7 Indexer</span>
                <Link href="/raredash" className="text-lime hover:underline font-semibold">
                  Open Product Page →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* B2B SERVICES & PRICING TABLE (WITH CURRENCY TOGGLE) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                03 // Delivery Pipeline &amp; Milestone Pricing
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                B2B Engineering Services
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400">CURRENCY:</span>
              <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-teal/30 bg-teal/10 text-teal">
                {currencyMode === 'USD' ? 'USD FIAT ESCROW' : 'ON-CHAIN BNB/USDT (BSC)'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => {
              const priceData = formatPrice(item.baseUsd, currencyMode);
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-panel p-6 flex flex-col justify-between space-y-6 specular-card"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-teal">{item.timeline}</span>
                      <Badge variant={item.accent as any}>{item.badge}</Badge>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed min-h-[40px]">
                      {item.scope}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-xs font-mono text-gray-500">INDICATIVE RATE</div>
                      <div className="font-display text-xl font-bold text-white mt-0.5">
                        {currencyMode === 'USD' ? item.rangeUsd : priceData.display}
                      </div>
                      <div className="text-[11px] font-mono text-teal mt-0.5">
                        {priceData.subtext}
                      </div>
                    </div>

                    <button
                      onClick={() => setIntakeOpen(true)}
                      className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 text-white font-mono text-xs hover:border-teal hover:bg-teal hover:text-void font-bold transition"
                    >
                      Book Service Intake →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FOUNDER & NON-CUSTODIAL INTEGRITY */}
        <section className="rounded-3xl border border-white/10 bg-panel p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-xs text-teal uppercase tracking-wider">
                04 // Technical Leadership &amp; Operational Firewall
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Engineered by Ahmed Riyaz (ARZ) &amp; Powered by ReadyPI
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Rareware Studio is led by Ahmed Riyaz (ARZ), an experienced engineering lead operating across blockchain and AI automation. Rareware’s flagship AI product, RareChars, leverages our proprietary ReadyPI multi-model API gateway (150+ models) to deliver persistent game NPC intelligence with zero gas drift and predictable token economics.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-gray-300">
                <span className="px-3 py-1.5 rounded-lg bg-void border border-white/10">
                  Non-Custodial Architecture
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-void border border-white/10">
                  ReadyPI LLM Gateway
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-void border border-white/10">
                  github.com/Rareware-Space
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 rounded-2xl bg-void border border-white/10 p-6 font-mono text-xs space-y-3">
              <div className="text-teal font-bold">// Studio Non-Custody Protocol:</div>
              <div className="text-gray-400">1. All treasury contracts deploy with Safe owners</div>
              <div className="text-gray-400">2. Pre-flight eth_call simulations before every deploy</div>
              <div className="text-gray-400">3. Zero human private keys stored on AI servers</div>
              <div className="text-gray-400">4. Direct milestone escrows in BNB or USDT</div>
            </div>
          </div>
        </section>

        {/* FAQS ACCORDION */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs text-teal tracking-wider uppercase">
              05 // Common Questions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-panel overflow-hidden transition"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-white text-base hover:text-teal transition"
                >
                  <span>{faq.q}</span>
                  <span className="font-mono text-teal text-lg">
                    {faqOpen === idx ? '−' : '+'}
                  </span>
                </button>
                {faqOpen === idx && (
                  <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <IntakeWizardModal
        isOpen={intakeOpen}
        onClose={() => setIntakeOpen(false)}
      />
    </div>
  );
}
