// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title RareCharsVerifier
/// @author Rareware Studio (ARZ)
/// @notice Validates EIP-712 signed AI NPC action intents with strict allowlists, nonces, deadlines, and daily caps.
contract RareCharsVerifier is EIP712, Ownable2Step, ReentrancyGuard {
    using ECDSA for bytes32;

    struct CharacterActionIntent {
        bytes32 characterId;
        address player;
        bytes4 actionSelector;
        bytes32 paramsHash;
        uint256 valueUnits;
        uint256 nonce;
        uint64 deadline;
    }

    bytes32 public constant ACTION_INTENT_TYPEHASH =
        keccak256(
            "CharacterActionIntent(bytes32 characterId,address player,bytes4 actionSelector,bytes32 paramsHash,uint256 valueUnits,uint256 nonce,uint64 deadline)"
        );

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error InvalidAddress();
    error IntentExpired(uint64 deadline, uint64 currentTimestamp);
    error InvalidNonce(uint256 provided, uint256 expected);
    error ActionNotAllowed(bytes4 actionSelector);
    error DailyCapExceeded(bytes32 characterId, uint256 requested, uint256 remainingToday);
    error InvalidIntentSignature();

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event IntentSignerUpdated(address indexed oldSigner, address indexed newSigner);
    event ActionAllowedUpdated(bytes4 indexed actionSelector, bool allowed);
    event CharacterDailyCapUpdated(bytes32 indexed characterId, uint256 newDailyCap);
    event CharacterBoundToNFT(bytes32 indexed characterId, address indexed nftContract, uint256 indexed tokenId, address tbaAddress);
    event CharacterActionExecuted(
        bytes32 indexed characterId,
        address indexed player,
        bytes4 indexed actionSelector,
        bytes32 paramsHash,
        uint256 valueUnits,
        uint256 nonce
    );

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    address public intentSigner;

    mapping(bytes4 selector => bool allowed) public allowedActions;
    mapping(bytes32 characterId => mapping(address player => uint256 nonce)) public nonces;
    mapping(bytes32 characterId => uint256 maxUnitsPerDay) public characterDailyCap;
    mapping(bytes32 characterId => mapping(uint256 dayEpoch => uint256 usedUnits)) public dailyUsage;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor(
        address initialOwner,
        address initialIntentSigner
    ) EIP712("RareCharsVerifier", "1") Ownable(initialOwner) {
        if (initialOwner == address(0) || initialIntentSigner == address(0)) {
            revert InvalidAddress();
        }
        intentSigner = initialIntentSigner;
    }

    /*//////////////////////////////////////////////////////////////
                          INTENT VERIFICATION
    //////////////////////////////////////////////////////////////*/

    /// @notice Verify and consume an EIP-712 signed NPC action intent
    function verifyAndConsumeIntent(
        CharacterActionIntent calldata intent,
        bytes calldata signature
    ) external nonReentrant returns (bytes32 digest) {
        if (block.timestamp > intent.deadline) {
            revert IntentExpired(intent.deadline, uint64(block.timestamp));
        }
        if (!allowedActions[intent.actionSelector]) {
            revert ActionNotAllowed(intent.actionSelector);
        }

        uint256 expectedNonce = nonces[intent.characterId][intent.player];
        if (intent.nonce != expectedNonce) {
            revert InvalidNonce(intent.nonce, expectedNonce);
        }

        uint256 cap = characterDailyCap[intent.characterId];
        if (cap > 0) {
            uint256 today = block.timestamp / 1 days;
            uint256 used = dailyUsage[intent.characterId][today];
            if (used + intent.valueUnits > cap) {
                revert DailyCapExceeded(intent.characterId, intent.valueUnits, cap - used);
            }
            dailyUsage[intent.characterId][today] = used + intent.valueUnits;
        }

        digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    ACTION_INTENT_TYPEHASH,
                    intent.characterId,
                    intent.player,
                    intent.actionSelector,
                    intent.paramsHash,
                    intent.valueUnits,
                    intent.nonce,
                    intent.deadline
                )
            )
        );

        address recovered = ECDSA.recover(digest, signature);
        if (recovered != intentSigner) {
            revert InvalidIntentSignature();
        }

        nonces[intent.characterId][intent.player] = expectedNonce + 1;

        emit CharacterActionExecuted(
            intent.characterId,
            intent.player,
            intent.actionSelector,
            intent.paramsHash,
            intent.valueUnits,
            intent.nonce
        );
    }

    /*//////////////////////////////////////////////////////////////
                             ADMIN CONTROLS
    //////////////////////////////////////////////////////////////*/

    function setIntentSigner(address newSigner) external onlyOwner {
        if (newSigner == address(0)) revert InvalidAddress();
        address old = intentSigner;
        intentSigner = newSigner;
        emit IntentSignerUpdated(old, newSigner);
    }

    function setActionAllowed(bytes4 actionSelector, bool allowed) external onlyOwner {
        allowedActions[actionSelector] = allowed;
        emit ActionAllowedUpdated(actionSelector, allowed);
    }

    function setCharacterDailyCap(bytes32 characterId, uint256 newDailyCap) external onlyOwner {
        characterDailyCap[characterId] = newDailyCap;
        emit CharacterDailyCapUpdated(characterId, newDailyCap);
    }

    function bindCharacterToNFT(
        bytes32 characterId,
        address nftContract,
        uint256 tokenId,
        address tbaAddress
    ) external onlyOwner {
        if (nftContract == address(0)) revert InvalidAddress();
        emit CharacterBoundToNFT(characterId, nftContract, tokenId, tbaAddress);
    }
}
