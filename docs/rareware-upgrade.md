# Rareware Studio: Blockchain Upgrade + Claude Code Stack

Version 1.0 | Oct 2026 | Owner: Ahmed Riyaz (ARZ)
Scope: turn Rareware Studio into a blockchain-development studio with reusable products, and run all delivery on a Claude Code pipeline.

How to use this file
- Human: read sections 1-3, 7-9.
- Claude Code: section 5 is the build spec. Save this file as `docs/rareware-upgrade.md` in a new repo, then run the bootstrap prompt in section 10.
- Prices, timelines, and chain facts marked (verify) are assumptions. Check them before quoting a client or deploying.

---

## 1. Positioning

One line: **Rareware Studio ships production-grade blockchain products, AI game characters, and cinematic web3 apps, built fast with an AI-assisted, security-first pipeline.**

Four pillars
1. Chain-first: BSC and opBNB first, then any EVM chain.
2. AI-native: AI agents and game characters that can act on-chain.
3. Cinematic frontends: existing strength (Next.js, GSAP, Framer Motion, Three.js) applied to web3. Most contract shops ship ugly UIs. This is the differentiator.
4. Security-first: tests, static analysis, human review, and testnet-only agent access.

Keep existing services (web dev, AI automation, motion design, Shopify, Meta Ads) as the "around the chain" bundle: landing page, marketing, community tooling.

ReadyPI stays a separate product (AI API gateway). Optional link: ReadyPI can serve as the LLM backend for RareChars (section 2.2).

Capacity assumption: about 15-20 focused hours per week alongside a day job. Scope is built around that. Claude Code is the multiplier. Do not sell more than 2 parallel client projects.

---

## 2. Product lines

### 2.1 Services (sold per project)

| Service | Deliverable | Typical time | Indicative price USD (verify) |
|---|---|---|---|
| Token launch kit | ERC-20, vesting, staking, tests, deploy scripts, verified contracts | 1-2 wks | 2,000-6,000 |
| NFT collection + mint site | ERC-721/1155, allowlist, reveal, cinematic mint site | 1-3 wks | 1,500-5,000 |
| dApp / marketplace | Contracts, indexer, Next.js frontend | 4-8 wks | 8,000-25,000 |
| AI x chain integration | AI agent or character with on-chain actions | 3-6 wks | 5,000-15,000 |
| Web3 game backend | Item/NFT contracts, AI NPC API, game-state callbacks | 4-10 wks | 8,000-30,000 |
| Pre-audit hardening | Static analysis, fuzz/invariant tests, fix list (not a formal audit) | 1 wk | 1,000-3,000 |
| Retainer | Monitoring, upgrades, support | monthly | 500-1,500 / mo |

Rule: never call a pre-audit review an "audit". Recommend an external audit for any contract holding real user funds.

### 2.2 Productized kits (build once, sell many times)

| Kit | What it is | Revenue model |
|---|---|---|
| RareMint | NFT collection + mint site template (open source core) | Free core, paid custom setup + premium animations |
| RareToken | Token + vesting + staking + admin multisig scripts (open source core) | Free core, paid launch support |
| RareChars | AI Game Character API: persistent NPCs, memory, on-chain actions | Usage-based API + setup fee |
| RarePay | Crypto checkout + subscriptions on BSC (USDT/USDC/BNB), webhooks | Setup fee + % or monthly SaaS |
| RareAgent | AI agent with guarded wallet (session keys, spend limits) | Setup fee + retainer |
| RareDash | On-chain analytics dashboard for a project's contracts | Monthly SaaS |

Open-sourcing RareMint and RareToken is deliberate: BNB Chain's builder grant favors free and open-source developer tooling, and open repos build trust and inbound leads.

#### RareChars (flagship, spec)

Purpose: infrastructure for blockchain games to add persistent AI characters.

