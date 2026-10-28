import { createPublicClient, http, type PublicClient } from "viem";
import { bsc, bscTestnet, opBNB, opBNBTestnet } from "viem/chains";
import { z } from "zod";

export const SupportedChainSchema = z.enum([
  "bsc",
  "bsc_testnet",
  "opbnb",
  "opbnb_testnet",
]);

export type SupportedChainKey = z.infer<typeof SupportedChainSchema>;

const DEFAULT_RPCS: Record<SupportedChainKey, string> = {
  bsc: process.env.BSC_RPC_URL || "https://bsc-dataseed.bnbchain.org",
  bsc_testnet:
    process.env.BSC_TESTNET_RPC_URL ||
    "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
  opbnb: process.env.OPBNB_RPC_URL || "https://opbnb-mainnet-rpc.bnbchain.org",
  opbnb_testnet:
    process.env.OPBNB_TESTNET_RPC_URL ||
    "https://opbnb-testnet-rpc.bnbchain.org",
};

const CHAIN_CONFIGS = {
  bsc,
  bsc_testnet: bscTestnet,
  opbnb: opBNB,
  opbnb_testnet: opBNBTestnet,
} as const;

/**
 * Returns a strictly READ-ONLY viem PublicClient.
 * Never instantiates a WalletClient or accepts private keys.
 */
export function getReadOnlyClient(chainKey: SupportedChainKey): PublicClient {
  const chain = CHAIN_CONFIGS[chainKey];
  const rpcUrl = DEFAULT_RPCS[chainKey];
  return createPublicClient({
    chain,
    transport: http(rpcUrl, {
      timeout: 15_000,
      retryCount: 2,
    }),
  });
}
