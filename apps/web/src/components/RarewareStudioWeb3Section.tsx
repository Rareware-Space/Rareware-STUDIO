// Ready-to-deploy Web3 Upgrade Section for https://www.rarewarestudio.space/
// Replaces generic HFT trading copy with Rareware Studio's 4 Pillars, B2B Services, and 6 Productized Kits.

export const RAREWARE_WEB3_UPGRADE_DATA = {
  headline: "PRODUCTION-GRADE BLOCKCHAIN PRODUCTS, AI GAME CHARACTERS & CINEMATIC WEB3 APPS",
  subheadline: "Built fast on BSC, opBNB & EVM with an AI-assisted, security-first pipeline.",
  pillars: [
    { id: "01", title: "CHAIN-FIRST", detail: "BSC & opBNB native optimization (450ms block-aware, 18-decimal safe), compatible across all EVM chains." },
    { id: "02", title: "AI-NATIVE", detail: "Persistent AI NPCs (RareChars) & guarded ERC-4337 agents (RareAgent) that execute verified on-chain intents." },
    { id: "03", title: "CINEMATIC FRONTENDS", detail: "Next.js, GSAP, Framer Motion & Three.js interfaces. Most contract shops ship ugly UIs—motion is our moat." },
    { id: "04", title: "SECURITY-FIRST", detail: "Test-first Foundry workflow, 1,000-run fuzzing, stateful invariants, Slither/Aderyn static analysis & Safe multisig handovers." }
  ],
  kits: [
    { name: "RareMint", tag: "Open-Source Core", summary: "ERC-721 collection + Merkle allowlist + delayed reveal + cinematic GSAP mint site." },
    { name: "RareToken", tag: "Open-Source Core", summary: "Fixed-supply ERC-20 + Cliff/Linear Vesting + Timestamp Staking + Safe scripts." },
    { name: "RareChars", tag: "Flagship API + SDK", summary: "Persistent AI Game Characters with pgvector memory & EIP-712 verified on-chain actions." },
    { name: "RarePay", tag: "Non-Custodial SaaS", summary: "BSC/opBNB crypto checkout (USDT/USDC/BNB) with 18-decimal safety & HMAC webhooks." },
    { name: "RareAgent", tag: "ERC-4337 Smart Account", summary: "Guarded AI agent wallets with session keys, contract allowlists & daily spend limits." },
    { name: "RareDash", tag: "Analytics SaaS", summary: "Real-time Ponder-indexed contract telemetry and holder analytics dashboard." }
  ]
} as const;
