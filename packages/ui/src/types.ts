export type ProductId = 
  | 'studio'
  | 'raremint'
  | 'raretoken'
  | 'rarechars'
  | 'rarepay'
  | 'rareagent'
  | 'raredash';

export type CurrencyMode = 'USD' | 'CRYPTO';

export interface ProductConfig {
  id: ProductId;
  name: string;
  route: string;
  tagline: string;
  badge: string;
  accent: string;
  accentHex: string;
  accentGlow: string;
  secondaryHex: string;
  chain: string;
  description: string;
}

export const PRODUCTS_REGISTRY: Record<ProductId, ProductConfig> = {
  studio: {
    id: 'studio',
    name: 'Rareware Studio',
    route: '/',
    tagline: 'Where Cinematic Motion Meets Audited Web3 Infrastructure',
    badge: 'B2B STUDIO & LAB',
    accent: 'teal',
    accentHex: '#00F5D4',
    accentGlow: 'rgba(0, 245, 212, 0.25)',
    secondaryHex: '#FFFFFF',
    chain: 'BSC (56) • opBNB (204)',
    description: 'Bespoke blockchain engineering, AI characters, and cinema-grade frontends for funded Web3 startups.',
  },
  raremint: {
    id: 'raremint',
    name: 'RareMint',
    route: '/raremint',
    tagline: 'Zero-Gas-War NFT Launches with Cinema-Grade Reveal Choreography',
    badge: 'OPEN-SOURCE CORE',
    accent: 'teal',
    accentHex: '#00F5D4',
    accentGlow: 'rgba(0, 245, 212, 0.25)',
    secondaryHex: '#10B981',
    chain: 'BSC (56/97) • opBNB',
    description: 'ERC-721/1155 collection kit with Merkle allowlists, delayed reveal, and EIP-2981 royalties.',
  },
  raretoken: {
    id: 'raretoken',
    name: 'RareToken',
    route: '/raretoken',
    tagline: 'Post-Maxwell 450ms-Safe Token Launches, Vesting & Staking',
    badge: 'OPEN-SOURCE CORE',
    accent: 'amber',
    accentHex: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    secondaryHex: '#D97706',
    chain: 'BSC (56/97)',
    description: 'Fixed-supply ERC-20 with timestamp-invariant linear vesting, Synthetix-style staking, and Safe scripts.',
  },
  rarechars: {
    id: 'rarechars',
    name: 'RareChars',
    route: '/rarechars',
    tagline: 'Give Your Web3 Game Persistent AI NPCs That Remember & Act On-Chain',
    badge: 'FLAGSHIP API + SDK',
    accent: 'violet',
    accentHex: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.25)',
    secondaryHex: '#EC4899',
    chain: 'opBNB (204/5611)',
    description: 'Persistent NPC memory with pgvector RAG and zero-key EIP-712 signed on-chain game intents.',
  },
  rarepay: {
    id: 'rarepay',
    name: 'RarePay',
    route: '/rarepay',
    tagline: 'Non-Custodial BSC & opBNB Checkout with 18-Decimal Precision',
    badge: 'NON-CUSTODIAL SAAS',
    accent: 'blue',
    accentHex: '#3B82F6',
    accentGlow: 'rgba(59, 130, 246, 0.25)',
    secondaryHex: '#06B6D4',
    chain: 'BSC (56) • opBNB (204)',
    description: 'Self-hosted and SaaS crypto invoices routing directly to merchant Gnosis Safe with HMAC-SHA256 webhooks.',
  },
  rareagent: {
    id: 'rareagent',
    name: 'RareAgent',
    route: '/rareagent',
    tagline: 'Autonomous On-Chain AI Agents with Guarded ERC-4337 Session Keys',
    badge: 'ERC-4337 SMART ACCOUNT',
    accent: 'orange',
    accentHex: '#F97316',
    accentGlow: 'rgba(249, 115, 22, 0.25)',
    secondaryHex: '#EF4444',
    chain: 'BSC (56) • opBNB (204)',
    description: 'Autonomous agent wallets with pre-flight simulation, scoped contract allowlists, and daily spend caps.',
  },
  raredash: {
    id: 'raredash',
    name: 'RareDash',
    route: '/raredash',
    tagline: 'Real-Time Ponder Contract Telemetry, Whale Alerts & Holder Intelligence',
    badge: 'ANALYTICS SAAS',
    accent: 'lime',
    accentHex: '#22D3EE',
    accentGlow: 'rgba(34, 211, 238, 0.25)',
    secondaryHex: '#34D399',
    chain: 'BSC (56) • opBNB (204)',
    description: 'Sub-second Ponder-indexed contract telemetry, whale alert triggers, and real-time holder analytics.',
  },
};
