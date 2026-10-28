'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Navbar,
  Footer,
  Badge,
  IntakeWizardModal,
  CurrencyMode,
} from '@rareware/ui';
import {
  Token3DShaderCanvas,
  MetacadiaCityShader,
  ScrollProgressBar,
  ScrollReveal,
  CounterTicker,
} from '@/components';
import { METACADE_MEDIA } from '@/constants/media';

export default function MetacadeCaseStudyPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeQuarter, setActiveQuarter] = useState<'arcade' | 'ai' | 'tournaments' | 'investor'>('arcade');
  const [agentSimulating, setAgentSimulating] = useState(false);
  const [agentLog, setAgentLog] = useState<string>('Ready: AI Agent "CyborgMax_07" awaiting game quest prompt...');

  const quarters = {
    arcade: {
      name: 'Arcade Quarter',
      tagline: 'Casual Games, Mascot Max Runner & Crystal XP',
      desc: 'The vibrant beating heart of Metacadia. Players jump into browser-based arcade titles, collecting in-game crystals that feed directly into the cross-platform XP progression system.',
      stats: '1.2M+ Arcade Sessions',
      features: ['Mascot Max Endless Runner', 'Browser-Native 60fps Canvas', 'Instant Crystal XP Sync', 'Anti-Bot Proof of Play'],
      accent: 'teal',
      badge: 'COMMUNITY CORE',
    },
    ai: {
      name: 'AI Agents Quarter',
      tagline: 'Autonomous Game NPCs with EIP-712 Cryptographic Intents',
      desc: 'Where human gamers meet autonomous AI companions. Powered by ReadyPI and RareChars, NPCs remember past battles via pgvector RAG memory and issue verified rewards without holding private keys.',
      stats: '150,000+ Daily AI Intents',
      features: ['Zero-Key Security Model', 'EIP-712 Signed Quests', 'ReadyPI 150+ LLM Fallbacks', 'Persistent Character Dialogue'],
      accent: 'violet',
      badge: 'AI ENGINE',
    },
    tournaments: {
      name: 'Tournament Quarter',
      tagline: 'Competitive Brackets, Live Spectating & Escrow Payouts',
      desc: 'High-stakes competitive gaming arena where players battle for on-chain prize pools. Smart contracts automatically disburse winnings via Safe multisigs with sub-second finality.',
      stats: '$8.4M+ Tournament Payouts',
      features: ['Automated Bracket Escrow', 'Sub-Second Finality (450ms)', 'Ponder v0.7 Real-Time Sync', 'Zero-Gas-War Fair Queuing'],
      accent: 'amber',
      badge: 'COMPETITIVE ARENA',
    },
    investor: {
      name: 'Investor Quarter',
      tagline: '3D Token Staking, Governance & Revenue Share',
      desc: 'A dedicated financial dashboard for tokenholders. Featuring timestamp-based cliff/linear vesting and Synthetix-style APY staking pools that prevent BSC block drift.',
      stats: '$32.1M TVL Staked',
      features: ['Timestamp Invariant Math', 'Dynamic 18-Decimal Safety', 'Gnosis Safe Timelock', 'Whale Alert Telemetry'],
      accent: 'blue',
      badge: 'CAPITAL VAULTS',
    },
  };

  const simulateAiIntent = () => {
    setAgentSimulating(true);
    setAgentLog('AI Agent "CyborgMax_07": Analyzing quest run in Sector 4...');
    setTimeout(() => {
      setAgentLog('AI Agent: Proposing Reward intent: 250 Crystals + Rare Badge #402. Requesting signature...');
    }, 800);
    setTimeout(() => {
      setAgentLog('RareCharsVerifier.sol: Verifying EIP-712 signature against signer 0x71C...89A2...');
    }, 1600);
    setTimeout(() => {
      setAgentLog('SUCCESS: Intent verified on-chain. Transfer emitted. Gas: 52,140 units (opBNB <$0.001).');
      setAgentSimulating(false);
    }, 2400);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-teal selection:text-void bg-void">
      {/* Real-Time Scroll Progress Indicator */}
      <ScrollProgressBar />

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

      {/* TOP CASE STUDY HUD BREADCRUMB */}
      <div className="border-b border-white/10 bg-obsidian/60 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <Link href="/" className="hover:text-teal transition">STUDIO</Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400">CASE STUDIES</span>
            <span className="text-gray-600">/</span>
            <span className="text-teal font-bold">METACADE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="text-gray-300">LIVE CASE STUDY • WEB3 GAMING &amp; AI BUILD</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-28 w-full">
        {/* CASE STUDY HERO SECTION */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/30 text-teal font-mono text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                <span>AVARK CASE STUDY SPECIFICATION</span>
                <span>•</span>
                <span className="text-gray-300">METACADE ($MCADE)</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.04]">
                Elevating the future of{' '}
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-teal via-cyan-300 to-violet-400">
                  web3 gaming &amp; AI.
                </span>
              </h1>

              <p className="text-gray-300 text-lg sm:text-xl font-sans leading-relaxed max-w-3xl">
                How we partnered with Metacade to design, architect, and engineer an interactive 3D digital ecosystem—connecting players, tournaments, autonomous AI NPCs, and tokenomics into a single high-performance Web3 gaming powerhouse.
              </p>
            </div>

            {/* PROJECT METADATA STRIP (AVARK SPEC) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-white/10 bg-panel font-mono text-xs">
              <div>
                <span className="text-gray-500 block text-[11px]">CLIENT</span>
                <span className="text-white font-bold text-sm">Metacade ($MCADE)</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">SERVICES DELIVERED</span>
                <span className="text-teal font-bold text-sm">3D Web, AI &amp; Contracts</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">TIMELINE &amp; PARTNERSHIP</span>
                <span className="text-white font-bold text-sm">8-Wk Sprint + 2-Yr Partner</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">NETWORKS</span>
                <span className="text-teal font-bold text-sm">Base, BSC (56) &amp; opBNB</span>
              </div>
            </div>

            {/* AVARK DELIVERABLE TAGS */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="service-pill"># Branding &amp; Visual Identity</span>
              <span className="service-pill"># Interactive 3D City (Metacadia)</span>
              <span className="service-pill"># Web3 Product Design</span>
              <span className="service-pill"># AI Agent &amp; NPC Integration</span>
              <span className="service-pill"># Mascot Max Endless Runner</span>
              <span className="service-pill"># EIP-712 Intent Engine</span>
              <span className="service-pill"># Ponder v0.7 Real-Time Indexer</span>
              <span className="service-pill"># Non-Custodial Multisig Safe</span>
            </div>

            {/* HERO VISUAL BANNER / CINEMATIC PREVIEW WITH VE03/NANO BANANA RENDER */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-panel via-obsidian to-void overflow-hidden cyber-card">
              {/* Cinematic Widescreen Visual */}
              <div className="relative w-full h-80 sm:h-[480px] overflow-hidden group">
                <Image
                  src={METACADE_MEDIA.cityAerial.src}
                  alt={METACADE_MEDIA.cityAerial.alt}
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={METACADE_MEDIA.cityAerial.blurDataURL}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-obsidian/40 to-transparent pointer-events-none" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void/80 border border-teal/40 backdrop-blur-md text-teal font-mono text-xs z-10 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-teal animate-ping" />
                  <span>NANO BANANA × VEO3 CINEMA RENDER</span>
                </div>
              </div>

              <div className="p-8 sm:p-14 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="font-mono text-xs text-teal uppercase tracking-wider">
                    01 // THE STRATEGIC CHALLENGE
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
                    Creating a dynamic ecosystem where players and investors come together
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    To match its vision, Metacade needed a digital presence as immersive and forward-thinking as the brand itself. The challenge was to craft a seamless experience that unified its diverse offerings—competitive tournaments, AI-driven agents, content creation, and investment opportunities—while ensuring effortless navigation for both gamers and crypto enthusiasts.
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Our approach was to elevate Metacade’s brand with a bold and unique design that reinforced its status as a next-generation gaming hub. Every element, from high-energy visuals to intuitive user flows, was designed to maximize engagement.
                  </p>
                </div>

                {/* IMPACT & RESULTS KPI CARD WITH REAL-TIME COUNTER TICKERS */}
                <div className="lg:col-span-5 rounded-2xl bg-void/90 border border-teal/30 p-6 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-teal font-semibold">THE RESULTS // METRICS</span>
                    <Badge variant="teal">VERIFIED</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono">
                    <div className="p-3 rounded-xl bg-panel/70 border border-white/5">
                      <span className="text-gray-500 text-[11px] block">TOTAL VOLUME</span>
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        <CounterTicker end={48.5} prefix="$" suffix="M+" decimals={1} />
                      </span>
                      <span className="text-teal text-[10px] block">Across Ecosystem</span>
                    </div>
                    <div className="p-3 rounded-xl bg-panel/70 border border-white/5">
                      <span className="text-gray-500 text-[11px] block">DAILY ACTIONS</span>
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-teal">
                        <CounterTicker end={150} suffix="K+" decimals={0} />
                      </span>
                      <span className="text-gray-400 text-[10px] block">Gamer &amp; AI Intents</span>
                    </div>
                    <div className="p-3 rounded-xl bg-panel/70 border border-white/5">
                      <span className="text-gray-500 text-[11px] block">CHAIN FINALITY</span>
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        <CounterTicker end={450} suffix="ms" decimals={0} />
                      </span>
                      <span className="text-teal text-[10px] block">Fast Block Invariant</span>
                    </div>
                    <div className="p-3 rounded-xl bg-panel/70 border border-white/5">
                      <span className="text-gray-500 text-[11px] block">SAFETY HANDOVER</span>
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        <CounterTicker end={100} suffix="%" decimals={0} />
                      </span>
                      <span className="text-gray-400 text-[10px] block">Safe Multisig Keys</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 font-mono text-xs text-gray-400">
                    ⚡ &quot;The final product is more than just a website, it is a high-performance ecosystem that captures the pulse of web3 gaming.&quot;
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CHAPTER 1: THE CITY OF METACADIA (INTERACTIVE 4 QUARTERS DEMO + SHADER) */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-teal tracking-wider uppercase">
                  02 // INTERACTIVE 3D CONCEPT
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  The City of Metacadia &amp; The 4 Quarters
                </h2>
              </div>
              <span className="font-mono text-xs text-gray-400">
                Interactive Architectural Navigation
              </span>
            </div>

            <p className="text-sm text-gray-300 font-sans leading-relaxed max-w-4xl">
              We began our design process by crafting a concept built around the company’s core offerings, known as the Metacade quarters. Inspired by their flagship game &quot;Gangs Of Metacadia,&quot; we engineered an interactive 3D virtual city allowing users to explore the four key areas of the ecosystem according to their intent.
            </p>

            {/* QUARTERS INTERACTIVE SWITCHER */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {(['arcade', 'ai', 'tournaments', 'investor'] as const).map((key) => {
                  const q = quarters[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveQuarter(key)}
                      className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition flex items-center gap-2 ${
                        activeQuarter === key
                          ? 'bg-teal text-void shadow-lg shadow-teal/20 font-bold'
                          : 'border border-white/10 bg-panel text-gray-400 hover:text-white hover:border-teal/40'
                      }`}
                    >
                      <span>{key === 'arcade' ? '🕹️' : key === 'ai' ? '🤖' : key === 'tournaments' ? '⚔️' : '💎'}</span>
                      <span>{q.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE QUARTER SHOWCASE CARD WITH INTEGRATED METACADIA 3D HORIZON SHADER */}
              <div className="rounded-3xl border border-teal/40 bg-panel/90 p-8 sm:p-10 relative overflow-hidden cyber-card">
                {/* 3D Interactive Horizon Canvas Shader Background */}
                <div className="absolute inset-0 opacity-45 pointer-events-none">
                  <MetacadiaCityShader activeQuarter={activeQuarter} />
                </div>

                <div className="watermark-number select-none">
                  {activeQuarter === 'arcade' ? '01' : activeQuarter === 'ai' ? '02' : activeQuarter === 'tournaments' ? '03' : '04'}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={quarters[activeQuarter].accent as any}>
                        {quarters[activeQuarter].badge}
                      </Badge>
                      <span className="font-mono text-xs text-gray-400">
                        {quarters[activeQuarter].stats}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl font-bold text-white">
                      {quarters[activeQuarter].name}
                    </h3>

                    <p className="font-mono text-xs text-teal uppercase tracking-wider">
                      {quarters[activeQuarter].tagline}
                    </p>

                    <p className="text-sm text-gray-300 font-sans leading-relaxed">
                      {quarters[activeQuarter].desc}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                      {quarters[activeQuarter].features.map((feat) => (
                        <div key={feat} className="p-3 rounded-xl bg-void/90 border border-white/10 font-mono text-xs text-gray-300 backdrop-blur-md">
                          <span className="text-teal block text-sm">✓</span>
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 rounded-2xl bg-void/90 border border-white/10 p-6 space-y-4 backdrop-blur-lg">
                    <div className="font-mono text-xs text-teal font-bold uppercase">
                      // Sector Live Invariants
                    </div>
                    <div className="space-y-2 text-xs font-mono text-gray-400">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Status:</span>
                        <span className="text-emerald-400 font-bold">ONLINE</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Shader:</span>
                        <span className="text-white">Metacadia WebGL</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Telemetry:</span>
                        <span className="text-teal">Ponder v0.7</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span>Chain Sync:</span>
                        <span className="text-teal font-bold">450ms Fast Finality</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIntakeOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-teal text-void font-display text-xs font-bold hover:opacity-90 transition"
                    >
                      Build Similar City Portal →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CHAPTER 2: 3D TOKEN ARCHITECTURE WITH INTERACTIVE WEBGL SHADER CANVAS */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-teal tracking-wider uppercase">
                  03 // 3D TOKEN ARCHITECTURE &amp; SHADER
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  Leveling up against the competition
                </h2>
              </div>
              <span className="font-mono text-xs text-teal">
                Interactive GPU-Accelerated Shaders
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 3D Interactive Token Shader */}
              <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-panel p-8 cyber-card flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-4 font-mono text-[11px] text-teal px-2.5 py-1 rounded-full border border-teal/30 bg-teal/10">
                  INTERACTIVE 3D SHADER • ROTATE &amp; SCROLL ACCELERATED
                </div>
                <Token3DShaderCanvas size={360} className="py-6" />
                <div className="font-mono text-xs text-gray-400 text-center">
                  Move mouse to tilt in 3D • Scroll page to accelerate token rotation
                </div>
              </div>

              {/* Right Column: Cinema Render + Staking Specs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="rounded-2xl overflow-hidden border border-white/10 relative group h-56 sm:h-64">
                  <Image
                    src={METACADE_MEDIA.token3D.src}
                    alt={METACADE_MEDIA.token3D.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={METACADE_MEDIA.token3D.blurDataURL}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-teal z-10">
                    Veo3 Render: Faceted Iridescent Chromatic Reflection
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Dynamic Tokenomics &amp; Timestamp Invariant Staking
                  </h3>
                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    A strong token design is essential for any crypto project looking to differentiate itself. We extended the 3D city visual direction to develop a new 3D token design, ensuring a consistent and standout identity across the website, socials, and on-chain staking dashboards.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="service-pill">3D Token Shaders</span>
                    <span className="service-pill">Timestamp Invariants</span>
                    <span className="service-pill">Synthetix APY Pools</span>
                    <span className="service-pill">BSC 450ms Zero Drift</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CHAPTER 4: THE ARCADE CENTREPIECE & LIVE AI INTENT DEMO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-teal tracking-wider uppercase">
                  04 // GAME CENTREPIECE &amp; AI INTEGRATION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  Mascot Max Arcade &amp; Autonomous AI Agents
                </h2>
              </div>
              <span className="font-mono text-xs text-violet">
                Playable by Human Gamers &amp; AI Agents Alike
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                {/* Cinema Visual Dual Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-white/10 relative group h-48 sm:h-52">
                    <Image
                      src={METACADE_MEDIA.mascotMax.src}
                      alt={METACADE_MEDIA.mascotMax.alt}
                      fill
                      placeholder="blur"
                      blurDataURL={METACADE_MEDIA.mascotMax.blurDataURL}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-[11px] font-mono text-teal z-10">
                      Mascot Max Jetpack Flight
                    </span>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/10 relative group h-48 sm:h-52">
                    <Image
                      src={METACADE_MEDIA.aiNeuralCore.src}
                      alt={METACADE_MEDIA.aiNeuralCore.alt}
                      fill
                      placeholder="blur"
                      blurDataURL={METACADE_MEDIA.aiNeuralCore.blurDataURL}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-[11px] font-mono text-violet z-10">
                      EIP-712 AI Neural Core
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Creating a centrepiece for the Metacade Arcade
                  </h3>
                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    One of our favorite parts was building self-contained experiences that add life to the wider platform. While the arcade initially held third-party games, Metacade wanted its own branded game at the centre of the experience.
                  </p>
                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    The result was an endless runner featuring Metacade’s brand mascot, Max, flying through the city of Metacadia with a jetpack, avoiding obstacles, and collecting power-ups and crystals. Most crucially, the engine was built with expansion in mind so it can be played by both human players and autonomous AI agents using RareChars EIP-712 cryptographic intents.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="service-pill">Jetpack Max Runner</span>
                    <span className="service-pill">ReadyPI Multi-Model Gateway</span>
                    <span className="service-pill">pgvector Semantic Memory</span>
                    <span className="service-pill">Zero Private Keys in LLM</span>
                  </div>
                </div>
              </div>

              {/* LIVE SIMULATOR TERMINAL */}
              <div className="lg:col-span-5 rounded-2xl bg-panel border border-white/10 p-6 space-y-4 cyber-card">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs text-white font-bold">AI Agent Intent Simulator</span>
                  </div>
                  <span className="font-mono text-[10px] text-teal">EIP-712 VERIFIED</span>
                </div>

                <div className="p-4 rounded-xl bg-void font-mono text-xs text-gray-300 min-h-[110px] space-y-2 border border-white/5">
                  <div className="text-gray-500">// Terminal Log:</div>
                  <div className="text-teal font-medium leading-relaxed">{agentLog}</div>
                </div>

                <button
                  disabled={agentSimulating}
                  onClick={simulateAiIntent}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 ${
                    agentSimulating
                      ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                      : 'bg-violet text-white hover:bg-violet/90 shadow-lg shadow-violet/20'
                  }`}
                >
                  <span>{agentSimulating ? '⏳ Verifying On-Chain Intent...' : '⚡ Trigger AI Quest Intent Simulation'}</span>
                </button>

                <div className="font-mono text-[10px] text-gray-500 text-center">
                  Uses RareCharsVerifier.sol protocol architecture • 0 Gas Drift
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* VERBATIM CLIENT TESTIMONIAL (AVARK EXACT) */}
        <ScrollReveal>
          <section className="rounded-3xl border border-teal/30 bg-gradient-to-r from-panel via-obsidian to-void p-8 sm:p-14 relative overflow-hidden">
            <div className="max-w-4xl space-y-6 relative z-10">
              <span className="font-mono text-xs text-teal uppercase tracking-wider block">
                05 // CLIENT EXECUTIVE TESTIMONIAL
              </span>

              <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-white leading-relaxed">
                &quot;Working with our studio was a game-changer for Metacade. As our vision to build the best gaming platform took shape, they stepped in with{' '}
                <span className="text-teal font-bold underline decoration-teal/50 decoration-2 underline-offset-4">
                  unparalleled expertise in web3 design and branding
                </span>
                . They didn’t just deliver a stunning visual identity — they created a seamless, intuitive user experience that perfectly captured our mission to connect gaming communities in a decentralized world.&quot;
              </blockquote>

              <div className="pt-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-teal/20 border border-teal flex items-center justify-center font-display font-extrabold text-teal text-lg">
                  R
                </div>
                <div>
                  <div className="font-display font-bold text-white text-base">Russell Bennett</div>
                  <div className="font-mono text-xs text-gray-400">CEO &amp; Co-Founder, Metacade ($MCADE)</div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* INTAKE CALL TO ACTION */}
        <ScrollReveal>
          <section className="rounded-3xl border border-white/10 bg-panel p-8 sm:p-12 text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Ready to build your next-generation Web3 ecosystem?
            </h2>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              From interactive 3D city portals to autonomous AI NPCs and audited smart contract infrastructure—we ship production-ready Web3 flagship software.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIntakeOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-teal text-void font-display font-bold text-sm hover:opacity-90 transition glow-teal shadow-xl shadow-teal/20"
              >
                Start Project Intake (/start) →
              </button>
              <Link
                href="/"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:bg-white/10 transition"
              >
                ← Back to Studio Overview
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer />

      <IntakeWizardModal
        isOpen={intakeOpen}
        onClose={() => setIntakeOpen(false)}
      />
    </div>
  );
}
