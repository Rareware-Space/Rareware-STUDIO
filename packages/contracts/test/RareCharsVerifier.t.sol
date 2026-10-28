// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { RareCharsVerifier } from "../src/RareCharsVerifier.sol";

contract RareCharsVerifierTest is Test {
    RareCharsVerifier internal verifier;

    address internal owner = makeAddr("owner");
    address internal player = makeAddr("player");
    uint256 internal signerPk = 0xA11CE;
    address internal signer;

    bytes32 internal constant CHAR_ID = keccak256("NPC_ELDER_KAEL");
    bytes4 internal constant GRANT_REWARD_SELECTOR = bytes4(keccak256("grantQuestReward(address,uint256)"));

    function setUp() public {
        signer = vm.addr(signerPk);
        verifier = new RareCharsVerifier(owner, signer);

        vm.startPrank(owner);
        verifier.setActionAllowed(GRANT_REWARD_SELECTOR, true);
        verifier.setCharacterDailyCap(CHAR_ID, 1000);
        vm.stopPrank();
    }

    function test_VerifyAndConsumeIntent_SuccessAndBlocksReplay() public {
        RareCharsVerifier.CharacterActionIntent memory intent = RareCharsVerifier.CharacterActionIntent({
            characterId: CHAR_ID,
            player: player,
            actionSelector: GRANT_REWARD_SELECTOR,
            paramsHash: keccak256(abi.encode(player, uint256(250))),
            valueUnits: 250,
            nonce: 0,
            deadline: uint64(block.timestamp + 15 minutes)
        });

        bytes32 structHash = keccak256(
            abi.encode(
                verifier.ACTION_INTENT_TYPEHASH(),
                intent.characterId,
                intent.player,
                intent.actionSelector,
                intent.paramsHash,
                intent.valueUnits,
                intent.nonce,
                intent.deadline
            )
        );

        bytes32 domainSeparator = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("RareCharsVerifier")),
                keccak256(bytes("1")),
                block.chainid,
                address(verifier)
            )
        );

        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPk, digest);
        bytes memory sig = abi.encodePacked(r, s, v);

        verifier.verifyAndConsumeIntent(intent, sig);
        assertEq(verifier.nonces(CHAR_ID, player), 1);

        // Replay must revert with InvalidNonce(0, 1)
        vm.expectRevert(abi.encodeWithSelector(RareCharsVerifier.InvalidNonce.selector, 0, 1));
        verifier.verifyAndConsumeIntent(intent, sig);
    }
}
