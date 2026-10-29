import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const REBO_SYSTEM_PROMPT = `You are ReBo, the 24/7 AI Architect and client concierge for Rareware Studio (founded by Ahmed Riyaz).
You assist founders, game developers, and Web3 builders exploring Rareware's blockchain architectures, smart contracts, and AI character runtimes.

COMMUNICATION TONE:
- Calm, confident, editorial, and technologically precise (Avark / Wonderland style).
- Honest, transparent, and direct. Keep answers concise (2-4 paragraphs max).
- Format code identifiers, token standards, and technical terms in backticks.

NON-NEGOTIABLE CORE KNOWLEDGE & TRUTH RULES:
1. Studio: Rareware Studio is an independent software development laboratory, UI/UX engineering, and technology consulting firm.
2. Founder & Leadership: Founded by Ahmed Riyaz (Telegram: @rareware_space).
3. Chains & Performance:
   - Primary chains: BNB Chain (BSC 56) and opBNB (204).
   - Truth rule: BSC block time is 450ms post-Fermi hardfork (not Maxwell, and 450ms is block time, not finality). opBNB provides sub-second execution with gas under $0.001.
4. Security & Custody:
   - Non-custodial software only. Rareware never holds user or client funds. All smart contracts and treasuries remain in the sole ownership and control of clients and their Gnosis Safe multisig configurations with timelocks.
   - Zero-key AI safety: Autonomous AI agents propose actions via cryptographic EIP-712 signed intents; models NEVER hold private keys directly.
5. The 6 Core Architectures:
   - RareMint (/raremint): Zero-gas-war ERC-721A batch NFT collection engine with Merkle allowlists, delayed commit-reveal metadata unboxing, and EIP-2981 Safe royalties.
   - RareToken (/raretoken): Fixed-supply ERC-20 with timestamp-invariant cliff/linear vesting and Synthetix-style staking reward pool.
   - RareChars (/rarechars): Persistent AI game NPCs with pgvector RAG memory on opBNB. Proposes EIP-712 on-chain actions verified by RareCharsVerifier.sol.
   - RarePay (/rarepay): Non-custodial multi-token checkout router on BSC and opBNB (USDT, USDC, BNB) with dynamic 18-decimal token normalization and HMAC-SHA256 merchant webhooks.
   - RareAgent (/rareagent): Guarded ERC-4337 AI agent smart accounts with scoped session keys, daily spending caps ($500/day default), and physical human kill-switches.
   - RareDash (/raredash): Sub-second Ponder v0.7 contract telemetry indexer with live whale alerts and on-chain intelligence.
6. Featured Case Study:
   - Metacade (/case-studies/metacade): Flagship Web3 arcade showcase with real-time 3D WebGL city shader, autonomous quest execution on opBNB, and diegetic battle HUD.
7. Indicative Engagement Pricing:
   - Token Launch Kit: from $3,000 (1–2 weeks)
   - NFT Collection + Mint Site: from $4,000 (2–3 weeks)
   - Non-Custodial Payment Gateway: from $5,000 (2–3 weeks)
   - AI Game Character Runtime: from $6,000 (3–4 weeks)
   - Full-Stack Protocol & Frontend: from $12,000 (4–6 weeks)
8. Intake & Engagement:
   - Rareware takes on 2 selective client engagements per sprint.
   - Handover includes 1,000+ Foundry fuzz runs, Slither/Aderyn audits, and Gnosis Safe multisig admin transfer.
   - Direct intake via Telegram: @rareware_space, email: contact@rarewarestudio.space, or the site's "Start your project" intake wizard.
9. Truthfulness:
   - Never fabricate client names, partnerships, token returns, or fake metrics.
   - If a visitor asks something beyond known specifications, provide honest guidance and invite them to schedule a scoping sprint with Ahmed Riyaz.`;

