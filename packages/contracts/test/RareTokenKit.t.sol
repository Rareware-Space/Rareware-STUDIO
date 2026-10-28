// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { RareToken } from "../src/RareToken.sol";
import { RareVesting } from "../src/RareVesting.sol";
import { RareStaking } from "../src/RareStaking.sol";

contract RareTokenKitTest is Test {
    RareToken internal token;
    RareVesting internal vesting;
    RareStaking internal staking;

    address internal owner = makeAddr("owner");
    address internal safe = makeAddr("treasurySafe");
    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");

    uint256 internal constant MAX_SUPPLY = 100_000_000 ether;

    function setUp() public {
        token = new RareToken("Rareware Token", "RWT", MAX_SUPPLY, safe);
        vesting = new RareVesting(address(token), owner, safe);
        staking = new RareStaking(address(token), address(token), owner, 30 days);

        // Fund owner from safe for schedule creation & staking rewards
        vm.startPrank(safe);
        token.transfer(owner, 20_000_000 ether);
        token.transfer(alice, 100_000 ether);
        token.transfer(bob, 100_000 ether);
        vm.stopPrank();
    }

    function test_TokenFixedSupplyAndBurn() public {
        assertEq(token.totalSupply(), MAX_SUPPLY);
        vm.prank(alice);
        token.burn(1_000 ether);
        assertEq(token.totalSupply(), MAX_SUPPLY - 1_000 ether);
    }

    function test_VestingCliffAndLinearRelease() public {
        uint128 allocation = 1_200_000 ether;
        uint64 start = uint64(block.timestamp);
        uint64 cliff = 90 days;
        uint64 duration = 360 days;

        vm.startPrank(owner);
        token.approve(address(vesting), allocation);
        vesting.createSchedule(alice, allocation, start, cliff, duration, true);
        vm.stopPrank();

        // Before cliff: 0 vested
        vm.warp(start + 89 days);
        assertEq(vesting.releasableAmount(alice), 0);

        // At 180 days (50% duration): 600,000 vested
        vm.warp(start + 180 days);
        assertEq(vesting.releasableAmount(alice), 600_000 ether);

        vm.prank(alice);
        uint128 released = vesting.release(alice);
        assertEq(released, 600_000 ether);

        // Revoke at 180 days: remaining 600,000 refunded to treasurySafe
        uint256 safeBefore = token.balanceOf(safe);
        vm.prank(owner);
        vesting.revoke(alice);
        assertEq(token.balanceOf(safe) - safeBefore, 600_000 ether);
    }

    function test_StakingAccruesAndPaysRewards() public {
        uint256 rewardPool = 300_000 ether;
        vm.startPrank(owner);
        token.approve(address(staking), rewardPool);
        staking.notifyRewardAmount(rewardPool);
        vm.stopPrank();

        vm.startPrank(alice);
        token.approve(address(staking), 10_000 ether);
        staking.stake(10_000 ether);
        vm.stopPrank();

        vm.warp(block.timestamp + 15 days);
        uint256 earnedMidway = staking.earned(alice);
        assertApproxEqRel(earnedMidway, 150_000 ether, 1e14);

        uint256 aliceBefore = token.balanceOf(alice);
        vm.prank(alice);
        staking.exit();
        assertEq(staking.balanceOf(alice), 0);
        assertEq(token.balanceOf(alice) - aliceBefore, 10_000 ether + earnedMidway);
    }

    function testFuzz_VestingNeverOverReleases(uint64 warpDelta) public {
        warpDelta = uint64(bound(warpDelta, 90 days, 1000 days));
        uint128 allocation = 500_000 ether;
        uint64 start = uint64(block.timestamp);

        vm.startPrank(owner);
        token.approve(address(vesting), allocation);
        vesting.createSchedule(bob, allocation, start, 90 days, 365 days, false);
        vm.stopPrank();

        vm.warp(start + warpDelta);
        vm.prank(bob);
        uint128 released = vesting.release(bob);
        assertLe(released, allocation);
        assertEq(token.balanceOf(address(vesting)), allocation - released);
    }
}
