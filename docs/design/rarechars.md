# RareChars Architecture & Threat Model (AI Game Characters + On-Chain EIP-712 Intents)

## 1. Core Security Principle: The Model Never Holds Keys
In `RareChars`, AI models (Claude Opus/Sonnet, ReadyPI, or OpenRouter fallback) generate conversational dialogue and select structured game actions. When an NPC decides to trigger an on-chain action (e.g., minting a quest item, awarding XP, or opening a dungeon gate), the API returns an **EIP-712 Signed Action Intent** signed by an isolated backend relayer/signer.

The on-chain game contract (`RareCharsVerifier.sol`) enforces:
1. **Domain Separation:** Binds `chainId` (`56`, `97`, `204`, `5611`) and `verifyingContract`.
2. **Per-Character & Per-Player Nonce:** Prevents replay of any signed intent.
3. **Action Selector Allowlist:** Even if an LLM is prompt-injected by a player, the contract rejects any `actionSelector` not explicitly allowlisted by the game's Safe multisig.
4. **Daily Value/Action Cap:** Bounds the maximum number of actions or value an NPC can authorize per 24-hour epoch (`block.timestamp / 1 days`).
