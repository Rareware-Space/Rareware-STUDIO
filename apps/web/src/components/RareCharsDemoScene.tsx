// 1-Scene Demo Game with 2 Persistent AI NPCs on opBNB Testnet (5611)
// Used as proof asset for BNB Chain dev-tools-list, DappBay, and MVB / BNB AI Hack submission.

export interface DemoNpcConfig {
  id: string;
  name: string;
  role: string;
  allowedOnChainAction: string;
  dailyCapUnits: number;
}

export const OPBNB_DEMO_SCENE_NPCS: readonly DemoNpcConfig[] = [
  {
    id: "0x8b7e028546950c122026a9b61b50000000000000000000000000000000000001",
    name: "Kaelen the Vault Archivist",
    role: "Keeper of Ancient opBNB Relics (Remembers player lore & issues EIP-712 Relic Mint Intents)",
    allowedOnChainAction: "grantQuestReward(address,uint256)",
    dailyCapUnits: 1000
  },
  {
    id: "0x8b7e028546950c122026a9b61b50000000000000000000000000000000000002",
    name: "Nyx-7 Cybernetic Quartermaster",
    role: "Tactical Merchant (Negotiates prices based on player reputation & signs discount intents)",
    allowedOnChainAction: "unlockMerchantTier(address,uint256)",
    dailyCapUnits: 500
  }
] as const;
