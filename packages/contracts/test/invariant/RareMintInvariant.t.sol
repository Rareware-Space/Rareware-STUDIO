// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { RareMint } from "../../src/RareMint.sol";

contract RareMintHandler is Test {
    RareMint public immutable nft;
    uint256 public totalEthDeposited;

    constructor(RareMint _nft) {
        nft = _nft;
    }

    function mintPublic(uint256 actorSeed, uint32 qty) external {
        qty = uint32(bound(qty, 1, nft.maxPerTx()));
        address actor = vm.addr((actorSeed % 50) + 1);

        uint32 alreadyMinted = nft.mintedPerWallet(actor);
        if (alreadyMinted + qty > nft.maxPerWallet()) return;
        if (nft.totalMinted() + qty > nft.maxSupply()) return;

        uint256 cost = uint256(nft.publicPrice()) * uint256(qty);
        vm.deal(actor, cost);
        vm.prank(actor);
        nft.mintPublic{ value: cost }(qty);
        totalEthDeposited += cost;
    }
}

contract RareMintInvariantTest is Test {
    RareMint internal nft;
    RareMintHandler internal handler;

    function setUp() public {
        RareMint.InitParams memory params = RareMint.InitParams({
            name: "Rareware Genesis",
            symbol: "RARE",
            initialOwner: address(this),
            treasurySafe: makeAddr("safe"),
            maxSupply: 100,
            maxPerWallet: 5,
            maxPerTx: 3,
            allowlistPrice: 0.05 ether,
            publicPrice: 0.1 ether,
            royaltyBps: 500,
            hiddenMetadataURI: "ipfs://hidden/prereveal.json"
        });
        nft = new RareMint(params);
        nft.setPhase(RareMint.MintPhase.Public);

        handler = new RareMintHandler(nft);
        targetContract(address(handler));
    }

    function invariant_TotalMintedNeverExceedsMaxSupply() public view {
        assertLe(nft.totalMinted(), nft.maxSupply());
    }

    function invariant_ContractBalanceMatchesDeposits() public view {
        assertEq(address(nft).balance, handler.totalEthDeposited());
    }
}
