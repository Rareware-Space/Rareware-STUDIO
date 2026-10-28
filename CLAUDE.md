# Rareware Chain Monorepo

## Mission
Build secure, production-grade blockchain products for BSC/opBNB (EVM). Security over speed.

## Stack
Foundry (Solidity 0.8.28), OpenZeppelin, Next.js + TypeScript, wagmi v2 / viem v2, Ponder, Hono, Supabase (Postgres + pgvector), pnpm.

## Commands
- Contracts: `cd packages/contracts && forge build | forge test -vvv | forge coverage | forge fmt | slither . | aderyn .`
- Web: `pnpm --filter @rareware/web dev | build | lint | typecheck`
- API: `pnpm --filter @rareware/api dev | test | lint | typecheck`
- Indexer: `pnpm --filter @rareware/indexer dev | typecheck`
- MCP Read-Only Server: `pnpm --filter @rareware/mcp-chain-readonly build | start`
- All checks: `pnpm check` (lint + typecheck + forge test)

## Hard rules (never break)
1. NEVER read, print, or commit `.env*`, private keys, mnemonics, or keystores.
2. NEVER broadcast a transaction or deploy to mainnet. Testnet deploys only via `/testnet-deploy`, and only after tests pass. Mainnet is done by the human with a hardware wallet / Safe.
3. NEVER use `tx.origin` for auth, unchecked low-level calls, or `selfdestruct`.
4. Every external/public state-changing function needs: access control decision, reentrancy decision, events, NatSpec, tests (happy, revert, fuzz).
5. Write the failing test first for any bug fix.
6. No new dependency without stating why, version, and license.
7. Do not trust token decimals: read `decimals()`. BSC USDT/USDC are 18 decimals (verify per token).
8. Pin pragma and dependency versions. No floating `^` in contracts that ship (`pragma solidity 0.8.28;`).
9. Admin/owner roles go to a Safe multisig + timelock before mainnet.

## Conventions
- Solidity: custom errors, `immutable`/`constant` where possible, checks-effects-interactions (CEI), named imports, `forge fmt`.
- Tests mirror contract names: `Token.t.sol`; fuzz tests prefixed `testFuzz_`; invariants in `test/invariant/`.
- TypeScript: strict mode, no `any`, zod for external input, viem not ethers.
- Commits: conventional commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`).
- Docs: every package has a README with run/test/deploy steps.

## Workflow
Plan (plan mode) -> failing tests -> implement -> `/audit` -> fix -> `/testnet-deploy` -> human review -> mainnet by human.

## Chain reference
BSC mainnet 56, BSC testnet 97, opBNB mainnet 204, opBNB testnet 5611. RPC URLs come from env vars, never hard-coded.
Note: BSC block time is ~0.45s (450ms) and finality ~0.65s (post-2025/2026 hardforks). Never use `block.number` for time math; always use `block.timestamp`.

## Definition of done
Tests pass, coverage target met (90%+ line coverage on core contracts), slither/aderyn clean or triaged in `docs/security/triage.md`, docs updated, no secrets in diff.
