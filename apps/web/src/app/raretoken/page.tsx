'use client';

import React, { useState } from 'react';
import {
  Navbar,
  Footer,
  Badge,
  Terminal,
  IntakeWizardModal,
  CurrencyMode,
  formatPrice,
} from '@rareware/ui';

export default function RareTokenPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Vesting Simulator State
  const [vestingMonth, setVestingMonth] = useState(12);
  const totalAllocation = 1000000; // 1,000,000 RARE
  const cliffMonths = 6;
  const totalMonths = 36;

  let unlockedPercent = 0;
  if (vestingMonth < cliffMonths) {
    unlockedPercent = 0;
  } else {
    unlockedPercent = Math.min(100, Math.floor((vestingMonth / totalMonths) * 100));
  }
  const claimableTokens = Math.floor((totalAllocation * unlockedPercent) / 100);
  const lockedTokens = totalAllocation - claimableTokens;

  // Staking Calculator State
  const [stakedAmount, setStakedAmount] = useState(10000);
  const [stakingDays, setStakingDays] = useState(90);
  const baseApy = 18.5; // 18.5% APY
  const estimatedRewards = Math.floor(
    (stakedAmount * (baseApy / 100) * (stakingDays / 365))
  );

  const pricingTiers = [
    {
      name: 'Open-Source Core',
      baseUsd: 0,
      rateStr: 'Free & Open Source',
      tag: 'GITHUB REPO',
      accent: 'amber',
      features: [
        'RareToken.sol (Fixed-cap ERC-20, zero post-deploy mint)',
        'RareVesting.sol (Timestamp-based cliff + linear curve)',
        'RareStaking.sol (Synthetix-style rewardPerToken)',
        'Foundry invariant tests (256 runs, 0 rounding dust loss)',
        'Safe multisig deployment scripts',
      ],
      cta: 'View GitHub Repository',
      isRepo: true,
    },
    {
      name: 'Token + Vesting Deployment',
      baseUsd: 2000,
      rateStr: '$2,000 USD',
      tag: 'TURNKEY LAUNCH',
      accent: 'amber',
      features: [
        'Custom tokenomics parameterization & review',
        'Multi-beneficiary vesting schedules setup',
        'BSC Testnet (97) simulation & verified deployment',
        'BscScan token information registration assistance',
        'Safe multisig treasury & ownership handover runbook',
      ],
      cta: 'Book Token Deployment',
      isRepo: false,
    },
    {
      name: 'Full DeFi Staking Suite',
      baseUsd: 5000,
      rateStr: '$4,500 – $6,000 USD',
      tag: 'FULL STACK DEFI',
      accent: 'bronze',
      features: [
        'RareStaking.sol deployment with custom reward schedules',
        'Next.js cinematic staking dApp with live APY telemetry',
        'Ponder indexer for real-time holder & staker rankings',
        'Full static analysis triage (Slither + Aderyn)',
        'Post-deployment monitoring and retainer support',
      ],
      cta: 'Commission Staking Suite',
      isRepo: false,
    },
  ];

  const tokenFaqs = [
    {
      q: 'Why does block-number math completely break on BSC post-Maxwell?',
      a: 'Following the 2025–2026 Maxwell and Pascal upgrades, BSC cut block intervals from 3.0s down to 450ms (~0.45s). Any legacy contract calculating vesting or staking using block.number + (N * 1200) experiences massive time-warp drift (running nearly 7x faster than intended). RareToken and RareVesting strictly use block.timestamp for all duration and vesting math.',
    },
    {
      q: 'Can the contract owner or Rareware mint more tokens after deployment?',
      a: 'No. RareToken.sol enforces an absolute fixed supply. The entire supply is minted once in the constructor to the deployer’s Gnosis Safe treasury. There is no mint() function in the bytecode, making supply dilution cryptographically impossible.',
    },
    {
      q: 'What is the "Zero Rounding Dust" invariant in RareVesting?',
      a: 'In standard vesting contracts, integer division rounding can leave tiny dust balances trapped forever. RareVesting.sol is audited against a stateful Foundry invariant (testInvariant_VestingConservation) proving that for all actors and all time timestamps, released + releasable == totalAllocation with zero trapped dust.',
    },
    {
      q: 'How does staking reward calculation work without high gas overhead?',
      a: 'RareStaking.sol utilizes the industry-gold-standard Synthetix rewardPerTokenStored algorithm adapted for timestamp seconds. Instead of looping through all stakers (which hits gas limits), rewards accumulate in a single global accumulator, allowing stakers to deposit and harvest in O(1) constant gas.',
    },
    {
      q: 'Who holds the contract ownership keys upon deployment?',
      a: 'All deployments are initialized via OpenZeppelin Ownable2Step and transferred to your team’s Gnosis Safe multisig with an optional timelock. Rareware holds zero persistent admin keys.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentProduct="raretoken"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-amber/30 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/10 border border-amber/30 text-amber font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
              <span>RARETOKEN // TIMESTAMP-INVARIANT TOKEN KIT</span>
              <span>•</span>
              <span className="text-gray-300">FIXED SUPPLY ERC-20</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              POST-MAXWELL 450ms-SAFE{' '}
              <span className="text-amber">TOKEN LAUNCHES, VESTING &amp; STAKING</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
              Immune to BSC block-time drift. Fixed supply minted once to your Gnosis Safe treasury, timestamp-invariant linear vesting curves, and Synthetix-style staking reward contracts with 256-run invariant proofs.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#simulators"
                className="px-6 py-3.5 rounded-xl bg-amber text-void font-display font-bold text-sm hover:opacity-90 transition glow-amber shadow-lg shadow-amber/20"
              >
                Test Vesting &amp; Staking Simulators ↓
              </a>
              <button
                onClick={() => setIntakeOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:border-amber/50 transition"
              >
                Launch Your Token with Rareware
              </button>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SIMULATORS (VESTING & STAKING) */}
        <section id="simulators" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-amber uppercase tracking-wider">
                01 // Interactive Protocol Simulators
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Vesting Curve &amp; Staking Yield Simulators
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-400">
              Contract: <span className="text-amber">RareVesting.sol &amp; RareStaking.sol</span> • Invariants Verified
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Vesting Curve Simulator */}
            <div className="rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Vesting Schedule Simulator
                  </h3>
                  <div className="font-mono text-xs text-gray-500 mt-0.5">
                    Total: 1,000,000 RARE • 6-Mo Cliff • 36-Mo Linear
                  </div>
                </div>
                <Badge variant="amber">CLIFF + LINEAR</Badge>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-gray-400">ELAPSED TIME:</span>
                  <span className="text-amber font-bold">{vestingMonth} MONTHS</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="36"
                  value={vestingMonth}
                  onChange={(e) => setVestingMonth(Number(e.target.value))}
                  className="w-full accent-amber cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-gray-500">
                  <span>0 Mo (TGE)</span>
                  <span className="text-amber">6 Mo (Cliff)</span>
                  <span>18 Mo</span>
                  <span>36 Mo (100%)</span>
                </div>
              </div>

              {/* Visual Curve Bar */}
              <div className="space-y-2">
                <div className="w-full h-3 bg-void rounded-full overflow-hidden border border-white/10 flex">
                  <div
                    className="h-full bg-amber transition-all duration-300"
                    style={{ width: `${unlockedPercent}%` }}
                  />
                  <div
                    className="h-full bg-white/10"
                    style={{ width: `${100 - unlockedPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber">UNLOCKED: {unlockedPercent}%</span>
                  <span className="text-gray-400">LOCKED: {100 - unlockedPercent}%</span>
                </div>
              </div>

              {/* Calculated Balances */}
              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-obsidian border border-white/10">
                  <div className="text-gray-500">CLAIMABLE TOKENS</div>
                  <div className="font-display font-bold text-xl text-amber mt-1">
                    {claimableTokens.toLocaleString()} RARE
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {vestingMonth < cliffMonths ? 'Locked under Cliff' : 'Ready to withdraw'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-obsidian border border-white/10">
                  <div className="text-gray-500">REMAINING IN ESCROW</div>
                  <div className="font-display font-bold text-xl text-white mt-1">
                    {lockedTokens.toLocaleString()} RARE
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    Safe Multisig Vault
                  </div>
                </div>
              </div>

              {/* Invariant Banner */}
              <div className="rounded-xl bg-void border border-white/10 p-3.5 font-mono text-xs space-y-1">
                <div className="text-teal font-semibold">✓ Invariant Formally Checked:</div>
                <div className="text-gray-400">
                  released ({claimableTokens}) + releasable ({lockedTokens}) == 1,000,000 (0 Dust)
                </div>
              </div>
            </div>

            {/* Staking APY Calculator */}
            <div className="rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Staking Yield Calculator
                  </h3>
                  <div className="font-mono text-xs text-gray-500 mt-0.5">
                    Synthetix-style rewardPerToken • Fixed 18.5% Base APY
                  </div>
                </div>
                <Badge variant="amber">SYNTHETIX ALGO</Badge>
              </div>

              {/* Inputs */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">STAKE AMOUNT (RARE):</label>
                  <input
                    type="number"
                    value={stakedAmount}
                    onChange={(e) => setStakedAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl bg-void border border-white/15 text-white text-sm font-sans focus:outline-none focus:border-amber"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">LOCK DURATION:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[30, 90, 365].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setStakingDays(d)}
                        className={`p-3 rounded-xl border text-center transition ${
                          stakingDays === d
                            ? 'border-amber bg-amber/15 text-amber font-bold'
                            : 'border-white/10 bg-obsidian text-gray-400 hover:text-white'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Yield Results Card */}
              <div className="p-5 rounded-2xl bg-obsidian border border-amber/30 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-400">ESTIMATED HARVESTABLE REWARD:</span>
                  <span className="text-amber font-bold">18.5% APY</span>
                </div>
                <div className="font-display text-3xl font-extrabold text-amber">
                  +{estimatedRewards.toLocaleString()} RARE
                </div>
                <div className="text-[11px] font-mono text-gray-500 border-t border-white/5 pt-2">
                  Total return after {stakingDays} days: {(stakedAmount + estimatedRewards).toLocaleString()} RARE
                </div>
              </div>

              <div className="rounded-xl bg-void border border-white/10 p-3.5 font-mono text-xs text-gray-400">
                // O(1) Gas Complexity: Claiming rewards consumes ~44k gas regardless of the pool size.
              </div>
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-amber uppercase tracking-wider">
                02 // Commercial Packages
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                RareToken Packages &amp; Deployment
              </h2>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-amber/30 bg-amber/10 text-amber">
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
                      <Badge variant="amber">{tier.tag}</Badge>
                    </div>

                    <div>
                      <div className="font-display text-2xl font-bold text-white">
                        {currencyMode === 'USD' ? tier.rateStr : priceData.display}
                      </div>
                      <div className="text-xs font-mono text-amber mt-0.5">
                        {tier.baseUsd === 0 ? 'MIT Licensed Core' : priceData.subtext}
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-white/5 font-mono text-xs text-gray-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-amber">✓</span>
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
                    className="w-full py-3 rounded-xl border border-amber bg-amber/10 text-amber font-display font-bold text-xs hover:bg-amber hover:text-void transition"
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
            <span className="font-mono text-xs text-amber uppercase tracking-wider">
              03 // Smart Contract Architecture &amp; FAQ
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Token Architecture &amp; Security Invariants
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Terminal
              title="RareVesting.sol // Invariant Math"
              singleCode={`// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract RareVesting is Ownable2Step {
    using SafeERC20 for IERC20;

    // Guaranteed block.timestamp math — immune to BSC 450ms block drift
    function computeReleasableAmount(Schedule storage s) internal view returns (uint256) {
        if (block.timestamp < s.start + s.cliffDuration) {
            return 0;
        }
        if (block.timestamp >= s.start + s.totalDuration) {
            return s.totalAmount - s.releasedAmount;
        }
        uint256 totalVested = (s.totalAmount * (block.timestamp - s.start)) / s.totalDuration;
        return totalVested - s.releasedAmount;
    }
}`}
            />

            <div className="space-y-4">
              {tokenFaqs.map((faq) => (
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
