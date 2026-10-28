'use client';

import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Footer,
  Badge,
  Terminal,
  IntakeWizardModal,
  CurrencyMode,
  formatPrice,
} from '@rareware/ui';

export default function RareDashPage() {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('USD');
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Live Block Stream Simulator
  const [blockHeight, setBlockHeight] = useState(48291040);
  const [recentEvents] = useState([
    { block: 48291039, event: 'RarePay.InvoicePaid', args: 'amount=2,500 USDT (18-dec), merchant=0x3E8b...59D1', time: '1s ago' },
    { block: 48291038, event: 'RareChars.ActionIntentConsumed', args: 'character=Kaelen, player=0x71C...89A2, value=250', time: '2s ago' },
    { block: 48291037, event: 'RareMint.Transfer', args: 'from=0x0, to=0x91F...2b01, tokenId=422', time: '3s ago' },
  ]);

  // Alert simulation state
  const [whaleAlerts, setWhaleAlerts] = useState(true);
  const [discordWebhook, setDiscordWebhook] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + 1);
    }, 1500); // 1.5s simulated interval
    return () => clearInterval(interval);
  }, []);

  const pricingTiers = [
    {
      name: 'Starter Project',
      baseUsd: 49,
      rateStr: '$49 / mo',
      tag: 'INDIE PROTOCOL',
      accent: 'lime',
      features: [
        'Up to 3 smart contracts indexed',
        'Sub-second Ponder event processing',
        'Standard GraphQL & REST API queries',
        'Basic Telegram notification bot',
        '7-day historical telemetry retention',
      ],
      cta: 'Start Starter Plan',
      isRepo: false,
    },
    {
      name: 'Protocol Pro',
      baseUsd: 149,
      rateStr: '$149 / mo',
      tag: 'POPULAR CHOICE',
      accent: 'chartGreen',
      features: [
        'Up to 15 smart contracts indexed',
        'Custom ABI ingestion & schema mapping',
        'Real-time WebSocket & webhook streams',
        'Discord & Telegram customized whale bots',
        '30-day historical analytics & CSV export',
      ],
      cta: 'Subscribe to Pro',
      isRepo: false,
    },
    {
      name: 'Dedicated Node Cluster',
      baseUsd: 499,
      rateStr: '$499 / mo',
      tag: 'ENTERPRISE',
      accent: 'lime',
      features: [
        'Unlimited contract indexing',
        'Dedicated high-spec BSC/opBNB archive RPC',
        'Zero-rate-limit private GraphQL cluster',
        'Historical backfill for entire blockchain history',
        'Custom frontend dashboard integration & SLA',
      ],
      cta: 'Deploy Dedicated Cluster',
      isRepo: false,
    },
  ];

  const dashFaqs = [
    {
      q: 'Why use Ponder instead of The Graph on BSC and opBNB?',
      a: 'The Graph hosted service has slow re-indexing times and high query latencies that struggle with BSC’s 450ms block rate. Ponder is a modern TypeScript-first event indexer that processes blocks locally with sub-second latency, zero gas fees, and direct Postgres storage—making it 10x faster and vastly more cost-efficient.',
    },
    {
      q: 'Can RareDash trigger instant webhooks for our backend server?',
      a: 'Yes. Whenever an on-chain event occurs (such as an invoice payment or NFT mint), RareDash dispatches a cryptographically signed HMAC-SHA256 HTTP POST webhook to your server within 500ms of finality.',
    },
    {
      q: 'Does RareDash index historical data before the current block?',
      a: 'Yes. Ponder automatically runs an asynchronous historical backfill from the deployment block forward while simultaneously streaming live blocks from the head of the chain.',
    },
    {
      q: 'Can we query the indexed data via GraphQL or REST?',
      a: 'Yes. RareDash exposes a fully-typed GraphQL schema and standard REST endpoints generated automatically from your database schema.',
    },
    {
      q: 'Is RareDash compatible with any EVM contract ABI?',
      a: 'Yes. Simply drop your contract JSON ABI into the schema folder, specify the start block, and Ponder automatically indexes every event and state transition.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentProduct="raredash"
        currencyMode={currencyMode}
        onCurrencyChange={setCurrencyMode}
        onOpenIntake={() => setIntakeOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={() => setWalletConnected(!walletConnected)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-lime/30 bg-gradient-to-b from-panel via-obsidian to-void p-8 sm:p-14 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-lime/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
              <span>RAREDASH // PONDER EVENT TELEMETRY</span>
              <span>•</span>
              <span className="text-gray-300">SUB-SECOND BSC &amp; opBNB INDEXER</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              REAL-TIME PONDER CONTRACT TELEMETRY,{' '}
              <span className="text-lime">WHALE ALERTS &amp; HOLDER INTEL</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
              Sub-second event indexing for BSC and opBNB built on Ponder v0.7. Live block streamers, automated Discord and Telegram whale alert bots, and customizable holder analytics.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#live-stream"
                className="px-6 py-3.5 rounded-xl bg-lime text-void font-display font-bold text-sm hover:opacity-90 transition glow-lime shadow-lg shadow-lime/20"
              >
                Inspect Live Block Ticker Below ↓
              </a>
              <button
                onClick={() => setIntakeOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-display font-medium text-sm hover:border-lime/50 transition"
              >
                Setup Custom Indexer for Your Contract
              </button>
            </div>
          </div>
        </section>

        {/* INTERACTIVE LIVE TELEMETRY SANDBOX */}
        <section id="live-stream" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-lime uppercase tracking-wider">
                01 // Sub-Second Live Indexer Feed
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Live 450ms Block Stream &amp; Telemetry
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
              <span>BLOCK: #{blockHeight}</span>
              <span>•</span>
              <span className="text-lime">FAST FINALITY: ~650ms</span>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-white/10 bg-panel">
              <div className="text-xs font-mono text-gray-500">INDEXED TVL</div>
              <div className="font-display text-2xl font-bold text-white mt-1">$1,428,500</div>
              <div className="text-[11px] font-mono text-teal mt-0.5">+14.2% (7d)</div>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-panel">
              <div className="text-xs font-mono text-gray-500">24H VOLUME</div>
              <div className="font-display text-2xl font-bold text-lime mt-1">$384,190</div>
              <div className="text-[11px] font-mono text-gray-400 mt-0.5">BSC USDT / BNB</div>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-panel">
              <div className="text-xs font-mono text-gray-500">STAKING RATIO</div>
              <div className="font-display text-2xl font-bold text-white mt-1">64.2%</div>
              <div className="text-[11px] font-mono text-amber mt-0.5">Synthetix Rewards</div>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-panel">
              <div className="text-xs font-mono text-gray-500">ACTIVE AI NPCS</div>
              <div className="font-display text-2xl font-bold text-white mt-1">1,842</div>
              <div className="text-[11px] font-mono text-violet mt-0.5">opBNB Intents</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Live Block Event Stream */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    On-Chain Real-Time Event Log
                  </h3>
                  <div className="font-mono text-xs text-gray-400 mt-0.5">
                    Streamed live from BSC (56) &amp; opBNB (204)
                  </div>
                </div>
                <Badge variant="lime">LIVE STREAM</Badge>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {recentEvents.map((ev, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-obsidian border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lime font-bold">{ev.event}</span>
                      <span className="text-gray-500">Block #{ev.block} • {ev.time}</span>
                    </div>
                    <div className="text-gray-300 text-[11px] break-all">{ev.args}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-void border border-white/10 p-3.5 font-mono text-xs text-gray-400">
                // Indexer Speed: Average processing time 12ms per block (SQLite / Postgres)
              </div>
            </div>

            {/* Alert Webhook Configuration */}
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Whale Alert Bots
                  </h3>
                  <div className="font-mono text-xs text-gray-400 mt-0.5">
                    Automated Telegram &amp; Discord Alerts
                  </div>
                </div>
                <Badge variant="lime">TELEGRAM / DISCORD</Badge>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div
                  onClick={() => setWhaleAlerts(!whaleAlerts)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                    whaleAlerts ? 'border-lime bg-lime/10 text-white' : 'border-white/10 bg-obsidian text-gray-400'
                  }`}
                >
                  <span>Whale Swaps (&gt; $10,000 USD)</span>
                  <span className="text-lime font-bold">{whaleAlerts ? 'ENABLED' : 'PAUSED'}</span>
                </div>

                <div
                  onClick={() => setDiscordWebhook(!discordWebhook)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                    discordWebhook ? 'border-lime bg-lime/10 text-white' : 'border-white/10 bg-obsidian text-gray-400'
                  }`}
                >
                  <span>Discord Channel Webhook Post</span>
                  <span className="text-lime font-bold">{discordWebhook ? 'ENABLED' : 'PAUSED'}</span>
                </div>
              </div>

              <Terminal
                title="Ponder Alert Webhook Payload"
                singleCode={`{
  "channel": "#whale-alerts",
  "text": "🚨 WHALE ALERT on BSC (56)\\nAmount: 50,000 USDT\\nFrom: 0x98a2...3f1c\\nTx: 0x81b4e9...88a2"
}`}
              />
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-lime uppercase tracking-wider">
                02 // Commercial Packages
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                RareDash Indexer Tiers
              </h2>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-lime/30 bg-lime/10 text-lime">
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
                      <div className="text-xs font-mono text-lime mt-0.5">
                        {priceData.subtext}
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-white/5 font-mono text-xs text-gray-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-lime">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIntakeOpen(true)}
                    className="w-full py-3 rounded-xl border border-lime bg-lime/10 text-white font-display font-bold text-xs hover:bg-lime hover:text-void transition shadow-lg shadow-lime/10"
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
            <span className="font-mono text-xs text-lime uppercase tracking-wider">
              03 // Ponder Event Indexer Architecture &amp; FAQ
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Telemetry &amp; Query Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashFaqs.map((faq) => (
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
