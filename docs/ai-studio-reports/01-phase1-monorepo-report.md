### Phase 1 Complete: Monorepo Foundation, Guardrails & Read-Only Chain MCP

I have completed **all 4 tasks of Phase 1** (`Task 1.1` through `Task 1.4`, covering Bootstrap Prompts 1 and 5 from `rareware-upgrade.md`), verified the security hooks against 11 simulated attack/broadcast vectors, and packaged the entire repository into **`rareware-chain/`** (and **`rareware-chain-phase1.zip`** in the workspace).

---

### 1. Complete File Tree Created (`rareware-chain/`)

```text
rareware-chain/
├─ .env.example                        # Env template (BSC/opBNB RPCs, Anthropic, OpenRouter, ReadyPI, Supabase)
├─ .gitignore                          # Blocks .env*, *.pem, keystores, Foundry out/cache/broadcast
├─ .mcp.json                           # Wires rareware-chain-readonly, context7, supabase (read-only), vercel, playwright
├─ ARGON.md                            # Root AI engineering rules (synced with CLAUDE.md)
├─ CLAUDE.md                           # Root AI engineering rules & hard security constraints
├─ README.md                           # Monorepo quick-start and architecture guide
├─ package.json                        # Root pnpm workspace scripts (check, lint, typecheck, test, contracts:*)
├─ pnpm-workspace.yaml                 # Workspaces: packages/*, apps/*
├─ tsconfig.base.json                  # Strict TypeScript config (noImplicitAny, strictNullChecks, noUncheckedIndexedAccess)
├─ .claude/
│  ├─ settings.json                    # Allow/Deny rules + PreToolUse (guard-bash.sh) & PostToolUse (format.sh)
│  ├─ agents/
│  │  ├─ contract-architect.md         # Architecture, storage layout, access matrix & threat model (Opus tier)
│  │  ├─ solidity-engineer.md          # Test-first Solidity implementation (Sonnet tier)
│  │  ├─ test-writer.md                # Unit, revert, testFuzz_, invariant & fork test suite (Sonnet tier)
│  │  ├─ security-auditor.md           # Adversarial read-only auditor + Slither/Aderyn triage (Opus tier)
│  │  ├─ web3-frontend.md              # Next.js + wagmi v2 + viem v2 + GSAP/Three.js motion (Sonnet tier)
│  │  ├─ deploy-manager.md             # Testnet simulation + human-only mainnet Safe runbook (Sonnet tier)
│  │  ├─ gas-optimizer.md              # Storage packing & gas report analyzer (Sonnet tier)
│  │  ├─ docs-writer.md                # Package READMEs, NatSpec & client handover docs (Haiku tier)
│  │  └─ ai-character-engineer.md      # RareChars persona, pgvector RAG & EIP-712 intent engineer (Sonnet tier)
│  ├─ commands/
│  │  ├─ new-contract.md               # /new-contract end-to-end design -> test -> build flow
│  │  ├─ audit.md                      # /audit full security review & go/no-go verdict
│  │  ├─ testnet-deploy.md             # /testnet-deploy simulation & human command output
│  │  ├─ gas.md                        # /gas report & snapshot comparison
│  │  └─ ship.md                       # /ship pre-PR checks & conventional commit flow
│  ├─ hooks/
│  │  ├─ guard-bash.sh                 # Hardened fail-closed PreToolUse blocker (tested: 11/11 pass)
│  │  └─ format.sh                     # Root-aware PostToolUse auto-formatter (forge fmt + prettier)
│  └─ skills/
│     ├─ bsc-gotchas/SKILL.md          # 18-decimal USDT/USDC, 450ms block times, shanghai EVM rules
│     └─ solidity-security/SKILL.md    # 18-point smart contract security review checklist
├─ .github/
│  └─ workflows/
│     └─ ci.yml                        # GitHub Actions: Foundry tests, Slither, Web/API typecheck, AI PR review
├─ docs/
│  ├─ rareware-upgrade.md              # Master specification
│  ├─ deployments/                     # Target directory for testnet/mainnet deployment logs
│  ├─ design/                          # Target directory for contract-architect specs
│  ├─ runbooks/                        # Target directory for mainnet Safe handover runbooks
│  └─ security/
│     └─ triage.md                     # Slither/Aderyn static analysis triage log
├─ packages/
│  ├─ contracts/
│  │  ├─ README.md
│  │  ├─ foundry.toml                  # Pinned solc 0.8.28, shanghai, fuzz=1000, invariant=256/64
│  │  ├─ remappings.txt                # @openzeppelin/contracts & forge-std remappings
│  │  ├─ script/.gitkeep
│  │  ├─ src/RarewareVersion.sol       # Baseline smoke contract
│  │  └─ test/
│  │     ├─ RarewareVersion.t.sol      # Baseline smoke test
│  │     └─ invariant/.gitkeep
│  ├─ mcp-chain-readonly/
│  │  ├─ README.md
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  └─ src/
│  │     ├─ chains.ts                  # Strictly read-only PublicClient factory (BSC 56/97, opBNB 204/5611)
│  │     └─ index.ts                   # 6 read-only MCP tools (get_balance, read_contract, get_logs, get_tx, simulate_call, decode_calldata)
│  ├─ sdk/                             # @rareware/sdk workspace skeleton
│  └─ ui/                              # @rareware/ui workspace skeleton
└─ apps/
   ├─ api/                             # @rareware/api (Hono) workspace skeleton
   ├─ indexer/                         # @rareware/indexer (Ponder) workspace skeleton
   └─ web/                             # @rareware/web (Next.js) workspace skeleton
```

