'use client';

import React, { useEffect, useRef, useState } from 'react';

type FeedType = 'BNB' | 'GAS' | 'PONDER' | 'PAY';
type Timeframe = '1M' | '5M' | '15M' | '1H';

interface ProtocolEvent {
  id: string;
  timestamp: string;
  type: 'MINT' | 'EIP712' | 'SAFE' | 'PAY' | 'INVARIANT' | 'BLOCK';
  message: string;
  tagColor: string;
}

export function LiveProtocolTerminal() {
  const [activeFeed, setActiveFeed] = useState<FeedType>('BNB');
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('5M');
  const [currentDisplayPrice, setCurrentDisplayPrice] = useState('$648.32');
  const [priceChange] = useState('+3.45%');
  const [isPaused, setIsPaused] = useState(false);
  const [events, setEvents] = useState<ProtocolEvent[]>([]);

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataPointsRef = useRef<number[]>([]);
  const feedConfigRef = useRef<{ min: number; max: number; base: number; prefix: string; suffix: string }>({
    min: 630,
    max: 665,
    base: 648,
    prefix: '$',
    suffix: '',
  });

  // Switch feeds
  useEffect(() => {
    let min = 630;
    let max = 665;
    let base = 648.32;
    let prefix = '$';
    let suffix = '';

    if (activeFeed === 'GAS') {
      min = 0.000006;
      max = 0.000012;
      base = 0.0000082;
      prefix = '';
      suffix = ' BNB';
    } else if (activeFeed === 'PONDER') {
      min = 12;
      max = 28;
      base = 16.4;
      prefix = '';
      suffix = ' ms';
    } else if (activeFeed === 'PAY') {
      min = 150000;
      max = 220000;
      base = 184500;
      prefix = '$';
      suffix = '/24h';
    }

    feedConfigRef.current = { min, max, base, prefix, suffix };

    // Seed points
    const points: number[] = [];
    let p = base;
    for (let i = 0; i < 90; i++) {
      const step = (max - min) * 0.035;
      p += (Math.random() - 0.49) * step;
      p = Math.max(min, Math.min(max, p));
      points.push(p);
    }
    dataPointsRef.current = points;
  }, [activeFeed]);

  // Initial events log
  useEffect(() => {
    const initialEvents: ProtocolEvent[] = [
      {
        id: '1',
        timestamp: '18:14:02',
        type: 'BLOCK',
        message: 'BSC Block #42,891,082 verified (450ms fast finality)',
        tagColor: 'text-teal border-teal/30 bg-teal/10',
      },
      {
        id: '2',
        timestamp: '18:14:03',
        type: 'MINT',
        message: 'RareMint.sol :: Merkle proof accepted for 0x3d9a...48b1 (Token #419)',
        tagColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
      },
      {
        id: '3',
        timestamp: '18:14:04',
        type: 'EIP712',
        message: 'RareCharsVerifier.sol :: Validated NPC signed reward (opBNB #204)',
        tagColor: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
      },
      {
        id: '4',
        timestamp: '18:14:05',
        type: 'PAY',
        message: 'RarePayRouter.sol :: 350.00 USDT (18-decimals) settled to Safe multisig',
        tagColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      },
      {
        id: '5',
        timestamp: '18:14:06',
        type: 'INVARIANT',
        message: 'Foundry Suite :: 256 stateful invariants held with 0 reverts',
        tagColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      },
    ];
    setEvents(initialEvents);

    const interval = setInterval(() => {
      if (isPaused) return;

      const eventTemplates = [
        {
          type: 'BLOCK' as const,
          message: `BSC Block #${42891100 + Math.floor(Math.random() * 500)} (450ms) - 0.000008 BNB gas`,
          tagColor: 'text-teal border-teal/30 bg-teal/10',
        },
        {
          type: 'MINT' as const,
          message: `RareMint.sol :: safeMint executed -> Safe Royalties 5% routed via EIP-2981`,
          tagColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
        },
        {
          type: 'EIP712' as const,
          message: `RareCharsVerifier :: NPC intent verified cryptographically on opBNB`,
          tagColor: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
        },
        {
          type: 'PAY' as const,
          message: `RarePayRouter.sol :: Direct transfer to client Safe (zero custody fee)`,
          tagColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
        },
        {
          type: 'SAFE' as const,
          message: `Gnosis Safe :: Multisig policy timelock verified (2-of-3 threshold)`,
          tagColor: 'text-white border-white/30 bg-white/10',
        },
      ];

      const templateIdx = Math.floor(Math.random() * eventTemplates.length);
      const chosen = eventTemplates[templateIdx] ?? eventTemplates[0]!;
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] ?? '18:14:00';

      const newEv: ProtocolEvent = {
        id: Math.random().toString(),
        timestamp: timeStr,
        type: chosen.type,
        message: chosen.message,
        tagColor: chosen.tagColor,
      };

      setEvents((prev) => [newEv, ...prev.slice(0, 7)]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Chart rendering & real-time animation loop
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let timerId: NodeJS.Timeout;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const drawChart = () => {
      const cW = canvas.width;
      const cH = canvas.height;
      if (!cW || !cH) return;

      ctx.clearRect(0, 0, cW, cH);

      const points = dataPointsRef.current;
      if (points.length < 2) return;

      // Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const numHoriz = 6;
      for (let i = 0; i <= numHoriz; i++) {
        const y = (cH / numHoriz) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cW, y);
        ctx.stroke();
      }
      const numVert = 10;
      for (let i = 0; i <= numVert; i++) {
        const x = (cW / numVert) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cH);
        ctx.stroke();
      }

      // Calculate bounds
      const minVal = Math.min(...points);
      const maxVal = Math.max(...points);
      const buffer = (maxVal - minVal) * 0.15 || 1;
      const plotMin = minVal - buffer;
      const plotMax = maxVal + buffer;
      const range = plotMax - plotMin;

      // Area gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, cH);
      gradient.addColorStop(0, 'rgba(0, 245, 212, 0.22)');
      gradient.addColorStop(1, 'rgba(0, 245, 212, 0)');

      // Draw filled area
      ctx.beginPath();
      ctx.moveTo(0, cH);
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (pt === undefined) continue;
        const x = (i / (points.length - 1)) * cW;
        const y = cH - ((pt - plotMin) / range) * cH;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(cW, cH);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw stroke line
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (pt === undefined) continue;
        const x = (i / (points.length - 1)) * cW;
        const y = cH - ((pt - plotMin) / range) * cH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#00F5D4';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(0, 245, 212, 0.5)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Current point beacon
      const lastVal = points[points.length - 1] ?? plotMin;
      const lastX = cW;
      const lastY = cH - ((lastVal - plotMin) / range) * cH;

      // Dashed horizontal price line
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, lastY);
      ctx.lineTo(cW, lastY);
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Pulsing outer halo
      ctx.beginPath();
      ctx.arc(lastX - 2, lastY, 9, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 245, 212, 0.25)';
      ctx.fill();

      // Inner dot
      ctx.beginPath();
      ctx.arc(lastX - 2, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00F5D4';
      ctx.fill();
    };

    const updateData = () => {
      const cfg = feedConfigRef.current;
      const points = dataPointsRef.current;
      if (points.length === 0) return;

      const last = points[points.length - 1] ?? cfg.base;
      const step = (cfg.max - cfg.min) * 0.045;
      let next = last + (Math.random() - 0.485) * step;
      next = Math.max(cfg.min, Math.min(cfg.max, next));
      points.push(next);
      if (points.length > 90) points.shift();

      // Format display
      let formatted = '';
      if (cfg.suffix === ' BNB') {
        formatted = next.toFixed(7) + cfg.suffix;
      } else if (cfg.suffix === ' ms') {
        formatted = next.toFixed(1) + cfg.suffix;
      } else if (cfg.prefix === '$' && next > 1000) {
        formatted = `$${Math.round(next).toLocaleString('en-US')}${cfg.suffix}`;
      } else {
        formatted = `$${next.toFixed(2)}${cfg.suffix}`;
      }
      setCurrentDisplayPrice(formatted);

      drawChart();
      timerId = setTimeout(updateData, 100);
    };

    window.addEventListener('resize', resize);
    updateData();

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('resize', resize);
    };
  }, [activeFeed]);

  return (
    <div className="rounded-3xl border border-white/10 bg-panel/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 cyber-card">
      {/* Terminal Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-teal font-bold">
              RAREWARE LIVE PROTOCOL TELEMETRY
            </span>
            <span className="text-gray-600 font-mono text-xs">•</span>
            <span className="font-mono text-[11px] text-gray-400">
              BSC (56) &amp; opBNB (204)
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentDisplayPrice}
            </h3>
            <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {priceChange} (24H)
            </span>
          </div>
        </div>

        {/* Feed & Timeframe Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Feed Selectors */}
          <div className="flex rounded-xl bg-void border border-white/10 p-1 font-mono text-xs">
            <button
              onClick={() => setActiveFeed('BNB')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeFeed === 'BNB'
                  ? 'bg-teal text-void font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              BNB / USDT
            </button>
            <button
              onClick={() => setActiveFeed('GAS')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeFeed === 'GAS'
                  ? 'bg-teal text-void font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              opBNB Gas
            </button>
            <button
              onClick={() => setActiveFeed('PONDER')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeFeed === 'PONDER'
                  ? 'bg-teal text-void font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Ponder RPC
            </button>
            <button
              onClick={() => setActiveFeed('PAY')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeFeed === 'PAY'
                  ? 'bg-teal text-void font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              RarePay Volume
            </button>
          </div>

          {/* Timeframe Selectors */}
          <div className="flex rounded-xl bg-void border border-white/10 p-1 font-mono text-xs">
            {(['1M', '5M', '15M', '1H'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-2.5 py-1.5 rounded-lg transition ${
                  activeTimeframe === tf
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Chart Canvas (Left) + Live Event Stream (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Canvas Chart */}
        <div className="lg:col-span-8 flex flex-col rounded-2xl bg-void/80 border border-white/10 p-4 sm:p-5 relative min-h-[340px]">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
            <span>REAL-TIME 60FPS TICKER</span>
            <span className="text-teal">HARDENED WEBSOCKET SIMULATION</span>
          </div>

          {/* Chart Wrapper */}
          <div className="flex-1 w-full relative min-h-[260px]">
            <canvas
              ref={chartCanvasRef}
              className="w-full h-full block rounded-lg"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Live Telemetry Footer Pill Badges */}
          <div className="pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-gray-500 block text-[10px]">BLOCK FINALITY</span>
              <span className="text-white font-bold">450ms Maxwell</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">USDT DECIMALS</span>
              <span className="text-teal font-bold">18-Dec Verified</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">FOUNDRY INVARIANTS</span>
              <span className="text-emerald-400 font-bold">16,384 Calls / 0 Revert</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">MULTISIG SAFETY</span>
              <span className="text-amber-400 font-bold">Safe + Timelock</span>
            </div>
          </div>
        </div>

        {/* Right: Live Protocol Event Stream */}
        <div className="lg:col-span-4 rounded-2xl bg-void/80 border border-white/10 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal animate-ping" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                TRANSACTION FEED
              </span>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-[11px] font-mono text-gray-400 hover:text-teal transition"
            >
              {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
            </button>
          </div>

          {/* Scrollable Event List */}
          <div className="space-y-2.5 overflow-hidden font-mono text-xs">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="p-2.5 rounded-xl bg-panel/60 border border-white/5 space-y-1 transition-all animate-fadeIn"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${ev.tagColor}`}>
                    [{ev.type}]
                  </span>
                  <span className="text-gray-500 text-[10px]">{ev.timestamp}</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-snug">{ev.message}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 text-center">
            <a
              href="https://github.com/Rareware-Space"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-teal hover:underline inline-flex items-center gap-1.5"
            >
              Inspect Monorepo Contracts on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