API (REST, OpenAI-compatible chat shape where possible)
- `POST /v1/characters` create (persona, backstory, lore, rules, model)
- `POST /v1/characters/{id}/chat` chat with memory
- `GET|PUT /v1/characters/{id}/memory` inspect and edit memory
- `POST /v1/characters/{id}/actions` model picks a function; API returns a signed intent
- `POST /v1/webhooks/game-events` game state in, so characters react
- `POST /v1/characters/{id}/bind` bind to NFT (ERC-721 token id, optional ERC-6551 account)

Architecture
- Next.js route handlers or Hono API, Supabase Postgres + pgvector for memory.
- Models via Claude API, with ReadyPI/OpenRouter as cheap fallback for bulk chat.
- Chain layer: viem for reads, relayer service for approved actions, game contract validates every intent. The model never holds keys.
- Safety: content filter, per-character rate limit, action allowlist per game, daily spend cap.
- SDKs: TypeScript first, Unity second.

Competitors (verify): Catton AI (AI NPCs on BNB Chain/Solana), Phantom Player (hackathon-stage framework). Edge: sold as neutral infrastructure with SDKs.

#### RarePay (spec)
- Invoice created via API, unique deposit address or payment contract per invoice.
- Listener (Ponder or viem watcher) confirms after N blocks. Webhook signed with HMAC.
- States: `created -> pending -> confirmed -> expired | refunded`.
- BSC gotcha: USDT and USDC on BSC use 18 decimals. Never hard-code 6 (verify per token).
- Fallback rail: existing NOWPayments integration.

#### RareAgent (spec)
- Smart account (ERC-4337) with session keys, allowlisted contracts, per-day spend limit, human approval above a threshold.
- Read tools exposed through an MCP server. Write tools disabled by default.

---

## 3. Go-to-market

Targets
1. Web3 startups and GameFi studios (BNB, South Asia, Dubai/Middle East).
2. Agencies and brands wanting NFT/loyalty/token features.
3. Solo founders needing an MVP fast.

Channels (in order)
1. BNB ecosystem: dev-tools-list entry for RareChars once it has a live demo (category AI Toolings, chains `bsc,opbnb`, tags `Game,AI`), DappBay listing, MVB application, BNB AI Hack (verify it is still open).
2. GitHub: open-source RareMint and RareToken with polished READMEs and demo sites.
3. X and LinkedIn: build-in-public posts (contract + animation clips). Motion clips are your edge.
4. Freelance platforms: package services as fixed-price gigs.
5. Direct outreach: 20 targeted messages per week to projects with ugly sites or missing contracts.

Proof assets to build first
- 1 demo game with AI NPCs (small, 1 scene, 2 characters).
- 2 open-source kits.
- 2 case studies (even self-made).

Legal and compliance (get a lawyer, not legal advice)
- Bangladesh has historically restricted crypto activity. Check what is allowed before accepting crypto from local users or operating a payments product from Bangladesh.
- Contracts: client owns keys and funds, you never custody, no financial advice, no guaranteed returns, security-limitation clause, IP assignment on payment.
- Terms and privacy policy per product. Mind data rules when storing AI chat memory.

---

## 4. Tech stack

| Layer | Default | Notes |
|---|---|---|
| Contracts | Solidity 0.8.x (pin exact), Foundry | Hardhat only if a client requires it |
| Libraries | OpenZeppelin Contracts (+ Upgradeable only when needed), Solady for gas-critical paths | Pin versions |
| Testing | forge unit, fuzz, invariant, fork tests | 90%+ line coverage target on core contracts |
| Static analysis | Slither, Aderyn | Optional: Echidna or Medusa for invariants |
| Frontend | Next.js (App Router), TypeScript, Tailwind, wagmi v2, viem v2, Reown AppKit | GSAP, Framer Motion, Three.js for motion |
| Embedded wallets | Privy or Dynamic (client decides) | |
| Account abstraction | ERC-4337 via Pimlico or ZeroDev | RareAgent, gasless flows |
| Indexing | Ponder (default), The Graph when client wants it | |
| Backend | Next.js route handlers or Hono, Node.js | |
| Database | Supabase Postgres + pgvector | Row-level security on |
| Hosting | Vercel (web/API), Supabase, Cloudflare (DNS/WAF) | |
| RPC | Public RPC in dev, paid provider in prod (NodeReal, Ankr, or QuickNode) | Never rely on public RPC in prod |
| Monitoring | Tenderly alerts + simulation, Sentry, uptime checks | |
| Storage | IPFS via Pinata, Greenfield for BNB-native storage | |
| Oracles | Chainlink or Pyth where available on the chain (verify) | |
| Multisig | Safe | Admin roles behind Safe + timelock |
| AI | Claude API (primary), OpenRouter fallback, ReadyPI optional | |
| Package manager | pnpm workspaces | |
| CI | GitHub Actions | |

