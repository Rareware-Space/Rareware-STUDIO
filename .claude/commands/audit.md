---
description: Run the full security review on current changes
allowed-tools: Bash, Read, Grep, Glob
---
Use the security-auditor agent on: !`git diff --name-only main...HEAD`
Also run the full test suite and report coverage. Output the report path and a go/no-go verdict.
