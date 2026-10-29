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

export default function RareCharsPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // NPC Sandbox State
  const [activeNpc, setActiveNpc] = useState<0 | 1>(0);
  const [playerInput, setPlayerInput] = useState('I recovered the Obsidian Shard from the opBNB Citadel. Sign my quest reward!');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'Kaelen the Vault Archivist',
      text: 'Greetings, Traveler. The archives record that you entered the opBNB Citadel yesterday. If you possess the Obsidian Shard, present it now and I shall issue a signed Relic intent.',
      isNpc: true,
      tag: 'pgvector memory loaded (similarity: 0.94)',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const npcs = [
    {
      id: '0x8b7e028546950c122026a9b61b50000000000000000000000000000000000001',
      name: 'Kaelen the Vault Archivist',
      role: 'Keeper of Ancient opBNB Relics',
      lore: 'Remembers player quest history & signs EIP-712 Relic Mint Intents',
      allowedAction: 'grantQuestReward(address,uint256)',
      dailyCap: '1,000 UNITS / DAY',
      accentHex: '#8B5CF6',
    },
    {
      id: '0x8b7e028546950c122026a9b61b50000000000000000000000000000000000002',
      name: 'Nyx-7 Cybernetic Quartermaster',
      role: 'Tactical opBNB Arms Dealer',
      lore: 'Negotiates gear prices based on player reputation & signs discount vouchers',
      allowedAction: 'unlockMerchantTier(address,uint256)',
      dailyCap: '500 UNITS / DAY',
      accentHex: '#EC4899',
    },
  ];

  const handleSendMessage = () => {
    if (!playerInput.trim()) return;

    const currentPrompt = playerInput;
    setChatLog((prev) => [
      ...prev,
      { sender: 'You (Player 0x71C...89A2)', text: currentPrompt, isNpc: false, tag: 'POST /v1/characters/chat' },
    ]);
    setPlayerInput('');
    setIsTyping(true);

    setTimeout(() => {
      const npcResponse =
        activeNpc === 0
          ? 'Impressive bravery, Traveler. The Obsidian Shard has been verified. I have signed an on-chain intent granting you 250 Relic Points. Submit this intent to RareCharsVerifier.sol on opBNB!'
          : 'Your battle record is solid. I have approved your Tier 2 Quartermaster authorization with a 15% discount intent on opBNB.';

      setChatLog((prev) => [
        ...prev,
        {
          sender: npcs[activeNpc]?.name || 'NPC',
          text: npcResponse,
          isNpc: true,
          tag: 'EIP-712 Intent Signed & Emitted',
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const pricingTiers = [
    {
      name: 'Indie Builder',
      baseUsd: 49,
      rateStr: '$49 / mo + usage',
      tag: 'API PASS',
      accent: 'violet',
      features: [
        'Up to 3 persistent AI NPCs',
        'Supabase pgvector RAG memory (10k vectors)',
        'EIP-712 intent signer service',
        'TypeScript SDK + Next.js demo kit',
        'opBNB Testnet (5611) integration',
      ],
      cta: 'Start Indie Plan',
      isRepo: false,
    },
    {
      name: 'Game Studio Pro',
      baseUsd: 299,
      rateStr: '$299 / mo + $2.5k setup',
      tag: 'MOST POPULAR',
      accent: 'magenta',
      features: [
        'Up to 25 persistent AI NPCs',
        'Unity SDK (C#) + Unreal Engine support',
        'Custom lore embedding pipelines',
        'Dedicated EIP-712 intent relayer',
        'ReadyPI multi-model routing (150+ LLMs)',
      ],
      cta: 'Onboard Game Studio',
      isRepo: false,
    },
    {
      name: 'Custom Gaming Ecosystem',
      baseUsd: 10000,
      rateStr: '$8,000 – $15,000 USD',
      tag: 'ENTERPRISE',
      accent: 'violet',
      features: [
        'Unlimited AI NPC fleets & lore worlds',
        'Bespoke on-chain game contract suite',
        'Ponder sub-second event telemetry indexer',
        'Dedicated high-throughput RPC nodes',
        'Full static security audit & SLA support',
      ],
      cta: 'Commission Game Ecosystem',
      isRepo: false,
    },
  ];

  const aiFaqs = [
    {
      q: 'Why can the AI model never hold private keys or broadcast transactions directly?',
      a: 'Allowing an autonomous LLM to hold wallet keys introduces prompt injection and jailbreak risks (an attacker could trick the character into sending them the entire treasury). In RareChars, the model only proposes actions. Our API validates daily caps and nonces, and smart contracts (RareCharsVerifier.sol) verify cryptographic EIP-712 signatures before state changes occur.',
    },
    {
      q: 'How does persistent memory work across player sessions?',
      a: 'RareChars uses a hybrid memory architecture: Supabase Postgres with pgvector for high-dimensional semantic search and cosine similarity, paired with an on-chain activity ledger. When a player interacts with an NPC, relevant past events and lore are injected into the context window dynamically.',
    },
    {
      q: 'Why is opBNB (204) the primary recommended chain for RareChars?',
      a: 'Gaming NPCs generate high interaction frequency. opBNB offers sub-second finality with gas fees under $0.001 per transaction, allowing players to execute frequent character-granted intents (quest rewards, dialogue milestones, item trades) without financial friction.',
    },
    {
      q: 'What game engines do your SDKs support?',
      a: 'We provide an official TypeScript/JavaScript SDK for browser-based dApps, Telegram mini-apps, and Next.js games, as well as a native C# Unity SDK for 3D desktop/mobile games.',
    },
    {
      q: 'Can we bring our own custom character lore and voice models?',
      a: 'Yes. RareChars allows game designers to upload lore documents, personality traits, dialogue constraints, and voice generation endpoints via simple JSON configurations.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentProduct="rarechars"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-violet/30 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet/10 border border-violet/30 text-violet font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
                <span>RARECHARS // PERSISTENT AI GAME NPCS</span>
                <span>•</span>
                <span className="text-gray-300">opBNB (204/5611) NATIVE</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                GIVE YOUR WEB3 GAME PERSISTENT AI NPCS THAT{' '}
                <span className="text-violet">REMEMBER &amp; ACT ON-CHAIN</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
                Infrastructure for blockchain games to integrate persistent AI characters. Features pgvector RAG memory, Unity/TS SDKs, and a zero-key EIP-712 architecture where LLMs propose actions and smart contracts verify signatures.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#npc-sandbox"
                  className="px-6 py-3.5 rounded-xl bg-violet text-white font-display font-bold text-sm hover:opacity-90 transition glow-violet shadow-lg shadow-violet/20"
                >
                  Chat with opBNB NPCs Below ↓
                </a>
                <button
                  onClick={() => setIntakeOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:border-violet/50 transition"
                >
                  Integrate RareChars in Your Game
                </button>
              </div>
            </div>

            {/* 3D NPC Character Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-violet/30 shadow-2xl shadow-violet/10">
                <Image
                  src="/media/character-npc-cipher-3d.jpg"
                  alt="Cipher - Autonomous AI Netrunner NPC in Metacadia"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300 bg-void/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-violet font-semibold">RareChars • Cipher Netrunner</span>
                  <span className="text-gray-400">pgvector RAG + EIP-712</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE NPC SANDBOX */}
        <section id="npc-sandbox" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-violet uppercase tracking-wider">
                01 // Live Multi-NPC Dialogue &amp; Intent Sandbox
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Persistent AI NPC Dialogue &amp; EIP-712 Signer
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-400">
              Chain: <span className="text-violet">opBNB Testnet (5611)</span> • ReadyPI LLM Gateway
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* NPC Roster Selector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-gray-400 uppercase">
                Select Active NPC Persona
              </div>

              {npcs.map((npc, idx) => (
                <div
                  key={npc.id}
                  onClick={() => {
                    setActiveNpc(idx as 0 | 1);
                    setChatLog([
                      {
                        sender: npc.name,
                        text:
                          idx === 0
                            ? 'Greetings, Traveler. The archives record your movements at the opBNB Citadel. What quest relic do you seek to verify?'
                            : 'Welcome to the Quartermaster armory. I have tactical weapon vouchers on opBNB ready for proven fighters.',
                        isNpc: true,
                        tag: 'pgvector memory loaded',
                      },
                    ]);
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition space-y-3 ${
                    activeNpc === idx
                      ? 'border-violet bg-violet/15 shadow-xl shadow-violet/10'
                      : 'border-white/10 bg-panel hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-white">
                      {npc.name}
                    </span>
                    <Badge variant={idx === 0 ? 'violet' : 'magenta'}>
                      {activeNpc === idx ? 'ACTIVE' : 'SELECT'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{npc.lore}</p>
                  <div className="pt-2 border-t border-white/5 font-mono text-[11px] text-gray-300 space-y-1">
                    <div>ALLOWED ACTION: <span className="text-violet font-semibold">{npc.allowedAction}</span></div>
                    <div>DAILY CAP: <span className="text-white">{npc.dailyCap}</span></div>
                  </div>
                </div>
              ))}

              {/* RAG Memory Status Card */}
              <div className="p-4 rounded-xl bg-obsidian border border-white/10 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Supabase pgvector (RAG):</span>
                  <span className="text-teal font-semibold">CONNECTED</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Cosine threshold: 0.82 • Vector dimensions: 1536 • ReadyPI routing
                </div>
              </div>
            </div>

            {/* Chat & EIP-712 Console */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-violet uppercase tracking-wider">
                    Character Endpoint
                  </span>
                  <div className="font-display text-xl font-bold text-white mt-0.5">
                    POST /v1/characters/{activeNpc === 0 ? 'kaelen' : 'nyx7'}/chat
                  </div>
                </div>
                <div className="font-mono text-xs text-gray-400">
                  Non-Custodial Verifier Active
                </div>
              </div>

              {/* Message Box */}
              <div className="h-64 overflow-y-auto space-y-3 pr-2 border border-white/5 rounded-xl bg-void p-4">
                {chatLog.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border text-xs font-mono space-y-1 ${
                      msg.isNpc
                        ? 'border-violet/30 bg-violet/10 text-gray-200'
                        : 'border-white/10 bg-obsidian text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-violet font-bold">
                      <span>{msg.sender}</span>
                      <span className="text-gray-500">{msg.tag}</span>
                    </div>
                    <div className="font-sans text-sm text-white pt-1">{msg.text}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-xs font-mono text-violet animate-pulse">
                    AI Character is generating intent...
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={playerInput}
                  onChange={(e) => setPlayerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask for quest intent, negotiate prices, or discuss lore..."
                  className="flex-1 px-4 py-3 rounded-xl bg-void border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-violet"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 rounded-xl bg-violet text-white font-display font-bold text-xs hover:bg-violet/90 transition shadow-lg shadow-violet/20"
                >
                  Send →
                </button>
              </div>

              {/* EIP-712 Signed Payload Output */}
              <div className="rounded-2xl bg-void border border-white/10 p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-violet font-semibold">// RareCharsVerifier.sol Intent Payload</span>
                  <Badge variant="violet">EIP-712 VALID</Badge>
                </div>
                <pre className="text-[11px] text-gray-300 overflow-x-auto leading-relaxed">
{`{
  "characterId": "${npcs[activeNpc]?.id?.substring(0, 24) || '0x000'}...0001",
  "player": "0x71C...89A2",
  "actionSelector": "${activeNpc === 0 ? '0x4e71d92d (grantQuestReward)' : '0x8f22e11a (unlockMerchantTier)'}",
  "valueUnits": ${activeNpc === 0 ? 250 : 15},
  "nonce": 1,
  "deadline": 1793156800,
  "signature": "0x6f92a8c3e80d41b1c7a912e9871583091bbff17845..."
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-violet uppercase tracking-wider">
                02 // Commercial API &amp; SDK Tiers
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                RareChars Plans &amp; Custom Integration
              </h2>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-violet/30 bg-violet/10 text-violet">
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
                      <Badge variant={tier.accent as any}>{tier.tag}</Badge>
                    </div>

                    <div>
                      <div className="font-display text-2xl font-bold text-white">
                        {currencyMode === 'USD' ? tier.rateStr : priceData.display}
                      </div>
                      <div className="text-xs font-mono text-violet mt-0.5">
                        {priceData.subtext}
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-white/5 font-mono text-xs text-gray-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-violet">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIntakeOpen(true)}
                    className="w-full py-3 rounded-xl border border-violet bg-violet/10 text-white font-display font-bold text-xs hover:bg-violet transition shadow-lg shadow-violet/10"
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
            <span className="font-mono text-xs text-violet uppercase tracking-wider">
              03 // Zero-Key Security Architecture &amp; FAQ
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Cryptographic Intent Verification on opBNB
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Terminal
              title="RareCharsVerifier.sol // EIP-712 Verification"
              singleCode={`// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract RareCharsVerifier is EIP712 {
    bytes32 private constant INTENT_TYPEHASH = keccak256(
        "ActionIntent(bytes32 characterId,address player,bytes4 actionSelector,uint256 valueUnits,uint256 nonce,uint256 deadline)"
    );

    mapping(bytes32 => mapping(uint256 => bool)) public usedNonces;

    function verifyAndConsumeIntent(
        bytes32 characterId,
        address player,
        bytes4 actionSelector,
        uint256 valueUnits,
        uint256 nonce,
        uint256 deadline,
        bytes calldata signature
    ) external returns (bool) {
        require(block.timestamp <= deadline, "IntentExpired()");
        require(!usedNonces[characterId][nonce], "NonceAlreadyConsumed()");
        usedNonces[characterId][nonce] = true;

        bytes32 structHash = keccak256(abi.encode(
            INTENT_TYPEHASH, characterId, player, actionSelector, valueUnits, nonce, deadline
        ));
        bytes32 hash = _hashTypedDataV4(structHash);
        address signer = ECDSA.recover(hash, signature);
        require(signer == trustedRelayer, "UnauthorizedSigner()");
        return true;
    }
}`}
            />

            <div className="space-y-4">
              {aiFaqs.map((faq) => (
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