---

## 5. Claude Code stack

### 5.1 Install and auth

```bash
# Claude Code
npm install -g @anthropic-ai/claude-code      # or use the native installer from the docs
claude --version

# Foundry
curl -L https://foundry.paradigm.xyz | bash && foundryup

# Security tooling
pipx install slither-analyzer
cargo install aderyn            # or: npm i -g @cyfrin/aderyn

# JS tooling
corepack enable && corepack prepare pnpm@latest --activate
brew install jq                 # hooks use jq
```

Run `claude` in the repo root and sign in. Use `/model` to switch models per task (heavy: architecture and audit; light: boilerplate).

### 5.2 Repo layout (monorepo)

```
rareware-chain/
├─ CLAUDE.md
├─ docs/rareware-upgrade.md
├─ .claude/
│  ├─ settings.json
│  ├─ hooks/{guard-bash.sh,format.sh}
│  ├─ agents/*.md
│  ├─ commands/*.md
│  └─ skills/*/SKILL.md
├─ .mcp.json
├─ packages/
│  ├─ contracts/        # Foundry project
│  ├─ sdk/              # TS SDK (viem wrappers, RareChars client)
│  └─ ui/               # shared React components + motion
├─ apps/
│  ├─ web/              # Next.js: marketing + dApps
│  ├─ api/              # RareChars / RarePay API
│  └─ indexer/          # Ponder
└─ .github/workflows/
```

### 5.3 `CLAUDE.md` (root)

```markdown
# Rareware Chain Monorepo

## Mission
Build secure, production-grade blockchain products for BSC/opBNB (EVM). Security over speed.

## Stack
Foundry (Solidity 0.8.x), OpenZeppelin, Next.js + TypeScript, wagmi/viem, Ponder, Supabase, pnpm.

## Commands
- Contracts: `cd packages/contracts && forge build | forge test -vvv | forge coverage | forge fmt | slither . | aderyn .`
- Web: `pnpm --filter web dev | build | lint | typecheck`
- API: `pnpm --filter api dev | test`
- Indexer: `pnpm --filter indexer dev`
- All checks: `pnpm check` (lint + typecheck + forge test)

## Hard rules (never break)
1. NEVER read, print, or commit `.env*`, private keys, mnemonics, or keystores.
2. NEVER broadcast a transaction or deploy to mainnet. Testnet deploys only via `/testnet-deploy`, and only after tests pass. Mainnet is done by the human with a hardware wallet / Safe.
3. NEVER use `tx.origin` for auth, unchecked low-level calls, or `selfdestruct`.
4. Every external/public state-changing function needs: access control decision, reentrancy decision, events, NatSpec, tests (happy, revert, fuzz).
5. Write the failing test first for any bug fix.
6. No new dependency without stating why, version, and license.
7. Do not trust token decimals: read `decimals()`. BSC USDT/USDC are 18 decimals (verify per token).
8. Pin pragma and dependency versions. No floating `^` in contracts that ship.
9. Admin/owner roles go to a Safe multisig + timelock before mainnet.

## Conventions
- Solidity: custom errors, `immutable`/`constant` where possible, checks-effects-interactions, named imports, `forge fmt`.
- Tests mirror contract names: `Token.t.sol`; fuzz tests prefixed `testFuzz_`; invariants in `test/invariant/`.
- TypeScript: strict mode, no `any`, zod for external input, viem not ethers.
- Commits: conventional commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`).
- Docs: every package has a README with run/test/deploy steps.

