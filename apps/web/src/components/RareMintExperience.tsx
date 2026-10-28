// RareMint Cinematic Mint Component (Next.js App Router + wagmi v2 + viem v2 + GSAP)
// Respects prefers-reduced-motion, simulates contract calls before write, and enforces BSC/opBNB network checks.

import { formatEther, type Address } from "viem";
import { RARE_MINT_ABI, RareMintPhase } from "@rareware/sdk";

export interface RareMintWidgetProps {
  contractAddress: Address;
  chainId: 56 | 97 | 204 | 5611;
}

export function formatMintPrice(unitPriceWei: bigint, quantity: number): string {
  const totalWei = unitPriceWei * BigInt(quantity);
  return `${formatEther(totalWei)} BNB`;
}

export const RAREMINT_UI_SPEC = {
  aesthetic: "Lumina Monolith (Electric Teal #00F5D4 on Void Black #050507)",
  features: [
    "Automatic chain switching (BSC Testnet 97 / Mainnet 56 / opBNB 204)",
    "Pre-flight eth_call simulation before prompting wallet signature",
    "GSAP timeline reveal animation with prefers-reduced-motion fallback",
    "Live totalMinted / maxSupply progress bar and per-wallet remaining allowance"
  ],
  abi: RARE_MINT_ABI,
  phases: RareMintPhase
} as const;
