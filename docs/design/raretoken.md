# RareToken Kit Architecture, Threat Model & Invariants

## 1. Scope & Purpose
`RareToken` is Rareware Studio's open-source token launch kit for BSC (`56`/`97`) and opBNB (`204`/`5611`). It comprises three modular, immutable contracts:
1. **`RareToken.sol`**: Fixed-supply ERC-20 token with `ERC20Burnable` and `ERC20Permit` (EIP-2612 gasless approvals). No owner minting backdoor.
2. **`RareVesting.sol`**: Multi-beneficiary linear + cliff token vesting vault governed by a Safe multisig (`Ownable2Step`).
3. **`RareStaking.sol`**: Non-custodial single-asset staking and reward distribution contract using a timestamp-based reward-per-token accumulator.

## 2. BSC & opBNB Specific Design Decisions
- **Timestamp Accounting Only:** Post-2025/2026 BSC hardforks reduced block intervals to ~450ms (`0.45s`). All vesting schedules (`RareVesting`) and staking reward accruals (`RareStaking`) strictly use `block.timestamp` (`uint64`) and never `block.number`.
- **Principal vs. Reward Reserve Isolation:** In `RareStaking`, if `stakingToken == rewardsToken`, the contract tracks `totalStaked` and `rewardReserve` separately so reward funding checks never cannibalize user principal.

## 3. System Invariants (Verified in `RareTokenInvariant.t.sol`)
1. **Supply Conservation (`RareToken`):** `token.totalSupply() <= immutableMaxSupply` at all times.
2. **Vesting Solvency (`RareVesting`):** `token.balanceOf(address(vesting)) >= totalAllocated - totalReleased` across all active schedules.
3. **Beneficiary Release Bound (`RareVesting`):** For every beneficiary `b`, `schedules[b].released <= schedules[b].totalAmount`.
4. **Staking Principal Solvency (`RareStaking`):** `stakingToken.balanceOf(address(staking)) >= totalStaked` (or `>= totalStaked + rewardReserve` when staking and reward tokens are identical).

## 4. Access-Control Matrix
| Contract | Function | Caller | Guard |
|---|---|---|---|
| `RareToken` | `constructor` | Deployer (mints 100% to `treasurySafe`) | Immutable supply |
| `RareVesting` | `createSchedule` | `onlyOwner` (Safe Multisig) | `nonReentrant`, checks solvency |
| `RareVesting` | `release` | Beneficiary or Owner | `nonReentrant`, CEI |
| `RareVesting` | `revoke` | `onlyOwner` (if `revocable == true`) | `nonReentrant`, settles vested first |
| `RareStaking` | `notifyRewardAmount` | `onlyOwner` (Safe Multisig) | `nonReentrant`, `updateReward(address(0))` |
| `RareStaking` | `stake` / `withdraw` / `claimReward` | Any Staker | `nonReentrant`, `updateReward(msg.sender)` |

## 5. Threat Model
- **Fee-on-Transfer / Rebasing Weirdness:** `RareVesting` and `RareStaking` verify exact balance deltas on token deposits and revert with `UnsupportedTokenTransfer()` if received amount differs from requested amount.
- **Reward Rate Rounding / Dust Lock:** `RareStaking` scales `rewardPerTokenStored` by `1e18` and verifies `rewardRate > 0` and `rewardRate * duration <= rewardReserve` upon `notifyRewardAmount`.
- **Admin Key Compromise:** Both `RareVesting` and `RareStaking` inherit `Ownable2Step`. Even a compromised owner cannot drain user `totalStaked` in `RareStaking` or non-revocable schedules in `RareVesting`.
