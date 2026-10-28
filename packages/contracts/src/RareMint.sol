// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC2981 } from "@openzeppelin/contracts/token/common/ERC2981.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

/// @title RareMint
/// @author Rareware Studio (ARZ)
/// @notice Production-grade ERC-721 collection with Merkle allowlist, public mint, per-wallet caps, delayed reveal, ERC-2981 royalties, and Safe treasury withdrawal.
contract RareMint is ERC721, ERC2981, Ownable2Step, ReentrancyGuard {
    using Strings for uint256;

    enum MintPhase {
        Closed,
        Allowlist,
        Public
    }

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error InvalidAddress();
    error InvalidConfig();
    error InvalidPhase(MintPhase current, MintPhase expected);
    error ZeroQuantity();
    error MaxPerTxExceeded(uint32 requested, uint32 maxPerTx);
    error MaxWalletCapExceeded(uint32 requested, uint32 remainingAllowance);
    error MaxSupplyExceeded(uint32 requested, uint32 remainingSupply);
    error IncorrectPayment(uint256 sent, uint256 required);
    error InvalidMerkleProof();
    error RoyaltyTooHigh(uint96 requestedBps, uint96 maxBps);
    error AlreadyRevealed();
    error EmptyMetadataURI();
    error WithdrawFailed();

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event PhaseUpdated(MintPhase indexed oldPhase, MintPhase indexed newPhase);
    event PricesUpdated(uint128 allowlistPrice, uint128 publicPrice);
    event MerkleRootUpdated(bytes32 indexed newMerkleRoot);
    event CollectionRevealed(string baseURI);
    event TreasurySafeUpdated(address indexed oldSafe, address indexed newSafe);
    event Minted(address indexed minter, uint32 quantity, uint256 firstTokenId, MintPhase phase);
    event ProceedsWithdrawn(address indexed treasurySafe, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    uint96 public constant MAX_ROYALTY_BPS = 1_000; // 10%

    uint32 public immutable maxSupply;
    uint32 public immutable maxPerWallet;
    uint32 public immutable maxPerTx;

    address public treasurySafe;
    uint128 public allowlistPrice;
    uint128 public publicPrice;
    bytes32 public merkleRoot;

    uint32 public totalMinted;
    MintPhase public phase;
    bool public revealed;

    string private _baseTokenURI;
    string private _hiddenMetadataURI;

    mapping(address minter => uint32 count) public mintedPerWallet;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    struct InitParams {
        string name;
        string symbol;
        address initialOwner;
        address treasurySafe;
        uint32 maxSupply;
        uint32 maxPerWallet;
        uint32 maxPerTx;
        uint128 allowlistPrice;
        uint128 publicPrice;
        uint96 royaltyBps;
        string hiddenMetadataURI;
    }

    constructor(InitParams memory params) ERC721(params.name, params.symbol) Ownable(params.initialOwner) {
        if (params.initialOwner == address(0) || params.treasurySafe == address(0)) {
            revert InvalidAddress();
        }
        if (params.maxSupply == 0 || params.maxPerWallet == 0 || params.maxPerTx == 0) {
            revert InvalidConfig();
        }
        if (params.maxPerTx > params.maxPerWallet || params.maxPerWallet > params.maxSupply) {
            revert InvalidConfig();
        }
        if (params.royaltyBps > MAX_ROYALTY_BPS) {
            revert RoyaltyTooHigh(params.royaltyBps, MAX_ROYALTY_BPS);
        }
        if (bytes(params.hiddenMetadataURI).length == 0) {
            revert EmptyMetadataURI();
        }

        treasurySafe = params.treasurySafe;
        maxSupply = params.maxSupply;
        maxPerWallet = params.maxPerWallet;
        maxPerTx = params.maxPerTx;
        allowlistPrice = params.allowlistPrice;
        publicPrice = params.publicPrice;
        _hiddenMetadataURI = params.hiddenMetadataURI;

        _setDefaultRoyalty(params.treasurySafe, params.royaltyBps);
    }

    /*//////////////////////////////////////////////////////////////
                            MINTING LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Mint tokens during the Allowlist phase using a valid Merkle proof
    /// @param quantity Number of tokens to mint
    /// @param maxAllowance Max tokens permitted for msg.sender in the Merkle tree
    /// @param proof Merkle proof verifying (msg.sender, maxAllowance)
    function mintAllowlist(
        uint32 quantity,
        uint32 maxAllowance,
        bytes32[] calldata proof
    ) external payable nonReentrant {
        if (phase != MintPhase.Allowlist) {
            revert InvalidPhase(phase, MintPhase.Allowlist);
        }

        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, maxAllowance))));
        if (!MerkleProof.verifyCalldata(proof, merkleRoot, leaf)) {
            revert InvalidMerkleProof();
        }

        uint32 effectiveCap = maxAllowance < maxPerWallet ? maxAllowance : maxPerWallet;
        _executeMint(msg.sender, quantity, effectiveCap, allowlistPrice, MintPhase.Allowlist);
    }

    /// @notice Mint tokens during the Public phase
    /// @param quantity Number of tokens to mint
    function mintPublic(uint32 quantity) external payable nonReentrant {
        if (phase != MintPhase.Public) {
            revert InvalidPhase(phase, MintPhase.Public);
        }
        _executeMint(msg.sender, quantity, maxPerWallet, publicPrice, MintPhase.Public);
    }

    function _executeMint(
        address minter,
        uint32 quantity,
        uint32 walletCap,
        uint128 unitPrice,
        MintPhase currentPhase
    ) internal {
        if (quantity == 0) revert ZeroQuantity();
        if (quantity > maxPerTx) revert MaxPerTxExceeded(quantity, maxPerTx);

        uint32 alreadyMinted = mintedPerWallet[minter];
        if (alreadyMinted + quantity > walletCap) {
            uint32 remaining = walletCap > alreadyMinted ? walletCap - alreadyMinted : 0;
            revert MaxWalletCapExceeded(quantity, remaining);
        }

        uint32 currentTotal = totalMinted;
        if (currentTotal + quantity > maxSupply) {
            revert MaxSupplyExceeded(quantity, maxSupply - currentTotal);
        }

        uint256 requiredValue = uint256(unitPrice) * uint256(quantity);
        if (msg.value != requiredValue) {
            revert IncorrectPayment(msg.value, requiredValue);
        }

        // Effects before Interactions (CEI)
        mintedPerWallet[minter] = alreadyMinted + quantity;
        totalMinted = currentTotal + quantity;

        uint256 firstTokenId = uint256(currentTotal) + 1;
        for (uint32 i = 0; i < quantity; ) {
            _safeMint(minter, firstTokenId + i);
            unchecked {
                ++i;
            }
        }

        emit Minted(minter, quantity, firstTokenId, currentPhase);
    }

    /*//////////////////////////////////////////////////////////////
                            ADMIN CONTROLS
    //////////////////////////////////////////////////////////////*/

    /// @notice Transition the active mint phase
    function setPhase(MintPhase newPhase) external onlyOwner {
        MintPhase oldPhase = phase;
        phase = newPhase;
        emit PhaseUpdated(oldPhase, newPhase);
    }

    /// @notice Update allowlist and public mint prices
    function setPrices(uint128 newAllowlistPrice, uint128 newPublicPrice) external onlyOwner {
        allowlistPrice = newAllowlistPrice;
        publicPrice = newPublicPrice;
        emit PricesUpdated(newAllowlistPrice, newPublicPrice);
    }

    /// @notice Update the Merkle root for allowlist verification
    function setMerkleRoot(bytes32 newRoot) external onlyOwner {
        merkleRoot = newRoot;
        emit MerkleRootUpdated(newRoot);
    }

    /// @notice One-way reveal of the collection metadata
    function reveal(string calldata revealedBaseURI) external onlyOwner {
        if (revealed) revert AlreadyRevealed();
        if (bytes(revealedBaseURI).length == 0) revert EmptyMetadataURI();
        revealed = true;
        _baseTokenURI = revealedBaseURI;
        emit CollectionRevealed(revealedBaseURI);
    }

    /// @notice Update the destination Safe multisig address
    function setTreasurySafe(address newSafe) external onlyOwner {
        if (newSafe == address(0)) revert InvalidAddress();
        address oldSafe = treasurySafe;
        treasurySafe = newSafe;
        emit TreasurySafeUpdated(oldSafe, newSafe);
    }

    /// @notice Update ERC-2981 royalty configuration (capped at 10%)
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner {
        if (receiver == address(0)) revert InvalidAddress();
        if (feeNumerator > MAX_ROYALTY_BPS) revert RoyaltyTooHigh(feeNumerator, MAX_ROYALTY_BPS);
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    /// @notice Withdraw entire contract balance to the configured treasurySafe
    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        address recipient = treasurySafe;
        (bool success, ) = recipient.call{ value: balance }("");
        if (!success) revert WithdrawFailed();
        emit ProceedsWithdrawn(recipient, balance);
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @inheritdoc ERC721
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        if (!revealed) {
            return _hiddenMetadataURI;
        }
        return string.concat(_baseTokenURI, tokenId.toString(), ".json");
    }

    /// @inheritdoc ERC721
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
