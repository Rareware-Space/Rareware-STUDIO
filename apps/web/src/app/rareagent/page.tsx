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

export default function RareAgentPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Policy Builder State
  const [allowPancake, setAllowPancake] = useState(true);
  const [allowVenus, setAllowVenus] = useState(false);
  const [allowGameRelics, setAllowGameRelics] = useState(true);
  const [dailyCap, setDailyCap] = useState(500);
  const [simulationStatus, setSimulationStatus] = useState<string | null>(null);

  const handleTestExploit = () => {
    setSimulationStatus('Simulating unauthorized exploit call: transferAll(address attacker)...');
    setTimeout(() => {
      setSimulationStatus('BLOCKED: Function selector 0x8a92... not in allowed list. Transaction aborted pre-flight.');
    }, 800);
  };

  const handleTestValid = () => {
    setSimulationStatus('Simulating valid agent call: swapExactTokensForTokens(100 USDT -> BNB)...');
    setTimeout(() => {
      setSimulationStatus('APPROVED: Target in allowlist, spend $100 <= $500 cap. ERC-4337 UserOp validated.');
    }, 800);
  };

  const pricingTiers = [
    {
      name: 'Agent Guard Setup',
      baseUsd: 2500,
      rateStr: '$2,500 One-Time',
      tag: 'SECURITY CORE',
      accent: 'orange',
      features: [
        'ERC-4337 smart account & session key module',
        'Scoped contract & function selector allowlists',
        'Daily & per-tx spend quota enforcement',
        'Read-only MCP server integration',
        'Safe multisig human master owner setup',
      ],
      cta: 'Deploy Agent Guard',
      isRepo: false,
    },
    {
      name: 'Managed Autonomous Agent',
      baseUsd: 5000,
      rateStr: '$5,000 + $750/mo',
      tag: 'TURNKEY FLEET',
      accent: 'red',
      features: [
        'Autonomous liquidity rebalancing or game agent',
        'Pre-flight simulation engine before broadcasting',
        'Emergency automated kill-switch & alerting',
        'Dedicated bundler & Paymaster sponsorship',
        'Full operational monitoring & weekly reports',
      ],
      cta: 'Deploy Managed Agent',
      isRepo: false,
    },
    {
      name: 'Custom Multi-Agent Fleet',
      baseUsd: 12000,
      rateStr: '$12,000 USD',
      tag: 'ENTERPRISE',
      accent: 'orange',
      features: [
        'Multi-agent collaborative fleet architecture',
        'Cross-chain execution (BSC + opBNB + Arbitrum)',
        'Bespoke zero-knowledge or cryptographic verifiers',
        'Formal security hardening & pen-test triage',
        'Dedicated 24/7 incident response runbook',
      ],
      cta: 'Commission Agent Fleet',
      isRepo: false,
    },
  ];

  const agentFaqs = [
    {
      q: 'What is an ERC-4337 smart account with session keys?',
      a: 'Unlike traditional EOA wallets where an agent holds the master private key, an ERC-4337 smart account separates execution from ownership. The AI agent holds a temporary "session key" that can only execute pre-approved functions (e.g. swap on PancakeSwap) up to a strict daily spend limit. Your human Gnosis Safe remains the ultimate master owner.',
    },
    {
      q: 'How does RareAgent protect against prompt injection and malicious AI behavior?',
      a: 'Even if an LLM is hijacked or hallucinates an instruction to send funds to an attacker, the on-chain session key validator contract rejects the transaction because the attacker’s address is not on the immutable contract allowlist. The guardrails exist at the smart contract level, not in the prompt.',
    },
    {
      q: 'Can the human owner revoke the agent’s permissions immediately?',
      a: 'Yes. The human master owner (Gnosis Safe) can call revokeSessionKey() at any time. We also provide an automated watchdog that freezes the session key instantly if anomaly thresholds are tripped.',
    },
    {
      q: 'Does RareAgent support gas sponsorship (Paymasters)?',
      a: 'Yes. RareAgent integrates ERC-4337 Paymasters on BSC and opBNB, allowing your dApp or treasury to sponsor gas in native BNB or permit the agent to pay gas in stablecoins (USDT).',
    },
    {
      q: 'Can RareAgent inspect on-chain state without gas costs?',
      a: 'Yes. RareAgent includes a read-only Model Context Protocol (MCP) server that provides agents with zero-gas tool access to balances, logs, contract reads, and calldata decoding on BSC (56/97) and opBNB (204/5611).',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentProduct="rareagent"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-orange/30 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/10 border border-orange/30 text-orange font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
                <span>RAREAGENT // GUARDED ERC-4337 AI ACCOUNTS</span>
                <span>•</span>
                <span className="text-gray-300">SESSION KEYS &amp; SPEND CAPS</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                AUTONOMOUS ON-CHAIN AI AGENTS WITH{' '}
                <span className="text-orange">GUARDED SESSION KEYS</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
                Give your autonomous AI agents on-chain execution powers without risking the treasury. Scoped ERC-4337 session keys, contract allowlists, daily spend limits, and instant human kill-switches.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#policy-sandbox"
                  className="px-6 py-3.5 rounded-xl bg-orange text-white font-display font-bold text-sm hover:opacity-90 transition glow-orange shadow-lg shadow-orange/20"
                >
                  Configure Guardrail Policy Below ↓
                </a>
                <button
                  onClick={() => setIntakeOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:border-orange/50 transition"
                >
                  Deploy an Agent Guard Account
                </button>
              </div>
            </div>

            {/* 3D Hardware Security Enclave Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-orange/30 shadow-2xl shadow-orange/10">
                <Image
                  src="/media/rareagent-enclave-3d.jpg"
                  alt="RareAgent ERC-4337 AI Agent Hardware Security Enclave"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300 bg-void/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-orange font-semibold">RareAgent • HSM Enclave</span>
                  <span className="text-gray-400">$500 Cap + Kill Switch</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE GUARDRAIL POLICY BUILDER */}
        <section id="policy-sandbox" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-orange uppercase tracking-wider">
                01 // Interactive Guardrail Sandbox
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                ERC-4337 Session Key Policy Simulator
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-400">
              Module: <span className="text-orange">SessionKeyValidator.sol</span> • BSC 56 / opBNB 204
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Policy Toggles */}
            <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Agent Allowed Target Allowlist
                  </h3>
                  <div className="font-mono text-xs text-gray-400 mt-0.5">
                    Toggle contracts the AI agent is cryptographically permitted to touch
                  </div>
                </div>
                <Badge variant="orange">POLICY MATRIX</Badge>
              </div>

              {/* Toggles */}
              <div className="space-y-3 font-mono text-xs">
                <div
                  onClick={() => setAllowPancake(!allowPancake)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                    allowPancake ? 'border-teal bg-teal/10 text-white' : 'border-white/10 bg-obsidian text-gray-400'
                  }`}
                >
                  <div>
                    <div className="font-bold">PancakeSwap V3 Router</div>
                    <div className="text-[11px] text-gray-400">0x13f4ea83d0bd40e75c8222255bc855a974568dd4</div>
                  </div>
                  <span className="text-teal font-bold">{allowPancake ? '✓ ALLOWED' : 'BLOCKED'}</span>
                </div>

                <div
                  onClick={() => setAllowVenus(!allowVenus)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                    allowVenus ? 'border-teal bg-teal/10 text-white' : 'border-white/10 bg-obsidian text-gray-400'
                  }`}
                >
                  <div>
                    <div className="font-bold">Venus Lending Comptroller</div>
                    <div className="text-[11px] text-gray-400">0xfd36e2c2a6789db23113685031d7f16329158384</div>
                  </div>
                  <span className={allowVenus ? 'text-teal font-bold' : 'text-gray-500 font-bold'}>
                    {allowVenus ? '✓ ALLOWED' : 'BLOCKED'}
                  </span>
                </div>

                <div
                  onClick={() => setAllowGameRelics(!allowGameRelics)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                    allowGameRelics ? 'border-teal bg-teal/10 text-white' : 'border-white/10 bg-obsidian text-gray-400'
                  }`}
                >
                  <div>
                    <div className="font-bold">RareChars Game Relic Vault</div>
                    <div className="text-[11px] text-gray-400">0x8b7e028546950c122026a9b61b50...</div>
                  </div>
                  <span className="text-teal font-bold">{allowGameRelics ? '✓ ALLOWED' : 'BLOCKED'}</span>
                </div>
              </div>

              {/* Spend Limit Slider */}
              <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">DAILY SPEND CAP:</span>
                  <span className="text-orange font-bold">${dailyCap} USD / DAY</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="100"
                  value={dailyCap}
                  onChange={(e) => setDailyCap(Number(e.target.value))}
                  className="w-full accent-orange cursor-pointer"
                />
              </div>

              {/* Simulation Test Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleTestValid}
                  className="py-3 px-4 rounded-xl bg-teal/15 border border-teal text-teal font-mono text-xs font-bold hover:bg-teal hover:text-void transition"
                >
                  Test Valid Call ($100 Swap)
                </button>
                <button
                  onClick={handleTestExploit}
                  className="py-3 px-4 rounded-xl bg-red-500/15 border border-red-500 text-red-400 font-mono text-xs font-bold hover:bg-red-500 hover:text-white transition"
                >
                  Simulate Blocked Exploit
                </button>
              </div>

              {simulationStatus && (
                <div className="rounded-xl bg-void border border-white/10 p-4 font-mono text-xs text-white">
                  {simulationStatus}
                </div>
              )}
            </div>

            {/* Guardrail Policy Architecture Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-panel p-6 space-y-4">
                <div className="text-xs font-mono text-orange uppercase tracking-wider">
                  Cryptographic Separation of Powers
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-obsidian border border-teal/40 space-y-1">
                    <div className="text-teal font-bold">1. Master Owner: Human Gnosis Safe</div>
                    <div className="text-gray-400 text-[11px]">
                      Full ownership, ability to deposit/withdraw master capital, upgrade modules, and instantly revoke session keys.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-obsidian border border-orange/40 space-y-1">
                    <div className="text-orange font-bold">2. Agent Worker: Scoped Session Key</div>
                    <div className="text-gray-400 text-[11px]">
                      Can only execute allowlisted functions within daily allowance. Zero access to raw master balance.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-obsidian border border-red-500/40 space-y-1">
                    <div className="text-red-400 font-bold">3. Watchdog &amp; Killswitch Module</div>
                    <div className="text-gray-400 text-[11px]">
                      Monitors user operations in real time and automatically pauses session keys if unexpected reverts or parameter drifts occur.
                    </div>
                  </div>
                </div>
              </div>

              <Terminal
                title="SessionKeyPolicy.json // Validated Policy Struct"
                singleCode={`{
  "account": "0x49a2...71e4",
  "sessionKey": "0x81b4...99a0",
  "validUntil": 1793156800,
  "dailySpendCap": "${dailyCap}.00 USD",
  "allowedContracts": [
    ${allowPancake ? '"0x13f4ea83d0bd40e75c8222255bc855a974568dd4 (PancakeSwap V3)",\n    ' : ''}${allowVenus ? '"0xfd36e2c2a6789db23113685031d7f16329158384 (Venus)",\n    ' : ''}${allowGameRelics ? '"0x8b7e028546950c122026a9b61b50000000000000 (RareChars)"' : ''}
  ],
  "enforcement": "On-Chain Smart Contract"
}`}
              />
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-orange uppercase tracking-wider">
                02 // Commercial Packages
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                RareAgent Deployment Packages
              </h2>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-orange/30 bg-orange/10 text-orange">
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
                      <div className="text-xs font-mono text-orange mt-0.5">
                        {priceData.subtext}
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-white/5 font-mono text-xs text-gray-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-orange">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIntakeOpen(true)}
                    className="w-full py-3 rounded-xl border border-orange bg-orange/10 text-white font-display font-bold text-xs hover:bg-orange transition shadow-lg shadow-orange/10"
                  >
                    {tier.cta} →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQS */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs text-orange uppercase tracking-wider">
              03 // Agent Guard Architecture &amp; FAQ
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              ERC-4337 Security Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agentFaqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-panel p-6 space-y-2"
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
