'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Reveal,
  SplitLines,
  ScrollWords,
  StickyStackCard,
  Marquee,
  MagneticButton,
  CopyButton,
  IntakeWizardModal,
} from '@rareware/ui';
import { StudioHeader } from '../components/StudioHeader';
import { ScrollProgressBar } from '../components/ScrollProgressBar';

export default function StudioHomePage() {
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  const selectedBuilds = [
    {
      num: '/01',
      badge: 'INTERNAL BUILD',
      title: 'RareMint Demo',
      subtitle: 'Zero-Gas-War NFT Collection Suite & Merkle Allowlist',
      desc: 'Gas-optimized ERC-721A batch minting architecture with cryptographic Merkle proof verification, delayed commit-reveal metadata cryptography, and EIP-2981 Safe royalties.',
      outcome: '100% Deterministic • 0 Invariant Regressions',
      tags: ['ERC-721A', 'Merkle Tree', 'Commit-Reveal', 'Safe Royalties', '1k Fuzz Runs'],
      href: '/raremint',
      accent: 'teal',
      bgGradient: 'from-teal/10 via-obsidian to-void',
      hasImage: true,
      imageSrc: '/media/raremint-vault-3d.jpg',
      imageCaption: 'RareMint • Commit-Reveal Vault',
      imageBadge: 'ERC-721A Batch',
    },
    {
      num: '/02',
      badge: 'INTERNAL BUILD',
      title: 'RareChars Demo',
      subtitle: 'Persistent AI Game NPCs & Cryptographic Intents',
      desc: 'Autonomous NPC agent runtime with pgvector RAG memory. Characters reason off-chain and propose EIP-712 signed action intents verified directly on-chain by RareCharsVerifier.sol on opBNB.',
      outcome: 'Sub-Second Intents • Zero Private Key Exposure',
      tags: ['ReadyPI Gateway', 'pgvector RAG', 'EIP-712 Intent', 'Zero-Key Security', 'opBNB'],
      href: '/rarechars',
      accent: 'violet',
      bgGradient: 'from-violet/10 via-obsidian to-void',
      hasImage: true,
      imageSrc: '/media/character-npc-cipher-3d.jpg',
      imageCaption: 'Cipher • 3D AI Netrunner NPC',
      imageBadge: 'EIP-712 Intent Visor',
    },
    {
      num: '/03',
      badge: 'INTERNAL BUILD',
      title: 'RarePay Demo',
      subtitle: 'Non-Custodial Crypto Checkout & Dynamic Normalization',
      desc: 'Multi-token payment router on BSC & opBNB accepting USDT, USDC, and BNB with dynamic 18-decimal token normalization and signed HMAC merchant webhooks.',
      outcome: 'Direct Safe Handover • Zero Custodial Risk',
      tags: ['Non-Custodial', '18-Dec Safety', 'Dynamic Decimals', 'HMAC Webhooks', 'BSC & opBNB'],
      href: '/rarepay',
      accent: 'blue',
      bgGradient: 'from-blue/10 via-obsidian to-void',
      hasImage: true,
      imageSrc: '/media/rarepay-terminal-3d.jpg',
      imageCaption: 'RarePay • Liquid-Glass POS Terminal',
      imageBadge: '18-Dec USDT/USDC/BNB',
    },
    {
      num: '/04',
      badge: 'FEATURED CASE STUDY',
      title: 'Metacade Showcase',
      subtitle: 'Cyberpunk Web3 Arcade, 3D WebGL City & AI Economy',
      desc: 'Flagship interactive case study featuring real-time 3D WebGL city shaders, autonomous quest execution with EIP-712 typed data, and sub-second on-chain game telemetry.',
      outcome: 'Interactive Live Shader • 450ms Block Time',
      tags: ['3D WebGL Shader', 'Cyberpunk Metropolis', 'EIP-712 AI Intent', 'opBNB Fast Finality'],
      href: '/case-studies/metacade',
      accent: 'teal',
      bgGradient: 'from-teal/15 via-obsidian to-void',
      hasImage: true,
      imageSrc: '/media/game-interface-metacade-hud.jpg',
      imageCaption: 'Metacade AAA Combat HUD',
      imageBadge: 'opBNB 450ms Ping',
    },
  ];

  const services = [
    {
      index: '/01',
      title: 'Token Launch Kit',
      scope: 'ERC-20, Cliff/Linear Vesting, Timestamp Staking, Tests & Safe Handover',
      fromPrice: 'from $3,000',
      timeline: '1–2 Weeks',
      tags: ['Solidity 0.8.28', 'Timestamp Vesting', 'Synthetix APY', 'Foundry 1k Fuzz', 'Safe Multisig'],
    },
    {
      index: '/02',
      title: 'NFT Collection + Mint Site',
      scope: 'ERC-721A, Merkle Allowlist, Commit-Reveal, Minting DApp, Royalties & Art Pipeline',
      fromPrice: 'from $4,000',
      timeline: '2–3 Weeks',
      tags: ['ERC-721A Batch', 'Merkle Proofs', 'Safe Royalties', 'Cinematic DApp', 'EVM Invariants'],
    },
    {
      index: '/03',
      title: 'Non-Custodial Payment Gateway',
      scope: 'RarePay Router, 18-Decimal Normalization, HMAC Webhooks, Hosted Checkout & Docs',
      fromPrice: 'from $5,000',
      timeline: '2–3 Weeks',
      tags: ['USDT / USDC / BNB', 'Non-Custodial', 'HMAC Webhooks', 'BSC 450ms', 'opBNB Native'],
    },
    {
      index: '/04',
      title: 'AI Game Character Runtime',
      scope: 'Persistent NPC Agent, pgvector RAG Memory, ReadyPI Gateway, EIP-712 Verifier & DApp',
      fromPrice: 'from $6,000',
      timeline: '3–4 Weeks',
      tags: ['Zero-Key Safety', 'EIP-712 Intents', 'pgvector Memory', 'opBNB Sub-Second', 'NPC Persona'],
    },
    {
      index: '/05',
      title: 'Full-Stack Protocol & Frontend',
      scope: 'Custom Architecture, Core Contracts, Ponder Indexer, Luxury Editorial Frontend, Safe Multisig',
      fromPrice: 'from $12,000',
      timeline: '4–6 Weeks',
      tags: ['Complete Ecosystem', 'Ponder v0.7', 'Framer Motion', '16k Invariant Runs', 'Safe Handover'],
    },
  ];

  const products = [
    {
      id: '01',
      name: 'RareMint',
      tagline: 'Zero-gas-war NFT collection kit with Merkle allowlists and delayed metadata reveal.',
      status: 'Open-source core',
      statusClass: 'text-teal border-teal/30 bg-teal/10',
      contract: 'RareMint.sol',
      href: '/raremint',
      glow: 'hover:shadow-[0_0_35px_rgba(0,245,212,0.15)] hover:border-teal/50',
      imageSrc: '/media/raremint-vault-3d.jpg',
    },
    {
      id: '02',
      name: 'RareToken',
      tagline: 'Fixed-supply ERC-20 with timestamp cliff vesting and Synthetix-style staking.',
      status: 'Open-source core',
      statusClass: 'text-amber border-amber/30 bg-amber/10',
      contract: 'RareToken.sol + Vesting',
      href: '/raretoken',
      glow: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:border-amber/50',
      imageSrc: '/media/raretoken-treasury-3d.jpg',
    },
    {
      id: '03',
      name: 'RareChars',
      tagline: 'Persistent AI NPCs for Web3 games with pgvector RAG memory and verified EIP-712 intents.',
      status: 'Preview',
      statusClass: 'text-violet border-violet/30 bg-violet/10',
      contract: 'RareCharsVerifier.sol',
      href: '/rarechars',
      glow: 'hover:shadow-[0_0_35px_rgba(139,92,246,0.15)] hover:border-violet/50',
      imageSrc: '/media/character-npc-cipher-3d.jpg',
    },
    {
      id: '04',
      name: 'RarePay',
      tagline: 'Non-custodial crypto checkout router on BSC & opBNB with dynamic 18-decimal token normalization.',
      status: 'Preview',
      statusClass: 'text-blue border-blue/30 bg-blue/10',
      contract: 'RarePayRouter.sol',
      href: '/rarepay',
      glow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] hover:border-blue/50',
      imageSrc: '/media/rarepay-terminal-3d.jpg',
    },
    {
      id: '05',
      name: 'RareAgent',
      tagline: 'Autonomous AI agent smart accounts with scoped session keys, daily spend caps, and kill-switches.',
      status: 'Early access',
      statusClass: 'text-orange border-orange/30 bg-orange/10',
      contract: 'Session Key Module',
      href: '/rareagent',
      glow: 'hover:shadow-[0_0_35px_rgba(249,115,22,0.15)] hover:border-orange/50',
      imageSrc: '/media/rareagent-enclave-3d.jpg',
    },
    {
      id: '06',
      name: 'RareDash',
      tagline: 'Sub-second Ponder-indexed contract telemetry, whale alert webhooks, and live on-chain intelligence.',
      status: 'Early access',
      statusClass: 'text-lime border-lime/30 bg-lime/10',
      contract: 'Ponder v0.7 Indexer',
      href: '/raredash',
      glow: 'hover:shadow-[0_0_35px_rgba(34,211,238,0.15)] hover:border-lime/50',
      imageSrc: '/media/raredash-indexer-3d.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-void text-gray-100 font-sans selection:bg-teal selection:text-void">
      {/* Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Editorial Fixed Header */}
      <StudioHeader onOpenIntake={() => setIntakeOpen(true)} />

      {/* Main Content */}
      <main className="relative pt-32 md:pt-40">
        {/* ========================================================
            1. HERO SECTION (Avark Architecture + SplitLines Reveal)
           ======================================================== */}
        <section className="relative px-6 md:px-12 lg:px-16 max-w-7xl mx-auto pb-24 md:pb-36">
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase text-teal">
              <span>/Rareware Studio</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">BSC 56 &amp; opBNB 204</span>
            </div>

            {/* Large H1 Sentence Reveal */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-[-0.035em] text-white max-w-5xl">
              <SplitLines
                lines={[
                  'Blockchain products and AI game characters,',
                  'built with cinematic craft.',
                ]}
              />
            </h1>

            {/* Short Supporting Paragraph */}
            <Reveal delay={0.25} duration={0.8}>
              <p className="max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
                We engineer test-first smart contracts, non-custodial crypto checkout rails, and
                autonomous game NPC runtimes on BSC and opBNB for founders who refuse boilerplate
                templates.
              </p>
            </Reveal>

            {/* Actions Row */}
            <Reveal delay={0.35} duration={0.8}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton
                  onClick={() => {
                    const el = document.getElementById('builds');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full bg-teal px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-void transition hover:bg-teal/90 shadow-[0_0_30px_rgba(0,245,212,0.35)]"
                >
                  Explore Selected Builds ↓
                </MagneticButton>

                <MagneticButton
                  onClick={() => setIntakeOpen(true)}
                  className="rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10 hover:border-white/40"
                >
                  Start your project
                </MagneticButton>

                <Link
                  href="/case-studies/metacade"
                  className="inline-flex items-center gap-2 text-xs font-mono text-teal hover:underline tracking-tight pl-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                  </span>
                  <span>Case Study: Metacade (Live 3D WebGL) →</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Hero 3D Monolith Visual Container */}
          <Reveal delay={0.45} duration={1.1} className="mt-14 sm:mt-20">
            <div className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0C11] shadow-[0_32px_96px_rgba(0,0,0,0.85)] group">
              <Image
                src="/media/hero-monolith-3d.jpg"
                alt="Rareware Studio 3D Monolith"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              />

              {/* Ambient Radial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

              {/* Top-Left Telemetry Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-full border border-white/10 bg-void/80 px-3.5 py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-[11px] text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                  <span>Solidity 0.8.28 • Foundry 1k Fuzz • Invariant Verified</span>
                </div>
              </div>

              {/* Bottom-Right Intent Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-full border border-white/10 bg-void/80 px-3.5 py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-[11px] text-teal">
                  <span>EIP-712 Intent Runtime • BSC 450ms • opBNB Native</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================
            2. SELECTED BUILDS (Sticky Stacking Cards Feed)
           ======================================================== */}
        <section id="builds" className="relative px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 md:py-32">
          {/* Eyebrow & Header */}
          <div className="mb-16 space-y-4">
            <div className="font-mono text-xs tracking-[0.16em] uppercase text-teal">
              /Selected builds
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
              Internal production builds and flagship showcases.
            </h2>
            <p className="text-gray-400 max-w-xl text-base font-light">
              Every architecture is engineered in-house, fuzz-tested, and verified with zero critical
              invariants.
            </p>
          </div>

          {/* Sticky Stacked Cards Sequence */}
          <div className="relative space-y-8 pb-12">
            {selectedBuilds.map((build, index) => (
              <StickyStackCard
                key={build.num}
                index={index}
                total={selectedBuilds.length}
                topOffset={100}
                className="w-full"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0E1017] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl ${
                    build.accent === 'teal'
                      ? 'hover:border-teal/40'
                      : build.accent === 'violet'
                      ? 'hover:border-violet/40'
                      : 'hover:border-blue/40'
                  } transition-colors duration-300`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Build Specs */}
                    <div className={build.hasImage ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6'}>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-teal font-bold tracking-widest">
                            {build.num}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-gray-300">
                            {build.badge}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-teal">
                          {build.outcome}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {build.title}
                        </h3>
                        <p className="font-mono text-xs text-gray-400">
                          {build.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light max-w-2xl">
                        {build.desc}
                      </p>

                      {/* Tag Chips */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {build.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Action Micro-interactions */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08]">
                        <Link
                          href={build.href}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-void uppercase tracking-wider hover:bg-teal transition"
                        >
                          <span>View build details</span>
                          <span aria-hidden="true">→</span>
                        </Link>

                        <CopyButton
                          textToCopy={`https://www.rarewarestudio.space${build.href}`}
                          defaultLabel="Copy build link"
                          copiedLabel="Copied link ✓"
                          className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/5 text-gray-300"
                        />
                      </div>
                    </div>

                    {/* Right Column: Visual Preview (for featured case study) */}
                    {build.hasImage && build.imageSrc && (
                      <div className="lg:col-span-5">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.15] bg-black shadow-inner group">
                          <Image
                            src={build.imageSrc}
                            alt={build.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-teal">
                            <span>{build.imageCaption || 'Interactive Visual'}</span>
                            <span className="text-gray-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">{build.imageBadge || 'Live 3D'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </StickyStackCard>
            ))}
          </div>
        </section>

        {/* ========================================================
            3. PROOF & MANIFESTO STATEMENT (ScrollWords & Disciplines)
           ======================================================== */}
        <section className="relative px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 border-t border-white/[0.06]">
          {/* Truthful Metric Bar */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-white/[0.08] font-mono text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">7</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  Production Architectures
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-teal">6</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  Verified Contracts
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">1,000+</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  Invariant Fuzz Runs
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald">0</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  Security Regressions
                </div>
              </div>
            </div>
          </Reveal>

          {/* Large Manifesto Statement */}
          <div className="py-20 md:py-28 max-w-5xl">
            <div className="font-mono text-xs tracking-[0.16em] uppercase text-teal mb-6">
              /The Rareware Standard
            </div>
            <ScrollWords
              text="We do not ship code we would not stake our own treasury on. Every state-changing function undergoes test-first Foundry validation, property fuzzing, and invariant verification before deployment."
              className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.18] text-white"
            />
          </div>

          {/* Three Studio Disciplines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="border-t border-white/[0.12] pt-6 space-y-3">
              <div className="font-mono text-xs text-teal font-bold uppercase tracking-wider">
                /01 Security First
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                Fuzz Testing &amp; Invariants
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Property fuzzing, stateful invariants, and static analysis with Slither and Aderyn. We
                verify contract boundary conditions before touching mainnet.
              </p>
            </div>

            <div className="border-t border-white/[0.12] pt-6 space-y-3">
              <div className="font-mono text-xs text-violet font-bold uppercase tracking-wider">
                /02 AI Native
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                Zero-Key Cryptographic Safety
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Autonomous agents propose actions to backend signers; smart contracts verify via
                EIP-712 typed data. Private keys never touch client or agent runtimes.
              </p>
            </div>

            <div className="border-t border-white/[0.12] pt-6 space-y-3">
              <div className="font-mono text-xs text-amber font-bold uppercase tracking-wider">
                /03 Cinematic Frontends
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                Hardware-Accelerated Motion
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                60fps interaction polish, WebGL shaders, and editorial typography. We build luxury Web3
                interfaces that command attention and drive conversion.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. DEVELOPER ECOSYSTEM (Dual-Track Infinite Marquee)
           ======================================================== */}
        <section className="py-20 border-t border-white/[0.06] bg-obsidian/40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
            <div className="font-mono text-xs tracking-[0.16em] uppercase text-teal mb-2">
              /Built with
            </div>
            <p className="text-sm text-gray-400 font-mono">
              Developer tools, protocols, and verified infrastructure we build with.
            </p>
          </div>

          <div className="space-y-4">
            <Marquee direction="left" speedSeconds={30}>
              {[
                'BNB Chain (BSC 56)',
                'opBNB Sub-Second (204)',
                'Foundry Fuzz Testing',
                'OpenZeppelin Contracts',
                'Safe Multisig Vaults',
                'Solidity 0.8.28',
                'Slither Static Analysis',
                'Aderyn Analysis',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0E1119] px-5 py-2.5 font-mono text-xs text-gray-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                  <span>{item}</span>
                </div>
              ))}
            </Marquee>

            <Marquee direction="right" speedSeconds={34}>
              {[
                'Next.js 14 App Router',
                'Framer Motion Kinetics',
                'Tailwind CSS',
                'Supabase & PostgreSQL',
                'Ponder v0.7 Indexer',
                'Vercel Edge Network',
                'pgvector RAG Embeddings',
                'EIP-712 Typed Signatures',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0E1119] px-5 py-2.5 font-mono text-xs text-gray-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                  <span>{item}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* ========================================================
            5. SERVICES SECTION (Avark Numbered Rows + Indicative Pricing)
           ======================================================== */}
        <section id="services" className="relative px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 md:py-32 border-t border-white/[0.06]">
          <div className="mb-16 space-y-4">
            <div className="font-mono text-xs tracking-[0.16em] uppercase text-teal">
              /How we help
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl">
              Fixed-scope engineering engagements delivered with deterministic precision.
            </h2>
            <p className="text-gray-400 max-w-xl text-base font-light">
              Every client project receives dedicated senior engineering, test suites, and Gnosis
              Safe ownership handover.
            </p>
          </div>

          {/* Numbered Service Rows */}
          <div className="border-t border-white/[0.12] divide-y divide-white/[0.08]">
            {services.map((svc, idx) => {
              const isHovered = activeService === idx;
              return (
                <div
                  key={svc.index}
                  onMouseEnter={() => setActiveService(idx)}
                  onMouseLeave={() => setActiveService(null)}
                  className={`group py-8 md:py-10 transition-colors duration-300 ${
                    isHovered ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                  } cursor-pointer`}
                  onClick={() => setIntakeOpen(true)}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Index & Title */}
                    <div className="lg:col-span-6 flex items-start gap-4">
                      <span className="font-mono text-xs text-teal font-bold pt-1">
                        {svc.index}
                      </span>
                      <div className="space-y-1 transition-transform duration-300 ease-out group-hover:translate-x-4">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-teal transition">
                          {svc.title}
                        </h3>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">
                          {svc.scope}
                        </p>
                      </div>
                    </div>

                    {/* Timeline & Tags */}
                    <div className="lg:col-span-4 flex flex-wrap gap-2">
                      {svc.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Indicative Pricing & Arrow */}
                    <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                      <div className="text-right">
                        <span className="block font-mono text-xs font-semibold text-teal">
                          {svc.fromPrice}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                          {svc.timeline}
                        </span>
                      </div>
                      <div className="rounded-full border border-white/10 p-2 text-gray-400 group-hover:border-teal group-hover:text-teal transition-transform duration-300 group-hover:translate-x-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-xs font-mono text-gray-500">
            * Indicative pricing ranges based on standard specifications. Every client engagement
            receives a deterministic, fixed-price milestone scope.
          </p>
        </section>

        {/* ========================================================
            6. PRODUCTS SUITE (3x2 Editorial Grid)
           ======================================================== */}
        <section id="products" className="relative px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 md:py-32 border-t border-white/[0.06]">
          <div className="mb-16 space-y-4">
            <div className="font-mono text-xs tracking-[0.16em] uppercase text-teal">
              /Products
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl">
              Modular Web3 primitives and developer tools.
            </h2>
            <p className="text-gray-400 max-w-xl text-base font-light">
              Built for performance, developer velocity, and rigorous on-chain cryptographic safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <Link
                key={prod.id}
                href={prod.href}
                className={`group relative rounded-2xl border border-white/[0.1] bg-[#0E1017] p-6 transition-all duration-300 ${prod.glow} flex flex-col justify-between overflow-hidden`}
              >
                <div className="space-y-4">
                  {/* Matching 16:9 Architecture Visual */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <Image
                      src={prod.imageSrc}
                      alt={prod.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="font-mono text-[10px] text-gray-300 bg-void/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        /{prod.id}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border backdrop-blur-md ${prod.statusClass}`}
                      >
                        {prod.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-teal transition">
                    {prod.name}
                  </h3>

                  <p className="text-xs font-mono text-teal/80">{prod.contract}</p>

                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {prod.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-white transition">
                  <span>Explore architecture</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================
            7. TELEMETRY LAB TEASER (Simulated Demo Notice)
           ======================================================== */}
        <section className="relative px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16">
          <div className="rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0D0F16] p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tracking-widest uppercase text-teal">
                    /Telemetry Lab
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber/10 border border-amber/30 text-amber font-semibold">
                    [Simulated Demo]
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Real-time chain telemetry, particle topology &amp; estimator.
                </h3>

                <p className="text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
                  To keep our flagship homepage calm and editorial, all simulated telemetry (GPU
                  canvas particle networks, 60fps protocol terminal streams, and interactive project
                  cost calculators) are hosted in our sandboxed laboratory.
                </p>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  href="/lab"
                  className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-void hover:bg-teal transition shadow-[0_0_24px_rgba(0,245,212,0.3)]"
                >
                  Open Telemetry Lab →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. CLOSING CTA & ARCHITECTURAL FOOTER WORDMARK
           ======================================================== */}
        <section className="relative px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 md:py-36 border-t border-white/[0.06]">
          <div className="space-y-6 max-w-3xl">
            <div className="font-mono text-xs tracking-[0.16em] uppercase text-teal">
              /Start a conversation
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Have a project in mind?
            </h2>

            <p className="text-lg text-gray-400 font-light leading-relaxed">
              We take on 2 selective client engagements per sprint. Direct milestone escrow, Safe
              multisig ownership handover, and zero boilerplate.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton
                onClick={() => setIntakeOpen(true)}
                className="rounded-full bg-teal px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-void hover:bg-teal/90 shadow-[0_0_30px_rgba(0,245,212,0.4)]"
              >
                Start your project
              </MagneticButton>

              <CopyButton
                textToCopy="contact@rarewarestudio.space"
                defaultLabel="Copy contact email"
                copiedLabel="Email copied to clipboard ✓"
                className="rounded-full border border-white/20 px-6 py-3.5 hover:bg-white/5 text-gray-300"
              />
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-20 pb-16 border-t border-white/[0.08] mt-20 font-mono text-xs">
            <div className="space-y-3">
              <div className="text-white font-bold uppercase text-[11px] tracking-wider">
                /Products
              </div>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/raremint" className="hover:text-teal transition">RareMint (NFT Kit)</Link></li>
                <li><Link href="/raretoken" className="hover:text-amber transition">RareToken &amp; Vesting</Link></li>
                <li><Link href="/rarechars" className="hover:text-violet transition">RareChars (AI NPCs)</Link></li>
                <li><Link href="/rarepay" className="hover:text-blue transition">RarePay (Checkout)</Link></li>
                <li><Link href="/rareagent" className="hover:text-orange transition">RareAgent (ERC-4337)</Link></li>
                <li><Link href="/raredash" className="hover:text-lime transition">RareDash (Indexer)</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-white font-bold uppercase text-[11px] tracking-wider">
                /Case Studies
              </div>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/case-studies/metacade" className="text-teal font-semibold hover:underline">Metacade Showcase →</Link></li>
                <li><Link href="#builds" className="hover:text-white transition">RareMint Internal Build</Link></li>
                <li><Link href="#builds" className="hover:text-white transition">RareChars Internal Build</Link></li>
                <li><Link href="#builds" className="hover:text-white transition">RarePay Internal Build</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-white font-bold uppercase text-[11px] tracking-wider">
                /Security &amp; Code
              </div>
              <ul className="space-y-2 text-gray-400">
                <li><span>Solidity 0.8.28</span></li>
                <li><span>Foundry 1k Fuzz Runs</span></li>
                <li><span>Stateful Invariants</span></li>
                <li><span>Safe Multisig + Timelock</span></li>
                <li><span>Zero-Key AI Safety</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-white font-bold uppercase text-[11px] tracking-wider">
                /Direct Intake
              </div>
              <ul className="space-y-2 text-gray-400">
                <li><span>Telegram: @rareware_space</span></li>
                <li><span>Email: contact@rarewarestudio.space</span></li>
                <li><span>Deployments: BSC 56 &amp; opBNB 204</span></li>
                <li><Link href="/lab" className="text-amber hover:underline">[Simulated Lab]</Link></li>
              </ul>
            </div>
          </div>

          {/* Giant Architectural Wordmark */}
          <div className="w-full border-t border-white/[0.06] pt-12 select-none overflow-hidden text-center">
            <span className="font-display font-extrabold text-[12vw] tracking-[-0.05em] text-white/[0.04] leading-none block uppercase">
              RAREWARE STUDIO
            </span>
          </div>

          {/* Legal & Non-Custodial Notice */}
          <div className="border-t border-white/[0.06] pt-8 space-y-4 text-xs font-sans text-gray-500 leading-relaxed">
            <p>
              <strong className="text-gray-400">NON-CUSTODIAL SOFTWARE NOTICE:</strong> Rareware Studio
              operates exclusively as an independent software development laboratory, UI/UX engineering,
              and technology consulting firm. Rareware does not operate an exchange, take custody of
              user funds, or provide financial advice. All smart contracts, cryptographic keys, and
              treasury multisigs remain in the sole ownership and control of clients and their Gnosis
              Safe configurations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-gray-400 pt-2 border-t border-white/[0.04]">
              <div>© {new Date().getFullYear()} RAREWARE STUDIO. ALL RIGHTS RESERVED.</div>
              <div>OPTIMIZED FOR POST-FERMI BSC 450ms BLOCK TIME &amp; opBNB SUB-SECOND EVM</div>
            </div>
          </div>
        </section>
      </main>

      {/* Intake Wizard Modal */}
      <IntakeWizardModal isOpen={intakeOpen} onClose={() => setIntakeOpen(false)} />
    </div>
  );
}
