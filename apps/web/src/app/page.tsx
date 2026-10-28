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
import { HeroParticleCanvas } from '../components/HeroParticleCanvas';
import { LiveProtocolTerminal } from '../components/LiveProtocolTerminal';
import { ProjectCostEstimator } from '../components/ProjectCostEstimator';

export default function StudioHomePage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const ethosPillars = [
    {
      num: '01',
      code: 'ETHOS 01',
      title: 'THE FLOOR IS EXCELLENCE',
      badge: 'VERIFICATION',
      badgeVariant: 'teal' as const,
      tagline: 'Security Over Speed • Proof Over Hype',
      desc: 'We do not ship code we would not stake our own treasury on. Every state-changing function undergoes test-first Foundry validation, 1,000-run property fuzzing, stateful invariant verification, and Slither/Aderyn static analysis before touching testnet.',
      pills: ['Foundry 1k Fuzz', 'Stateful Invariants', 'Slither Static', 'Safe Multisig'],
      metric: '16,384 Invariant Runs • 0 Criticals',
    },
    {
      num: '02',
      code: 'ETHOS 02',
      title: 'ZERO-KEY CRYPTOGRAPHIC SAFETY',
      badge: 'AI ARCHITECTURE',
      badgeVariant: 'violet' as const,
      tagline: 'AI Proposes • Smart Contracts Verify',
      desc: 'No AI agent ever touches client private keys or broadcasts unverified transactions. Persistent game NPCs and autonomous agents propose actions to an API which cryptographically signs typed EIP-712 intents verified on-chain by RareCharsVerifier.sol.',
      pills: ['EIP-712 Intent', 'Zero-Key Security', 'ReadyPI API', 'pgvector RAG'],
      metric: 'EIP-712 Typed Data • Daily Quota Caps',
    },
    {
      num: '03',
      code: 'ETHOS 03',
      title: 'POST-MAXWELL CHAIN NATIVE',
      badge: 'BLOCKCHAIN NATIVE',
      badgeVariant: 'teal' as const,
      tagline: '450ms Fast Finality • Zero Block Drift',
      desc: 'Engineered specifically for post-Maxwell BSC 450ms block times and opBNB sub-second transactions. Never uses block.number for time-dependent escrow or vesting math. Enforces dynamic 18-decimal token normalization safe for BSC USDT and USDC.',
      pills: ['BSC 450ms', 'opBNB Sub-Second', 'Timestamp Invariants', '18-Dec Safety'],
      metric: 'Dynamic IERC20Metadata.decimals()',
    },
    {
      num: '04',
      code: 'ETHOS 04',
      title: 'HARDWARE-ACCELERATED MOTION',
      badge: 'CINEMATIC CRAFT',
      badgeVariant: 'amber' as const,
      tagline: 'High Craft • Defensible Moat',
      desc: 'Most smart contract development shops deliver ugly, boilerplate templates. Motion is our moat: 60fps GSAP timelines, GPU-accelerated canvas particles, Framer Motion transitions, and interactive Web3 terminals that elevate brand status to luxury tiers.',
      pills: ['60fps GSAP', 'Particle Canvas', 'Tilt Kinetics', 'Sub-second UX'],
      metric: '60fps GPU Rendered • 16.4ms RPC Sync',
    },
  ];

  const products = [
    {
      num: '01',
      title: 'RareMint',
      badge: 'OPEN-SOURCE CORE',
      badgeVariant: 'teal' as const,
      contract: 'RareMint.sol',
      href: '/raremint',
      desc: 'Zero-gas-war NFT collection kit with Merkle allowlists, delayed reveal choreography, and EIP-2981 Safe royalties.',
      tags: ['ERC-721A', 'Merkle Proofs', 'Commit-Reveal', 'Safe Royalties'],
    },
    {
      num: '02',
      title: 'RareToken',
      badge: 'OPEN-SOURCE CORE',
      badgeVariant: 'amber' as const,
      contract: 'RareToken.sol + Vesting',
      href: '/raretoken',
      desc: 'Fixed-supply ERC-20 with timestamp-based cliff/linear vesting and Synthetix-style APY staking safe from BSC block drift.',
      tags: ['ERC-20', 'Cliff Vesting', 'Synthetix APY', 'No Block Drift'],
    },
    {
      num: '03',
      title: 'RareChars',
      badge: 'FLAGSHIP API + SDK',
      badgeVariant: 'violet' as const,
      contract: 'RareCharsVerifier.sol',
      href: '/rarechars',
      desc: 'Persistent AI NPCs for Web3 games with pgvector RAG memory and cryptographically verified on-chain action intents on opBNB.',
      tags: ['ReadyPI Gateway', 'pgvector RAG', 'EIP-712 Intent', 'Game NPC API'],
    },
    {
      num: '04',
      title: 'RarePay',
      badge: 'NON-CUSTODIAL SAAS',
      badgeVariant: 'blue' as const,
      contract: 'RarePayRouter.sol',
      href: '/rarepay',
      desc: 'Crypto checkout on BSC & opBNB (USDT/USDC/BNB) with on-chain 18-decimal validation and signed HMAC webhooks.',
      tags: ['18-Dec Stablecoin', 'HMAC Webhooks', 'Non-Custodial', 'BSC & opBNB'],
    },
    {
      num: '05',
      title: 'RareAgent',
      badge: 'ERC-4337 ACCOUNT',
      badgeVariant: 'orange' as const,
      contract: 'Session Key Module',
      href: '/rareagent',
      desc: 'Autonomous AI agent smart accounts with scoped session keys, contract allowlists, daily spend caps, and kill-switches.',
      tags: ['ERC-4337', 'Session Keys', 'Daily Caps', 'Kill-Switch'],
    },
    {
      num: '06',
      title: 'RareDash',
      badge: 'ANALYTICS SAAS',
      badgeVariant: 'lime' as const,
      contract: 'Ponder v0.7 Indexer',
      href: '/raredash',
      desc: 'Sub-second Ponder-indexed contract telemetry, whale alert webhooks, and live on-chain holder intelligence.',
      tags: ['Ponder v0.7', 'Sub-Second Sync', 'Whale Alerts', 'Holder Intel'],
    },
  ];

  const services = [
    {
      index: '01',
      title: 'Token Launch Kit',
      scope: 'ERC-20, Cliff/Linear Vesting, Timestamp Staking, Tests & Safe Handover',
      timeline: '1–2 Weeks',
      baseUsd: 3000,
      rangeUsd: '$2,000 – $6,000',
      badge: 'TOKENOMICS',
      accent: 'amber',
      tags: ['Solidity 0.8.28', 'Timestamp Vesting', 'Synthetix APY', 'Foundry 1k Fuzz', 'Safe Multisig'],
    },
    {
      index: '02',
      title: 'NFT Collection + Mint Site',
      scope: 'ERC-721/1155, Merkle Allowlist, Commit-Reveal, Cinematic GSAP Mint Terminal',
      timeline: '1–3 Weeks',
      baseUsd: 2500,
      rangeUsd: '$1,500 – $5,000',
      badge: 'CINEMA MINT',
      accent: 'teal',
      tags: ['ERC-721A', 'Merkle Proofs', 'GSAP Timeline', 'EIP-2981 Royalties', 'opBNB Cheap Gas'],
    },
    {
      index: '03',
      title: 'AI x Chain Integration',
      scope: 'Persistent AI Agent or NPC with EIP-712 Signed On-Chain Actions & RAG Memory',
      timeline: '3–6 Weeks',
      baseUsd: 7500,
      rangeUsd: '$5,000 – $15,000',
      badge: 'AI INFRA',
      accent: 'violet',
      tags: ['ReadyPI Gateway', 'pgvector RAG', 'EIP-712 Intent', 'Zero-Key Security', 'opBNB L2'],
    },
    {
      index: '04',
      title: 'dApp / Marketplace Suite',
      scope: 'Custom Solidity Contracts, Ponder Indexer, Sub-Second Next.js Frontend',
      timeline: '4–8 Weeks',
      baseUsd: 12000,
      rangeUsd: '$8,000 – $25,000',
      badge: 'FULL STACK',
      accent: 'blue',
      tags: ['Next.js 15 App Router', 'Ponder v0.7', 'Wagmi / Viem', 'Tailwind CSS', 'Sub-second RPC'],
    },
    {
      index: '05',
      title: 'Pre-Audit Hardening',
      scope: 'Slither/Aderyn Static Analysis, 1,000-Run Fuzz + Invariant Verification & Fixes',
      timeline: '1 Week',
      baseUsd: 1500,
      rangeUsd: '$1,000 – $3,000',
      badge: 'SECURITY',
      accent: 'orange',
      tags: ['Slither Static', 'Aderyn AST', 'Foundry Invariants', 'Decimals Safety', 'Remediation PRs'],
    },
    {
      index: '06',
      title: 'Studio Engineering Retainer',
      scope: 'Dedicated Monorepo Upgrades, Ponder Node Monitoring & Priority Advisory',
      timeline: 'Monthly',
      baseUsd: 1000,
      rangeUsd: '$500 – $1,500 / mo',
      badge: 'RETAINER',
      accent: 'lime',
      tags: ['SLA Monorepo Support', 'Ponder Node Sync', 'Gas Optimizations', 'Private Telegram / Slack'],
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
    <div className="min-h-screen flex flex-col relative selection:bg-teal selection:text-void">
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

      {/* HERO SECTION - WONDERLAND X AVARK EDITORIAL LUXURY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 w-full">
        <section className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 lg:p-16 overflow-hidden cyber-card">
          {/* Real-Time Interactive Particle Network Background */}
          <HeroParticleCanvas />

          {/* Radial Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-[550px] h-[550px] bg-teal/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-violet/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-7">
            {/* Wonderland-Style Eyebrow Tag with Pulse */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-teal/10 border border-teal/30 text-teal font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span className="font-semibold tracking-wider">00 // ARCHITECTURAL ETHOS &amp; PROTOCOL SUITE</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">BSC (56) &amp; opBNB (204) NATIVE</span>
            </div>

            {/* Monumental Editorial Headline with Italic Accent Contrast */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.06]">
              WHERE CINEMATIC MOTION MEETS{' '}
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-teal via-cyan-300 to-violet-400">
                AUDITED
              </span>{' '}
              WEB3 INFRASTRUCTURE.
            </h1>

            {/* Manrope Geometric Body Copy */}
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl">
              Rareware Studio ships production-grade blockchain products, persistent AI game characters, and cinema-grade Web3 frontends. Built with an AI-assisted, security-first pipeline—every state-changing function ships with fuzzing, invariants, and Safe multisig handovers.
            </p>

            {/* High-Craft Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
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

            {/* Network Credibility Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="network-pill">
                <span>◈</span> BSC NATIVE (CHAIN 56 • 450ms)
              </div>
              <div className="network-pill">
                <span>⚡</span> opBNB SUB-SECOND L2 (CHAIN 204)
              </div>
              <div className="network-pill">
                <span className="text-violet-400">Ξ</span> EVM COMPATIBLE
              </div>
              <div className="network-pill">
                <span className="text-amber-400">🔒</span> GNOSIS SAFE TIMELOCK
              </div>
            </div>

            {/* Quick Live Telemetry Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-xs font-mono">
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
      </div>

      {/* INFINITE LIVE TICKER MARQUEE STRIP */}
      <div className="ticker-strip my-10">
        <div className="ticker-track">
          <div className="ticker-item"><span className="t-symbol">BNB/USDT</span> $648.32 <span className="t-up">+3.45%</span> <span className="t-tag">450ms BLOCK</span></div>
          <div className="ticker-item"><span className="t-symbol">BTC/USDT</span> $104,890.15 <span className="t-up">+2.84%</span></div>
          <div className="ticker-item"><span className="t-symbol">ETH/USDT</span> $3,450.40 <span className="t-up">+1.92%</span></div>
          <div className="ticker-item"><span className="t-symbol">opBNB GAS</span> 0.000008 BNB <span className="t-up">&lt;$0.001/tx</span></div>
          <div className="ticker-item"><span className="t-symbol">RARE/USDT</span> $4.85 <span className="t-up">+14.2%</span></div>
          <div className="ticker-item"><span className="t-symbol">PONDER RPC</span> 99.98% SYNCED <span className="t-up">16.4ms LATENCY</span></div>
          <div className="ticker-item"><span className="t-symbol">FOUNDRY SUITE</span> 17/17 PASSED <span className="t-up">16,384 INVARIANTS</span></div>
          <div className="ticker-item"><span className="t-symbol">SAFE MULTISIG</span> $48.2M SECURED <span className="t-tag">2-OF-3 POLICY</span></div>
          {/* Duplicate loop */}
          <div className="ticker-item"><span className="t-symbol">BNB/USDT</span> $648.32 <span className="t-up">+3.45%</span> <span className="t-tag">450ms BLOCK</span></div>
          <div className="ticker-item"><span className="t-symbol">BTC/USDT</span> $104,890.15 <span className="t-up">+2.84%</span></div>
          <div className="ticker-item"><span className="t-symbol">ETH/USDT</span> $3,450.40 <span className="t-up">+1.92%</span></div>
          <div className="ticker-item"><span className="t-symbol">opBNB GAS</span> 0.000008 BNB <span className="t-up">&lt;$0.001/tx</span></div>
          <div className="ticker-item"><span className="t-symbol">RARE/USDT</span> $4.85 <span className="t-up">+14.2%</span></div>
          <div className="ticker-item"><span className="t-symbol">PONDER RPC</span> 99.98% SYNCED <span className="t-up">16.4ms LATENCY</span></div>
          <div className="ticker-item"><span className="t-symbol">FOUNDRY SUITE</span> 17/17 PASSED <span className="t-up">16,384 INVARIANTS</span></div>
          <div className="ticker-item"><span className="t-symbol">SAFE MULTISIG</span> $48.2M SECURED <span className="t-tag">2-OF-3 POLICY</span></div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-24 w-full">
        {/* LIVE PROTOCOL TELEMETRY & TERMINAL CHART */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                00 // REAL-TIME NETWORK &amp; CONTRACT ACTIVITY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Live Protocol Telemetry Terminal
              </h2>
            </div>
            <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              CONNECTED: BSC MAINNET (56) &amp; opBNB (204)
            </span>
          </div>

          <LiveProtocolTerminal />
        </section>

        {/* INTERACTIVE PROJECT ARCHITECTURE & GAS SAVINGS SANDBOX */}
        <section className="space-y-4">
          <ProjectCostEstimator onOpenIntake={() => setIntakeOpen(true)} />
        </section>

        {/* THE ARCHITECTURAL ETHOS - WONDERLAND STYLE MANIFESTO */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                01 // THE ARCHITECTURAL ETHOS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Four Uncompromising Principles
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-400">
              Security Over Speed • Proof Over Hype
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ethosPillars.map((item) => (
              <TiltCard
                key={item.num}
                glowColor={item.num === '02' ? 'rgba(139, 92, 246, 0.2)' : item.num === '04' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 245, 212, 0.2)'}
                className="h-full"
              >
                <div className="relative rounded-2xl border border-white/10 bg-panel/90 p-8 cyber-card overflow-hidden flex flex-col justify-between h-full group hover:border-teal/40 transition-all duration-300">
                  {/* Subtle Watermark Number */}
                  <div className="watermark-number select-none">
                    {item.num}
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs text-teal font-semibold tracking-wider">
                        {item.code} //
                      </div>
                      <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      {item.tagline}
                    </p>

                    <p className="text-sm text-gray-300 leading-relaxed font-sans">
                      {item.desc}
                    </p>

                    {/* Avark Style Capability Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.pills.map((pill) => (
                        <span key={pill} className="service-pill">
                          <span className="text-teal">#</span> {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 font-mono text-xs text-teal flex items-center justify-between relative z-10">
                    <span>✓ {item.metric}</span>
                    <span className="text-gray-500 group-hover:text-teal transition">→</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* 6 STANDALONE PRODUCT PORTALS - AVARK STYLE */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                02 // PRODUCTIZED SUITE &amp; SAAS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Six Flagship Standalone Products
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-400">
              Open-Source Cores &amp; Managed Turnkey Infrastructure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.title}
                className="relative rounded-2xl border border-white/10 bg-panel p-6 cyber-card flex flex-col justify-between space-y-4 hover:border-teal/40 transition-all duration-300 overflow-hidden group"
              >
                <div className="watermark-number select-none">
                  {prod.num}
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-teal font-semibold">
                      {prod.num} // CORE
                    </span>
                    <Badge variant={prod.badgeVariant}>{prod.badge}</Badge>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    {prod.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {prod.desc}
                  </p>

                  {/* Avark Style Capability Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {prod.tags.map((t) => (
                      <span key={t} className="service-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs relative z-10">
                  <span className="text-gray-500">{prod.contract}</span>
                  <Link
                    href={prod.href}
                    className="text-teal hover:underline font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    Open Product Page →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 // FEATURED CASE STUDY - AVARK METACADE HIGHLIGHT */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                03 // FEATURED CASE STUDY • METACADE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Elevating the future of web3 gaming &amp; AI
              </h2>
            </div>
            <Link
              href="/case-studies/metacade"
              className="font-mono text-xs text-teal hover:underline flex items-center gap-1.5 font-semibold"
            >
              <span>View Full Case Study &amp; Interactive Demo</span>
              <span>→</span>
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-panel via-obsidian to-void p-8 sm:p-12 relative overflow-hidden cyber-card">
            <div className="watermark-number select-none">
              CS
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="teal">AVARK SPEC CASE STUDY</Badge>
                  <span className="font-mono text-xs text-gray-400">METACADE ($MCADE) • CROSS-CHAIN</span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  The City of Metacadia: Unifying 4 Quarters, Autonomous AI NPCs &amp; 3D Staking
                </h3>

                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  Metacade needed a digital presence as forward-thinking as its vision. We engineered an interactive 3D virtual city navigating its 4 core quarters—competitive tournaments, autonomous AI NPCs with EIP-712 cryptographic intents, crystal XP leaderboards, and non-custodial token staking.
                </p>

                {/* Avark Capability Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="service-pill"># 3D City of Metacadia</span>
                  <span className="service-pill"># ReadyPI AI NPCs</span>
                  <span className="service-pill"># EIP-712 Intent Engine</span>
                  <span className="service-pill"># 450ms Fast Finality</span>
                  <span className="service-pill"># Mascot Max Runner</span>
                  <span className="service-pill"># Ponder v0.7 Sync</span>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/case-studies/metacade"
                    className="px-6 py-3 rounded-xl bg-teal text-void font-display font-bold text-xs hover:opacity-90 transition glow-teal shadow-lg shadow-teal/20"
                  >
                    Open Metacade Case Study &amp; Intent Simulator →
                  </Link>
                  <span className="font-mono text-xs text-gray-400">
                    Client: Russell Bennett (CEO, Metacade)
                  </span>
                </div>
              </div>

              {/* Verified Results Grid Card */}
              <div className="lg:col-span-5 rounded-2xl bg-void/90 border border-teal/30 p-6 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-teal font-bold uppercase">// VERIFIED IMPACT METRICS</span>
                  <Badge variant="teal">PRODUCTION</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono">
                  <div className="p-3 rounded-xl bg-panel/80 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">ECOSYSTEM VOLUME</span>
                    <span className="font-display text-2xl font-extrabold text-white">$48.5M+</span>
                  </div>
                  <div className="p-3 rounded-xl bg-panel/80 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">DAILY ACTIONS</span>
                    <span className="font-display text-2xl font-extrabold text-teal">150K+</span>
                  </div>
                  <div className="p-3 rounded-xl bg-panel/80 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">CHAIN LATENCY</span>
                    <span className="font-display text-2xl font-extrabold text-white">450ms</span>
                  </div>
                  <div className="p-3 rounded-xl bg-panel/80 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">SECURITY AUDIT</span>
                    <span className="font-display text-2xl font-extrabold text-teal">100%</span>
                  </div>
                </div>

                <blockquote className="text-xs text-gray-300 font-sans italic border-l-2 border-teal pl-3 py-1">
                  &quot;They didn’t just deliver a stunning visual identity — they created a seamless, intuitive user experience that perfectly captured our mission.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* B2B SERVICES & PRICING TABLE - AVARK STRUCTURED CAPABILITIES */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal tracking-wider uppercase">
                04 // DELIVERY PIPELINE &amp; MILESTONE PRICING
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
                  className="rounded-2xl border border-white/10 bg-panel p-6 flex flex-col justify-between space-y-6 cyber-card hover:border-teal/40 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-teal font-semibold">
                        {item.index} / 06 • {item.timeline}
                      </span>
                      <Badge variant={item.accent as any}>{item.badge}</Badge>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans min-h-[40px]">
                      {item.scope}
                    </p>

                    {/* Avark Style Capability Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((t) => (
                        <span key={t} className="service-pill">
                          {t}
                        </span>
                      ))}
                    </div>
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
                      className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 text-white font-mono text-xs hover:border-teal hover:bg-teal hover:text-void font-bold transition shadow-sm"
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
                05 // Technical Leadership &amp; Operational Firewall
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Engineered by Ahmed Riyaz (ARZ) &amp; Powered by ReadyPI
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Rareware Studio is led by Ahmed Riyaz (ARZ), an experienced engineering lead operating across blockchain and AI automation. Rareware’s flagship AI product, RareChars, leverages our proprietary ReadyPI multi-model API gateway (150+ models) to deliver persistent game NPC intelligence with zero gas drift and predictable token economics.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs text-gray-300">
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
              06 // Architectural FAQs
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
                  <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3 font-sans">
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
