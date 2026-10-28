# Security Audit Report: `RareToken`, `RareVesting`, `RareStaking`

- **Date:** 2026-10-28
- **Auditor:** `security-auditor` (Opus Tier)
- **Targets:** `RareToken.sol`, `RareVesting.sol`, `RareStaking.sol`
- **Verdict:** **GO FOR TESTNET DEPLOYMENT** (0 Critical, 0 High, 0 Medium)

## Key Security Properties Verified
1. **No Hidden Mint Authority:** `RareToken` has no `mint()` external/public function; 100% of `maxSupply` is minted once in the constructor to `treasurySafe`.
2. **BSC Sub-Second Block Safety:** Both `RareVesting` and `RareStaking` use `block.timestamp` (`uint64`) exclusively, avoiding 450ms block-time drift on BSC.
3. **Fee-on-Transfer Protection:** Both `createSchedule`, `stake`, and `notifyRewardAmount` verify exact balance deltas (`received == amount`) and revert if a non-standard token takes a transfer fee.
4. **Two-Step Safe Handover:** `RareVesting` and `RareStaking` inherit `Ownable2Step`, and `DeployRareTokenKit.s.sol` initiates pending ownership transfer to `TREASURY_SAFE` so the multisig must call `acceptOwnership()`.
