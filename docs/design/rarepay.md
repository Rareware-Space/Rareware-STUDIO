# RarePay Architecture & Threat Model

## 1. Purpose
`RarePay` is a non-custodial crypto invoice & checkout protocol for BSC (`56`/`97`) and opBNB (`204`/`5611`). Funds settle directly from the payer to the merchant's `Safe` multisig without Rareware Studio ever taking custody.

## 2. BSC 18-Decimal Gotcha & Dynamic Decimal Verification
- On BSC Mainnet, Binance-Peg USDT (`0x55d398326f99059fF775485246999027B3197955`) and Binance-Peg USDC (`0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d`) both use **18 decimals** (whereas USDT/USDC on Ethereum/Polygon use 6 decimals).
- `RarePayRouter.sol` queries `IERC20Metadata(token).decimals()` on-chain and requires the caller to pass `expectedDecimals`, reverting with `TokenDecimalsMismatch(actual, expected)` if the off-chain invoice generator assumed the wrong decimal precision.

## 3. Confirmation & Webhook State Machine
- States: `created -> pending -> confirmed -> expired | refunded`.
- Because BSC block intervals are `450ms` (`0.45s`) with `650ms` fast finality, the Ponder watcher in `apps/indexer` waits **15 blocks (~6.75 seconds)** before transitioning an invoice to `confirmed` and dispatching the `X-RarePay-Signature` HMAC-SHA256 webhook.
