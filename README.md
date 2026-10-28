# Rareware Studio Monorepo (`Rareware-STUDIO-Web`)

<div align="center">

![CI Status](https://img.shields.io/badge/CI-Passing-00F5D4?style=for-the-badge&logo=githubactions&logoColor=black)
![Foundry](https://img.shields.io/badge/Foundry-17%2F17%20Passed-10B981?style=for-the-badge&logo=solidity&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-0.8.28%20(Shanghai)-3B82F6?style=for-the-badge&logo=ethereum&logoColor=white)
![Chains](https://img.shields.io/badge/Chains-BSC%20(56)%20%7C%20opBNB%20(204)-F59E0B?style=for-the-badge&logo=binance&logoColor=black)
![Security](https://img.shields.io/badge/Security-Non--Custodial%20Safe-8B5CF6?style=for-the-badge&logo=gnosis&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14%20App%20Router-white?style=for-the-badge&logo=nextdotjs&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)

**Where Cinematic Motion Meets Audited Web3 Infrastructure**  
*Engineered by Ahmed Riyaz (ARZ) • Powered by ReadyPI*

[Explore Live Web App (http://localhost:3000)](http://localhost:3000) • [7-Page Standalone Preview](./preview-option4-7pages.html) • [Master Spec](./docs/rareware-upgrade.md)

</div>

---

## 🏛️ Executive Overview

**Rareware Studio** is a productized Web3 and AI infrastructure engineering monorepo built for high-throughput EVM ecosystems. Optimized specifically for **post-Maxwell 450ms BSC block times** (Chain ID 56) and **opBNB sub-second finality** (Chain ID 204), Rareware bridges the gap between mathematically hardened smart contracts and cinema-grade interactive user experiences.

### Key Architectural Pillars

1. **Chain-Native Precision**: Eliminates legacy EVM assumptions—all time logic utilizes strictly verified `block.timestamp` invariants (resilient against BSC 450ms block drift), and ERC-20 payment routing dynamically queries decimals to safely process 18-decimal BSC USDT and USDC.
2. **Zero-Key AI Safety**: Persistent AI game characters (`RareChars`) and autonomous agents (`RareAgent`) operate with strict cryptographic guardrails. AI models never touch private keys; actions are verified on-chain via typed **EIP-712** intent signatures.
3. **Hardware-Accelerated Cinematic Motion**: High-craft frontend architecture featuring responsive 60fps real-time protocol telemetry, particle constellation network physics, and 3D perspective tilt cards.
4. **Option 4 Typography System**: High-contrast cyber-monumental type hierarchy combining `Unbounded` (Monumental Display & Numerics), `DM Sans` (High-Legibility UI & Prose), and `Space Mono` (Telemetry & Code).
5. **Security-First Verification**: Every state-changing function ships with Foundry property-based fuzzing (1,000 runs) and stateful invariant verification (256 runs, 16,384 calls, 0 reverts) before testnet deployment. All contracts deploy with **Gnosis Safe** timelocked ownership.

---

## 📦 Monorepo Structure

```text
Rareware-STUDIO-Web/
├── packages/
│   ├── contracts/               # Foundry suite: Solidity 0.8.28 (Shanghai EVM), OpenZeppelin v5.2.0
│   │   ├── src/                 # RareMint, RareToken, RareCharsVerifier, RarePayRouter, RareStaking, RareVesting
│   │   └── test/                # Unit tests, 1,000-run fuzz tests, 256-run stateful invariants
│   ├── sdk/                     # TypeScript SDK (viem v2, EIP-712 typed intent builders, RarePay client)
│   ├── ui/                      # Universal UI package (Navbar with RarewareLogoEmblem, Footer, Badge, TiltCard)
│   └── mcp-chain-readonly/      # Model Context Protocol server for real-time chain telemetry
├── apps/
│   ├── web/                     # Next.js 14 App Router: 7 standalone routes + interactive sandboxes
│   ├── api/                     # Express/TS backend for ReadyPI LLM gateway & EIP-712 intent signing
│   └── indexer/                 # Ponder v0.7 sub-second blockchain event indexing daemon
├── docs/                        # Master specifications, threat models, runbooks, and audit triage
├── preview-option4-7pages.html  # Standalone all-in-one HTML presentation showcase
└── vercel.json                  # Production Vercel monorepo deployment & security configuration
```

---

## 🚀 The Product Suite (7 Core Routes)

| Route | Product | Description | Core Smart Contract |
| :--- | :--- | :--- | :--- |
| **`/`** | **Rareware Studio Hub** | Master studio portal, service matrix, B2B intake wizard (`/start`), 60fps telemetry terminal, and architecture sandbox. | Full Monorepo Integration |
| **`/raremint`** | **RareMint** | Zero-gas-war NFT launch kit with Merkle allowlists, delayed reveal choreography, and EIP-2981 Safe royalties. | `RareMint.sol` |
| **`/raretoken`** | **RareToken** | Post-Maxwell 450ms-safe fixed supply token, timestamp-based cliff/linear vesting, and Synthetix-style staking. | `RareToken.sol` + `RareVesting.sol` + `RareStaking.sol` |
| **`/rarechars`** | **RareChars** | Persistent Web3 game AI NPCs with pgvector memory and Zero-Key EIP-712 signed action intents on opBNB. | `RareCharsVerifier.sol` |
| **`/rarepay`** | **RarePay** | Non-custodial checkout router for BSC & opBNB with dynamic 18-decimal token validation (USDT/USDC). | `RarePayRouter.sol` |
| **`/rareagent`** | **RareAgent** | Autonomous AI agent smart accounts with scoped ERC-4337 session keys, contract allowlists, and spend caps. | `SessionKeyValidator.sol` |
| **`/raredash`** | **RareDash** | Real-time Ponder-indexed contract telemetry, whale alert webhooks, and live on-chain holder intelligence. | `Ponder v0.7 Indexer` |

---

## 🛠️ Prerequisites & Developer Setup

### 1. Requirements
- **Node.js**: `v22.0.0` or higher
- **pnpm**: `v9.15.0` or higher
- **Foundry**: `forge`, `cast`, and `anvil` installed (`curl -L https://foundry.paradigm.xyz | bash && foundryup`)

### 2. Quickstart Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rareware-Space/Rareware-STUDIO-Web.git rareware-studio
cd rareware-studio

# 2. Install workspace dependencies
pnpm install

# 3. Initialize Foundry libraries in packages/contracts
cd packages/contracts
forge install foundry-rs/forge-std --no-commit
forge install OpenZeppelin/openzeppelin-contracts@v5.2.0 --no-commit
cd ../..

# 4. Copy template environment configuration (secrets never committed)
cp .env.example .env
```

---

## 🧪 Comprehensive Verification (`pnpm check`)

Run the complete verification pipeline (Typecheck + Linting + Foundry Tests + Invariants) across all workspaces:

```bash
pnpm check
```

### Individual Build & Test Commands

```bash
# Compile shared UI package and TypeScript SDK
pnpm --filter @rareware/ui build
pnpm --filter @rareware/sdk build

# Build Next.js 14 production web app
pnpm --filter @rareware/web build

# Run TypeScript static analysis across all workspaces
pnpm --filter @rareware/ui typecheck
pnpm --filter @rareware/web typecheck
```

### Foundry Smart Contract Test Suite

```bash
# Run contracts test suite with high verbosity
pnpm contracts:test
```

- **Unit & Fuzz Tests (`15 Tests`)**:
  - `testFuzz_PublicMint_RespectsCapsAndPricing`: 1,000 property fuzz runs
  - `testFuzz_VestingNeverOverReleases`: 1,000 property fuzz runs
  - `test_PayTokenInvoice_18DecimalsSuccess`: Verifies BSC USDT 18-decimal normalization
  - `test_VerifyAndConsumeIntent_SuccessAndBlocksReplay`: Cryptographic EIP-712 replay protection
- **Stateful Invariant Tests (`2 Suites / 16,384 Calls`)**:
  - `RareMintInvariantTest`: 256 runs, 16,384 calls, 0 reverts (`invariant_ContractBalanceMatchesDeposits`, `invariant_TotalMintedNeverExceedsMaxSupply`)
  - `RareTokenInvariantTest`: 256 runs, 16,384 calls, 0 reverts (`invariant_StakingPrincipalAlwaysSolvent`, `invariant_VestingVaultAlwaysSolvent`)

---

## 💻 Running Locally

### 1. Web Application (Next.js 14 App Router)
```bash
# Development mode (http://localhost:3000)
pnpm --filter @rareware/web dev

# Production build & serve
pnpm --filter @rareware/web build
pnpm --filter @rareware/web start -p 3000
```

### 2. AI NPC & Payment Backend API (Express / ReadyPI Gateway)
```bash
pnpm --filter @rareware/api dev
```

### 3. Ponder Blockchain Event Indexer
```bash
pnpm --filter @rareware/indexer dev
```

---

## 🔒 Security & Zero-Secret Policy

Rareware Studio enforces strict non-negotiable security standards:

1. **Zero Secret Policy**:
   - No private keys, mnemonic seed phrases, secret credentials, or real `.env` files are ever committed or tracked in version control.
   - Only `.env.example` with empty template keys and public RPC endpoints is maintained in the repository.
   - Local `.env`, keystores, and credentials are strictly ignored via `.gitignore`.
2. **Zero Custody Architecture**:
   - Rareware Studio operates exclusively as a software development and technology consulting firm.
   - Contracts are non-custodial: contract ownership, token treasuries, and fee routing are handed over directly to client **Gnosis Safe multisigs** protected by timelocks.
3. **Dynamic Token Normalization**:
   - Token decimals are never assumed or hardcoded to 6; `RarePayRouter` dynamically queries `IERC20Metadata.decimals()` to safely handle BSC 18-decimal USDT/USDC.
4. **Pre-Audit & Pre-Flight Verification**:
   - Automated Slither and Aderyn static analysis pipelines.
   - 1,000-run property fuzzing and 16,384-call stateful invariant suites prior to testnet deployment.

---

## 🌐 Production Deployment (Vercel)

The monorepo includes a production-ready [`vercel.json`](./vercel.json) configuration:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "rootDirectory": "apps/web",
  "buildCommand": "pnpm --filter @rareware/ui build && pnpm --filter @rareware/sdk build && pnpm --filter @rareware/web build",
  "installCommand": "pnpm install",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

Deploy directly via Vercel CLI or by connecting the repository to Vercel:

```bash
vercel deploy --prod
```

---

## 📄 License & Attribution

- **Organization**: [Rareware-Space](https://github.com/Rareware-Space)
- **Author & Studio Lead**: Ahmed Riyaz (ARZ) • [contact@rarewarestudio.space](mailto:contact@rarewarestudio.space)
- **AI Infrastructure**: ReadyPI Multi-Model LLM Gateway
- **License**: MIT License
