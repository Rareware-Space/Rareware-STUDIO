# Rareware Chain Monorepo (`rareware-chain`)

Production-grade blockchain products, AI game characters (`RareChars`), non-custodial crypto checkout (`RarePay`), open-source contract kits (`RareMint`, `RareToken`), and cinematic Web3 applications built by **Rareware Studio** for **BSC (`56`/`97`)** and **opBNB (`204`/`5611`)**.

## Repository Structure

```text
rareware-chain/
├─ CLAUDE.md / ARGON.md              # Root AI constitution & hard security rules
├─ docs/
│  ├─ rareware-upgrade.md            # Master specification
│  ├─ design/                        # Contract architecture & threat models
│  ├─ security/                      # Static analysis triage & security-auditor reports
│  ├─ deployments/                   # Verified testnet/mainnet deployment registries
│  └─ runbooks/                      # Human-only mainnet Safe/timelock runbooks
├─ .claude/
│  ├─ settings.json                  # Tool permissions & hook bindings
│  ├─ hooks/{guard-bash.sh,format.sh}# Zero-key, zero-broadcast safety enforcement
│  ├─ agents/*.md                    # 9 specialized subagent personas
│  ├─ commands/*.md                  # 5 slash commands (/new-contract, /audit, /testnet-deploy, /gas, /ship)
│  └─ skills/*/SKILL.md              # solidity-security & bsc-gotchas checklists
├─ .mcp.json                         # Model Context Protocol server registry
├─ packages/
│  ├─ contracts/                     # Foundry project (Solidity 0.8.28, OpenZeppelin v5)
│  ├─ sdk/                           # TypeScript SDK (viem v2 wrappers, RareChars client)
│  ├─ ui/                            # Shared React components + GSAP/Framer motion
│  └─ mcp-chain-readonly/            # Read-only BSC/opBNB MCP server (viem v2)
├─ apps/
│  ├─ web/                           # Next.js App Router: marketing + dApps + mint site
│  ├─ api/                           # Hono API: RareChars & RarePay backend
│  └─ indexer/                       # Ponder on-chain event indexer
└─ .github/workflows/ci.yml          # Automated Foundry, Slither, TypeScript, and AI PR review
```

## Quick Start (Local Setup)

```bash
# 1. Install JS dependencies across all workspaces
pnpm install

# 2. Initialize Foundry libraries in packages/contracts
cd packages/contracts
forge install foundry-rs/forge-std --no-commit
forge install OpenZeppelin/openzeppelin-contracts@v5.2.0 --no-commit
forge test -vvv
cd ../..

# 3. Copy environment template (never commit real secrets)
cp .env.example .env

# 4. Run full monorepo check
pnpm check
```
