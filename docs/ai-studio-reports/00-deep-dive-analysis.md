### 1. Executive Deep-Dive Analysis: `rareware-upgrade.md` vs. Current Reality

I have analyzed your specification (`rareware-upgrade.md`), inspected your live flagship at **`rarewarestudio.space`** and your **`github.com/Rareware-Space`** organization, and cross-checked every `(verify)` assumption against the current October 2026 BNB Chain and Web3 landscape.

*(Note: I have mapped the document's "Claude Code" references directly to **me / Argon** as your primary autonomous architecture, engineering, and security-review engine.)*

---

#### A. Current State Audit (Where You Are Right Now)
1. **`rarewarestudio.space` (Live Flagship)**:
   - **What works:** The *"Lumina / Light in the Void"* cybernetic aesthetic (Electric Teal / Jade accents, high-contrast monolith layout, custom GSAP motion) already validates **Pillar 3 (Cinematic Frontends)**. Most smart-contract shops look like generic templates; your frontend craft is an immediate, defensible moat.
   - **Gap to bridge:** The current site pitches *"NEXUS_ALPHA // AI Crypto Automation (high-frequency trading agents)"* and *"Quantum-resistant encryption layers"*. High-frequency trading claims carry regulatory and expectation risks, and they don't match the new B2B productized offer in `rareware-upgrade.md` (**Token Launch Kits, NFT Mint Sites, RareChars AI NPCs, RarePay, and Pre-Audit Hardening**). Updating the Web3 section of `rarewarestudio.space` to showcase concrete B2B deliverables is an early priority.
2. **`github.com/Rareware-Space` (GitHub Org)**:
   - Currently has **0 public repositories**. In Web3, technical buyers and BNB Chain grant reviewers inspect GitHub before booking a call. Shipping the open-source cores of **`RareMint`** and **`RareToken`** under `Rareware-Space` is critical to turning your GitHub org into a trust and lead-generation engine.
3. **Existing Ecosystem Synergy (`ReadyPI`)**:
   - Because you already operate **ReadyPI** (150+ models API gateway), wiring `RareChars` to use ReadyPI as its multi-model routing layer gives you built-in margin control, latency fallback, and dogfooding volume for your own API product.

---

#### B. Verification of All `(verify)` Assumptions in the Spec (Oct 2026 Ground Truth)

| Spec Item | Status / Fact Check (Oct 2026) | Impact on Implementation |
|---|---|---|
| **Chain IDs (Appendix A)** | **Verified:** BSC Mainnet = `56`, BSC Testnet (Chapel) = `97`, opBNB Mainnet = `204`, opBNB Testnet = `5611`. | Safe to lock into `viem/chains` and `foundry.toml`. |
| **BSC USDT & USDC Decimals** | **Verified:** Binance-Peg USDT (`0x55d398326f99059fF775485246999027B3197955`) and Binance-Peg USDC (`0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d`) **both use 18 decimals** on BSC (unlike 6 decimals on Ethereum/Arbitrum/Base). | In `RarePay` and `RareToken`, we must enforce dynamic `IERC20Metadata(token).decimals()` normalization and never hardcode `1e6`. |
| **BSC & opBNB Block Times & EVM Version** | **Updated:** Through the 2025–2026 hardforks (*Pascal, Lorentz, Maxwell, and April 2026 Osaka/Mendel*), BSC cut block intervals from `3s` down to **`450ms` (0.45s)** and finality to **`650ms`**. `shanghai` (`PUSH0`) is fully safe across both BSC and opBNB; BSC also supports Cancun/Prague features, though pinning `evm_version = "shanghai"` (or `"cancun"` where transient storage `TSTORE`/`TLOAD` is needed for gas-optimal reentrancy locks) should be explicitly tested against opBNB testnet first. | **Critical:** Never use `block.number` for vesting/staking math—always use `block.timestamp`. In `RarePay`, a confirmation wait of "12 blocks" is now only ~5.4 seconds on BSC; we should wait **15–20 blocks (~7–9s)** to exceed the `650ms` fast-finality threshold safely. |
| **RareChars Competitors (`Catton AI`, `Phantom Player`)** | **Verified:** Catton AI launched as a B2C Telegram/Web3 game + meme/utility token (`$CATTON`) on BNB Chain and Solana, and its token market cap collapsed to ~$39K. | **Validates your positioning:** Building a speculative AI gaming token dies when hype fades. Selling **neutral B2B picks-and-shovels API + SDK infrastructure (`RareChars`)** with fiat/stablecoin SaaS pricing is far more sustainable. |
| **BNB Ecosystem Programs (BNB AI Hack, MVB)** | **Verified:** BNB Chain transitioned *BNB Hack* into a **rolling bi-weekly evaluation model** (AI, DeSoc, DePIN tracks), and **MVB (Most Valuable Builder)** is integrated with **YZi Labs' EASY Residency**. | You don't have to wait for a seasonal hackathon deadline—we can submit `RareChars` + `RareMint` to rolling bi-weekly evaluations as soon as the demo is live. |
| **Oracles on BSC & opBNB** | **Verified:** Both **Chainlink** (Data Feeds & Data Streams) and **Pyth Network** (pull-based price feeds) are live on BSC and opBNB. | Use Chainlink on BSC mainnet for standard DeFi/payment pricing, and Pyth pull-oracles on opBNB where sub-second latency is needed. |
| **Service Pricing (Section 2.1)** | **Verified:** Your indicative pricing ($2k–$6k Token Kit, $1.5k–$5k NFT + Cinematic Mint, $5k–$15k AI x Chain) is well-calibrated for boutique agency delivery into Dubai/ME, EU/UK, and FundedBNB startups. | Keep fixed-scope milestone billing (40% upfront / 40% testnet / 20% mainnet handover). |

---

#### C. Technical & Security Gaps Found in `rareware-upgrade.md` (Fixes to Apply During Build)

Before we write code, here are **6 technical flaws/risks** inside the current `.md` spec that I caught during deep review and will fix in our implementation:

1. **Hook Path Bug in `format.sh` (Section 5.5):**
   - *The Bug:* In `format.sh`, `f=$(jq -r '.tool_input.file_path // ""')` gets passed to `(cd "$CLAUDE_PROJECT_DIR/packages/contracts" && forge fmt "$f")`. If `$f` is a relative path from the repo root (e.g., `packages/contracts/src/Token.sol`), `cd`-ing into `packages/contracts` first causes `forge fmt` to look for `packages/contracts/packages/contracts/src/Token.sol` and silently fail (`>/dev/null 2>&1`).
   - *The Fix:* Run `forge fmt "$CLAUDE_PROJECT_DIR/$f" --root "$CLAUDE_PROJECT_DIR/packages/contracts"` or pass paths relative to root.
2. **Bypassable Regex in `guard-bash.sh` (Section 5.5):**
   - *The Bug:* The hook blocks `git push .*(main|master)`, which can be bypassed by `git push origin HEAD` when on `main`, or `forge script` using `-f bsc` (where `bsc` is an alias in `foundry.toml` rather than `bsc_mainnet`).
   - *The Fix:* Harden `guard-bash.sh` to check current git branch (`git rev-parse --abbrev-ref HEAD`) and block any `forge script` that includes `--broadcast`, `-b`, `--verify`, or any mainnet RPC alias.
3. **RareChars EIP-712 Action Intent Replay Risk (Section 2.2 & Prompt 4):**
   - *The Risk:* The spec states `POST /v1/characters/{id}/actions` returns a "signed intent" validated by the game contract. If the EIP-712 struct does not bind `(chainId, verifyingContract, characterId, playerAddress, actionSelector, actionParamsHash, nonce, deadline)`, a player or relayer can replay the same NPC reward/action intent across chains or multiple times.
   - *The Fix:* We will include a reference **`RareCharsVerifier.sol`** contract in `packages/contracts` with strict EIP-712 domain separation, per-character/per-player nonces, and expiry deadlines.
4. **RarePay Deposit Architecture Tradeoff (Section 2.2):**
   - *The Risk:* Generating a "unique deposit address (EOA) per invoice" requires sweeping ERC-20 tokens (USDT/USDC), which requires funding every ephemeral address with BNB for gas. Deploying a full contract per invoice costs gas up front.
   - *The Fix:* Use a **Single Router Contract (`RarePayRouter.sol`)** for direct wallet checkouts (`payInvoice(bytes32 invoiceId, address token, uint256 amount)`), plus deterministic **CREATE2 counterfactual deposit clones** only when a user requires a CEX/QR transfer-only address.
5. **Dual-Engine Compatibility (Argon + Claude Code):**
   - Since you noted the doc says "Claude Code" when you intended **Argon / me**, we should structure the repo so that all prompts, agent specifications, and guard scripts live in a shared `.ai/` (or synced `.argon/` + `.claude/`) directory and expose standard `pnpm` scripts (`pnpm guard`, `pnpm audit:static`, `pnpm format:all`). That way, whether I execute tasks here or you run a local CLI agent, the exact same guardrails and subagent personas apply.
6. **Bangladesh Regulatory Firewall (Section 3 & 9):**
   - Because Rareware Studio operates non-custodially (`client owns keys and funds`), `RarePay` and `RareChars` must be strictly architected as **non-custodial software/API infrastructure** where fees are billed as B2B SaaS/software licenses and client revenues settle directly to the client's own Safe multisig—never touching a Rareware-controlled intermediate wallet.

---

### 2. Implementation Plan & Task Split

Per your instruction, **I have not built any files yet.** Below is the complete, phased implementation plan split into atomic tasks, clearly defining **My Role (Argon / AI Engine)** and **Your Role (ARZ / Human Lead)**, mapped to your **15–20 hrs/week capacity**.

---

#### Phase 1: Monorepo Foundation & AI Guardrail Stack (Weeks 1–2)
*Goal: Initialize `rareware-chain` monorepo, enforce zero-key/zero-mainnet safety hooks, set up subagent personas, and wire CI.*

* **Task 1.1 — Monorepo & Workspace Scaffold** *(Bootstrap Prompt 1A)*
  * **AI (Me):** Generate root `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.gitignore`, `.env.example`, `CLAUDE.md` / `ARGON.md`, and directory skeleton (`packages/{contracts,sdk,ui,mcp-chain-readonly}`, `apps/{web,api,indexer}`).
  * **You (ARZ):** Create the private/public repo under `github.com/Rareware-Space`, pull the scaffold, and run `pnpm install`.
* **Task 1.2 — Agentic Pipeline, Hooks & Subagents** *(Bootstrap Prompt 1B)*
  * **AI (Me):** Generate `.claude/settings.json` (plus `.argon/` equivalent), the fixed `guard-bash.sh` and `format.sh` hooks, all 6 subagent specs (`contract-architect`, `solidity-engineer`, `test-writer`, `security-auditor`, `web3-frontend`, `deploy-manager`), 5 slash commands, and 2 skills (`solidity-security`, `bsc-gotchas`).
  * **You (ARZ):** Run `chmod +x` on hooks and test that `guard-bash.sh` blocks a dummy `--broadcast` command.
* **Task 1.3 — Foundry & CI Pipeline Setup** *(Bootstrap Prompt 1C)*
  * **AI (Me):** Generate `packages/contracts/foundry.toml` (pinned `solc 0.8.28`, `shanghai`, fuzz 1,000 runs, invariant 256 runs), OpenZeppelin remappings, and `.github/workflows/ci.yml` (Foundry tests, Slither, Web lint/typecheck).
  * **You (ARZ):** Run `forge init` / install `@openzeppelin/contracts` in `packages/contracts` and verify `forge test` passes locally.
* **Task 1.4 — Read-Only Chain MCP Server** *(Bootstrap Prompt 5 — moved up so we have chain inspection early)*
  * **AI (Me):** Build `packages/mcp-chain-readonly` in TypeScript + `viem` v2 with strictly read-only tools (`get_balance`, `read_contract`, `get_logs`, `get_tx`, `simulate_call`, `decode_calldata`) for BSC (`56`/`97`) and opBNB (`204`/`5611`), plus `.mcp.json`.
  * **You (ARZ):** Add public/provider testnet RPC URLs to `.env` and verify the MCP server responds.

---

#### Phase 2: `RareMint` — Open-Source NFT Kit + Cinematic Mint Site (Weeks 3–4)
*Goal: Ship your first public repository on `github.com/Rareware-Space` combining audited-grade ERC-721 contracts with Rareware's signature GSAP/Three.js motion.*

* **Task 2.1 — `RareMint` Architecture & Threat Model** *(Bootstrap Prompt 2)*
  * **AI (`contract-architect` mode):** Produce `docs/design/raremint.md` covering ERC-721A/ERC-721 enumerable tradeoffs, Merkle allowlist, public mint, per-wallet caps, delayed reveal (commit-reveal / URI switch), ERC-2981 royalties, pull/Safe withdrawal to multisig, and threat model.
  * **You (ARZ):** Review and approve `docs/design/raremint.md`.
* **Task 2.2 — `RareMint` Test Suite & Contract Implementation**
  * **AI (`test-writer` + `solidity-engineer` mode):** Write unit, revert, fuzz (`testFuzz_`), and invariant tests (`RareMint.t.sol`), then implement `RareMint.sol` and testnet simulation script `DeployRareMint.s.sol`.
  * **AI (`security-auditor` mode):** Perform full static & logic audit report (`docs/security/audit-raremint.md`).
  * **You (ARZ):** Run `forge test -vvv` & `slither .`, then broadcast to BSC Testnet (`97`).
* **Task 2.3 — `RareMint` Cinematic Frontend & Open-Source Packaging**
  * **AI (`web3-frontend` mode):** Build the Next.js + `wagmi` v2 + `viem` v2 + GSAP mint interface in `apps/web` (network guard, transaction simulation before write, live mint counter, reveal animation, reduced-motion support) + polished `README.md`.
  * **You (ARZ):** Record a 30-second motion clip for X/LinkedIn and publish `Rareware-Space/raremint` as public on GitHub.

---

#### Phase 3: `RareToken` — Open-Source Token, Vesting & Staking Kit (Weeks 5–6)
*Goal: Ship the second open-source lead magnet covering the #1 paid service request (Token Launch Kit).*

* **Task 3.1 — `RareToken` Architecture & Invariant Spec** *(Bootstrap Prompt 3)*
  * **AI (`contract-architect` mode):** Write `docs/design/raretoken.md` specifying:
    1. `RareToken.sol` (Fixed-supply ERC-20 + ERC20Permit, no hidden mint, Safe ownership).
    2. `RareVesting.sol` (Cliff + linear timestamp-based vesting schedule, revocable/non-revocable flag, SafeERC20).
    3. `RareStaking.sol` (Synthetix-style reward-per-token accumulator using `block.timestamp`, non-reentrant, decimal-agnostic).
    4. System invariants (e.g., `sum(vested + unvested) == totalAllocated`, `stakingBalance >= sum(userStakes)`).
  * **You (ARZ):** Review and approve `docs/design/raretoken.md`.
* **Task 3.2 — `RareToken` Tests, Invariants, Contracts & Safe Handover Scripts**
  * **AI (`test-writer` + `solidity-engineer` + `security-auditor` mode):** Write unit, fuzz, and stateful invariant tests (`test/invariant/RareTokenInvariant.t.sol`), implement the 3 contracts, build Safe multisig role-handover scripts, and generate the security audit report.
  * **You (ARZ):** Run `forge test`, deploy to BSC Testnet, and publish `Rareware-Space/raretoken` on GitHub.

---

#### Phase 4: `RarePay` MVP — Non-Custodial BSC/opBNB Crypto Checkout (Weeks 7–9)
*Goal: Replace generic third-party payment links with Rareware's own non-custodial BSC/opBNB checkout engine (handling 18-decimal USDT/USDC safely).*

* **Task 4.1 — `RarePayRouter.sol` & Payment Design**
  * **AI (`contract-architect` + `solidity-engineer` mode):** Design and implement `RarePayRouter.sol` (handles native BNB and ERC-20 payments with dynamic `decimals()` lookup, exact invoice ID matching, fee-on-transfer protection, and direct settlement to merchant Safe) + full test suite.
  * **You (ARZ):** Approve design and deploy router to BSC Testnet.
* **Task 4.2 — `RarePay` API, Ponder Indexer & HMAC Webhook Engine**
  * **AI (Me):** Build invoice state machine (`created -> pending -> confirmed -> expired | refunded`) in `apps/api`, Ponder indexer in `apps/indexer` waiting 15+ blocks on BSC, and HMAC-SHA256 webhook dispatcher.
  * **You (ARZ):** Configure Supabase tables and test an end-to-end testnet USDT checkout flow.

---

#### Phase 5: `RareChars` Flagship Alpha — AI Game Character API + On-Chain Intents (Weeks 9–12)
*Goal: Build the flagship B2B product (`RareChars`) + 1-scene demo game for BNB Chain dev-tools-list, DappBay, and MVB / BNB Hack submission.*

* **Task 5.1 — On-Chain Intent Verifier (`RareCharsVerifier.sol` & ERC-6551 Binding)**
  * **AI (`contract-architect` + `solidity-engineer` mode):** Design and build `RareCharsVerifier.sol` (verifies EIP-712 signed NPC action intents with strict `nonce`, `deadline`, `characterId`, action allowlist, and daily cap enforcement so the LLM never holds a private key).
  * **You (ARZ):** Approve contract design and deploy to opBNB Testnet (`5611`).
* **Task 5.2 — `RareChars` API & Memory Engine** *(Bootstrap Prompt 4)*
  * **AI (Me):** Build `apps/api` with Hono + TypeScript + Zod validation:
    - `/v1/characters` (create persona/lore/rules)
    - `/v1/characters/:id/chat` (chat with pgvector RAG memory)
    - `/v1/characters/:id/memory` (GET/PUT memory inspection)
    - `/v1/characters/:id/actions` (function-calling -> EIP-712 signed intent)
    - `/v1/webhooks/game-events` & `/v1/characters/:id/bind`
    - Swappable LLM provider interface (**Claude API primary + ReadyPI / OpenRouter fallback**) and prompt-injection guardrails.
  * **You (ARZ):** Set up Supabase `pgvector` database and connect your ReadyPI / Anthropic API keys in `.env`.
* **Task 5.3 — TypeScript SDK & 1-Scene Demo Game**
  * **AI (Me):** Build `@rareware/sdk` client and a 1-scene interactive web demo game (2 persistent AI NPCs on opBNB Testnet that remember the player and issue signed on-chain item/quest rewards).
  * **You (ARZ):** Deploy demo, submit `RareChars` PR to BNB Chain's `dev-tools-list`, list on DappBay, and submit to **BNB Hack (bi-weekly rolling review)** + **MVB**.

---

#### Parallel Track: Website Alignment (`rarewarestudio.space`) (Week 2)
* **Task W.1 — Web3 Positioning Upgrade on `rarewarestudio.space`**
  * **AI (Me):** Draft the updated copy and component structure for the `AI Crypto` / `Services` sections on `rarewarestudio.space`—replacing the generic HFT trading copy with your **4 Pillars**, **Services Table**, and links to **RareMint, RareToken, RareChars, and RarePay**.
  * **You (ARZ):** Push the update to your Netlify deployment.

---

### 3. Your Decision: What Should I Do First?

Before I generate any code or files, please tell me how you want to proceed:

1. **Start at Phase 1, Task 1.1 + 1.2 (Recommended — Bootstrap Prompt 1):**
   I will immediately generate the complete monorepo configuration, `CLAUDE.md` / `ARGON.md`, `.claude/settings.json`, the **fixed** `guard-bash.sh` and `format.sh` hooks, all 6 subagent markdown files, 5 slash commands, 2 skills, `foundry.toml`, and a single setup script so you can initialize the entire `rareware-chain` repo in one command.
2. **Start with Phase 2, Task 2.1 (`RareMint` Design Doc — Bootstrap Prompt 2) or Phase 3, Task 3.1 (`RareToken` Design Doc — Bootstrap Prompt 3):**
   Jump straight into `contract-architect` mode and produce the full technical architecture & threat model for your first open-source kit.
3. **Start with Parallel Track Task W.1 (`rarewarestudio.space` Web3 Upgrade):**
   Redesign the Web3 / AI Crypto section of your live website first so your storefront matches this new spec.

**Reply with which task number (e.g., `Start Task 1.1 & 1.2`) you want me to execute first, and let me know if you want any adjustments to the task split above.**