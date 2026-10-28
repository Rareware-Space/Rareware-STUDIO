---
name: bsc-gotchas
description: BSC and opBNB specifics. Use when writing deploy scripts, token logic, or chain config.
---
- Token decimals: BSC USDT (`0x55d398326f99059fF775485246999027B3197955`) and USDC (`0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d`) are 18 decimals. Always read `decimals()`.
- EVM version: set `evm_version = "shanghai"` by default; verify target chain support on both BSC and opBNB before raising it.
- Block times: BSC block intervals are ~450ms (0.45s) and fast finality is ~650ms (post-2025/2026 hardforks). Never hard-code block-based timings (`block.number`); always use `block.timestamp` for vesting/staking and wait 15-20 blocks for payment confirmations.
- opBNB is an Optimistic Rollup L2 on BSC: check bridge/finality assumptions before relying on L1->L2 or L2->L1 messages.
- Use chain-specific verification (BscScan/opBNBScan) and keep API keys in env.
- Public RPCs are rate-limited; use a paid provider (NodeReal, Ankr, QuickNode) in production.
