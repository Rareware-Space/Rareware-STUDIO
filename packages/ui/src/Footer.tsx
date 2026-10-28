import React from 'react';
import { RarewareLogoEmblem } from './Navbar';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-void text-gray-400 font-sans text-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <RarewareLogoEmblem className="h-9 w-11" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-base font-extrabold tracking-[0.14em] text-white">
                    RAREWARE
                  </span>
                  <span className="font-display text-xs font-bold tracking-[0.22em] text-teal">
                    STUDIO
                  </span>
                </div>
                <span className="font-mono text-[9px] text-gray-400 tracking-[0.16em]">
                  BLOCKCHAIN PRODUCTS <span className="text-teal">MARKETPLACE</span>
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Bespoke blockchain development, AI game characters, and cinema-grade Web3 frontends. Built for BSC, opBNB, and EVM with an AI-assisted, security-first pipeline.
            </p>
            <div className="pt-2 flex items-center gap-4 font-mono text-xs text-teal">
              <span>Owner: Ahmed Riyaz (ARZ)</span>
              <span>•</span>
              <a
                href="https://github.com/Rareware-Space"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                github.com/Rareware-Space
              </a>
            </div>
          </div>

          {/* Standalone Products */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-white font-bold tracking-wider uppercase text-[11px]">
              01 // PRODUCTS
            </div>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/raremint" className="hover:text-teal transition">RareMint (NFT Kit)</a></li>
              <li><a href="/raretoken" className="hover:text-amber transition">RareToken &amp; Vesting</a></li>
              <li><a href="/rarechars" className="hover:text-violet transition">RareChars (AI NPCs)</a></li>
              <li><a href="/rarepay" className="hover:text-blue transition">RarePay (Checkout)</a></li>
              <li><a href="/rareagent" className="hover:text-orange transition">RareAgent (ERC-4337)</a></li>
              <li><a href="/raredash" className="hover:text-lime transition">RareDash (Ponder Indexer)</a></li>
              <li className="pt-1"><a href="/case-studies/metacade" className="text-teal font-semibold hover:underline">Case Study: Metacade →</a></li>
            </ul>
          </div>

          {/* Infrastructure & Security */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-white font-bold tracking-wider uppercase text-[11px]">
              02 // SECURITY &amp; CODE
            </div>
            <ul className="space-y-2 text-gray-400">
              <li><span className="text-gray-300">Solidity 0.8.28</span></li>
              <li><span className="text-gray-300">Foundry 1,000 Fuzz Runs</span></li>
              <li><span className="text-gray-300">Stateful Invariants (256 runs)</span></li>
              <li><span className="text-gray-300">Slither &amp; Aderyn Static Analysis</span></li>
              <li><span className="text-gray-300">Gnosis Safe Multisig + Timelock</span></li>
              <li><span className="text-teal">Zero-Key AI Safety Pipeline</span></li>
            </ul>
          </div>

          {/* Chains & Contact */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-white font-bold tracking-wider uppercase text-[11px]">
              03 // DIRECT INTAKE
            </div>
            <p className="text-gray-400 leading-relaxed text-xs font-sans">
              Accepting 2 selective client projects per sprint. Direct milestone escrow &amp; Safe multisig handover.
            </p>
            <div className="space-y-1.5 pt-1">
              <div>TELEGRAM: <span className="text-teal font-mono">@rareware_space</span></div>
              <div>STUDIO: <span className="text-gray-300 font-mono">contact@rarewarestudio.space</span></div>
              <div>DEPLOYMENTS: <span className="text-white font-mono">BSC 56 / opBNB 204</span></div>
            </div>
          </div>
        </div>

        {/* Regulatory & Non-Custodial Disclaimer */}
        <div className="border-t border-white/5 pt-8 text-xs leading-relaxed text-gray-500 font-sans space-y-2">
          <p>
            <strong className="text-gray-400">NON-CUSTODIAL SOFTWARE NOTICE:</strong> Rareware Studio operates exclusively as a software development, UI/UX engineering, and technology consulting firm. Rareware does not hold, custody, transmit, or exchange cryptocurrency or digital assets on behalf of clients or end users. All smart contracts, cryptographic keys, and token treasuries remain in the sole ownership and control of the client and their Gnosis Safe multisig.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 font-mono text-[11px]">
            <div>© {new Date().getFullYear()} RAREWARE STUDIO. ALL RIGHTS RESERVED.</div>
            <div className="text-gray-400">
              OPTIMIZED FOR POST-MAXWELL BSC 450ms FAST FINALITY
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
