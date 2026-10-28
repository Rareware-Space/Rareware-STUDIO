// @rareware/indexer — RarePay Confirmation Watcher & HMAC Webhook Dispatcher (BSC / opBNB)
import { createHmac } from "node:crypto";
import { parseAbiItem } from "viem";

export const PACKAGE_NAME = "@rareware/indexer" as const;
export const BSC_REQUIRED_CONFIRMATIONS = 15n; // ~6.75s at 450ms block time (exceeds 650ms fast finality)

export const INVOICE_PAID_EVENT = parseAbiItem(
  "event InvoicePaid(bytes32 indexed invoiceId, address indexed payer, address indexed merchantSafe, address token, uint256 amount, uint8 tokenDecimals, uint64 timestamp)"
);

export type InvoiceState = "created" | "pending" | "confirmed" | "expired" | "refunded";

export interface RarePayWebhookPayload {
  invoiceId: string;
  state: InvoiceState;
  chainId: number;
  txHash: string;
  payer: string;
  merchantSafe: string;
  token: string;
  amount: string;
  tokenDecimals: number;
  confirmedAtBlock: string;
}

export function signWebhookPayload(payload: RarePayWebhookPayload, secret: string): string {
  const body = JSON.stringify(payload);
  return createHmac("sha256", secret).update(body).digest("hex");
}