---

### 2. Key Security Hardening Applied & Verified in Phase 1

While testing `.claude/hooks/guard-bash.sh` in our execution environment, I caught and fixed **three critical edge cases** in the original spec's bash hooks:

1. **Fail-Open When `jq` Is Missing (Fixed -> Fail-Closed):**
   - *Issue:* In the original spec, `cmd=$(jq -r '.tool_input.command // ""')` silently evaluates to `""` and exits `0` (allowing any command!) if `jq` is not installed on the host.
   - *Fix:* `guard-bash.sh` now cascades through `jq` -> `python3` -> `node` to parse the JSON payload, and **fails closed (`exit 2`)** if JSON parsing fails or no parser is available.
2. **Short Broadcast Flag (`-b`) & `--chain-id 56` Bypass (Fixed):**
   - *Issue:* `forge script ... -b` (short for `--broadcast`) and `--chain-id 56` bypassed the original regex.
   - *Fix:* Both are now explicitly caught and blocked with exit code `2`.
3. **Verification Results (`11/11` Test Vectors Passed):**
   - `[PASS]` `forge test -vvv` -> `ALLOWED`
   - `[PASS]` `forge script script/Deploy.s.sol --rpc-url bsc_testnet` -> `ALLOWED`
   - `[PASS]` `forge script script/Deploy.s.sol --rpc-url bsc_testnet --broadcast` -> `BLOCKED`
   - `[PASS]` `forge script script/Deploy.s.sol -b` -> `BLOCKED`
   - `[PASS]` `cast send 0x1234 --private-key 0xabc` -> `BLOCKED`
   - `[PASS]` `forge script script/Deploy.s.sol --rpc-url bsc_mainnet` -> `BLOCKED`
   - `[PASS]` `forge script script/Deploy.s.sol --chain-id 56` -> `BLOCKED`
   - `[PASS]` `cat .env` -> `BLOCKED`
   - `[PASS]` `echo $PRIVATE_KEY` -> `BLOCKED`
   - `[PASS]` `git push origin main` -> `BLOCKED`
   - `[PASS]` `git push origin feat/raremint` -> `ALLOWED`

---

### 3. Your Action Items for Phase 1 (When Pulling Locally)

Once you extract `rareware-chain` (or clone it into `github.com/Rareware-Space/rareware-chain`), run these 4 commands locally to complete the human side of Phase 1:

```bash
cd rareware-chain
pnpm install
cd packages/contracts && forge install foundry-rs/forge-std --no-commit && forge install OpenZeppelin/openzeppelin-contracts@v5.2.0 --no-commit && forge test -vvv && cd ../..
cp .env.example .env
```

---

### 4. Ready for Phase 2 — What Would You Like Me to Execute Next?

According to our implementation plan and **Bootstrap Prompt 2** in `rareware-upgrade.md`, the next step is **Phase 2 (`RareMint` — Open-Source NFT Kit + Cinematic Mint Site)**:

* **Option A — Execute Task 2.1 (`RareMint` Architecture & Threat Model — Bootstrap Prompt 2):**
  I will switch into **`contract-architect`** mode and write `docs/design/raremint.md`—designing the ERC-721 collection contract with Merkle allowlist, public mint, per-wallet cap, delayed reveal, ERC-2981 royalties, pull/Safe withdrawal to a multisig address, storage layout, access-control matrix, threat model, and test plan—and then pause for your approval before writing the Solidity tests and contracts.
* **Option B — Execute Full Phase 2 (`RareMint` Design + Tests + Solidity Contract + Audit Report + Mint UI):**
  If you want me to complete all of Phase 2 in one go (just as we did for Phase 1), tell me and I will produce `docs/design/raremint.md`, `RareMint.sol`, `RareMint.t.sol` (unit + fuzz + invariant tests), `DeployRareMint.s.sol`, the `security-auditor` report (`docs/security/audit-raremint.md`), and the Next.js + wagmi v2 + GSAP mint frontend.

**Tell me whether you want **Option A** (Design Doc first for sign-off) or **Option B** (Complete all of Phase 2 now).**