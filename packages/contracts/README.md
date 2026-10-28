# @rareware/contracts

Foundry smart-contract workspace for Rareware Studio (`RareMint`, `RareToken`, `RarePay`, `RareCharsVerifier`).

## Setup
```bash
cd packages/contracts
forge install foundry-rs/forge-std --no-commit
forge install OpenZeppelin/openzeppelin-contracts@v5.2.0 --no-commit
```

## Commands
- Build: `forge build --sizes`
- Test: `forge test -vvv`
- Coverage: `forge coverage --report summary`
- Format: `forge fmt`
- Static Analysis: `slither . && aderyn .`