## Workflow
Plan (plan mode) -> failing tests -> implement -> `/audit` -> fix -> `/testnet-deploy` -> human review -> mainnet by human.

## Chain reference
BSC mainnet 56, BSC testnet 97, opBNB mainnet 204, opBNB testnet 5611 (verify). RPC URLs come from env vars, never hard-coded.

## Definition of done
Tests pass, coverage target met, slither/aderyn clean or triaged in `docs/security/triage.md`, docs updated, no secrets in diff.
```

### 5.4 `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Read(**)",
      "Bash(forge build:*)",
      "Bash(forge test:*)",
      "Bash(forge fmt:*)",
      "Bash(forge coverage:*)",
      "Bash(forge snapshot:*)",
      "Bash(forge inspect:*)",
      "Bash(forge script:*)",
      "Bash(anvil:*)",
      "Bash(slither:*)",
      "Bash(aderyn:*)",
      "Bash(pnpm:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./**/*.pem)",
      "Read(./**/keystore/**)",
      "Read(~/.ssh/**)",
      "Bash(cast send:*)",
      "Bash(cast publish:*)",
      "Bash(forge create:*)",
      "Bash(git push --force:*)",
      "Bash(rm -rf:*)",
      "Bash(curl:*)",
      "Bash(wget:*)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/guard-bash.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/format.sh" }
        ]
      }
    ]
  }
}
```

Deny rules beat allow rules. `forge script` is allowed for simulation only; the hook below blocks `--broadcast`.

### 5.5 Hooks

`.claude/hooks/guard-bash.sh` (blocks dangerous commands; exit code 2 blocks the call and sends the message back to Claude)

```bash
#!/usr/bin/env bash
cmd=$(jq -r '.tool_input.command // ""')

block() { echo "BLOCKED by guard-bash: $1" >&2; exit 2; }

echo "$cmd" | grep -Eq -- '--broadcast|--private-key|--mnemonic|--keystore|--ledger|--trezor' \
  && block "on-chain broadcasting and key flags are human-only"
echo "$cmd" | grep -Eqi 'bsc[_-]?mainnet|opbnb[_-]?mainnet|chain[-= ]?(56|204)\b' \
  && block "mainnet targets are human-only"
echo "$cmd" | grep -Eq 'cat .*\.env|printenv|env \||echo \$.*(KEY|SECRET|MNEMONIC)' \
  && block "do not expose secrets"
echo "$cmd" | grep -Eq 'git push .*(main|master)' \
  && block "push to a branch and open a PR instead"
exit 0
```

`.claude/hooks/format.sh` (auto-format after edits)

```bash
#!/usr/bin/env bash
f=$(jq -r '.tool_input.file_path // ""')
case "$f" in
  *.sol) (cd "$CLAUDE_PROJECT_DIR/packages/contracts" && forge fmt "$f") >/dev/null 2>&1 ;;
  *.ts|*.tsx|*.js|*.json|*.md) pnpm exec prettier --write "$f" >/dev/null 2>&1 ;;
