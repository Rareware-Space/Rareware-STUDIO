'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { RarewareLogoEmblem, MagneticButton } from '@rareware/ui';

interface StudioHeaderProps {
  onOpenIntake: () => void;
}

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  status: string;
  statusVariant: 'teal' | 'amber' | 'violet' | 'blue' | 'orange' | 'lime';
  contract: string;
  href: string;
  image: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'raremint',
    name: 'RareMint',
    tagline: 'Zero-gas-war NFT collection kit with Merkle allowlists & delayed reveal.',
    status: 'Open-source core',
    statusVariant: 'teal',
    contract: 'RareMint.sol (ERC-721A)',
    href: '/raremint',
    image: '/media/hero-monolith-3d.jpg',
  },
  {
    id: 'raretoken',
    name: 'RareToken',
    tagline: 'Fixed-supply ERC-20 with timestamp vesting & Synthetix-style staking.',
    status: 'Open-source core',
    statusVariant: 'amber',
    contract: 'RareToken.sol + Vesting',
    href: '/raretoken',
    image: '/media/metacade-token-3d.jpg',
  },
  {
    id: 'rarechars',
    name: 'RareChars',
    tagline: 'Persistent AI NPCs for Web3 games with pgvector RAG memory & verified EIP-712 intents.',
    status: 'Preview',
    statusVariant: 'violet',
    contract: 'RareCharsVerifier.sol (opBNB)',
    href: '/rarechars',
    image: '/media/ai-agent-neural-core.jpg',
  },
  {
    id: 'rarepay',
    name: 'RarePay',
    tagline: 'Non-custodial crypto checkout with 18-decimal token normalization & HMAC webhooks.',
    status: 'Preview',
    statusVariant: 'blue',
    contract: 'RarePayRouter.sol (BSC/opBNB)',
    href: '/rarepay',
    image: '/media/metacade-token-3d.jpg',
  },
  {
    id: 'rareagent',
    name: 'RareAgent',
    tagline: 'Autonomous AI agent smart accounts with scoped session keys & kill-switches.',
    status: 'Early access',
    statusVariant: 'orange',
    contract: 'ERC-4337 Session Key Module',
    href: '/rareagent',
    image: '/media/ai-agent-neural-core.jpg',
  },
  {
    id: 'raredash',
    name: 'RareDash',
    tagline: 'Sub-second Ponder-indexed contract telemetry & on-chain holder intelligence.',
    status: 'Early access',
    statusVariant: 'lime',
    contract: 'Ponder v0.7 Indexer',
    href: '/raredash',
    image: '/media/metacadia-city-aerial.jpg',
  },
];

