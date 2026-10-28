# RareMint Architecture & Threat Model

## 1. Scope & Purpose
`RareMint` is Rareware Studio's open-source, production-grade ERC-721 NFT collection and minting kit for BSC (`56`/`97`) and opBNB (`204`/`5611`).

## 2. Actors & Trust Assumptions
- **Admin / Owner (`Ownable2Step`):** Deployed by a deployer EOA on testnet, or handed over immediately to a **Safe Multisig + Timelock** before mainnet activation. Can configure phases, Merkle root, URIs, royalties, pause state, and trigger fund withdrawal to the designated `treasurySafe`.
- **Treasury Safe (`address immutable treasurySafe` or configurable via 2-step check):** Receives 100% of mint proceeds.
- **Allowlist Minter:** Verified via cryptographic Merkle proof against `merkleRoot`.
- **Public Minter:** Any wallet minting during the `Public` phase within `maxPerWallet` and `maxPerTx` bounds.

## 3. Storage Layout (Packed for Gas Efficiency)
- `uint256 public constant MAX_ROYALTY_BPS = 1000;` (10% hard cap)
- `uint32 public immutable maxSupply;`
- `uint32 public immutable maxPerWallet;`
- `uint32 public immutable maxPerTx;`
- `address public treasurySafe;`
- `uint128 public allowlistPrice;`
- `uint128 public publicPrice;`
- `bytes32 public merkleRoot;`
- `uint32 public totalMinted;`
- `MintPhase public phase;` (`uint8`: `0 = Closed`, `1 = Allowlist`, `2 = Public`)
- `bool public revealed;`
- `string private _baseTokenURI;`
- `string private _hiddenMetadataURI;`
- `mapping(address => uint32) public mintedPerWallet;`

## 4. Access-Control Matrix
| Function | Caller | Phase Requirement | Reentrancy Guard |
|---|---|---|---|
| `mintAllowlist(uint32 quantity, uint32 maxAllowance, bytes32[] calldata proof)` | Any Allowlisted Wallet | `Allowlist` | `nonReentrant` |
| `mintPublic(uint32 quantity)` | Any Wallet | `Public` | `nonReentrant` |
| `setPhase(MintPhase newPhase)` | `onlyOwner` | Any | N/A |
| `setPrices(uint128 newAllowlistPrice, uint128 newPublicPrice)` | `onlyOwner` | Any | N/A |
| `setMerkleRoot(bytes32 newRoot)` | `onlyOwner` | Any | N/A |
| `reveal(string calldata revealedBaseURI)` | `onlyOwner` | Any | N/A |
| `setTreasurySafe(address newSafe)` | `onlyOwner` | Any | N/A |
| `setDefaultRoyalty(address receiver, uint96 feeNumerator)` | `onlyOwner` | Any | N/A |
| `withdraw()` | `onlyOwner` | Any | `nonReentrant` |

## 5. Threat Model & Mitigations
1. **ERC-721 `_safeMint` Reentrancy:** `_safeMint` invokes `onERC721Received` on contract recipients. *Mitigation:* Follow strict Checks-Effects-Interactions (increment `totalMinted` and `mintedPerWallet[msg.sender]` BEFORE calling `_safeMint`) AND apply OpenZeppelin `ReentrancyGuard` (`nonReentrant`).
2. **Merkle Tree Second-Preimage Attack:** *Mitigation:* Double-hash leaves using `keccak256(bytes.concat(keccak256(abi.encode(msg.sender, maxAllowance))))`.
3. **Per-Wallet Cap Bypass via NFT Transfer:** *Mitigation:* Track mint count in dedicated `mintedPerWallet[msg.sender]` mapping rather than `balanceOf(msg.sender)`.
4. **Stuck Funds / Griefing on Withdraw:** *Mitigation:* `withdraw()` sends funds solely to `treasurySafe` (never arbitrary `msg.sender`) and checks return boolean.
5. **Accidental Ownership Loss:** *Mitigation:* Inherit `Ownable2Step` so ownership transfers require explicit `acceptOwnership()` by the target Safe.