esac
exit 0
```

```bash
chmod +x .claude/hooks/*.sh
```

### 5.6 Subagents (`.claude/agents/`)

`contract-architect.md`
```markdown
---
name: contract-architect
description: Designs contract architecture, storage layout, roles, upgrade strategy, and threat model before any Solidity is written. Use for new products and major changes.
tools: Read, Grep, Glob, Write
model: opus
---
You are a senior smart contract architect for EVM chains (BSC/opBNB first).
Produce: scope, actors, trust assumptions, contract list with responsibilities, storage/events/errors design, access-control matrix, upgrade strategy (prefer immutable; use proxies only with written justification), external dependencies, threat model (reentrancy, oracle, MEV, ERC-20 weirdness, griefing, admin risk), and a test plan. Write the result to docs/design/<name>.md. Do not write implementation code.
```

`solidity-engineer.md`
```markdown
---
name: solidity-engineer
description: Implements and refactors Solidity contracts from an approved design, test-first, following repo conventions.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---
Implement exactly what the design doc says. Workflow: read docs/design/<name>.md, write failing tests, implement, run `forge fmt && forge test -vvv`. Use OpenZeppelin, custom errors, events for every state change, NatSpec on public APIs. Never deploy or broadcast. If the design is ambiguous or unsafe, stop and ask.
```

`test-writer.md`
```markdown
---
name: test-writer
description: Writes unit, fuzz, invariant, and fork tests for contracts and raises coverage.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---
For each contract: happy path, every revert path, access control, events, edge values, fuzz tests (testFuzz_), and invariants (supply conservation, no insolvency, role safety). Use fork tests only against testnet or pinned mainnet block via env RPC. Report coverage with `forge coverage` and list untested branches.
```

`security-auditor.md`
```markdown
---
name: security-auditor
description: Read-only security review of contracts and backend. Runs slither/aderyn, hunts logic bugs, produces a severity-ranked report. Use before every testnet deploy and PR merge.
tools: Read, Grep, Glob, Bash
model: opus
---
You are an adversarial reviewer. You do not edit code. Steps: run `slither .` and `aderyn .`; manually review access control, reentrancy (incl. cross-function/read-only), integer/rounding, oracle/price manipulation, signature replay (EIP-712 domain, nonces), ERC-20 non-standard behavior (fee-on-transfer, rebasing, decimals), initializer/upgrade bugs, DoS/griefing, front-running, centralization risk. Output docs/security/audit-<date>.md with: summary, findings (Critical/High/Medium/Low/Info) each with location, impact, exploit sketch, fix, and a verdict. Be specific, no generic advice. State what you could NOT check.
```

`web3-frontend.md`
```markdown
---
name: web3-frontend
description: Builds Next.js + wagmi/viem interfaces with cinematic motion (GSAP/Framer/Three.js). Use for dApp UI, mint sites, dashboards.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---
Use wagmi v2 + viem v2 + Reown AppKit. Always: handle wrong network, pending/failed/success tx states, simulate before write, show gas and token amounts with correct decimals, never trust client-side values for pricing. Motion must respect prefers-reduced-motion and keep LCP/INP healthy. Generated ABIs come from `forge` output via the sdk package.
```

`deploy-manager.md`
```markdown
---
name: deploy-manager
description: Prepares and verifies TESTNET deployments and writes the mainnet runbook for the human. Never touches mainnet.
tools: Read, Write, Grep, Glob, Bash
model: sonnet
---
Prepare deploy scripts and a checklist. Simulate with `forge script` (no --broadcast; the guard hook blocks it). The human runs testnet broadcasts. After deploy, update docs/deployments/<chain>.md with addresses and verification links. For mainnet, produce docs/runbooks/mainnet-<name>.md (constructor args, expected addresses, role handover to Safe, timelock, pause plan, rollback plan, monitoring alerts) and stop.
```

Optional extras: `gas-optimizer` (sonnet), `docs-writer` (haiku), `ai-character-engineer` (sonnet, for RareChars prompts, memory, and eval sets).

### 5.7 Slash commands (`.claude/commands/`)

`new-contract.md`
```markdown
---
description: Design, test, and implement a new contract end to end
argument-hint: <ContractName> <one-line purpose>
---
1. Use the contract-architect agent to write docs/design/$ARGUMENTS.md. Stop and show me the design for approval.
2. After approval, use test-writer to create failing tests.
3. Use solidity-engineer to implement until tests pass.
4. Run `forge fmt`, `forge test -vvv`, `forge coverage`.
5. Summarize what was built, coverage, and open risks.
```

`audit.md`
```markdown
---
description: Run the full security review on current changes
allowed-tools: Bash, Read, Grep, Glob
---
Use the security-auditor agent on: !`git diff --name-only main...HEAD`
Also run the full test suite and report coverage. Output the report path and a go/no-go verdict.
```

`testnet-deploy.md`
```markdown
---
description: Prepare a testnet deployment (simulation only; human broadcasts)
argument-hint: <chain: bsc_testnet|opbnb_testnet> <script>
---
Confirm `forge test` passes and /audit has no open Critical/High. Use deploy-manager to simulate $ARGUMENTS and print the exact broadcast command for me to run. Do not broadcast.
```

`gas.md`
```markdown
---
description: Gas report and optimization suggestions
---
Run `forge test --gas-report` and `forge snapshot`. Suggest optimizations ranked by savings. Do not apply changes that reduce safety or readability without asking.
```

`ship.md`
```markdown
---
description: Final checks and PR description
---
Run `pnpm check`, `forge test`, `slither .`. Verify no secrets in `git diff`. Write a PR description: what, why, risks, test evidence, deploy notes. Commit on the current branch (never main).
```

### 5.8 Skills (`.claude/skills/`)

`solidity-security/SKILL.md`
```markdown
---
name: solidity-security
description: Checklist for reviewing or writing Solidity. Use when creating, modifying, or reviewing any smart contract.
---
Check every item and cite the line: access control on each external function; reentrancy guard or CEI; return values of external calls; SafeERC20 for tokens; fee-on-transfer/rebasing tokens; decimals; rounding direction (favor protocol); oracle staleness and manipulation; signature replay (EIP-712, nonce, deadline, chainId); initializer protection; storage collisions on upgrades; unbounded loops; timestamp reliance; events on every state change; pausability and emergency exits; admin power limits (timelock + multisig); front-running and sandwiching exposure.
```

`bsc-gotchas/SKILL.md`
```markdown
---
name: bsc-gotchas
description: BSC and opBNB specifics. Use when writing deploy scripts, token logic, or chain config.
---
- Token decimals: BSC USDT/USDC are 18 decimals (verify). Always read decimals().
- EVM version: set evm_version to what the target chain supports; verify PUSH0/transient storage support before raising it.
- Block times are short; do not hard-code block-based timings from Ethereum assumptions.
- opBNB is an L2: check bridge/finality assumptions before relying on L1 messages.
- Use chain-specific verification (BscScan/opBNBScan) and keep API keys in env.
- Public RPCs are rate-limited; use a provider in production.
```

### 5.9 MCP servers (`.mcp.json` or `claude mcp add`)

```bash
# Docs (up-to-date library docs: OpenZeppelin, viem, wagmi, Next.js)
claude mcp add --transport http context7 https://mcp.context7.com/mcp

# GitHub (PRs, issues, reviews)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer ${GITHUB_PAT}"

# Supabase (read-only by default)
claude mcp add --transport http supabase "https://mcp.supabase.com/mcp?read_only=true"

# Vercel (deploy status, logs)
claude mcp add --transport http vercel https://mcp.vercel.com

# Playwright (e2e and UI checks)
claude mcp add playwright -- npx @playwright/mcp@latest

# Optional: project mgmt
claude mcp add --transport http linear https://mcp.linear.app/mcp
```

Build one custom MCP server: `rareware-chain-readonly`
- Tools (read-only only): `get_balance`, `read_contract(address, abi, fn, args)`, `get_logs`, `get_tx`, `simulate_call`, `decode_calldata`.
- Chains: BSC/opBNB mainnet and testnet via env RPC URLs. No signing, no sending, no key access.
- Why: lets Claude inspect live state and debug deployments without any write path.

Security rules for MCP: least privilege tokens, read-only first, review every new server before enabling, never give an MCP server a funded private key.

### 5.10 Daily workflow

1. `git worktree add ../feature-x -b feat/x` (one worktree per task, parallel Claude sessions allowed).
2. Start in plan mode (Shift+Tab). Describe the feature; approve the plan.
3. `/new-contract` or the matching agent. Tests first.
4. `/audit` before every PR. Fix all Critical/High.
5. `/testnet-deploy` then you broadcast on testnet.
6. `/ship`, open PR, CI runs, Claude PR review runs, you review.
7. Mainnet: human only, hardware wallet or Safe, using the runbook from deploy-manager.

Habits that save money and mistakes: keep CLAUDE.md short, use `/clear` between tasks, use `/compact` in long sessions, point Claude at specific files, ask for a plan before large edits.

### 5.11 CI (`.github/workflows/ci.yml`)

```yaml
name: ci
on: [pull_request]
jobs:
  contracts:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: packages/contracts } }
    steps:
      - uses: actions/checkout@v4
        with: { submodules: recursive }
      - uses: foundry-rs/foundry-toolchain@v1
      - run: forge fmt --check
      - run: forge build --sizes
      - run: forge test -vvv
      - run: forge coverage --report summary
  slither:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { submodules: recursive }
      - uses: crytic/slither-action@v0.4.0
        with: { target: packages/contracts }
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm typecheck && pnpm test
  claude-review:
    runs-on: ubuntu-latest
    permissions: { contents: read, pull-requests: write }
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Review this PR as the security-auditor agent would. Focus on contracts and key handling."
```

Pin action versions to commit SHAs before using on client repos. Add repo secrets in GitHub, never in files.

### 5.12 Model routing and cost

| Task | Model tier |
|---|---|
| Architecture, threat model, audit | Strongest available (Opus tier) |
| Implementation, tests, frontend | Sonnet tier |
| Docs, formatting, bulk edits | Haiku tier |
| Bulk low-risk chat or RareChars dev traffic | OpenRouter / ReadyPI fallback |

Your existing local OpenRouter proxy (qwen3-coder) is fine for throwaway boilerplate. Do not use cheap models for contract logic or review.

---

## 6. Delivery SOP (every client project)

1. Discovery call (30 min) and scope doc. Fixed price with milestones, 30-50% upfront.
2. Design doc via contract-architect. Client signs off.
3. Build in milestones with a staging site and testnet contracts.
4. Pre-audit hardening. External audit recommended if funds at risk.
5. Testnet soak (1 week minimum for token/finance products).
6. Mainnet runbook, human deploy, ownership to client Safe.
7. Handover: docs, ABIs, SDK, monitoring, 14-day bug-fix warranty.
8. Optional retainer.

Pre-mainnet checklist
- [ ] Tests pass, coverage target met
- [ ] Slither/Aderyn triaged
- [ ] Invariant tests exist for fund-holding contracts
- [ ] Admin roles on Safe + timelock
- [ ] Pause/emergency plan documented
- [ ] Contracts verified on explorer
- [ ] Monitoring alerts live (Tenderly)
- [ ] Constructor args and addresses double-checked by a second person
- [ ] Legal/terms in place

---

## 7. Roadmap (12 weeks)

| Weeks | Goal | Output |
|---|---|---|
| 1-2 | Foundation | Repo + Claude Code stack (section 5), Rareware site gets a Web3 section, brand for kits |
| 3-4 | RareMint | Open-source NFT kit + cinematic demo mint site, README, demo video |
| 5-6 | RareToken | Open-source token/vesting/staking kit, tests, Safe scripts |
| 5-8 | Outreach | 20 messages/week, 3 discovery calls/week target, first paid pre-audit or token gig |
| 7-9 | RarePay MVP | Invoice API, listener, webhooks, demo checkout on testnet |
| 9-12 | RareChars alpha | API + TS SDK + 1-scene demo game with 2 AI NPCs, docs |
| 12 | Ecosystem push | Submit dev-tools-list entry, DappBay, MVB application, BNB AI Hack if open |

90-day targets (assumptions): 2 repos public, 1 demo game, 3 paying clients, first recurring revenue.

---

## 8. Metrics

- Leads/week, calls booked, proposals sent, close rate.
- Revenue per project, recurring revenue, utilization hours.
- Product: GitHub stars/forks of kits, API signups, active characters, monthly API calls.
- Quality: post-launch critical bugs (target 0), coverage, time from design to testnet.

---

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Contract bug loses client funds | Test-first, fuzz/invariants, pre-audit, external audit recommendation, liability clause |
| Agent leaks key or broadcasts | Deny rules + guard hook + no keys in env for dev + testnet-only |
| Over-promising capacity | Max 2 parallel projects, milestone contracts |
| Crypto regulation (incl. Bangladesh) | Lawyer review, no custody, geo/terms controls |
| AI NPC cost and latency | Caching, small models for chat, big models only for planning |
| Crowded market | Niche on cinematic frontends + AI characters; open-source credibility |
| Prompt injection via game chat | Treat player text as untrusted, strict action allowlist, contract-side validation |
| Scope creep on kits | Fixed MVP per kit, backlog for later |

---

## 10. Bootstrap prompts (paste into Claude Code, in order)

Prompt 1: scaffold
```
Read docs/rareware-upgrade.md. Create the monorepo layout from section 5.2. Create CLAUDE.md, .claude/settings.json, .claude/hooks/*, all agents, commands, and skills exactly as written in section 5. Initialize packages/contracts with Foundry (forge init), pin solc 0.8.28 and evm_version shanghai in foundry.toml with a comment to verify chain support, install openzeppelin-contracts, and set up pnpm workspaces. Do not install anything global. Show me the file tree and wait.
```

Prompt 2: RareMint
```
Use contract-architect to design an ERC-721 collection with allowlist (merkle), public mint, per-wallet cap, reveal, royalties (ERC-2981), and withdraw to a Safe address. Save to docs/design/raremint.md and wait for my approval.
```

Prompt 3: RareToken
```
Design an ERC-20 with fixed supply, linear+cliff vesting contract, and a simple staking contract with reward rate. Include invariants. Write the design doc and wait for approval.
```

Prompt 4: RareChars skeleton
```
Create apps/api with Hono (or Next route handlers): /v1/characters, /v1/characters/:id/chat, memory storage in Supabase pgvector, zod validation, rate limiting, and an action-intent endpoint that returns EIP-712 signed intents verified by a game contract. Model calls go through a provider interface so Claude API and OpenRouter are swappable. Write tests. Do not call any chain write functions.
```

Prompt 5: read-only chain MCP
```
Build a small MCP server in packages/mcp-chain-readonly (TypeScript, viem) exposing only read tools: get_balance, read_contract, get_logs, get_tx, simulate_call, decode_calldata. RPC URLs from env. No signing, no send. Add it to .mcp.json.
```

---

## Appendix A: chain reference (verify before use)

| Chain | Chain ID | Notes |
|---|---|---|
| BSC mainnet | 56 | Explorer: BscScan |
| BSC testnet | 97 | Use faucet for test BNB |
| opBNB mainnet | 204 | L2, explorer: opBNBScan |
| opBNB testnet | 5611 | |
| Greenfield | see official docs | Storage chain, not standard EVM deploy target |

Use the official BNB Chain docs for current RPC endpoints and hardfork status. Keep RPCs in env.

## Appendix B: `.env.example`

```bash
# never commit real values
BSC_RPC_URL=
BSC_TESTNET_RPC_URL=
OPBNB_RPC_URL=
OPBNB_TESTNET_RPC_URL=
BSCSCAN_API_KEY=
OPBNBSCAN_API_KEY=
ANTHROPIC_API_KEY=
OPENROUTER_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
PINATA_JWT=
WEBHOOK_HMAC_SECRET=
RELAYER_ADDRESS=            # address only; the key lives in a secret manager, never here
```

## Appendix C: `foundry.toml` starter

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.28"
evm_version = "shanghai"   # raise only after confirming target chain support
optimizer = true
optimizer_runs = 200

[fuzz]
runs = 1000

[invariant]
runs = 256
depth = 64

[rpc_endpoints]
bsc_testnet = "${BSC_TESTNET_RPC_URL}"
opbnb_testnet = "${OPBNB_TESTNET_RPC_URL}"
```

## Appendix D: external dependencies to confirm before launch

- Current BNB Chain programs (grants, MVB, DappBay, AI hackathon): status and eligibility.
- Token decimals and addresses on target chains.
- Provider pricing and rate limits (RPC, Supabase, Vercel).
- Legal position for operating crypto products from Bangladesh.
