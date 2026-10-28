import { parseAbi } from "viem";

export const RARE_TOKEN_ABI = parseAbi([
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function maxSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function burn(uint256 value)"
]);

export const RARE_VESTING_ABI = parseAbi([
  "function vestedAmount(address beneficiary, uint64 timestamp) view returns (uint128)",
  "function releasableAmount(address beneficiary) view returns (uint128)",
  "function release(address beneficiary) returns (uint128)"
]);

export const RARE_STAKING_ABI = parseAbi([
  "function totalStaked() view returns (uint256)",
  "function balanceOf(address user) view returns (uint256)",
  "function earned(address account) view returns (uint256)",
  "function stake(uint256 amount)",
  "function withdraw(uint256 amount)",
  "function claimReward() returns (uint256)",
  "function exit()"
]);
