#!/usr/bin/env bash
set -uo pipefail

input_json=$(cat)

block() {
  echo "BLOCKED by guard-bash: $1" >&2
  exit 2
}

if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input_json" | jq -r '.tool_input.command // ""' 2>/dev/null || echo "__PARSE_ERROR__")
elif command -v python3 >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input_json" | python3 -c 'import sys, json; data = json.load(sys.stdin); print(data.get("tool_input", {}).get("command", ""))' 2>/dev/null || echo "__PARSE_ERROR__")
elif command -v node >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input_json" | node -e 'const fs=require("fs"); try { const d=JSON.parse(fs.readFileSync(0,"utf8")); console.log((d.tool_input&&d.tool_input.command)||""); } catch(e) { console.log("__PARSE_ERROR__"); }' 2>/dev/null || echo "__PARSE_ERROR__")
else
  block "neither jq, python3, nor node is installed; failing closed to protect keys and mainnet"
fi

[[ "$cmd" == "__PARSE_ERROR__" ]] && block "failed to parse tool_input JSON; failing closed"

# 1. Block on-chain broadcasting, contract creation, and signing/key flags
echo "$cmd" | grep -Eq -- '(^|[[:space:]])(--broadcast|-b|--private-key|--mnemonic|--keystore|--ledger|--trezor|--unlocked|--verify)([[:space:]]|=|$)' \
  && block "on-chain broadcasting, verification, and key flags are human-only"

echo "$cmd" | grep -Eq -- '(^|[[:space:]])(cast[[:space:]]+(send|publish|mktx|wallet)|forge[[:space:]]+create)([[:space:]]|$)' \
  && block "direct transaction sending and contract creation are human-only"

# 2. Block mainnet targets and chain IDs (BSC 56, opBNB 204)
echo "$cmd" | grep -Eqi '(bsc[_-]?mainnet|opbnb[_-]?mainnet|(--rpc-url|-f|--fork-url)[[:space:]]+(bsc|opbnb)([[:space:]]|$)|chain([-= ]|-id[= ]?|_id[= ]?)(56|204)([^0-9]|$))' \
  && block "mainnet targets (BSC 56 / opBNB 204) are human-only"

# 3. Block reading or printing secrets / .env files
echo "$cmd" | grep -Eq '(cat|less|more|head|tail|grep|awk|sed|source|\.)[[:space:]]+.*\.env([^.a-zA-Z]|$)|printenv|(^|[[:space:]])env[[:space:]]*\||echo[[:space:]]+\$.*(KEY|SECRET|MNEMONIC|JWT|TOKEN)' \
  && block "do not read or expose secrets or .env files"

# 4. Block pushing directly to main or master (including git push origin HEAD when on main/master)
if echo "$cmd" | grep -Eq 'git[[:space:]]+push'; then
  if echo "$cmd" | grep -Eq 'git[[:space:]]+push[[:space:]]+.*(main|master|--force|-f)'; then
    block "push to a feature branch and open a PR instead (never main/master or force push)"
  fi
  current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
  if [[ "$current_branch" == "main" || "$current_branch" == "master" ]]; then
    block "currently on $current_branch branch; switch to a feature branch before pushing"
  fi
fi

exit 0
