import { parseAbi } from "viem";

export * from "./raremint.js";
export * from "./raretoken.js";

export const RARE_MINT_ABI = parseAbi([
  "function mintAllowlist(uint32 quantity, uint32 maxAllowance, bytes32[] calldata proof) payable",
  "function mintPublic(uint32 quantity) payable",
  "function totalMinted() view returns (uint32)",
  "function maxSupply() view returns (uint32)"
]);

export const RARE_TOKEN_ABI = parseAbi([
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)"
]);

export const RARE_PAY_ROUTER_ABI = parseAbi([
  "function payNativeInvoice(bytes32 invoiceId, address merchantSafe, uint256 amountWei, uint64 deadline) payable",
  "function payTokenInvoice(bytes32 invoiceId, address merchantSafe, address token, uint256 amount, uint8 expectedDecimals, uint64 deadline)"
]);

export const RARE_CHARS_VERIFIER_ABI = parseAbi([
  "function nonces(bytes32 characterId, address player) view returns (uint256)",
  "function verifyAndConsumeIntent((bytes32 characterId, address player, bytes4 actionSelector, bytes32 paramsHash, uint256 valueUnits, uint256 nonce, uint64 deadline) intent, bytes signature) returns (bytes32)"
]);
