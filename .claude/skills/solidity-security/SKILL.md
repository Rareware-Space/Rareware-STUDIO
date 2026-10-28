---
name: solidity-security
description: Checklist for reviewing or writing Solidity. Use when creating, modifying, or reviewing any smart contract.
---
Check every item and cite the line: access control on each external function; reentrancy guard or CEI; return values of external calls; SafeERC20 for tokens; fee-on-transfer/rebasing tokens; decimals; rounding direction (favor protocol); oracle staleness and manipulation; signature replay (EIP-712, nonce, deadline, chainId); initializer protection; storage collisions on upgrades; unbounded loops; timestamp reliance; events on every state change; pausability and emergency exits; admin power limits (timelock + multisig); front-running and sandwiching exposure.
