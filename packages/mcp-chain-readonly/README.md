# @rareware/mcp-chain-readonly

Strictly read-only Model Context Protocol (MCP) server for inspecting BSC (`56`/`97`) and opBNB (`204`/`5611`) state via `viem` v2.

## Security Policy
- **Zero Write Paths:** Does not import `createWalletClient`, `privateKeyToAccount`, or any transaction-signing primitives.
- **Dynamic Decimals:** `get_balance` queries `decimals()` directly on ERC-20 contracts (preventing 18-decimal vs 6-decimal bugs on BSC USDT/USDC).
- **Bounded Queries:** `get_logs` enforces a maximum 1,000-block window per call to prevent RPC exhaustion.

## Exposed Tools
1. `get_balance` — Native BNB or ERC-20 balance with live `decimals()` lookup.
2. `read_contract` — Read-only `eth_call` against any view/pure function.
3. `get_logs` — Bounded event log lookup (`<= 1000` blocks).
4. `get_tx` — Transaction + receipt inspection by hash.
5. `simulate_call` — Stateless `eth_call` simulation.
6. `decode_calldata` — Offline ABI calldata decoding.
