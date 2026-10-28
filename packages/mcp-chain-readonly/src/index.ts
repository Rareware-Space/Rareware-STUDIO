#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  decodeFunctionData,
  formatEther,
  formatUnits,
  isAddress,
  parseAbi,
  type Abi,
  type Address,
  type Hex,
} from "viem";
import { z } from "zod";
import { getReadOnlyClient, SupportedChainSchema } from "./chains.js";

/**
 * @rareware/mcp-chain-readonly
 * Strictly read-only MCP server for BSC (56/97) and opBNB (204/5611).
 * HARD RULE: Zero signing, zero broadcasting, zero private key access.
 */

const AddressSchema = z
  .string()
  .refine((val): val is Address => isAddress(val), {
    message: "Invalid EVM address",
  });

const HexSchema = z
  .string()
  .regex(/^0x[0-9a-fA-F]*$/, "Must be a 0x-prefixed hex string") as z.ZodType<Hex>;

const GetBalanceArgs = z.object({
  chain: SupportedChainSchema.default("bsc_testnet"),
  address: AddressSchema,
  tokenAddress: AddressSchema.optional(),
});

const ReadContractArgs = z.object({
  chain: SupportedChainSchema.default("bsc_testnet"),
  address: AddressSchema,
  abi: z.union([z.array(z.string()), z.array(z.record(z.unknown()))]),
  functionName: z.string(),
  args: z.array(z.unknown()).optional().default([]),
});

const GetLogsArgs = z.object({
  chain: SupportedChainSchema.default("bsc_testnet"),
  address: AddressSchema.optional(),
  fromBlock: z.union([z.string(), z.number()]).optional(),
  toBlock: z.union([z.string(), z.number()]).optional(),
});

const GetTxArgs = z.object({
  chain: SupportedChainSchema.default("bsc_testnet"),
  hash: HexSchema,
});

const SimulateCallArgs = z.object({
  chain: SupportedChainSchema.default("bsc_testnet"),
  account: AddressSchema.optional(),
  to: AddressSchema,
  data: HexSchema.optional(),
  valueWei: z.string().optional(),
});

const DecodeCalldataArgs = z.object({
  abi: z.union([z.array(z.string()), z.array(z.record(z.unknown()))]),
  data: HexSchema,
});

function normalizeAbi(rawAbi: string[] | Record<string, unknown>[]): Abi {
  if (rawAbi.length > 0 && typeof rawAbi[0] === "string") {
    return parseAbi(rawAbi as string[]);
  }
  return rawAbi as unknown as Abi;
}

function serializeBigInt(obj: unknown): string {
  return JSON.stringify(
    obj,
    (_key, value) => (typeof value === "bigint" ? value.toString() : value),
    2
  );
}

