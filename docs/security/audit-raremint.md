# Security Audit Report: `RareMint.sol`

- **Date:** 2026-10-28
- **Auditor:** `security-auditor` (Opus Tier)
- **Target:** `packages/contracts/src/RareMint.sol`
- **Solc Version:** `0.8.28` (`evm_version = "shanghai"`)
- **Verdict:** **GO FOR TESTNET DEPLOYMENT** (0 Critical, 0 High, 0 Medium, 1 Low/Informational mitigated)

## 1. Executive Summary
`RareMint.sol` implements an ERC-721 collection with Merkle allowlist, public minting, per-wallet caps, one-way metadata reveal, ERC-2981 royalties, and pull-to-Safe withdrawal. All state mutations strictly obey Checks-Effects-Interactions (CEI) and are guarded by `ReentrancyGuard`.

## 2. Security Checklist Verification
| Check | Status | Line Reference / Notes |
|---|---|---|
| Access Control | PASS | `Ownable2Step` prevents accidental ownership transfer to dead addresses. |
| Reentrancy (`_safeMint` & `withdraw`) | PASS | `nonReentrant` modifier + `mintedPerWallet` & `totalMinted` updated prior to `_safeMint` loop. |
| Merkle Leaf Preimage Protection | PASS | Double-hashed leaf `keccak256(bytes.concat(keccak256(abi.encode(msg.sender, maxAllowance))))`. |
| Per-Wallet Cap Integrity | PASS | Uses `mintedPerWallet[minter]` instead of `balanceOf(minter)`, preventing transfer-and-remint bypass. |
| Royalty Cap Enforcement | PASS | Hard-capped at `MAX_ROYALTY_BPS = 1000` (10%). |
| Withdrawal Safety | PASS | Sends strictly to `treasurySafe` and reverts on failed low-level call. |
