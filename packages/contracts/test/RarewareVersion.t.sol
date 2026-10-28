// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { RarewareVersion } from "../src/RarewareVersion.sol";

contract RarewareVersionTest is Test {
    RarewareVersion internal versionContract;

    function setUp() public {
        versionContract = new RarewareVersion();
    }

    function test_StudioAndVersion() public view {
        assertEq(versionContract.STUDIO(), "Rareware Studio");
        assertEq(versionContract.VERSION(), 1);
    }
}
