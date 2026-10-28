'use client';

import React, { useState } from 'react';

type ProjectType = 'nft' | 'token' | 'ai-npc' | 'pay' | 'agent' | 'custom';
type NetworkType = 'opbnb' | 'bsc' | 'eth';

interface ProjectCostEstimatorProps {
  onOpenIntake: () => void;
}

export function ProjectCostEstimator({ onOpenIntake }: ProjectCostEstimatorProps) {
  const [projectType, setProjectType] = useState<ProjectType>('ai-npc');
  const [network, setNetwork] = useState<NetworkType>('opbnb');
  const [txVolume, setTxVolume] = useState<number>(25000);

  // Dynamic calculations
  const calculateMetrics = () => {
    let baseTimeline = '3–4 Weeks';
    let basePricing = '$5,000 – $10,000';
    let contracts = ['RareCharsVerifier.sol', 'EIP712Domain.sol', 'SafeAdminModule.sol'];
    let gasPerTxBsc = 0.00035; // BNB (~$0.22)
    let gasPerTxOpbnb = 0.000008; // BNB (~$0.005)
    let gasPerTxEth = 0.0025; // ETH (~$8.50)

    if (projectType === 'nft') {
      baseTimeline = '1–2 Weeks';
      basePricing = '$1,500 – $4,500';
      contracts = ['RareMint.sol', 'MerkleProof.sol', 'EIP2981Royalties.sol', 'CommitReveal.sol'];
    } else if (projectType === 'token') {
      baseTimeline = '1–2 Weeks';
      basePricing = '$2,000 – $5,000';
      contracts = ['RareToken.sol', 'TokenVesting.sol', 'TimestampStaking.sol'];
    } else if (projectType === 'pay') {
      baseTimeline = '2–3 Weeks';
      basePricing = '$3,000 – $7,500';
      contracts = ['RarePayRouter.sol', 'IERC20DynamicDecimals.sol', 'SafeTreasury.sol'];
    } else if (projectType === 'agent') {
      baseTimeline = '3–5 Weeks';
      basePricing = '$6,000 – $12,000';
      contracts = ['ERC4337Account.sol', 'SessionKeyValidator.sol', 'SpendLimitPolicy.sol'];
    } else if (projectType === 'custom') {
      baseTimeline = '4–8 Weeks';
      basePricing = '$8,000 – $25,000';
      contracts = ['CustomSolidityCore.sol', 'PonderIndexer.ts', 'NextAppRouter.tsx'];
    }

    // Cost comparisons for txVolume
    const costOpbnbUsd = (txVolume * gasPerTxOpbnb * 648).toFixed(2);
    const costBscUsd = (txVolume * gasPerTxBsc * 648).toFixed(2);
    const costEthUsd = (txVolume * gasPerTxEth * 3450).toFixed(0);

    const selectedGasCost =
      network === 'opbnb' ? `$${costOpbnbUsd}` : network === 'bsc' ? `$${costBscUsd}` : `$${costEthUsd}`;

    const savingsPercentage =
      network === 'opbnb'
        ? '99.9%'
        : network === 'bsc'
        ? '97.4%'
        : '0% (Standard Gas)';

    return {
      baseTimeline,
      basePricing,
      contracts,
      selectedGasCost,
      costOpbnbUsd,
      costBscUsd,
      costEthUsd,
      savingsPercentage,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="rounded-3xl border border-white/10 bg-panel/85 backdrop-blur-xl p-6 sm:p-10 space-y-8 cyber-card">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-teal uppercase tracking-wider">
            INTERACTIVE SYSTEM ARCHITECTURE SANDBOX
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Simulate Your Project Stack &amp; Gas Savings
          </h3>
        </div>
        <div className="font-mono text-xs text-gray-400">
          Instant Pre-Deployment Blueprint
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Type */}
          <div className="space-y-3">
            <label className="font-mono text-xs text-gray-400 uppercase tracking-wider block">
              1. Choose Architecture Blueprint:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              {[
                { id: 'ai-npc', label: 'RareChars (AI NPC)', badge: 'EIP-712' },
                { id: 'nft', label: 'RareMint (NFT Launch)', badge: 'Merkle' },
                { id: 'token', label: 'RareToken (Vesting)', badge: 'ERC-20' },
                { id: 'pay', label: 'RarePay (Checkout)', badge: '18-Dec' },
                { id: 'agent', label: 'RareAgent (ERC-4337)', badge: 'Session' },
                { id: 'custom', label: 'Custom Web3 dApp', badge: 'Full-Stack' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setProjectType(item.id as ProjectType)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-[72px] ${
                    projectType === item.id
                      ? 'border-teal bg-teal/10 text-white shadow-lg shadow-teal/10'
                      : 'border-white/10 bg-void/60 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-[12px] truncate">{item.label}</span>
                  <span className="text-[10px] text-teal">{item.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Target Network */}
          <div className="space-y-3">
            <label className="font-mono text-xs text-gray-400 uppercase tracking-wider block">
              2. Target Blockchain Infrastructure:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <button
                onClick={() => setNetwork('opbnb')}
                className={`p-3 rounded-xl border text-left transition ${
                  network === 'opbnb'
                    ? 'border-teal bg-teal/10 text-white'
                    : 'border-white/10 bg-void/60 text-gray-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-teal">⚡ opBNB (204)</div>
                <div className="text-[11px] text-gray-400 mt-1">Sub-second • &lt;$0.001 Gas</div>
              </button>
              <button
                onClick={() => setNetwork('bsc')}
                className={`p-3 rounded-xl border text-left transition ${
                  network === 'bsc'
                    ? 'border-teal bg-teal/10 text-white'
                    : 'border-white/10 bg-void/60 text-gray-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-white">◈ BSC Mainnet (56)</div>
                <div className="text-[11px] text-gray-400 mt-1">450ms Blocks • EVM Top TVL</div>
              </button>
              <button
                onClick={() => setNetwork('eth')}
                className={`p-3 rounded-xl border text-left transition ${
                  network === 'eth'
                    ? 'border-teal bg-teal/10 text-white'
                    : 'border-white/10 bg-void/60 text-gray-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-gray-300">Ξ Ethereum L1 (1)</div>
                <div className="text-[11px] text-gray-400 mt-1">Legacy • High Gas Fees</div>
              </button>
            </div>
          </div>

          {/* Step 3: Scale Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-mono text-xs">
              <label className="text-gray-400 uppercase tracking-wider">
                3. Anticipated Monthly Activity / Mints:
              </label>
              <span className="text-teal font-bold">{txVolume.toLocaleString('en-US')} Transactions</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={txVolume}
              onChange={(e) => setTxVolume(Number(e.target.value))}
              className="w-full accent-teal bg-void rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-gray-500">
              <span>1,000 (MVP)</span>
              <span>25,000 (Standard)</span>
              <span>100,000 (High-Growth)</span>
            </div>
          </div>
        </div>

        {/* Blueprint Output Column */}
        <div className="lg:col-span-5 rounded-2xl bg-void/90 border border-teal/20 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-teal font-bold uppercase tracking-wider">
                ESTIMATED BLUEPRINT SPECS
              </span>
              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {metrics.savingsPercentage} Gas Savings
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-gray-500 block text-[11px]">PROJECTED ON-CHAIN GAS FOR {txVolume.toLocaleString('en-US')} TXS</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-display text-2xl font-bold text-teal">
                    {metrics.selectedGasCost}
                  </span>
                  <span className="text-gray-500 text-[11px]">
                    (vs ${metrics.costEthUsd} on ETH L1)
                  </span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 block text-[11px]">ESTIMATED STUDIO TIMELINE</span>
                <span className="text-white font-bold text-sm">{metrics.baseTimeline}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-[11px]">INDICATIVE FIXED MILESTONE RANGE</span>
                <span className="text-white font-bold text-sm">{metrics.basePricing}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-[11px] mb-1.5">VERIFIED SMART CONTRACTS INCLUDED</span>
                <div className="flex flex-wrap gap-1.5">
                  {metrics.contracts.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-1 rounded bg-panel border border-white/10 text-teal text-[10px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-gray-400 space-y-1">
                <div>✓ 1,000-run Foundry property fuzzing</div>
                <div>✓ 256 stateful invariant verification runs</div>
                <div>✓ 100% Gnosis Safe multisig timelocked handover</div>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenIntake}
            className="w-full py-3.5 rounded-xl bg-teal text-void font-display font-bold text-xs uppercase tracking-wider hover:opacity-95 transition glow-teal shadow-lg shadow-teal/20"
          >
            Apply Specs to Project Intake (/start) →
          </button>
        </div>
      </div>
    </div>
  );
}
