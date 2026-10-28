// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Script, console2 } from "forge-std/Script.sol";
import { RareMint } from "../src/RareMint.sol";

contract DeployRareMint is Script {
    function run() external returns (RareMint deployed) {
        address initialOwner = vm.envOr("INITIAL_OWNER", msg.sender);
        address treasurySafe = vm.envOr("TREASURY_SAFE", initialOwner);

        RareMint.InitParams memory params = RareMint.InitParams({
            name: "Rareware Genesis",
            symbol: "RARE",
            initialOwner: initialOwner,
            treasurySafe: treasurySafe,
            maxSupply: 1000,
            maxPerWallet: 5,
            maxPerTx: 3,
            allowlistPrice: 0.05 ether,
            publicPrice: 0.1 ether,
            royaltyBps: 500,
            hiddenMetadataURI: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/hidden.json"
        });

        vm.startBroadcast();
        deployed = new RareMint(params);
        vm.stopBroadcast();

        console2.log("RareMint simulated/deployed at:", address(deployed));
        console2.log("Treasury Safe:", deployed.treasurySafe());
    }
}
