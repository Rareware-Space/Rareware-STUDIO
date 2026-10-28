---
description: Design, test, and implement a new contract end to end
argument-hint: <ContractName> <one-line purpose>
---
1. Use the contract-architect agent to write docs/design/$ARGUMENTS.md. Stop and show me the design for approval.
2. After approval, use test-writer to create failing tests.
3. Use solidity-engineer to implement until tests pass.
4. Run `forge fmt`, `forge test -vvv`, `forge coverage`.
5. Summarize what was built, coverage, and open risks.