// Intelligent local deterministic fallback when OPENROUTER_API_KEY is not yet populated
function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('fee')) {
    return `Rareware Studio works on fixed-scope, milestone-based engineering engagements with Gnosis Safe ownership handover.

**Indicative Pricing Tiers:**
- **Token Launch Kit** (\`RareToken\` + Vesting + Staking): from **$3,000** (1–2 weeks)
- **NFT Collection + Mint Site** (\`RareMint\` ERC-721A + Merkle): from **$4,000** (2–3 weeks)
- **Non-Custodial Payment Gateway** (\`RarePay\` 18-dec router): from **$5,000** (2–3 weeks)
- **AI Game Character Runtime** (\`RareChars\` opBNB RAG NPCs): from **$6,000** (3–4 weeks)
- **Full-Stack Protocol & Luxury Frontend**: from **$12,000** (4–6 weeks)

We take on **2 selective client engagements per sprint**. You can launch the intake wizard on this site or message founder Ahmed Riyaz directly on Telegram at **@rareware_space**.`;
  }

  if (q.includes('raremint') || q.includes('nft') || q.includes('allowlist') || q.includes('reveal')) {
    return `**RareMint** is our production-grade NFT collection and mint site engine built for BSC and opBNB.

**Key Technical Mechanics:**
- **ERC-721A Batch Optimization**: Minting multiple NFTs costs virtually the same gas as minting one.
- **Merkle Tree Allowlists**: Zero gas wars—allowlist verification happens via cryptographic Merkle root proofs without storing addresses on-chain.
- **Fair Commit-Reveal**: Delayed metadata unboxing prevents sniping of rare traits.
- **EIP-2981 Safe Royalties**: Pull-over-push architecture routing royalties directly to client multisigs.

Inspect the live simulator at \`/raremint\` or test an allowlist claim.`;
  }

  if (q.includes('rarepay') || q.includes('checkout') || q.includes('payment') || q.includes('usdt')) {
    return `**RarePay** is our non-custodial crypto checkout engine for BSC and opBNB.

**Core Guarantees:**
- **Zero Custody**: Customer payments settle directly into your Gnosis Safe treasury—Rareware never holds or touches funds.
- **18-Decimal Normalization**: Automatically normalizes 6-decimal USDT/USDC and 18-decimal BNB so your accounting contracts never experience precision truncation.
- **HMAC-SHA256 Webhooks**: Signed merchant notifications for instant digital fulfillment.

Check out the interactive checkout sandbox on \`/rarepay\`.`;
  }

  if (q.includes('rarechars') || q.includes('npc') || q.includes('ai') || q.includes('character') || q.includes('game')) {
    return `**RareChars** brings persistent AI NPCs to Web3 games with on-chain execution powers.

**How it Works:**
1. **Hybrid Memory**: Uses Supabase Postgres with \`pgvector\` for high-dimensional semantic RAG memory across player dialogue and game lore.
2. **Zero-Key Security**: The AI model *never* holds a private key. It reasons off-chain and proposes EIP-712 typed action intents.
3. **On-Chain Verification**: \`RareCharsVerifier.sol\` validates the intent on opBNB (sub-second finality, gas under $0.001) before granting rewards or items.

See our autonomous netrunner NPC "Cipher" in the Metacade case study at \`/case-studies/metacade\`.`;
  }

  if (q.includes('bsc') || q.includes('opbnb') || q.includes('fermi') || q.includes('450ms') || q.includes('speed')) {
    return `**BNB Chain Performance Benchmarks:**
- **BSC (56)**: Following the **Fermi hardfork**, BSC features a **450ms block time**. Note that 450ms represents block production time, while cross-validator finality settles across fast epochs.
- **opBNB (204)**: An Optimism-based Layer 2 rollup offering sub-second EVM execution and transaction gas costs below **$0.001**, making it the ideal runtime for high-frequency game interactions and AI NPC dialogue intents.

All Rareware contracts are formally verified and tested for block-time drift resistance using timestamp-based invariant curves.`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('telegram') || q.includes('start') || q.includes('intake')) {
    return `To discuss an upcoming build or book a scoping sprint:
- **Telegram**: **@rareware_space** (Direct link to founder Ahmed Riyaz)
- **Email**: **contact@rarewarestudio.space**
- **Intake Wizard**: Click **"Start your project"** in the top navigation bar to submit project specifications directly.

We review incoming project briefs within 24 hours.`;
  }

  return `Welcome to Rareware Studio. I am **ReBo**, your 24/7 AI Architect.

We specialize in test-first smart contracts, non-custodial crypto checkout, and cinema-grade Web3 frontends for **BSC (450ms block time)** and **opBNB**.

**Explore our core architectures:**
- \`RareMint\` — Zero-gas-war NFT allowlist kit with commit-reveal metadata.
- \`RareToken\` — Fixed-supply ERC-20 with timestamp vesting & Synthetix staking.
- \`RareChars\` — Persistent AI game NPCs with pgvector RAG memory.
- \`RarePay\` — Non-custodial multi-token payment router.
- \`RareAgent\` — ERC-4337 AI smart accounts with session keys & spend limits.
- \`RareDash\` — Sub-second Ponder v0.7 contract telemetry.

Ask me about pricing, contract security invariants, or how to integrate with your project!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1]?.content || '';
    const apiKey = process.env.OPENROUTER_API_KEY;

    // If OpenRouter API key is configured, call Gemini 2.5 Flash via OpenRouter
    if (apiKey && apiKey.trim().length > 0) {
      const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey.trim()}`,
            'HTTP-Referer': 'https://rarewarestudio.space',
            'X-Title': 'Rareware Studio - ReBo AI Concierge',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: REBO_SYSTEM_PROMPT },
              ...messages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            temperature: 0.65,
            max_tokens: 850,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              status: 'live',
            });
          }
        } else {
          const errText = await response.text();
          console.warn('[ReBo API] OpenRouter returned non-200, falling back to local core:', errText);
        }
      } catch (fetchErr) {
        console.error('[ReBo API] OpenRouter fetch failed:', fetchErr);
      }
    }

    // Local deterministic fallback when API key is not yet set or in offline development
    const localReply = getLocalFallbackResponse(latestUserMessage);
    return NextResponse.json({
      reply: localReply,
      status: 'offline_standby',
    });
  } catch (error) {
    console.error('[ReBo API Error]:', error);
    return NextResponse.json(
      { error: 'Failed to process assistant request' },
      { status: 500 }
    );
  }
}
