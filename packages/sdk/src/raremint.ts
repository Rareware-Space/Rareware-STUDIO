import { parseAbi } from "viem";

export const RARE_MINT_ABI = parseAbi([
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function maxSupply() view returns (uint32)",
  "function maxPerWallet() view returns (uint32)",
  "function maxPerTx() view returns (uint32)",
  "function totalMinted() view returns (uint32)",
  "function allowlistPrice() view returns (uint128)",
  "function publicPrice() view returns (uint128)",
  "function phase() view returns (uint8)",
  "function revealed() view returns (bool)",
  "function mintedPerWallet(address minter) view returns (uint32)",
  "function mintAllowlist(uint32 quantity, uint32 maxAllowance, bytes32[] calldata proof) payable",
  "function mintPublic(uint32 quantity) payable",
  "event Minted(address indexed minter, uint32 quantity, uint256 firstTokenId, uint8 phase)"
]);

export enum RareMintPhase {
  Closed = 0,
  Allowlist = 1,
  Public = 2
}