const server = new Server(
  {
    name: "rareware-chain-readonly",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_balance",
      description:
        "Read native BNB balance or ERC-20 token balance (auto-reads decimals()) on BSC/opBNB mainnet or testnet.",
      inputSchema: {
        type: "object",
        properties: {
          chain: {
            type: "string",
            enum: ["bsc", "bsc_testnet", "opbnb", "opbnb_testnet"],
            default: "bsc_testnet",
          },
          address: { type: "string", description: "Wallet or contract address" },
          tokenAddress: {
            type: "string",
            description: "Optional ERC-20 token contract address",
          },
        },
        required: ["address"],
      },
    },
    {
      name: "read_contract",
      description:
        "Call a read-only (view/pure) function on a contract using human-readable ABI strings or JSON ABI.",
      inputSchema: {
        type: "object",
        properties: {
          chain: {
            type: "string",
            enum: ["bsc", "bsc_testnet", "opbnb", "opbnb_testnet"],
            default: "bsc_testnet",
          },
          address: { type: "string" },
          abi: {
            type: "array",
            description: "Human-readable ABI array or JSON ABI array",
          },
          functionName: { type: "string" },
          args: { type: "array", default: [] },
        },
        required: ["address", "abi", "functionName"],
      },
    },
    {
      name: "get_logs",
      description:
        "Fetch contract event logs across a bounded block range on BSC or opBNB.",
      inputSchema: {
        type: "object",
        properties: {
          chain: {
            type: "string",
            enum: ["bsc", "bsc_testnet", "opbnb", "opbnb_testnet"],
            default: "bsc_testnet",
          },
          address: { type: "string" },
          fromBlock: { type: "string" },
          toBlock: { type: "string" },
        },
      },
    },
    {
      name: "get_tx",
      description:
        "Fetch transaction details and receipt by transaction hash.",
      inputSchema: {
        type: "object",
        properties: {
          chain: {
            type: "string",
            enum: ["bsc", "bsc_testnet", "opbnb", "opbnb_testnet"],
            default: "bsc_testnet",
          },
          hash: { type: "string" },
        },
        required: ["hash"],
      },
    },
    {
      name: "simulate_call",
      description:
        "Perform a stateless eth_call simulation against the chain without broadcasting or signing.",
      inputSchema: {
        type: "object",
        properties: {
          chain: {
            type: "string",
            enum: ["bsc", "bsc_testnet", "opbnb", "opbnb_testnet"],
            default: "bsc_testnet",
          },
          account: { type: "string" },
          to: { type: "string" },
          data: { type: "string" },
          valueWei: { type: "string" },
        },
        required: ["to"],
      },
    },
    {
      name: "decode_calldata",
      description:
        "Offline decode of raw 0x transaction calldata against a provided ABI.",
      inputSchema: {
        type: "object",
        properties: {
          abi: { type: "array" },
          data: { type: "string" },
        },
        required: ["abi", "data"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: rawArgs } = request.params;

  try {
    switch (name) {
      case "get_balance": {
        const args = GetBalanceArgs.parse(rawArgs);
        const client = getReadOnlyClient(args.chain);

        if (!args.tokenAddress) {
          const wei = await client.getBalance({ address: args.address });
          return {
            content: [
              {
                type: "text",
                text: serializeBigInt({
                  chain: args.chain,
                  address: args.address,
                  asset: "BNB",
                  decimals: 18,
                  raw: wei,
                  formatted: formatEther(wei),
                }),
              },
            ],
          };
        }

        const erc20Abi = parseAbi([
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)",
          "function symbol() view returns (string)",
        ]);

        const [rawBalance, decimals, symbol] = await Promise.all([
          client.readContract({
            address: args.tokenAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [args.address],
          }),
          client.readContract({
            address: args.tokenAddress,
            abi: erc20Abi,
            functionName: "decimals",
          }),
          client
            .readContract({
              address: args.tokenAddress,
              abi: erc20Abi,
              functionName: "symbol",
            })
            .catch(() => "ERC20"),
        ]);

        return {
          content: [
            {
              type: "text",
              text: serializeBigInt({
                chain: args.chain,
                address: args.address,
                tokenAddress: args.tokenAddress,
                symbol,
                decimals,
                raw: rawBalance,
                formatted: formatUnits(rawBalance, decimals),
              }),
            },
          ],
        };
      }

      case "read_contract": {
        const args = ReadContractArgs.parse(rawArgs);
        const client = getReadOnlyClient(args.chain);
        const abi = normalizeAbi(args.abi);
        const result = await client.readContract({
          address: args.address,
          abi,
          functionName: args.functionName,
          args: args.args,
        });
        return {
          content: [{ type: "text", text: serializeBigInt({ result }) }],
        };
      }

      case "get_logs": {
        const args = GetLogsArgs.parse(rawArgs);
        const client = getReadOnlyClient(args.chain);
        const latest = await client.getBlockNumber();
        const fromBlock =
          args.fromBlock !== undefined ? BigInt(args.fromBlock) : latest - 100n;
        const toBlock =
          args.toBlock !== undefined ? BigInt(args.toBlock) : latest;

        if (toBlock - fromBlock > 1000n) {
          throw new Error(
            "Block range exceeds 1000 blocks. Narrow fromBlock/toBlock."
          );
        }

        const logs = await client.getLogs({
          address: args.address,
          fromBlock,
          toBlock,
        });
        return {
          content: [
            {
              type: "text",
              text: serializeBigInt({
                chain: args.chain,
                fromBlock,
                toBlock,
                count: logs.length,
                logs,
              }),
            },
          ],
        };
      }

      case "get_tx": {
        const args = GetTxArgs.parse(rawArgs);
        const client = getReadOnlyClient(args.chain);
        const [tx, receipt] = await Promise.all([
          client.getTransaction({ hash: args.hash }),
          client.getTransactionReceipt({ hash: args.hash }).catch(() => null),
        ]);
        return {
          content: [
            { type: "text", text: serializeBigInt({ transaction: tx, receipt }) },
          ],
        };
      }

      case "simulate_call": {
        const args = SimulateCallArgs.parse(rawArgs);
        const client = getReadOnlyClient(args.chain);
        const result = await client.call({
          account: args.account,
          to: args.to,
          data: args.data,
          value: args.valueWei ? BigInt(args.valueWei) : undefined,
        });
        return {
          content: [{ type: "text", text: serializeBigInt(result) }],
        };
      }

      case "decode_calldata": {
        const args = DecodeCalldataArgs.parse(rawArgs);
        const abi = normalizeAbi(args.abi);
        const decoded = decodeFunctionData({
          abi,
          data: args.data,
        });
        return {
          content: [{ type: "text", text: serializeBigInt(decoded) }],
        };
      }

      default:
        throw new Error(`Unsupported read-only tool: ${name}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: "text", text: `Error: ${message}` }],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error in @rareware/mcp-chain-readonly:", err);
  process.exit(1);
});
