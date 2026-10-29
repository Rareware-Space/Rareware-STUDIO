'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Navbar,
  Footer,
  Badge,
  Terminal,
  IntakeWizardModal,
  CurrencyMode,
  formatPrice,
} from '@rareware/ui';

export default function RareMintPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [mintMode, setMintMode] = useState<'allowlist' | 'public'>('allowlist');
  const [mintQty, setMintQty] = useState(2);
  const [mintedCount, setMintedCount] = useState(421);
  const [unboxed, setUnboxed] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [mintLog, setMintLog] = useState('Ready: RareMint.mintAllowlist(quantity=2, maxAllowance=3, proof=[0x9a4f...])');
  const [walletConnected, setWalletConnected] = useState(false);

  const unitPrice = mintMode === 'allowlist' ? 0.05 : 0.08;
  const totalPrice = (unitPrice * mintQty).toFixed(3);

  const handleMintSimulate = () => {
    setSimulating(true);
    setMintLog('Executing pre-flight eth_call on BSC Testnet (97)...');
    setTimeout(() => {
      setMintedCount((prev) => Math.min(1000, prev + mintQty));
      setUnboxed(true);
      setSimulating(false);
      setMintLog(`Success! RareMint.Transfer(from=0x0, to=0x71C...89A2, tokenId=${mintedCount + 1}) emitted. Gas: 64,812 units.`);
    }, 900);
  };

  const pricingTiers = [
    {
      name: 'Open-Source Core',
      baseUsd: 0,
      rateStr: 'Free & Open Source',
      tag: 'GITHUB REPO',
      accent: 'teal',
      features: [
        'RareMint.sol (ERC-721 + EIP-2981)',
        'Merkle Tree allowlist verification',
        'Commit-reveal delayed metadata',
        'Foundry test suite (1,000 fuzz runs)',
        'Safe multisig pull-payment splits',
      ],
      cta: 'View GitHub Repository',
      isRepo: true,
    },
    {
      name: 'Custom Launch Setup',
      baseUsd: 1500,
      rateStr: '$1,500 USD',
      tag: 'TURNKEY DEPLOY',
      accent: 'teal',
      features: [
        'Contract customization & parameters',
        'Merkle tree root generation & hosting',
        'BSC Testnet (97) deployment & verification',
        'Next.js mint site template integration',
        'Safe multisig ownership handover',
      ],
      cta: 'Book Custom Launch',
      isRepo: false,
    },
    {
      name: 'Bespoke Cinema Drop',
      baseUsd: 4000,
      rateStr: '$3,500 – $5,000 USD',
      tag: 'FULL CRAFT SUITE',
      accent: 'emerald',
      features: [
        'Custom Three.js / WebGL 3D card unboxer',
        'Interactive live reveal choreography',
        'Dynamic rarity trait viewer',
        'Custom sound design & particle FX',
        'Pre-audit security hardening report',
      ],
      cta: 'Commission Bespoke Drop',
      isRepo: false,
    },
  ];

  const nftFaqs = [
    {
      q: 'How does RareMint prevent gas wars on BSC and opBNB?',
      a: 'RareMint utilizes off-chain cryptographic Merkle trees rather than on-chain storage mappings for allowlists. Each allowlist member only pays minimal gas for a single keccak256 proof verification (~28k gas), keeping mint gas costs rock-bottom even during high congestion.',
    },
    {
      q: 'What is the delayed reveal commit-reveal mechanism?',
      a: 'RareMint enforces cryptographic fairness. The contract is deployed with a pre-reveal provenance hash (SHA-256 of the shuffled metadata). The actual tokenURI is only set after all tokens are minted or via a reveal block timestamp, preventing sniper bots from reading metadata directly from the mempool.',
    },
    {
      q: 'How are secondary sale royalties handled?',
      a: 'RareMint implements the standardized EIP-2981 royalty specification. All marketplaces (e.g. OpenSea, Element, Binance NFT) read royaltyInfo(tokenId, salePrice) directly. Payouts route to an immutable Safe splitter address so creators never depend on marketplace honesty.',
    },
    {
      q: 'Why do you use pull-over-push withdrawals for mint funds?',
      a: 'Per Hard Rule #4 and checks-effects-interactions (CEI), RareMint never automatically pushes BNB to team wallets during a mint. Instead, it holds funds in escrow until an authorized Safe signer triggers withdraw(), preventing reentrancy vulnerabilities and gas griefing.',
    },
    {
      q: 'Can RareMint be deployed on opBNB as well as BSC?',
      a: 'Yes. RareMint is 100% compatible with both BSC (Chain ID 56 / 97) and opBNB (Chain ID 204 / 5611) with zero contract modifications.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentProduct="raremint"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-teal/30 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/30 text-teal font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                <span>RAREMINT // OPEN-SOURCE NFT KIT</span>
                <span>•</span>
                <span className="text-gray-300">ERC-721 + EIP-2981</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                ZERO-GAS-WAR NFT LAUNCHES WITH{' '}
                <span className="text-teal">CINEMA-GRADE REVEAL MOTION</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
                An open-source, production-grade NFT collection and mint site engine built for BSC and opBNB. Features gas-optimized Merkle allowlists, delayed commit-reveal fairness, and pull-over-push Safe royalty splits.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#sandbox"
                  className="px-6 py-3.5 rounded-xl bg-teal text-void font-display font-bold text-sm hover:opacity-90 transition glow-teal shadow-lg shadow-teal/20"
                >
                  Test Interactive Mint Sandbox ↓
                </a>
                <button
                  onClick={() => setIntakeOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:border-teal/50 transition"
                >
                  Hire Us to Build Your Drop
                </button>
              </div>
            </div>

            {/* 3D Commit-Reveal Vault Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-teal/30 shadow-2xl shadow-teal/10">
                <Image
                  src="/media/raremint-vault-3d.jpg"
                  alt="RareMint 3D Cryptographic Commit-Reveal Vault"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300 bg-void/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-teal font-semibold">RareMint • Reveal Relic</span>
                  <span className="text-gray-400">ERC-721A + Merkle Tree</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MINT SANDBOX */}
        <section id="sandbox" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal uppercase tracking-wider">
                01 // Interactive Hybrid Sandbox
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Lumina Monolith Mint Terminal
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-400">
              Chain: <span className="text-teal">BSC Testnet (97)</span> • Pre-Flight Simulation Active
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* NFT 3D Reveal Card */}
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-panel p-6 space-y-6 relative overflow-hidden">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-obsidian via-[#0A1A1E] to-obsidian border border-teal/30 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden glow-teal">
                <div className="w-36 h-36 rounded-full border-2 border-teal/40 flex items-center justify-center mb-6 relative">
                  <div
                    className={`w-28 h-28 rounded-full ${
                      unboxed ? 'bg-teal/30' : 'bg-teal/15 animate-pulse'
                    } flex items-center justify-center font-mono text-teal font-extrabold text-2xl transition-all duration-700`}
                  >
                    {unboxed ? '★ UNBOXED' : 'RW-01'}
                  </div>
                </div>

                <div className="font-display font-bold text-2xl text-white tracking-wide">
                  {unboxed ? 'MYTHIC MONOLITH #0422' : 'GENESIS MONOLITH #0421'}
                </div>
                <div className="font-mono text-xs text-teal mt-1">
                  {unboxed ? '✓ PROVENANCE HASH MATCHED' : 'DELAYED REVEAL COMMITMENT ACTIVE'}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 w-full text-left font-mono text-[11px] bg-void/80 p-3.5 rounded-xl border border-white/10">
                  <div>ROYALTY: <span className="text-white">5.0% (500 BPS)</span></div>
                  <div>STANDARD: <span className="text-white">ERC-721</span></div>
                  <div>MERKLE PROOF: <span className="text-teal">VALIDATED</span></div>
                  <div>PAYOUT RAIL: <span className="text-white">SAFE MULTISIG</span></div>
                </div>
              </div>
            </div>

            {/* Mint Controls */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-teal uppercase tracking-wider">
                    Current Mint Status
                  </span>
                  <div className="font-display text-2xl font-bold text-white mt-0.5">
                    {mintMode === 'allowlist' ? 'MERKLE ALLOWLIST PHASE' : 'PUBLIC MINT PHASE'}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-gray-500">MINTED SUPPLY</div>
                  <div className="text-lg font-bold text-white">
                    <span className="text-teal">{mintedCount}</span> / 1,000
                  </div>
                </div>
              </div>

              {/* Supply Progress */}
              <div className="w-full h-2.5 bg-void rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-teal transition-all duration-500"
                  style={{ width: `${(mintedCount / 1000) * 100}%` }}
                />
              </div>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMintMode('allowlist');
                    if (mintQty > 3) setMintQty(3);
                  }}
                  className={`p-4 rounded-xl border text-left transition ${
                    mintMode === 'allowlist'
                      ? 'border-teal bg-teal/15 text-white'
                      : 'border-white/10 bg-obsidian text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="font-mono text-xs text-teal font-semibold">MERKLE ALLOWLIST</div>
                  <div className="font-display font-bold text-white text-lg mt-0.5">0.05 BNB</div>
                  <div className="font-mono text-[11px] text-gray-400">Max 3 per wallet</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMintMode('public')}
                  className={`p-4 rounded-xl border text-left transition ${
                    mintMode === 'public'
                      ? 'border-teal bg-teal/15 text-white'
                      : 'border-white/10 bg-obsidian text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="font-mono text-xs text-gray-400 font-semibold">PUBLIC PHASE</div>
                  <div className="font-display font-bold text-white text-lg mt-0.5">0.08 BNB</div>
                  <div className="font-mono text-[11px] text-gray-400">Max 5 per wallet</div>
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="p-4 rounded-xl bg-obsidian border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400">QUANTITY</div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => setMintQty(Math.max(1, mintQty - 1))}
                      className="w-8 h-8 rounded bg-panel border border-white/15 text-white font-mono hover:border-teal transition"
                    >
                      −
                    </button>
                    <span className="font-mono text-xl font-bold text-white w-6 text-center">
                      {mintQty}
                    </span>
                    <button
                      onClick={() => {
                        const max = mintMode === 'allowlist' ? 3 : 5;
                        setMintQty(Math.min(max, mintQty + 1));
                      }}
                      className="w-8 h-8 rounded bg-panel border border-white/15 text-white font-mono hover:border-teal transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-gray-400">TOTAL PAYABLE</div>
                  <div className="font-display text-2xl font-bold text-teal mt-0.5">
                    {totalPrice} BNB
                  </div>
                  <div className="text-[11px] font-mono text-gray-500">
                    ≈ ${(parseFloat(totalPrice) * 600).toFixed(2)} USD
                  </div>
                </div>
              </div>

              {/* Mint Button */}
              <button
                onClick={handleMintSimulate}
                disabled={simulating}
                className="w-full py-4 rounded-xl bg-teal text-void font-display font-bold text-base hover:opacity-90 transition glow-teal disabled:opacity-50"
              >
                {simulating ? 'Simulating eth_call...' : 'Simulate & Execute Mint Transaction'}
              </button>

              {/* Log Window */}
              <div className="rounded-xl bg-void border border-white/10 p-4 font-mono text-xs space-y-1">
                <div className="text-gray-500">// Pre-flight Simulation Log (viem v2 + RareMint.sol)</div>
                <div className="text-teal">{mintLog}</div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING & TURNKEY TIERS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-teal uppercase tracking-wider">
                02 // Commercial Packages
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                RareMint Packages &amp; Pricing
              </h2>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-teal/30 bg-teal/10 text-teal">
              {currencyMode === 'USD' ? 'USD PRICING' : 'CRYPTO / BNB ACCEPTED'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => {
              const priceData = formatPrice(tier.baseUsd, currencyMode);
              return (
                <div
                  key={tier.name}
                  className="rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 flex flex-col justify-between space-y-6 specular-card"
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
                        {currencyMode === 'USD' ? tier.rateStr : priceData.display}
                      </div>
                      <div className="text-xs font-mono text-teal mt-0.5">
                        {tier.baseUsd === 0 ? 'MIT Licensed Core' : priceData.subtext}
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-white/5 font-mono text-xs text-gray-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-teal">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      if (tier.isRepo) {
                        window.open('https://github.com/Rareware-Space', '_blank');
                      } else {
                        setIntakeOpen(true);
                      }
                    }}
                    className="w-full py-3 rounded-xl border border-teal bg-teal/10 text-teal font-display font-bold text-xs hover:bg-teal hover:text-void transition"
                  >
                    {tier.cta} →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ARCHITECTURE & FAQS */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs text-teal uppercase tracking-wider">
              03 // Smart Contract Architecture &amp; FAQ
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Technical Details &amp; Common Inquiries
            </h2>
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

contract RareMint is ERC721, ERC2981, Ownable2Step {
    bytes32 public merkleRoot;
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
        // ... safe mint iteration
    }
}`}
            />

            <div className="space-y-4">
              {nftFaqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-panel p-5 space-y-2"
                >
                  <h4 className="font-display font-bold text-white text-base">
                    {faq.q}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
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