export const StudioHeader: React.FC<StudioHeaderProps> = ({ onOpenIntake }) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string>('raremint');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
        setProductsOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeProduct: ProductItem = PRODUCTS_DATA.find((p) => p.id === activeProductId) ?? PRODUCTS_DATA[0]!;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-obsidian/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-b border-white/[0.04]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <RarewareLogoEmblem className="h-9 w-11" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-sm font-extrabold tracking-[0.14em] text-white">
                  RAREWARE
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.22em] text-teal">
                  STUDIO
                </span>
              </div>
              <span className="font-mono text-[9px] text-gray-400 tracking-[0.16em]">
                BLOCKCHAIN ARCHITECTURES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {/* Products Mega Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-gray-300 hover:text-white transition py-2 font-medium tracking-tight"
                aria-expanded={productsOpen}
              >
                <span>Products</span>
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    productsOpen ? 'rotate-180 text-teal' : 'text-gray-400'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Products Mega Dropdown Menu */}
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] rounded-2xl border border-white/[0.12] bg-[#0E0F14]/95 p-6 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] z-50 grid grid-cols-12 gap-6"
                  >
                    {/* Left: Product List */}
                    <div className="col-span-7 space-y-1.5 border-r border-white/[0.08] pr-4">
                      <div className="text-[10px] font-mono tracking-widest text-teal uppercase mb-3 px-2">
                        /Products Suite
                      </div>
                      {PRODUCTS_DATA.map((product) => {
                        const isHovered = activeProductId === product.id;
                        return (
                          <Link
                            key={product.id}
                            href={product.href}
                            onMouseEnter={() => setActiveProductId(product.id)}
                            className={`group flex items-start justify-between rounded-xl p-2.5 transition-colors ${
                              isHovered
                                ? 'bg-white/[0.06] text-white'
                                : 'text-gray-400 hover:text-gray-200'
                            }`}
                          >
                            <div className="space-y-0.5 pr-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-white group-hover:text-teal transition">
                                  {product.name}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-gray-300">
                                  {product.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 line-clamp-1 leading-snug">
                                {product.tagline}
                              </p>
                            </div>
                            <svg
                              className={`h-4 w-4 shrink-0 transition-transform ${
                                isHovered
                                  ? 'translate-x-1 text-teal'
                                  : 'text-gray-600 opacity-0 group-hover:opacity-100'
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right: Visual Preview */}
                    <div className="col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-3">
                          /Preview Architecture
                        </div>
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.1] bg-black/60 shadow-inner">
                          <Image
                            src={activeProduct.image}
                            alt={activeProduct.name}
                            fill
                            sizes="280px"
                            className="object-cover transition-opacity duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 text-[11px] font-mono text-teal truncate">
                            {activeProduct.contract}
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-gray-300 leading-relaxed">
                          {activeProduct.tagline}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/[0.08]">
                        <Link
                          href="#products"
                          onClick={() => setProductsOpen(false)}
                          className="flex items-center gap-1.5 text-xs font-mono text-teal hover:underline tracking-tight"
                        >
                          <span>Explore all 6 architectures</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="#services"
              className="text-gray-300 hover:text-white transition font-medium tracking-tight"
            >
              Services
            </Link>

            <Link
              href="#builds"
              className="text-gray-300 hover:text-white transition font-medium tracking-tight"
            >
              Selected Builds
            </Link>

            <Link
              href="/case-studies/metacade"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition font-medium tracking-tight group"
            >
              <span>Metacade</span>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-teal/10 border border-teal/20 text-[10px] font-mono text-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                Case Study
              </span>
            </Link>

            <Link
              href="/lab"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition font-medium tracking-tight group"
            >
              <span>Lab</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-gray-400 group-hover:text-teal transition">
                [Simulated]
              </span>
            </Link>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <MagneticButton
              onClick={onOpenIntake}
              className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-void transition hover:bg-teal hover:shadow-[0_0_24px_rgba(0,245,212,0.4)] tracking-wide"
            >
              Start your project
            </MagneticButton>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex sm:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Fullscreen Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-white/[0.08] bg-obsidian px-6 py-6 sm:hidden space-y-4"
            >
              <nav className="flex flex-col space-y-3 font-mono text-sm">
                <Link
                  href="#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-teal transition py-1"
                >
                  /Products
                </Link>
                <Link
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-teal transition py-1"
                >
                  /Services
                </Link>
                <Link
                  href="#builds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-teal transition py-1"
                >
                  /Selected Builds
                </Link>
                <Link
                  href="/case-studies/metacade"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-teal hover:underline transition py-1 flex items-center justify-between"
                >
                  <span>/Metacade Case Study</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal/20 text-teal">Featured</span>
                </Link>
                <Link
                  href="/lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-teal transition py-1 flex items-center justify-between"
                >
                  <span>/Telemetry Lab</span>
                  <span className="text-[10px] text-gray-400">[Simulated]</span>
                </Link>
              </nav>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenIntake();
                  }}
                  className="w-full rounded-full bg-teal py-3 text-center text-xs font-bold text-void transition hover:bg-teal/90"
                >
                  Start your project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
