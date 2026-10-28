// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Script, console2 } from "forge-std/Script.sol";
import { RareToken } from "../src/RareToken.sol";
import { RareVesting } from "../src/RareVesting.sol";
import { RareStaking } from "../src/RareStaking.sol";

contract DeployRareTokenKit is Script {
    function run()
        external
        returns (RareToken token, RareVesting vesting, RareStaking staking)
    {
        address initialOwner = vm.envOr("INITIAL_OWNER", msg.sender);
        address treasurySafe = vm.envOr("TREASURY_SAFE", initialOwner);

        vm.startBroadcast();
        token = new RareToken("Rareware Token", "RWT", 100_000_000 ether, treasurySafe);
        vesting = new RareVesting(address(token), initialOwner, treasurySafe);
        staking = new RareStaking(address(token), address(token), initialOwner, 30 days);

        if (treasurySafe != initialOwner) {
            vesting.transferOwnership(treasurySafe);
            staking.transferOwnership(treasurySafe);
        }
        vm.stopBroadcast();

        console2.log("RareToken:", address(token));
        console2.log("RareVesting:", address(vesting));
        console2.log("RareStaking:", address(staking));
    }
}
