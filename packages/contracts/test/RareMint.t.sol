// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { RareMint } from "../src/RareMint.sol";

contract RareMintTest is Test {
    RareMint internal nft;

    address internal owner = makeAddr("owner");
    address internal safe = makeAddr("treasurySafe");
    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");

    uint32 internal constant MAX_SUPPLY = 100;
    uint32 internal constant MAX_PER_WALLET = 5;
    uint32 internal constant MAX_PER_TX = 3;
    uint128 internal constant AL_PRICE = 0.05 ether;
    uint128 internal constant PUB_PRICE = 0.1 ether;
    uint96 internal constant ROYALTY_BPS = 500; // 5%

    bytes32 internal aliceLeaf;
    bytes32 internal bobLeaf;
    bytes32 internal merkleRoot;

    function setUp() public {
        aliceLeaf = keccak256(bytes.concat(keccak256(abi.encode(alice, uint32(3)))));
        bobLeaf = keccak256(bytes.concat(keccak256(abi.encode(bob, uint32(2)))));
        merkleRoot = _hashPair(aliceLeaf, bobLeaf);

        RareMint.InitParams memory params = RareMint.InitParams({
            name: "Rareware Genesis",
            symbol: "RARE",
            initialOwner: owner,
            treasurySafe: safe,
            maxSupply: MAX_SUPPLY,
            maxPerWallet: MAX_PER_WALLET,
            maxPerTx: MAX_PER_TX,
            allowlistPrice: AL_PRICE,
            publicPrice: PUB_PRICE,
            royaltyBps: ROYALTY_BPS,
            hiddenMetadataURI: "ipfs://hidden/prereveal.json"
        });

        nft = new RareMint(params);
        vm.prank(owner);
        nft.setMerkleRoot(merkleRoot);
    }

    function _hashPair(bytes32 a, bytes32 b) internal pure returns (bytes32) {
        return a < b ? keccak256(abi.encodePacked(a, b)) : keccak256(abi.encodePacked(b, a));
    }

    function test_InitialState() public view {
        assertEq(nft.name(), "Rareware Genesis");
        assertEq(nft.symbol(), "RARE");
        assertEq(nft.treasurySafe(), safe);
        assertEq(nft.maxSupply(), MAX_SUPPLY);
        assertEq(uint8(nft.phase()), uint8(RareMint.MintPhase.Closed));
    }

    function test_RevertWhen_MintWhileClosed() public {
        vm.deal(alice, 1 ether);
        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(
                RareMint.InvalidPhase.selector,
                RareMint.MintPhase.Closed,
                RareMint.MintPhase.Public
            )
        );
        nft.mintPublic{ value: PUB_PRICE }(1);
    }

    function test_AllowlistMint_Success() public {
        vm.prank(owner);
        nft.setPhase(RareMint.MintPhase.Allowlist);

        bytes32[] memory proof = new bytes32[](1);
        proof[0] = bobLeaf;

        vm.deal(alice, 1 ether);
        vm.prank(alice);
        nft.mintAllowlist{ value: AL_PRICE * 2 }(2, 3, proof);

        assertEq(nft.balanceOf(alice), 2);
        assertEq(nft.totalMinted(), 2);
        assertEq(nft.mintedPerWallet(alice), 2);
        assertEq(nft.tokenURI(1), "ipfs://hidden/prereveal.json");
    }

    function test_RevealAndTokenURI() public {
        vm.prank(owner);
        nft.setPhase(RareMint.MintPhase.Public);

        vm.deal(alice, 1 ether);
        vm.prank(alice);
        nft.mintPublic{ value: PUB_PRICE }(1);

        vm.prank(owner);
        nft.reveal("ipfs://revealed/");

        assertEq(nft.tokenURI(1), "ipfs://revealed/1.json");
    }

    function test_WithdrawToTreasurySafe() public {
        vm.prank(owner);
        nft.setPhase(RareMint.MintPhase.Public);

        vm.deal(alice, 1 ether);
        vm.prank(alice);
        nft.mintPublic{ value: PUB_PRICE * 2 }(2);

        uint256 safeBefore = safe.balance;
        vm.prank(owner);
        nft.withdraw();
        assertEq(safe.balance - safeBefore, PUB_PRICE * 2);
        assertEq(address(nft).balance, 0);
    }

    function testFuzz_PublicMint_RespectsCapsAndPricing(uint32 qty) public {
        qty = uint32(bound(qty, 1, MAX_PER_TX));
        vm.prank(owner);
        nft.setPhase(RareMint.MintPhase.Public);

        uint256 cost = uint256(PUB_PRICE) * uint256(qty);
        vm.deal(alice, cost);
        vm.prank(alice);
        nft.mintPublic{ value: cost }(qty);

        assertEq(nft.totalMinted(), qty);
        assertEq(nft.balanceOf(alice), qty);
        assertEq(address(nft).balance, cost);
    }
}
