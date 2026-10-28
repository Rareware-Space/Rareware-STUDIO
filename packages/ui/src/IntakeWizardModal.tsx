'use client';

import React, { useState } from 'react';

export interface IntakeWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntakeWizardModal: React.FC<IntakeWizardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('Token Launch Kit ($2k–$6k)');
  const [selectedChain, setSelectedChain] = useState('BSC Mainnet (56) + Testnet (97)');
  const [timeline, setTimeline] = useState('2–3 Weeks');
  const [budget, setBudget] = useState('$3,000 – $6,000 USD');
  const [contactHandle, setContactHandle] = useState('');
  const [brief, setBrief] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const services = [
    { title: 'Token Launch Kit', price: '$2k–$6k', desc: 'ERC-20, vesting, staking, tests & Safe handover' },
    { title: 'NFT Collection + Mint Site', price: '$1.5k–$5k', desc: 'Merkle allowlist, commit-reveal, cinematic GSAP UI' },
    { title: 'AI NPC / Game Character', price: '$5k–$15k', desc: 'RareChars API, pgvector memory, EIP-712 on-chain actions' },
    { title: 'RarePay Crypto Checkout', price: '$1.5k–$4k', desc: 'Non-custodial 18-decimal BSC/opBNB router & webhooks' },
    { title: 'Full Web3 dApp / Marketplace', price: '$8k–$25k', desc: 'Custom contracts, Ponder indexer, Next.js frontend' },
    { title: 'Pre-Audit Hardening', price: '$1k–$3k', desc: '1,000 fuzz runs, invariants, Slither/Aderyn triage' },
  ];

  const chains = [
    'BSC Mainnet (56) + Testnet (97)',
    'opBNB (204/5611)',
    'Multi-Chain EVM (BSC + Arbitrum / Base / Ethereum)',
  ];

  const budgetTiers = [
    '$1,500 – $3,000 USD',
    '$3,000 – $6,000 USD',
    '$6,000 – $15,000 USD',
    '$15,000+ USD (Custom Architecture)',
  ];

  const generateSummaryText = () => {
    return `[RAREWARE STUDIO PROJECT INTAKE BRIEF]
Service: ${selectedService}
Target Chain: ${selectedChain}
Timeline: ${timeline}
Budget Range: ${budget}
Client Contact: ${contactHandle || 'Not provided'}
Brief: ${brief || 'No additional notes provided'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTelegram = () => {
    const text = encodeURIComponent(generateSummaryText());
    window.open(`https://t.me/rareware_space?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-obsidian p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-xs text-teal">00 // PROJECT INTAKE WIZARD</span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Start Your Project with Rareware
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            ✕
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-4 gap-2 font-mono text-[11px]">
          {['Scope', 'Chain', 'Budget', 'Review'].map((label, idx) => (
            <div
              key={label}
              className={`rounded-md p-2 text-center border transition ${
                step === idx + 1
                  ? 'border-teal bg-teal/15 text-teal font-bold'
                  : step > idx + 1
                  ? 'border-white/20 bg-panel text-gray-300'
                  : 'border-white/5 bg-void text-gray-500'
              }`}
            >
              0{idx + 1} {label}
            </div>
          ))}
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-gray-400 uppercase">
              Select Product or Service Scope
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
              {services.map((s) => (
                <div
                  key={s.title}
                  onClick={() => setSelectedService(`${s.title} (${s.price})`)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedService.startsWith(s.title)
                      ? 'border-teal bg-teal/10 shadow-lg shadow-teal/5'
                      : 'border-white/10 bg-panel hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-white">
                        {s.title}
                      </span>
                      <span className="font-mono text-xs text-teal font-semibold">
                        {s.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Target Chain & Timeline */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase mb-2">
                Target Blockchain Network
              </div>
              <div className="space-y-2">
                {chains.map((c) => (
                  <div
                    key={c}
                    onClick={() => setSelectedChain(c)}
                    className={`p-3.5 rounded-xl border cursor-pointer font-mono text-xs transition ${
                      selectedChain === c
                        ? 'border-teal bg-teal/10 text-teal font-bold'
                        : 'border-white/10 bg-panel text-gray-300 hover:border-white/20'
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-gray-400 uppercase mb-2">
                Desired Launch Timeline
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['1–2 Weeks (Fast Track)', '2–4 Weeks (Standard)', '6+ Weeks (Complex)'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`p-3 rounded-xl border font-mono text-xs text-left transition ${
                      timeline === t
                        ? 'border-teal bg-teal/10 text-teal font-bold'
                        : 'border-white/10 bg-panel text-gray-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Budget Tier */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-gray-400 uppercase">
              Target Milestone Budget
            </div>
            <div className="space-y-2.5">
              {budgetTiers.map((b) => (
                <div
                  key={b}
                  onClick={() => setBudget(b)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between font-mono text-xs transition ${
                    budget === b
                      ? 'border-teal bg-teal/10 text-white font-bold'
                      : 'border-white/10 bg-panel text-gray-300 hover:border-white/20'
                  }`}
                >
                  <span>{b}</span>
                  <span className="text-teal font-semibold">40% / 40% / 20% Safe Escrow</span>
                </div>
              ))}
            </div>
            <div className="p-3.5 rounded-xl bg-void border border-white/5 font-mono text-[11px] text-gray-400">
              Note: Work is executed under non-custodial milestone deliverables (40% kickoff / 40% testnet verified / 20% mainnet Safe multisig handover).
            </div>
          </div>
        )}

        {/* Step 4: Contact & Review */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase block mb-1">
                  Your Telegram or Email (Required)
                </label>
                <input
                  type="text"
                  placeholder="@telegram_handle or name@studio.xyz"
                  value={contactHandle}
                  onChange={(e) => setContactHandle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-void border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase block mb-1">
                  Project Notes or Existing Repo / Pitchdeck (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your tokenomics, art reveal, or AI character lore..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-void border border-white/15 text-white font-sans text-xs focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            {/* Generated Brief Card */}
            <div className="p-3.5 rounded-xl bg-void border border-white/10 font-mono text-[11px] text-gray-300 space-y-1">
              <div className="text-teal font-bold">// Project Summary Brief:</div>
              <div>• Scope: {selectedService}</div>
              <div>• Chain: {selectedChain}</div>
              <div>• Budget: {budget}</div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl border border-white/10 font-mono text-xs text-gray-400 hover:text-white"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-teal text-void font-display font-bold text-xs hover:bg-teal/90 transition shadow-lg shadow-teal/20"
            >
              Next Step →
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl border border-white/15 font-mono text-xs text-gray-300 hover:text-white"
              >
                {copied ? '✓ Copied' : 'Copy Brief'}
              </button>
              <button
                onClick={handleTelegram}
                className="px-6 py-2.5 rounded-xl bg-teal text-void font-display font-bold text-xs hover:bg-teal/90 transition shadow-lg shadow-teal/20"
              >
                Send via Telegram (@rareware_space) →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
