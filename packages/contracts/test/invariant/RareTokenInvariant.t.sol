// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { RareToken } from "../../src/RareToken.sol";
import { RareVesting } from "../../src/RareVesting.sol";
import { RareStaking } from "../../src/RareStaking.sol";

contract RareTokenHandler is Test {
    RareToken public immutable token;
    RareVesting public immutable vesting;
    RareStaking public immutable staking;

    constructor(RareToken _token, RareVesting _vesting, RareStaking _staking) {
        token = _token;
        vesting = _vesting;
        staking = _staking;
    }

    function stake(uint256 actorSeed, uint256 amount) external {
        address actor = vm.addr((actorSeed % 10) + 1);
        amount = bound(amount, 1e18, 10_000 ether);

        deal(address(token), actor, amount);
        vm.startPrank(actor);
        token.approve(address(staking), amount);
        staking.stake(amount);
        vm.stopPrank();
    }

    function withdraw(uint256 actorSeed, uint256 amount) external {
        address actor = vm.addr((actorSeed % 10) + 1);
        uint256 staked = staking.balanceOf(actor);
        if (staked == 0) return;
        amount = bound(amount, 1, staked);

        vm.prank(actor);
        staking.withdraw(amount);
    }

    function advanceTime(uint64 secondsForward) external {
        secondsForward = uint64(bound(secondsForward, 1, 7 days));
        vm.warp(block.timestamp + secondsForward);
    }
}

contract RareTokenInvariantTest is Test {
    RareToken internal token;
    RareVesting internal vesting;
    RareStaking internal staking;
    RareTokenHandler internal handler;

    address internal safe = makeAddr("safe");

    function setUp() public {
        token = new RareToken("Rareware Token", "RWT", 100_000_000 ether, safe);
        vesting = new RareVesting(address(token), address(this), safe);
        staking = new RareStaking(address(token), address(token), address(this), 30 days);

        handler = new RareTokenHandler(token, vesting, staking);
        targetContract(address(handler));
    }

    function invariant_StakingPrincipalAlwaysSolvent() public view {
        assertGe(token.balanceOf(address(staking)), staking.totalStaked());
    }

    function invariant_VestingVaultAlwaysSolvent() public view {
        assertGe(
            token.balanceOf(address(vesting)),
            vesting.totalAllocated() - vesting.totalReleased()
        );
    }
}
