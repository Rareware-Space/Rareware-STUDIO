#!/usr/bin/env bash
set -uo pipefail

input_json=$(cat)

if command -v jq >/dev/null 2>&1; then
  f=$(printf '%s' "$input_json" | jq -r '.tool_input.file_path // ""' 2>/dev/null || echo "")
elif command -v python3 >/dev/null 2>&1; then
  f=$(printf '%s' "$input_json" | python3 -c 'import sys, json; data = json.load(sys.stdin); print(data.get("tool_input", {}).get("file_path", ""))' 2>/dev/null || echo "")
elif command -v node >/dev/null 2>&1; then
  f=$(printf '%s' "$input_json" | node -e 'const fs=require("fs"); try { const d=JSON.parse(fs.readFileSync(0,"utf8")); console.log((d.tool_input&&d.tool_input.file_path)||""); } catch(e) {}' 2>/dev/null || echo "")
else
  exit 0
fi

[[ -z "$f" ]] && exit 0

project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
if [[ "$f" != /* ]]; then
  abs_f="$project_dir/$f"
else
  abs_f="$f"
fi

[[ ! -f "$abs_f" ]] && exit 0

case "$abs_f" in
  *.sol)
    forge fmt "$abs_f" --root "$project_dir/packages/contracts" >/dev/null 2>&1 || true
    ;;
  *.ts|*.tsx|*.js|*.json|*.md)
    (cd "$project_dir" && pnpm exec prettier --write "$abs_f") >/dev/null 2>&1 || true
    ;;
esac

exit 0
