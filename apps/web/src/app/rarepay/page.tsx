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

export default function RarePayPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Checkout Sandbox State
  const [selectedToken, setSelectedToken] = useState<'USDT' | 'USDC' | 'BNB'>('USDT');
  const [invoiceAmount] = useState(2500);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [webhookLog, setWebhookLog] = useState('Listening for InvoicePaid(bytes32 invoiceId, address token, uint256 amount) on BSC...');

  const handleSimulatePayment = () => {
    setPaying(true);
    setWebhookLog('1/3 Calling RarePayRouter.payTokenInvoice() via viem on BSC (56)...');

    setTimeout(() => {
      setWebhookLog('2/3 On-chain decimals verified: IERC20Metadata(token).decimals() == 18. Split routed to Merchant Safe.');
    }, 600);

    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      setWebhookLog(`3/3 Ponder indexer confirmed payment! HMAC-SHA256 signed webhook dispatched: status=confirmed, invoiceId=INV-2026-8841.`);
    }, 1200);
  };

  const pricingTiers = [
    {
      name: 'Self-Hosted Router',
      baseUsd: 1500,
      rateStr: '$1,500 One-Time',
      tag: 'ZERO ONGOING FEES',
      accent: 'blue',
      features: [
        'RarePayRouter.sol deployment on BSC & opBNB',
        'Direct routing to your Gnosis Safe multisig',
        '0% platform commission on future volume',
        'Open-source TypeScript checkout widget',
        'Self-hosted webhook listener scripts',
      ],
      cta: 'Deploy Self-Hosted Router',
      isRepo: false,
    },
    {
      name: 'Managed Webhook SaaS',
      baseUsd: 79,
      rateStr: '$79 / mo + 0.5%',
      tag: 'MOST POPULAR',
      accent: 'cyan',
      features: [
        'Managed sub-second Ponder indexer infrastructure',
        'HMAC-SHA256 signed webhook delivery with retries',
        'Merchant analytics dashboard & email alerts',
        'Pre-built Shopify & WooCommerce checkout plugins',
        'Multi-currency price feed conversion (Chainlink)',
      ],
      cta: 'Subscribe to Managed SaaS',
      isRepo: false,
    },
    {
      name: 'Enterprise Custom Rail',
      baseUsd: 4000,
      rateStr: '$4,000 USD',
      tag: 'BESPOKE FINTECH',
      accent: 'blue',
      features: [
        'Deterministic CREATE2 counterfactual deposit clones',
        'Automated multi-token sweepers (zero gas trapped)',
        'Custom ERP & accounting database synchronization',
        'Dedicated high-throughput BSC/opBNB RPC cluster',
        'Formal security hardening & priority SLA',
      ],
      cta: 'Commission Enterprise Rail',
      isRepo: false,
    },
  ];

  const payFaqs = [
    {
      q: 'Why do Ethereum/Arbitrum checkout plugins break on BSC USDT and USDC?',
      a: 'On Ethereum, Arbitrum, and Base, USDT and USDC use 6 decimals. On Binance Smart Chain (BSC), Binance-Peg USDT (0x55d398...) and Binance-Peg USDC (0x8AC76a...) both use 18 decimals! Hardcoding 6 decimals causes payments to be off by a catastrophic factor of 10^12. RarePay dynamically calls IERC20Metadata(token).decimals() on-chain, guaranteeing precision.',
    },
    {
      q: 'Does Rareware ever hold or custody merchant revenues?',
      a: 'Never. RarePayRouter.sol is strictly non-custodial. When a customer executes payTokenInvoice(), the smart contract atomically routes 99.5% directly to your merchant Gnosis Safe treasury and 0.5% to the fee receiver in the exact same transaction. Funds never touch a Rareware custodial wallet.',
    },
    {
      q: 'How does RarePay verify transaction finality on BSC?',
      a: 'Following the 2025–2026 Maxwell hardfork, BSC produces blocks in 450ms with fast finality around 650ms. RarePay’s Ponder indexer listens for the on-chain InvoicePaid event and confirms delivery after 15–20 blocks (~7–9 seconds) to exceed finality before dispatching the signed HMAC-SHA256 webhook.',
    },
    {
      q: 'What happens if a customer sends the wrong token or insufficient amount?',
      a: 'RarePayRouter verifies the transferred token address against an allowlist and checks that msg.value or tokenAmount matches the invoice requirement. If insufficient funds are transferred, the transaction reverts atomically—preventing partial unrecorded balances.',
    },
    {
      q: 'Can RarePay invoices be settled in BNB as well as stablecoins?',
      a: 'Yes. RarePay supports native BNB payments (via payNativeInvoice) alongside all standard ERC-20 tokens (USDT, USDC, DAI) with full 18-decimal precision.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentProduct="rarepay"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-blue/30 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue/10 border border-blue/30 text-blue font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-blue animate-pulse" />
              <span>RAREPAY // NON-CUSTODIAL CHECKOUT</span>
              <span>•</span>
              <span className="text-gray-300">18-DECIMAL SAFE BSC/opBNB</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              NON-CUSTODIAL BSC &amp; opBNB CHECKOUT WITH{' '}
              <span className="text-blue">18-DECIMAL PRECISION</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
              Accept crypto payments (USDT, USDC, BNB) on BSC and opBNB directly into your Gnosis Safe treasury. Zero custody, dynamic 18-decimal token normalization, and sub-second HMAC-SHA256 signed webhooks.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#checkout-sandbox"
                className="px-6 py-3.5 rounded-xl bg-blue text-white font-display font-bold text-sm hover:opacity-90 transition glow-blue shadow-lg shadow-blue/20"
              >
                Test Live Invoice Checkout Modal ↓
              </a>
              <button
                onClick={() => setIntakeOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:border-blue/50 transition"
              >
                Setup RarePay for Your Project
              </button>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CHECKOUT SANDBOX */}
        <section id="checkout-sandbox" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-blue uppercase tracking-wider">
                01 // Interactive Non-Custodial Checkout
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Atomic Split Router &amp; Webhook Inspector
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-400">
              Contract: <span className="text-blue">RarePayRouter.sol</span> • Ponder Indexer Active
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Invoice Checkout Modal Simulation */}
            <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-blue uppercase tracking-wider">
                    Invoice Order #INV-2026-8841
                  </span>
                  <div className="font-display text-2xl font-bold text-white mt-0.5">
                    Web3 B2B Software License
                  </div>
                </div>
                <Badge variant="blue">NON-CUSTODIAL</Badge>
              </div>

              {/* Token Selector */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-gray-400 uppercase">
                  Select Settlement Asset (BSC Network)
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['USDT', 'USDC', 'BNB'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedToken(t)}
                      className={`p-3 rounded-xl border font-mono text-xs text-center transition ${
                        selectedToken === t
                          ? 'border-blue bg-blue/15 text-white font-bold'
                          : 'border-white/10 bg-obsidian text-gray-400 hover:text-white'
                      }`}
                    >
                      <div>{t}</div>
                      <div className="text-[10px] text-teal mt-0.5">18 Decimals</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Invoice Breakdown */}
              <div className="p-4 rounded-xl bg-obsidian border border-white/10 font-mono text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-400">INVOICE ID:</span>
                  <span className="text-white font-bold">0x9f2c7a...81a4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MERCHANT SAFE:</span>
                  <span className="text-gray-300">0x3E8b...59D1 (Client Treasury)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TOKEN CONTRACT:</span>
                  <span className="text-teal font-semibold">
                    {selectedToken === 'USDT' ? '0x55d398326f99059fF775485246999027B3197955' : 'Binance-Peg Verified'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2 text-sm">
                  <span className="text-gray-300 font-bold">AMOUNT DUE:</span>
                  <span className="text-blue font-extrabold">
                    {selectedToken === 'BNB' ? `${(invoiceAmount / 600).toFixed(2)} BNB` : `${invoiceAmount.toLocaleString()} ${selectedToken}`}
                  </span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handleSimulatePayment}
                disabled={paying}
                className="w-full py-4 rounded-xl bg-blue text-white font-display font-bold text-base hover:opacity-90 transition glow-blue disabled:opacity-50"
              >
                {paying ? 'Routing Atomic Split...' : paid ? '✓ Invoice Paid & Confirmed' : 'Simulate RarePayRouter Checkout'}
              </button>

              <div className="rounded-xl bg-void border border-white/10 p-3.5 font-mono text-xs text-gray-400">
                // Atomic Routing: 99.5% settles instantly to Merchant Safe; 0.5% protocol fee.
              </div>
            </div>

            {/* Atomic Split Visualizer & Webhook Terminal */}
            <div className="lg:col-span-6 space-y-6">
              {/* Flow Diagram */}
              <div className="rounded-3xl border border-white/10 bg-panel p-6 space-y-4">
                <div className="text-xs font-mono text-blue uppercase tracking-wider">
                  Atomic Transaction Execution Flow
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-obsidian border border-white/10 flex items-center justify-between">
                    <span className="text-gray-300">1. Customer Wallet</span>
                    <span className="text-teal font-semibold">Transfers 2,500 USDT (18-dec)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue/10 border border-blue/40 flex items-center justify-between">
                    <span className="text-blue font-bold">2. RarePayRouter.sol</span>
                    <span className="text-white">Atomic Split in 1 Transaction</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-obsidian border border-teal/30">
                      <div className="text-[10px] text-teal">99.5% TO MERCHANT SAFE</div>
                      <div className="font-bold text-white text-sm mt-0.5">2,487.50 USDT</div>
                    </div>
                    <div className="p-3 rounded-xl bg-obsidian border border-white/10">
                      <div className="text-[10px] text-gray-400">0.5% PLATFORM FEE</div>
                      <div className="font-bold text-white text-sm mt-0.5">12.50 USDT</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webhook Stream Output */}
              <div className="rounded-3xl border border-white/10 bg-void p-6 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-gray-400 border-b border-white/10 pb-2">
                  <span className="text-blue font-bold">// Signed HMAC-SHA256 Webhook Stream</span>
                  <Badge variant="blue">PONDER v0.7</Badge>
                </div>
                <div className="text-teal">{webhookLog}</div>
                <pre className="text-[11px] text-gray-300 overflow-x-auto leading-relaxed pt-2 border-t border-white/5">
{`{
  "event": "invoice.paid",
  "invoiceId": "0x9f2c7a8841",
  "token": "0x55d398326f99059fF775485246999027B3197955",
  "decimals": 18,
  "amountPaid": "2500000000000000000000",
  "merchant": "0x3E8b4179...59D1",
  "confirmations": 18,
  "signature": "hmac_sha256_9c2a1e847..."
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
              <span className="font-mono text-xs text-blue uppercase tracking-wider">
                02 // Commercial Packages
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                RarePay Plans &amp; Self-Hosted Setup
              </h2>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-blue/30 bg-blue/10 text-blue">
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
                      <div className="text-xs font-mono text-blue mt-0.5">
                        {priceData.subtext}
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-white/5 font-mono text-xs text-gray-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-blue">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIntakeOpen(true)}
                    className="w-full py-3 rounded-xl border border-blue bg-blue/10 text-white font-display font-bold text-xs hover:bg-blue transition shadow-lg shadow-blue/10"
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
            <span className="font-mono text-xs text-blue uppercase tracking-wider">
              03 // Non-Custodial Architecture &amp; FAQ
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              On-Chain Decimals &amp; Safe Routing Logic
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Terminal
              title="RarePayRouter.sol // Atomic Payment Split"
              singleCode={`// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract RarePayRouter {
    using SafeERC20 for IERC20;

    event InvoicePaid(bytes32 indexed invoiceId, address indexed token, uint256 amount);

    function payTokenInvoice(
        bytes32 invoiceId,
        address token,
        uint256 amount,
        address merchantSafe
    ) external {
        // Enforce dynamic decimals check (never assume 6 or 18 decimals)
        uint8 dec = IERC20Metadata(token).decimals();
        require(dec >= 6 && dec <= 18, "UnsupportedDecimals()");

        uint256 fee = (amount * 50) / 10000; // 0.5% fee
        uint256 merchantNet = amount - fee;

        // Atomic Check-Effects-Interactions (CEI) transfer
        IERC20(token).safeTransferFrom(msg.sender, merchantSafe, merchantNet);
        IERC20(token).safeTransferFrom(msg.sender, feeCollector, fee);

        emit InvoicePaid(invoiceId, token, amount);
    }
}`}
            />

            <div className="space-y-4">
              {payFaqs.map((faq) => (
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
