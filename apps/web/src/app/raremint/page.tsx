"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Zap,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Layers,
  Box,
  Sparkles,
  Code2,
  Rocket,
  RotateCw,
  Terminal as TerminalIcon,
  Shield,
  Activity,
  Check,
  Copy,
  Sliders,
  X,
} from "lucide-react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import {
  Navbar,
  Footer,
  Badge,
  Terminal,
  IntakeWizardModal,
  CurrencyMode,
  formatPrice,
} from "@rareware/ui";

export default function RareMintPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>("USD");
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [mintMode, setMintMode] = useState<"allowlist" | "public">("allowlist");
  const [mintQty, setMintQty] = useState(2);
  const [mintedCount, setMintedCount] = useState(421);
  const [unboxed, setUnboxed] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [mintLog, setMintLog] = useState(
    "Ready: RareMint.mintAllowlist(quantity=2, maxAllowance=3, proof=[0x9a4f...])",
  );
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [contractCopied, setContractCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // FlowArt Motion & Timing state (Default: Obsidian Dynamic 30° / 1.2s scrub / 0.94 scale)
  const [rotationAngle, setRotationAngle] = useState(30);
  const [scrubSpeed, setScrubSpeed] = useState(1.2);
  const [scaleFrom, setScaleFrom] = useState(0.94);
  const [transformOrigin, setTransformOrigin] = useState<
    "bottom left" | "top center"
  >("bottom left");
  const [motionTunerOpen, setMotionTunerOpen] = useState(false);

  const applyMotionPreset = (
    preset: "cinematic" | "obsidian" | "straight" | "cyberpunk",
  ) => {
    if (preset === "cinematic") {
      setRotationAngle(15);
      setScrubSpeed(1.2);
      setScaleFrom(0.96);
      setTransformOrigin("bottom left");
    } else if (preset === "obsidian") {
      setRotationAngle(30);
      setScrubSpeed(1.2);
      setScaleFrom(0.94);
      setTransformOrigin("bottom left");
    } else if (preset === "straight") {
      setRotationAngle(0);
      setScrubSpeed(0.8);
      setScaleFrom(0.92);
      setTransformOrigin("top center");
    } else if (preset === "cyberpunk") {
      setRotationAngle(45);
      setScrubSpeed(1.5);
      setScaleFrom(0.9);
      setTransformOrigin("bottom left");
    }
  };

  const unitPrice = mintMode === "allowlist" ? 0.05 : 0.08;
  const totalPrice = (unitPrice * mintQty).toFixed(3);

  // Scroll listener to update active chapter in floating dock
  useEffect(() => {
    const handleScroll = () => {
      const chapterIds = ["ch-01", "ch-02", "ch-03", "ch-04", "ch-05"];
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = chapterIds.length - 1; i >= 0; i--) {
        const targetId = chapterIds[i];
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el && el.offsetTop <= scrollPos) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (index: number) => {
    const el = document.getElementById(`ch-0${index + 1}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveChapter(index);
    }
  };

  const handleMintSimulate = () => {
    setSimulating(true);
    setMintLog("Executing pre-flight eth_call on BSC Testnet (97)...");
    setTimeout(() => {
      setMintedCount((prev) => Math.min(1000, prev + mintQty));
      setUnboxed(true);
      setSimulating(false);
      setMintLog(
        `Success! RareMint.Transfer(from=0x0, to=0x71C...89A2, tokenId=${mintedCount + 1}) emitted. Gas: 64,812 units.`,
      );
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#00f0ff", "#00ffa3", "#ffd46d", "#ffffff"],
        });
      } catch {
        // no-op if confetti fails in headless env
      }
    }, 900);
  };

  const handleCopyContractAddress = () => {
    navigator.clipboard.writeText("0x38b299eF8687aE89C1aFc0F60c5a31aD19dB452E");
    setContractCopied(true);
    setTimeout(() => setContractCopied(false), 2000);
  };

  const pricingTiers = [
    {
      name: "Open-Source Core",
      baseUsd: 0,
      rateStr: "Free & Open Source",
      tag: "GITHUB REPO",
      accent: "teal",
      features: [
        "RareMint.sol (ERC-721 + EIP-2981)",
        "Merkle Tree allowlist verification",
        "Commit-reveal delayed metadata",
        "Foundry test suite (1,000 fuzz runs)",
        "Safe multisig pull-payment splits",
      ],
      cta: "View GitHub Repository",
      isRepo: true,
    },
    {
      name: "Custom Launch Setup",
      baseUsd: 1500,
      rateStr: "$1,500 USD",
      tag: "TURNKEY DEPLOY",
      accent: "teal",
      features: [
        "Contract customization & parameters",
        "Merkle tree root generation & hosting",
        "BSC Testnet (97) deployment & verification",
        "Next.js mint site template integration",
        "Safe multisig ownership handover",
      ],
      cta: "Book Custom Launch",
      isRepo: false,
    },
    {
      name: "Bespoke Cinema Drop",
      baseUsd: 4000,
      rateStr: "$3,500 – $5,000 USD",
      tag: "FULL CRAFT SUITE",
      accent: "emerald",
      features: [
        "Custom Three.js / WebGL 3D card unboxer",
        "Interactive live reveal choreography",
        "Dynamic rarity trait viewer",
        "Custom sound design & particle FX",
        "Pre-audit security hardening report",
      ],
      cta: "Commission Bespoke Drop",
      isRepo: false,
    },
  ];

  const nftFaqs = [
    {
      q: "How does RareMint prevent gas wars on BSC and opBNB?",
      a: "RareMint utilizes off-chain cryptographic Merkle trees rather than on-chain storage mappings for allowlists. Each allowlist member only pays minimal gas for a single keccak256 proof verification (~28k gas), keeping mint gas costs rock-bottom even during high congestion.",
    },
    {
      q: "What is the delayed reveal commit-reveal mechanism?",
      a: "RareMint enforces cryptographic fairness. The contract is deployed with a pre-reveal provenance hash (SHA-256 of the shuffled metadata). The actual tokenURI is only set after all tokens are minted or via a reveal block timestamp, preventing sniper bots from reading metadata directly from the mempool.",
    },
    {
      q: "How are secondary sale royalties handled?",
      a: "RareMint implements the standardized EIP-2981 royalty specification. All marketplaces (e.g. OpenSea, Element, Binance NFT) read royaltyInfo(tokenId, salePrice) directly. Payouts route to an immutable Safe splitter address so creators never depend on marketplace honesty.",
    },
    {
      q: "Why do you use pull-over-push withdrawals for mint funds?",
      a: "Per Hard Rule #4 and checks-effects-interactions (CEI), RareMint never automatically pushes BNB to team wallets during a mint. Instead, it holds funds in escrow until an authorized Safe signer triggers withdraw(), preventing reentrancy vulnerabilities and gas griefing.",
    },
    {
      q: "Can RareMint be deployed on opBNB as well as BSC?",
      a: "Yes. RareMint is 100% compatible with both BSC (Chain ID 56 / 97) and opBNB (Chain ID 204 / 5611) with zero contract modifications.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-[#e1e2eb] selection:bg-[#00f0ff] selection:text-[#00363a] font-sans antialiased overflow-x-hidden">
      {/* TOP PROTOCOL NAVIGATION */}
      <Navbar
        currentProduct="raremint"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      {/* FLOATING HUD BOTTOM BAR */}
      <aside
        aria-label="Engine Telemetry Status"
        className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-[#12161f]/90 backdrop-blur-md shadow-2xl border border-white/10 text-xs font-mono"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
          <span className="tracking-widest text-[#00f0ff] font-bold uppercase">
            PINNED ENGINE ONLINE
          </span>
        </div>
        <span className="text-white/20">|</span>
        <span className="text-[#849495] uppercase tracking-wider">
          SCROLL TO ADVANCE [5 CHAPTERS]
        </span>
        <span className="text-white/20">|</span>
        <button
          onClick={() => setMotionTunerOpen(!motionTunerOpen)}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#191c22] border border-white/20 hover:border-[#00f0ff] text-white hover:text-[#00f0ff] transition cursor-pointer text-[11px]"
        >
          <Sliders className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>MOTION TUNER ({rotationAngle}°)</span>
        </button>
      </aside>

      {/* INTERACTIVE MOTION & TIMING TUNER MODAL/PANEL */}
      {motionTunerOpen && (
        <div
          role="dialog"
          aria-label="Motion & Timing Tuner"
          className="fixed bottom-20 left-6 z-50 w-80 p-5 rounded-2xl bg-[#0b0e14]/95 border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl font-mono text-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2 text-[#00f0ff] font-bold tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>MOTION &amp; TIMING TUNER</span>
            </div>
            <button
              onClick={() => setMotionTunerOpen(false)}
              className="text-[#849495] hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-[#849495] tracking-widest uppercase">
              Presets
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => applyMotionPreset("cinematic")}
                className={`px-2 py-1.5 rounded border text-left transition cursor-pointer ${
                  rotationAngle === 15
                    ? "border-[#00f0ff] bg-[#00f0ff]/10 text-white"
                    : "border-white/10 bg-[#12161f] text-[#849495] hover:text-white"
                }`}
              >
                <div className="font-bold text-[#00f0ff]">Cinematic</div>
                <div className="text-[10px] text-[#849495]">
                  15° • Smooth 1.2s
                </div>
              </button>
              <button
                onClick={() => applyMotionPreset("obsidian")}
                className={`px-2 py-1.5 rounded border text-left transition cursor-pointer ${
                  rotationAngle === 30
                    ? "border-[#00f0ff] bg-[#00f0ff]/10 text-white"
                    : "border-white/10 bg-[#12161f] text-[#849495] hover:text-white"
                }`}
              >
                <div className="font-bold text-[#00ffa3]">Obsidian</div>
                <div className="text-[10px] text-[#849495]">
                  30° • Dynamic 1.2s
                </div>
              </button>
              <button
                onClick={() => applyMotionPreset("straight")}
                className={`px-2 py-1.5 rounded border text-left transition cursor-pointer ${
                  rotationAngle === 0
                    ? "border-[#00f0ff] bg-[#00f0ff]/10 text-white"
                    : "border-white/10 bg-[#12161f] text-[#849495] hover:text-white"
                }`}
              >
                <div className="font-bold text-[#ffd46d]">Flat Deck</div>
                <div className="text-[10px] text-[#849495]">
                  0° • Pure Depth
                </div>
              </button>
              <button
                onClick={() => applyMotionPreset("cyberpunk")}
                className={`px-2 py-1.5 rounded border text-left transition cursor-pointer ${
                  rotationAngle === 45
                    ? "border-[#00f0ff] bg-[#00f0ff]/10 text-white"
                    : "border-white/10 bg-[#12161f] text-[#849495] hover:text-white"
                }`}
              >
                <div className="font-bold text-[#7df4ff]">Cyberpunk</div>
                <div className="text-[10px] text-[#849495]">45° • Maximal</div>
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#849495]">ROTATION ANGLE</span>
                <span className="text-[#00f0ff] font-bold">
                  {rotationAngle}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="1"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#849495]">SCRUB DAMPING</span>
                <span className="text-[#00ffa3] font-bold">{scrubSpeed}s</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={scrubSpeed}
                onChange={(e) => setScrubSpeed(Number(e.target.value))}
                className="w-full accent-[#00ffa3] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#849495]">ENTRY SCALE</span>
                <span className="text-[#ffd46d] font-bold">{scaleFrom}</span>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.0"
                step="0.01"
                value={scaleFrom}
                onChange={(e) => setScaleFrom(Number(e.target.value))}
                className="w-full accent-[#ffd46d] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#849495]">TRANSFORM ORIGIN</span>
                <span className="text-white font-bold">{transformOrigin}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setTransformOrigin("bottom left")}
                  className={`px-2 py-1 rounded border text-[10px] text-center transition cursor-pointer ${
                    transformOrigin === "bottom left"
                      ? "border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]"
                      : "border-white/10 text-[#849495]"
                  }`}
                >
                  bottom left
                </button>
                <button
                  onClick={() => setTransformOrigin("top center")}
                  className={`px-2 py-1 rounded border text-[10px] text-center transition cursor-pointer ${
                    transformOrigin === "top center"
                      ? "border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]"
                      : "border-white/10 text-[#849495]"
                  }`}
                >
                  top center
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REALTIME SCROLL INDICATOR FLOATING DOCK */}
      <aside
        aria-label="Chapter Navigation Dock"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 p-2.5 rounded-full bg-[#12161f]/80 backdrop-blur-md shadow-2xl border border-white/10"
      >
        {[0, 1, 2, 3, 4].map((ch) => (
          <button
            key={ch}
            onClick={() => scrollToChapter(ch)}
            title={`Jump to Chapter 0${ch + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeChapter === ch
                ? "bg-[#00f0ff] scale-125 shadow-[0_0_12px_#00f0ff]"
                : "bg-white/20 hover:bg-[#00f0ff]/60 hover:scale-110"
            }`}
          />
        ))}
      </aside>

      {/* ========================================================
          FLOW-ART GSAP STORY SCROLL DECK (5 CHAPTERS)
          ======================================================== */}
      <FlowArt
        aria-label="RareMint Protocol Story Deck"
        rotationAngle={rotationAngle}
        scrub={scrubSpeed}
        transformOrigin={transformOrigin}
        scaleFrom={scaleFrom}
      >
        {/* ========================================================
            CHAPTER 01: WHO WE ARE // ZERO GAS WAR MINTING
            ======================================================== */}
        <FlowSection
          id="ch-01"
          aria-label="Chapter 01: Who We Are - Zero Gas War Minting"
          style={{ backgroundColor: "#0b0e14", color: "#e1e2eb" }}
          className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b border-white/10"
        >
          {/* Ambient Lighting & Hologram Accents */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ffd46d]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#00f0ff]/10 blur-3xl pointer-events-none" />

          {/* Top Header / Monospace Status */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191c22] border border-[#ffd46d]/30">
              <span className="w-2 h-2 rounded-full bg-[#ffd46d] animate-ping" />
              <span className="font-mono text-xs tracking-widest text-[#ffdf99] uppercase font-bold">
                01 — WHO WE ARE // PROTOCOL MANIFESTO
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#849495]">
              <span>
                GAS: <strong className="text-[#00ffa3]">0.003 opBNB</strong>
              </span>
              <span>•</span>
              <span>
                LATENCY: <strong className="text-[#00f0ff]">420ms</strong>
              </span>
            </div>
          </div>

          {/* Giant Fluid Typography */}
          <div className="relative z-10 my-auto py-8">
            <h1 className="font-display text-[clamp(2.8rem,9vw,9.5rem)] font-black uppercase tracking-tighter leading-[0.88] text-[#dbfcff]">
              <span className="block hover:translate-x-3 transition-transform duration-300">
                ZERO
              </span>
              <span className="block text-[#ffd46d] hover:translate-x-3 transition-transform duration-300">
                GAS WAR
              </span>
              <span className="block hover:translate-x-3 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-[#dbfcff] via-[#00f0ff] to-[#00ffa3]">
                MINTING
              </span>
            </h1>
          </div>

          {/* Bottom Manifesto & HUD Metrics Strip */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-white/10">
            <div className="lg:col-span-7">
              <p className="font-sans text-base sm:text-lg text-[#b9cacb] leading-relaxed max-w-2xl">
                We believe creators and collectors deserve an immutable launch
                engine built for sub-second BSC &amp; opBNB. No bot
                front-running, zero failed gas wars — just pure cryptographic
                fairness and cinematic reveal choreography.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap items-center justify-start lg:justify-end gap-3">
              <div className="px-3.5 py-2 rounded bg-[#191c22] border border-white/10 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#52ffac]" />
                <span className="font-mono text-xs tracking-wider text-white">
                  450ms BLOCK TIME
                </span>
              </div>
              <div className="px-3.5 py-2 rounded bg-[#191c22] border border-white/10 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00f0ff]" />
                <span className="font-mono text-xs tracking-wider text-white">
                  FERMI EVM CORE
                </span>
              </div>
              <div className="px-3.5 py-2 rounded bg-[#191c22] border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffd46d]" />
                <span className="font-mono text-xs tracking-wider text-white">
                  ERC-721A + EIP-2981
                </span>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* ========================================================
            CHAPTER 02: THE MISSION // CRYPTOGRAPHIC FAIRNESS
            ======================================================== */}
        <FlowSection
          id="ch-02"
          aria-label="Chapter 02: The Mission - Cryptographic Fairness"
          style={{ backgroundColor: "#080a0f", color: "#e1e2eb" }}
          className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00f0ff]/10 via-transparent to-transparent pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191c22] border border-[#00f0ff]/30">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#00f0ff] uppercase font-bold">
                02 — THE MISSION // CRYPTOGRAPHIC FAIRNESS
              </span>
            </div>
            <span className="font-mono text-xs text-[#849495]">
              SHA-256 PRE-COMMIT VERIFIED
            </span>
          </div>

          {/* Fluid Title */}
          <div className="relative z-10 my-auto py-6">
            <h2 className="font-display text-[clamp(2.6rem,8.5vw,9rem)] font-black uppercase tracking-tighter leading-[0.88] text-[#dbfcff]">
              <span className="block">FAIR</span>
              <span className="block text-[#00f0ff]">REVEAL</span>
              <span className="block text-white">ALWAYS</span>
            </h2>

            {/* 6 Telemetry Value Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Pillar 1: Merkle Trees */}
              <div className="relative p-5 rounded-xl bg-[#12161f]/90 border border-white/10 hover:border-[#00f0ff]/60 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#00f0ff]">
                      <Layers className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-bold text-sm tracking-wide text-white">
                        Merkle Trees
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#191c22] border border-[#00f0ff]/20 text-[#00f0ff]">
                      KECCAK_ROOT
                    </span>
                  </div>
                  <p className="text-xs text-[#b9cacb] mb-4 leading-relaxed">
                    Off-chain cryptographic tree proofs with ~28k gas
                    verification per claim root.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <svg
                    className="w-28 h-6 text-[#00f0ff]/50 group-hover:text-[#00f0ff] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 128 28"
                  >
                    <circle
                      cx="64"
                      cy="6"
                      fill="currentColor"
                      fillOpacity="0.2"
                      r="3"
                    />
                    <line
                      strokeDasharray="2 2"
                      x1="64"
                      x2="32"
                      y1="9"
                      y2="19"
                    />
                    <line
                      strokeDasharray="2 2"
                      x1="64"
                      x2="96"
                      y1="9"
                      y2="19"
                    />
                    <circle cx="32" cy="22" r="2.5" />
                    <circle cx="96" cy="22" r="2.5" />
                  </svg>
                  <span>0x20_PROOF</span>
                </div>
              </div>

              {/* Pillar 2: Delayed Reveal */}
              <div className="relative p-5 rounded-xl bg-[#12161f]/90 border border-white/10 hover:border-[#ffd46d]/60 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#ffd46d]">
                      <Lock className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-bold text-sm tracking-wide text-white">
                        Delayed Reveal
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#191c22] border border-[#ffd46d]/20 text-[#ffd46d]">
                      SHA256_PROV
                    </span>
                  </div>
                  <p className="text-xs text-[#b9cacb] mb-4 leading-relaxed">
                    SHA-256 commit-reveal hash completely prevents mempool
                    metadata snipers.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <svg
                    className="w-28 h-6 text-[#ffd46d]/50 group-hover:text-[#ffd46d] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 128 28"
                  >
                    <rect
                      height="14"
                      rx="2"
                      strokeDasharray="2 1"
                      width="26"
                      x="10"
                      y="8"
                    />
                    <line
                      strokeDasharray="2 2"
                      x1="36"
                      x2="58"
                      y1="15"
                      y2="15"
                    />
                    <path
                      d="M62 11 h12 v12 h-12 z"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                    <line x1="74" x2="116" y1="15" y2="15" />
                  </svg>
                  <span>SALT_SEED</span>
                </div>
              </div>

              {/* Pillar 3: Safe Royalty Splits */}
              <div className="relative p-5 rounded-xl bg-[#12161f]/90 border border-white/10 hover:border-[#00ffa3]/60 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#00ffa3]">
                      <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-bold text-sm tracking-wide text-white">
                        Safe Royalty Splits
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#191c22] border border-[#00ffa3]/30 text-[#00ffa3]">
                      EIP-2981
                    </span>
                  </div>
                  <p className="text-xs text-[#b9cacb] mb-4 leading-relaxed">
                    Immutable EIP-2981 secondary royalties routed straight to
                    Gnosis Safe vaults.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <svg
                    className="w-28 h-6 text-[#00ffa3]/50 group-hover:text-[#00ffa3] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 128 28"
                  >
                    <line x1="10" x2="44" y1="14" y2="14" />
                    <circle
                      cx="44"
                      cy="14"
                      fill="currentColor"
                      fillOpacity="0.2"
                      r="3"
                    />
                    <path d="M47 14 L75 6" strokeDasharray="2 2" />
                    <path d="M47 14 L75 22" strokeDasharray="2 2" />
                  </svg>
                  <span>ESCROW_VAULT</span>
                </div>
              </div>

              {/* Pillar 4: Foundry Fuzzing */}
              <div className="relative p-5 rounded-xl bg-[#12161f]/90 border border-white/10 hover:border-[#7df4ff]/60 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#7df4ff]">
                      <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-bold text-sm tracking-wide text-white">
                        Foundry Fuzzing
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#191c22] border border-[#00f0ff]/20 text-[#7df4ff]">
                      INVAR_PASS
                    </span>
                  </div>
                  <p className="text-xs text-[#b9cacb] mb-4 leading-relaxed">
                    1,000 automated fuzz runs &amp; stateful invariant security
                    before any deploy.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <svg
                    className="w-28 h-6 text-[#7df4ff]/50 group-hover:text-[#7df4ff] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 128 28"
                  >
                    <path d="M8 14 L24 14 L32 4 L42 24 L52 10 L62 18 L72 14 L120 14" />
                  </svg>
                  <span>1K_RUNS</span>
                </div>
              </div>

              {/* Pillar 5: 3D WebGL Unboxer */}
              <div className="relative p-5 rounded-xl bg-[#12161f]/90 border border-white/10 hover:border-[#00f0ff]/60 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#00f0ff]">
                      <Box className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-bold text-sm tracking-wide text-white">
                        3D WebGL Unboxer
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#191c22] border border-[#00f0ff]/20 text-[#00f0ff]">
                      THREE_JS
                    </span>
                  </div>
                  <p className="text-xs text-[#b9cacb] mb-4 leading-relaxed">
                    Cinema-grade Three.js interactive reveal choreography with
                    trait metadata.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <svg
                    className="w-28 h-6 text-[#00f0ff]/50 group-hover:text-[#00f0ff] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 128 28"
                  >
                    <path
                      d="M64 4 L80 11 L64 18 L48 11 Z"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                    <path d="M48 11 L48 22 L64 28 L64 18 Z" />
                    <path d="M64 18 L64 28 L80 22 L80 11 Z" />
                  </svg>
                  <span>60_FPS</span>
                </div>
              </div>

              {/* Pillar 6: Sub-second opBNB */}
              <div className="relative p-5 rounded-xl bg-[#12161f]/90 border border-white/10 hover:border-[#00ffa3]/60 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#00ffa3]">
                      <Activity className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-bold text-sm tracking-wide text-white">
                        Sub-second opBNB
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#191c22] border border-[#00ffa3]/30 text-[#00ffa3]">
                      CHAIN_204
                    </span>
                  </div>
                  <p className="text-xs text-[#b9cacb] mb-4 leading-relaxed">
                    Chain ID 204 native gas optimizations with negligible
                    sub-cent commit overhead.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <svg
                    className="w-28 h-6 text-[#00ffa3]/50 group-hover:text-[#00ffa3] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 128 28"
                  >
                    <line x1="8" x2="32" y1="20" y2="20" />
                    <line strokeWidth="1.5" x1="38" x2="62" y1="16" y2="16" />
                    <line strokeWidth="2" x1="68" x2="92" y1="12" y2="12" />
                    <line strokeWidth="2.5" x1="98" x2="122" y1="8" y2="8" />
                  </svg>
                  <span>&lt;1s_FINAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sub-manifesto */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="font-mono text-xs text-[#b9cacb] uppercase tracking-widest">
              Every smart contract line we ship starts with one question:{" "}
              <span className="text-[#00f0ff] font-bold">
                Does it safeguard the collector &amp; empower the creator?
              </span>
            </p>
            <span className="font-mono text-xs text-[#00ffa3]">
              PROVENANCE: 100% ON-CHAIN
            </span>
          </div>
        </FlowSection>

        {/* ========================================================
            CHAPTER 03: HOW IT WORKS // ARCHITECTURAL PIPELINE
            ======================================================== */}
        <FlowSection
          id="ch-03"
          aria-label="Chapter 03: How It Works - Architectural Pipeline"
          style={{ backgroundColor: "#10131a", color: "#e1e2eb" }}
          className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b border-white/10"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ffa3]/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191c22] border border-[#00ffa3]/30">
              <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#00ffa3] uppercase font-bold">
                03 — ARCHITECTURAL PIPELINE // 3-STEP DISPATCH
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#849495]">
              <span>PIPELINE: V2.4.9</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3]" />
            </div>
          </div>

          {/* Giant Title */}
          <div className="relative z-10 my-auto py-6">
            <h2 className="font-display text-[clamp(2.4rem,7.5vw,8.5rem)] font-black uppercase tracking-tighter leading-[0.88] text-[#dbfcff]">
              <span className="text-[#00f0ff]">COMMIT.</span>{" "}
              <span className="text-[#00ffa3]">SIMULATE.</span>{" "}
              <span className="text-white">MINT.</span>
            </h2>

            {/* 6 Operational Steps Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="relative p-5 rounded-xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#00f0ff]/40 transition-all flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#00f0ff] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                    01 // PROOF
                  </span>
                  <Code2 className="w-4 h-4 text-[#849495] group-hover:text-[#00f0ff] transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Compile &amp; Merkle Root
                </h4>
                <p className="text-xs text-[#b9cacb] mb-4">
                  Deterministic cryptographic tree generation &amp; root
                  verification off-chain.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <span className="text-[#00f0ff]/80">HASH: 0x9f8c...1a2e</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#e1e2eb]">
                    STAGE_READY
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-5 rounded-xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#ffd46d]/40 transition-all flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#ffd46d] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd46d]" />
                    02 // PRE-FLIGHT
                  </span>
                  <TerminalIcon className="w-4 h-4 text-[#849495] group-hover:text-[#ffd46d] transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Pre-Flight Simulation
                </h4>
                <p className="text-xs text-[#b9cacb] mb-4">
                  Viem v2 static call simulation against allowlist constraints
                  prior to signing.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <span className="text-[#ffd46d]/80">EST_GAS: 28,410</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#e1e2eb]">
                    CALL_SUCCESS
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-5 rounded-xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#00ffa3]/40 transition-all flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#00ffa3] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3]" />
                    03 // DISPATCH
                  </span>
                  <Rocket className="w-4 h-4 text-[#849495] group-hover:text-[#00ffa3] transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Execute Transaction
                </h4>
                <p className="text-xs text-[#b9cacb] mb-4">
                  Sub-second block inclusion on BSC Fermi / opBNB with
                  guaranteed zero revert loss.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <span className="text-[#00ffa3]/80">BLOCK: #38,109,240</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#e1e2eb]">
                    MEMPOOL_SKIP
                  </span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative p-5 rounded-xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#7df4ff]/40 transition-all flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#7df4ff] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7df4ff]" />
                    04 // HASH
                  </span>
                  <Lock className="w-4 h-4 text-[#849495] group-hover:text-[#7df4ff] transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Delayed Commit Hash
                </h4>
                <p className="text-xs text-[#b9cacb] mb-4">
                  Unalterable provenance record committed directly into EVM
                  smart contract state.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <span className="text-[#7df4ff]/80">ON_CHAIN: 0x4d7c...</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#e1e2eb]">
                    SALT_LOCKED
                  </span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative p-5 rounded-xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#00ffa3]/40 transition-all flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#00ffa3] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3]" />
                    05 // CHOREO
                  </span>
                  <Sparkles className="w-4 h-4 text-[#849495] group-hover:text-[#00ffa3] transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  3D Cinema Reveal
                </h4>
                <p className="text-xs text-[#b9cacb] mb-4">
                  Real-time Three.js card unboxing with dynamic rarity traits
                  computed instantly.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <span className="text-[#00ffa3]/80">SHADERS: GLSL_V3</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#e1e2eb]">
                    SYNC_AUDIO
                  </span>
                </div>
              </div>

              {/* Step 6 */}
              <div className="relative p-5 rounded-xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#ffd46d]/40 transition-all flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#ffd46d] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd46d]" />
                    06 // SETTLE
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#849495] group-hover:text-[#ffd46d] transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Pull Escrow Split
                </h4>
                <p className="text-xs text-[#b9cacb] mb-4">
                  Multi-sig funds locked in Safe vault with zero reentrancy
                  &amp; automatic split routing.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#849495]">
                  <span className="text-[#ffd46d]/80">VAULT: GNOSIS_SAFE</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#191c22] text-[#e1e2eb]">
                    SPLIT_EXEC
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pipeline Status */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#849495]">
            <span>STATUS: PIPELINE IDLE // AWAITING CALLDATA</span>
            <div className="flex items-center gap-1.5 text-[#00ffa3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-ping" />
              <span>100% ASYNC READY</span>
            </div>
          </div>
        </FlowSection>

        {/* ========================================================
            CHAPTER 04: THE VISION & METRICS // PROTOCOL SCALE
            ======================================================== */}
        <FlowSection
          id="ch-04"
          aria-label="Chapter 04: The Vision - Protocol Scale"
          style={{ backgroundColor: "#0e121a", color: "#e1e2eb" }}
          className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b border-white/10"
        >
          <div className="absolute -right-20 top-20 w-[500px] h-[500px] bg-[#00f0ff]/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191c22] border border-[#00f0ff]/40">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#dbfcff] uppercase font-bold">
                04 — THE ECOSYSTEM // PROTOCOL SCALE
              </span>
            </div>
            <span className="font-mono text-xs text-[#ffd46d]">
              VERIFIED VIA BNBCHAIN EXPLORER
            </span>
          </div>

          {/* Fluid Title */}
          <div className="relative z-10 my-auto py-6">
            <h2 className="font-display text-[clamp(2.6rem,8.5vw,9.5rem)] font-black uppercase tracking-tighter leading-[0.88] text-[#dbfcff]">
              <span className="block">FUTURE</span>
              <span className="block text-[#00f0ff]">OF WEB3</span>
              <span className="block text-[#00ffa3]">DROPS</span>
            </h2>

            {/* Big Telemetry Counter Row */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stat Card 1 */}
              <div className="relative p-6 rounded-2xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#00f0ff]/40 transition-colors flex flex-col justify-between group overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-xs text-[#00f0ff] tracking-wider font-bold">
                    MERKLE PROOFS
                  </div>
                  <span className="font-mono text-[10px] text-[#00f0ff] bg-[#191c22] px-2 py-0.5 rounded border border-[#00f0ff]/20">
                    +99.8% VERIFIED
                  </span>
                </div>
                <div className="font-display text-[clamp(2.5rem,4vw,4.5rem)] font-black text-white leading-none mb-3">
                  42,000+
                </div>
                {/* Sparkline SVG */}
                <div className="my-2 w-full">
                  <svg
                    className="w-full h-8 text-[#00f0ff]/60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 200 32"
                  >
                    <path d="M0 28 L30 24 L60 26 L90 18 L120 16 L150 8 L180 10 L200 2" />
                    <circle cx="200" cy="2" fill="currentColor" r="2.5" />
                  </svg>
                </div>
                <p className="text-xs text-[#b9cacb]">
                  Gas-free Merkle proofs successfully verified on BSC &amp;
                  opBNB testnet &amp; mainnet.
                </p>
              </div>

              {/* Stat Card 2 */}
              <div className="relative p-6 rounded-2xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#00ffa3]/40 transition-colors flex flex-col justify-between group overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-xs text-[#00ffa3] tracking-wider font-bold">
                    SECURED DROP VOLUME
                  </div>
                  <span className="font-mono text-[10px] text-[#00ffa3] bg-[#191c22] px-2 py-0.5 rounded border border-[#00ffa3]/20">
                    ZERO REVERT
                  </span>
                </div>
                <div className="font-display text-[clamp(2.5rem,4vw,4.5rem)] font-black text-[#00ffa3] leading-none mb-3">
                  $3.8M+
                </div>
                {/* Sparkline SVG */}
                <div className="my-2 w-full">
                  <svg
                    className="w-full h-8 text-[#00ffa3]/60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 200 32"
                  >
                    <path d="M0 24 L35 22 L70 20 L105 14 L140 12 L170 5 L200 3" />
                    <circle cx="200" cy="3" fill="currentColor" r="2.5" />
                  </svg>
                </div>
                <p className="text-xs text-[#b9cacb]">
                  Total on-chain drop volume secured with zero reentrancy or
                  smart contract incidents.
                </p>
              </div>

              {/* Stat Card 3 */}
              <div className="relative p-6 rounded-2xl bg-[#0b0e14]/80 border border-white/10 hover:border-[#ffd46d]/40 transition-colors flex flex-col justify-between group overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-xs text-[#ffd46d] tracking-wider font-bold">
                    SOVEREIGN OWNERSHIP
                  </div>
                  <span className="font-mono text-[10px] text-[#ffd46d] bg-[#191c22] px-2 py-0.5 rounded border border-[#ffd46d]/20">
                    NON-CUSTODIAL
                  </span>
                </div>
                <div className="font-display text-[clamp(2.5rem,4vw,4.5rem)] font-black text-[#ffd46d] leading-none mb-3">
                  100%
                </div>
                {/* Sparkline SVG */}
                <div className="my-2 w-full">
                  <svg
                    className="w-full h-8 text-[#ffd46d]/60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 200 32"
                  >
                    <line
                      strokeDasharray="4 2"
                      x1="0"
                      x2="200"
                      y1="16"
                      y2="16"
                    />
                    <circle cx="200" cy="16" fill="currentColor" r="2.5" />
                  </svg>
                </div>
                <p className="text-xs text-[#b9cacb]">
                  Non-custodial creator ownership &amp; instant Safe multisig
                  treasury handover upon reveal.
                </p>
              </div>
            </div>

            {/* 3 Strategic Horizontal Pillars */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#191c22]/60 border border-white/10 flex items-center gap-3">
                <Code2 className="w-6 h-6 text-[#00f0ff]" />
                <div>
                  <div className="font-bold text-sm text-white">
                    Open Access
                  </div>
                  <div className="font-mono text-xs text-[#849495]">
                    MIT open-source smart contract primitives
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#191c22]/60 border border-white/10 flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#00ffa3]" />
                <div>
                  <div className="font-bold text-sm text-white">
                    Global Speed
                  </div>
                  <div className="font-mono text-xs text-[#849495]">
                    Sub-second multi-region fallback RPCs
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#191c22]/60 border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#ffd46d]" />
                <div>
                  <div className="font-bold text-sm text-white">
                    Creator Economics
                  </div>
                  <div className="font-mono text-xs text-[#849495]">
                    100% secondary royalties via EIP-2981
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Status */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#849495]">
            <span>CONSENSUS: STABLE</span>
            <span className="text-[#00f0ff]">EVM SLOTS: 100% HEALTHY</span>
          </div>
        </FlowSection>

        {/* ========================================================
            CHAPTER 05: READY TO LAUNCH / CTA ACTION CONSOLE
            ======================================================== */}
        <FlowSection
          id="ch-05"
          aria-label="Chapter 05: Join RareMint - Launch Console"
          style={{ backgroundColor: "#07090e", color: "#e1e2eb" }}
          className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-2 border-[#00f0ff]/60 shadow-[0_0_80px_-15px_rgba(0,240,255,0.4)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.08)_0%,_transparent_70%)] pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191c22] border border-[#00f0ff]">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="font-mono text-xs tracking-widest text-[#00f0ff] uppercase font-bold">
                05 — JOIN RAREMINT // COMMISSION YOUR DROP
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00ffa3]">
              <Lock className="w-4 h-4" />
              <span>MAINNET READY // COMPATIBLE V2.4</span>
            </div>
          </div>

          {/* Fluid Title */}
          <div className="relative z-10 my-auto py-8">
            <h2 className="font-display text-[clamp(2.8rem,9.5vw,10.5rem)] font-black uppercase tracking-tighter leading-[0.86] text-[#dbfcff]">
              <span className="block hover:translate-x-2 transition-transform">
                READY
              </span>
              <span className="block text-[#00f0ff] hover:translate-x-2 transition-transform">
                TO LAUNCH
              </span>
              <span className="block text-[#00ffa3] hover:translate-x-2 transition-transform">
                WITH US?
              </span>
            </h2>

            {/* Interactive Action Console Deck */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Primary CTA Button */}
              <button
                onClick={() => {
                  const sandbox = document.getElementById("sandbox");
                  if (sandbox) sandbox.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-lg bg-[#00f0ff] text-[#002022] font-display text-base font-bold tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(0,240,255,0.7)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 cursor-pointer"
              >
                <Rocket className="w-5 h-5" />
                <span>Launch Mint Sandbox</span>
              </button>

              {/* Secondary Button */}
              <button
                onClick={() => {
                  const terminal = document.getElementById(
                    "contract-architecture",
                  );
                  if (terminal) terminal.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-4 rounded-lg bg-[#191c22] border border-white/20 hover:border-[#00f0ff] text-white font-display text-base font-semibold tracking-wider transition-all hover:bg-[#272a31] flex items-center gap-2 cursor-pointer"
              >
                <Code2 className="w-5 h-5 text-[#ffd46d]" />
                <span>Read Contract (Solidity 0.8.28)</span>
              </button>

              {/* Custom Turnkey Setup */}
              <button
                onClick={() => setIntakeOpen(true)}
                className="px-6 py-4 rounded-lg bg-[#191c22] border border-[#00ffa3]/40 text-[#00ffa3] font-display text-base font-semibold tracking-wider transition-all hover:border-[#00ffa3] hover:bg-[#00ffa3]/10 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Book Custom Setup ($1,500)</span>
              </button>
            </div>
          </div>

          {/* Bottom Audited Status Terminal Line */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs text-[#849495]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00ffa3]" />
              <span className="text-[#b9cacb] font-medium">
                SLITHER &amp; ADERYN AUDITED • SAFE MULTISIG ESCROW • BSC
                MAINNET (56) • opBNB (204)
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#00f0ff]">
              <span>ZERO REVERT FEE COMMIT</span>
              <span>•</span>
              <span className="text-[#ffd46d]">2025 PROTOCOL STABLE</span>
            </div>
          </div>
        </FlowSection>
      </FlowArt>

      {/* ========================================================
          EXTENDED INTERACTIVE PROTOCOL SUITE:
          SANDBOX + PRICING + SMART CONTRACT TERMINAL + FAQS
          ======================================================== */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-28">
        {/* INTERACTIVE MINT SANDBOX */}
        <section id="sandbox" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00f0ff] uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span>Live Testnet Execution Terminal</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Lumina Monolith Mint Sandbox
              </h2>
            </div>
            <div className="font-mono text-xs text-[#849495] flex items-center gap-2">
              <span>Network:</span>
              <span className="px-2 py-0.5 rounded bg-[#191c22] border border-[#00f0ff]/30 text-[#00f0ff] font-bold">
                BSC Testnet (97) &amp; opBNB (204)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* NFT 3D Reveal Card */}
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#12161f]/90 p-6 space-y-6 relative overflow-hidden backdrop-blur-xl">
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#0b0e14] via-[#12161f] to-[#07090e] border border-[#00f0ff]/30 flex flex-col items-center justify-center p-8 text-center overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.15)]">
                {/* Visual Glow Core */}
                <div className="relative w-40 h-40 rounded-2xl border border-[#00f0ff]/40 flex items-center justify-center mb-6 overflow-hidden">
                  <Image
                    src={
                      unboxed
                        ? "/media/mythic-monolith-3d.jpg"
                        : "/media/raremint-vault-3d.jpg"
                    }
                    alt="NFT Monolith Card"
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-[#00f0ff] bg-[#0b0e14]/80 px-2 py-1 rounded">
                    <span>{unboxed ? "★ UNBOXED" : "COMMIT PHASE"}</span>
                    <span>{unboxed ? "#0422" : "#0421"}</span>
                  </div>
                </div>

                <div className="font-display font-bold text-2xl text-white tracking-wide">
                  {unboxed ? "MYTHIC MONOLITH #0422" : "GENESIS MONOLITH #0421"}
                </div>
                <div className="font-mono text-xs text-[#00f0ff] mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffa3]" />
                  <span>
                    {unboxed
                      ? "PROVENANCE SHA-256 MATCHED"
                      : "DELAYED REVEAL COMMITMENT ACTIVE"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 w-full text-left font-mono text-[11px] bg-[#0b0e14]/90 p-3.5 rounded-xl border border-white/10">
                  <div>
                    ROYALTY:{" "}
                    <span className="text-white font-bold">5.0% (500 BPS)</span>
                  </div>
                  <div>
                    STANDARD:{" "}
                    <span className="text-white font-bold">ERC-721A</span>
                  </div>
                  <div>
                    MERKLE PROOF:{" "}
                    <span className="text-[#00ffa3] font-bold">VALIDATED</span>
                  </div>
                  <div>
                    PAYOUT RAIL:{" "}
                    <span className="text-[#00f0ff] font-bold">
                      SAFE MULTISIG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mint Controls */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#12161f]/90 p-6 sm:p-8 space-y-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider">
                    Current Mint Status
                  </span>
                  <div className="font-display text-2xl font-bold text-white mt-0.5">
                    {mintMode === "allowlist"
                      ? "MERKLE ALLOWLIST PHASE"
                      : "PUBLIC MINT PHASE"}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-[#849495]">MINTED SUPPLY</div>
                  <div className="text-lg font-bold text-white">
                    <span className="text-[#00f0ff]">{mintedCount}</span> /
                    1,000
                  </div>
                </div>
              </div>

              {/* Supply Progress */}
              <div className="w-full h-2.5 bg-[#0b0e14] rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ffa3] transition-all duration-500"
                  style={{ width: `${(mintedCount / 1000) * 100}%` }}
                />
              </div>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMintMode("allowlist");
                    if (mintQty > 3) setMintQty(3);
                  }}
                  className={`p-4 rounded-xl border text-left transition ${
                    mintMode === "allowlist"
                      ? "border-[#00f0ff] bg-[#00f0ff]/10 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                      : "border-white/10 bg-[#0b0e14] text-[#849495] hover:text-white"
                  }`}
                >
                  <div className="font-mono text-xs text-[#00f0ff] font-semibold">
                    MERKLE ALLOWLIST
                  </div>
                  <div className="font-display font-bold text-white text-lg mt-0.5">
                    0.05 BNB
                  </div>
                  <div className="font-mono text-[11px] text-[#849495]">
                    Max 3 per wallet
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMintMode("public")}
                  className={`p-4 rounded-xl border text-left transition ${
                    mintMode === "public"
                      ? "border-[#00f0ff] bg-[#00f0ff]/10 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                      : "border-white/10 bg-[#0b0e14] text-[#849495] hover:text-white"
                  }`}
                >
                  <div className="font-mono text-xs text-[#849495] font-semibold">
                    PUBLIC PHASE
                  </div>
                  <div className="font-display font-bold text-white text-lg mt-0.5">
                    0.08 BNB
                  </div>
                  <div className="font-mono text-[11px] text-[#849495]">
                    Max 5 per wallet
                  </div>
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="p-4 rounded-xl bg-[#0b0e14] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#849495]">
                    QUANTITY
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => setMintQty(Math.max(1, mintQty - 1))}
                      className="w-8 h-8 rounded bg-[#191c22] border border-white/20 text-white font-mono hover:border-[#00f0ff] transition cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-mono text-xl font-bold text-white w-6 text-center">
                      {mintQty}
                    </span>
                    <button
                      onClick={() => {
                        const max = mintMode === "allowlist" ? 3 : 5;
                        setMintQty(Math.min(max, mintQty + 1));
                      }}
                      className="w-8 h-8 rounded bg-[#191c22] border border-white/20 text-white font-mono hover:border-[#00f0ff] transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-[#849495]">
                    TOTAL PAYABLE
                  </div>
                  <div className="font-display text-2xl font-bold text-[#00f0ff] mt-0.5">
                    {totalPrice} BNB
                  </div>
                  <div className="text-[11px] font-mono text-[#849495]">
                    ≈ ${(parseFloat(totalPrice) * 600).toFixed(2)} USD
                  </div>
                </div>
              </div>

              {/* Mint Button */}
              <button
                onClick={handleMintSimulate}
                disabled={simulating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#00ffa3] text-[#002022] font-display font-bold text-base hover:opacity-95 transition shadow-[0_0_30px_rgba(0,240,255,0.35)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {simulating ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>Simulating eth_call...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    <span>Simulate &amp; Execute Mint Transaction</span>
                  </>
                )}
              </button>

              {/* Log Window */}
              <div className="rounded-xl bg-[#07090e] border border-white/10 p-4 font-mono text-xs space-y-1">
                <div className="text-[#849495] flex items-center justify-between">
                  <span>
                    // Pre-flight Simulation Log (viem v2 + RareMint.sol)
                  </span>
                  <span className="text-[#00ffa3]">STATUS: 200 OK</span>
                </div>
                <div className="text-[#00f0ff] break-all">{mintLog}</div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING & TURNKEY TIERS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
                02 // Commercial Packages
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                RareMint Packages &amp; Pricing
              </h2>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff]">
              {currencyMode === "USD" ? "USD PRICING" : "CRYPTO / BNB ACCEPTED"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => {
              const priceData = formatPrice(tier.baseUsd, currencyMode);
              return (
                <div
                  key={tier.name}
                  className="rounded-3xl border border-white/10 bg-[#12161f]/90 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#00f0ff]/40 transition duration-300 shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-white">
                        {tier.name}
                      </span>
                      <Badge variant="teal">{tier.tag}</Badge>
                    </div>

                    <div>
                      <div className="font-display text-2xl font-bold text-white">
                        {currencyMode === "USD"
                          ? tier.rateStr
                          : priceData.display}
                      </div>
                      <div className="text-xs font-mono text-[#00f0ff] mt-0.5">
                        {tier.baseUsd === 0
                          ? "MIT Licensed Core"
                          : priceData.subtext}
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-white/10 font-mono text-xs text-[#b9cacb]">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#00ffa3] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      if (tier.isRepo) {
                        window.open(
                          "https://github.com/Rareware-Space",
                          "_blank",
                        );
                      } else {
                        setIntakeOpen(true);
                      }
                    }}
                    className="w-full py-3 rounded-xl border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] font-display font-bold text-xs hover:bg-[#00f0ff] hover:text-[#002022] transition cursor-pointer"
                  >
                    {tier.cta} →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ARCHITECTURE & FAQS */}
        <section id="contract-architecture" className="space-y-8 scroll-mt-24">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
                03 // Smart Contract Architecture &amp; FAQ
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Technical Details &amp; Common Inquiries
              </h2>
            </div>
            <button
              onClick={handleCopyContractAddress}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#191c22] border border-white/10 text-xs font-mono text-[#849495] hover:text-white hover:border-[#00f0ff] transition cursor-pointer"
            >
              {contractCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00ffa3]" />
                  <span className="text-[#00ffa3]">Address Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>Copy Contract Address</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Terminal
              title="RareMint.sol // Core Implementation"
              singleCode={`// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title RareMint
 * @notice Production-grade, zero-gas-war NFT launch engine on BSC & opBNB.
 * Features Merkle allowlists, delayed commit-reveal, and pull-over-push Safe royalty splits.
 */
contract RareMint is ERC721, ERC2981, Ownable2Step {
    bytes32 public merkleRoot;
    bytes32 public provenanceHash;
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant ALLOWLIST_PRICE = 0.05 ether;
    uint256 public constant PUBLIC_PRICE = 0.08 ether;

    // Checks-Effects-Interactions (CEI) Enforced
    function mintAllowlist(uint256 qty, uint256 maxAllowance, bytes32[] calldata proof)
        external
        payable
    {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, maxAllowance))));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "InvalidProof()");
        require(msg.value == ALLOWLIST_PRICE * qty, "InsufficientPayment()");
        // ... safe mint iteration with Safe escrow allocation
    }
}`}
            />

            <div className="space-y-4">
              {nftFaqs.map((faq, idx) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-[#12161f]/90 p-5 space-y-2 hover:border-[#00f0ff]/30 transition cursor-pointer"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-white text-base">
                      {faq.q}
                    </h4>
                    <span className="text-[#00f0ff] font-mono text-sm ml-2">
                      {openFaqIndex === idx ? "−" : "+"}
                    </span>
                  </div>
                  {openFaqIndex === idx && (
                    <p className="text-sm text-[#b9cacb] leading-relaxed pt-2 border-t border-white/5 font-sans">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />

      {/* INTAKE WIZARD MODAL */}
      <IntakeWizardModal
        isOpen={intakeOpen}
        onClose={() => setIntakeOpen(false)}
      />
    </div>
  );
}
