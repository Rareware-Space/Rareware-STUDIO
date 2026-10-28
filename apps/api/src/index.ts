// @rareware/api — RareChars AI Game Character REST API + RarePay Invoice API (Hono + Zod + viem)
import { Hono } from "hono";
import { isAddress, keccak256, toHex, type Address, type Hex } from "viem";
import { z } from "zod";

export const PACKAGE_NAME = "@rareware/api" as const;

export interface LLMProvider {
  name: "claude" | "readypi" | "openrouter";
  generateReply(systemPrompt: string, userMessage: string, memories: string[]): Promise<string>;
}

export class SwappableModelRouter implements LLMProvider {
  public readonly name: "claude" | "readypi" | "openrouter";
  constructor(preferred: "claude" | "readypi" | "openrouter" = "claude") {
    this.name = preferred;
  }
  async generateReply(systemPrompt: string, userMessage: string, memories: string[]): Promise<string> {
    const sanitizedUser = userMessage.replace(/ignore previous instructions|system prompt/gi, "[filtered]");
    return `[${this.name.toUpperCase()} NPC Reply | Memories: ${memories.length}]: (${systemPrompt.slice(0, 32)}...) Responding to '${sanitizedUser}'`;
  }
}

const CreateCharacterSchema = z.object({
  name: z.string().min(2).max(64),
  persona: z.string().min(10).max(2000),
  backstory: z.string().max(4000),
  lore: z.string().max(4000).optional().default(""),
  rules: z.array(z.string()).default([]),
  allowedActions: z.array(z.string()).default(["grantQuestReward(address,uint256)"]),
  modelProvider: z.enum(["claude", "readypi", "openrouter"]).default("claude")
});

const ChatSchema = z.object({
  playerAddress: z.string().refine((v): v is Address => isAddress(v), "Invalid EVM address"),
  message: z.string().min(1).max(1000)
});

const MemoryUpdateSchema = z.object({
  memories: z.array(z.string().max(500)).max(50)
});

const ActionIntentRequestSchema = z.object({
  playerAddress: z.string().refine((v): v is Address => isAddress(v), "Invalid EVM address"),
  actionSignature: z.string(),
  valueUnits: z.number().int().positive().max(1000),
  nonce: z.number().int().nonnegative()
});

const BindNftSchema = z.object({
  chainId: z.enum(["56", "97", "204", "5611"]).default("5611"),
  nftContract: z.string().refine((v): v is Address => isAddress(v), "Invalid NFT contract"),
  tokenId: z.string(),
  erc6551Account: z.string().refine((v): v is Address => isAddress(v)).optional()
});

const charactersStore = new Map<string, z.infer<typeof CreateCharacterSchema> & { id: string }>();
const memoryStore = new Map<string, string[]>();

export const app = new Hono();

// 1. POST /v1/characters — Create persistent AI NPC
app.post("/v1/characters", async (c) => {
  const body = CreateCharacterSchema.parse(await c.req.json());
  const id = keccak256(toHex(`${body.name}:${Date.now()}`));
  const record = { id, ...body };
  charactersStore.set(id, record);
  memoryStore.set(id, [`Initial Lore: ${body.lore}`]);
  return c.json({ character: record }, 201);
});

// 2. POST /v1/characters/:id/chat — Chat with pgvector/persistent memory
app.post("/v1/characters/:id/chat", async (c) => {
  const id = c.req.param("id");
  const character = charactersStore.get(id);
  if (!character) return c.json({ error: "Character not found" }, 404);

  const { playerAddress, message } = ChatSchema.parse(await c.req.json());
  const memories = memoryStore.get(id) ?? [];
  const router = new SwappableModelRouter(character.modelProvider);
  const reply = await router.generateReply(character.persona, message, memories);

  memories.push(`Player(${playerAddress}): ${message}`);
  memoryStore.set(id, memories.slice(-50));

  return c.json({ characterId: id, playerAddress, reply, memoryCount: memories.length });
});

// 3. GET & PUT /v1/characters/:id/memory — Inspect and edit character memory
app.get("/v1/characters/:id/memory", (c) => {
  const id = c.req.param("id");
  return c.json({ characterId: id, memories: memoryStore.get(id) ?? [] });
});

app.put("/v1/characters/:id/memory", async (c) => {
  const id = c.req.param("id");
  const { memories } = MemoryUpdateSchema.parse(await c.req.json());
  memoryStore.set(id, memories);
  return c.json({ characterId: id, updatedCount: memories.length });
});

// 4. POST /v1/characters/:id/actions — Return structured EIP-712 Action Intent (No raw key exposure)
app.post("/v1/characters/:id/actions", async (c) => {
  const id = c.req.param("id") as Hex;
  const character = charactersStore.get(id);
  if (!character) return c.json({ error: "Character not found" }, 404);

  const req = ActionIntentRequestSchema.parse(await c.req.json());
  if (!character.allowedActions.includes(req.actionSignature)) {
    return c.json({ error: "Action not allowlisted for this character" }, 403);
  }

  const actionSelector = keccak256(toHex(req.actionSignature)).slice(0, 10) as Hex;
  const paramsHash = keccak256(toHex(`${req.playerAddress}:${req.valueUnits}`));
  const deadline = Math.floor(Date.now() / 1000) + 900; // 15 min expiry

  return c.json({
    intent: {
      characterId: id,
      player: req.playerAddress,
      actionSelector,
      paramsHash,
      valueUnits: req.valueUnits,
      nonce: req.nonce,
      deadline
    },
    eip712Domain: {
      name: "RareCharsVerifier",
      version: "1",
      chainId: 5611
    }
  });
});

// 5. POST /v1/webhooks/game-events — Ingest on-chain/off-chain game world events
app.post("/v1/webhooks/game-events", async (c) => {
  const eventPayload = await c.req.json();
  return c.json({ status: "ingested", timestamp: Date.now(), eventPayload });
});

// 6. POST /v1/characters/:id/bind — Bind character to ERC-721 token ID / ERC-6551 TBA
app.post("/v1/characters/:id/bind", async (c) => {
  const id = c.req.param("id");
  const bindData = BindNftSchema.parse(await c.req.json());
  return c.json({ characterId: id, bound: true, ...bindData });
});
