// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title RareVesting
/// @author Rareware Studio (ARZ)
/// @notice Timestamp-based cliff + linear token vesting contract for BSC and opBNB.
contract RareVesting is Ownable2Step, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Schedule {
        uint128 totalAmount;
        uint128 released;
        uint64 start;
        uint64 cliff;
        uint64 duration;
        bool revocable;
        bool revoked;
    }

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error InvalidAddress();
    error InvalidScheduleParams();
    error ScheduleAlreadyExists(address beneficiary);
    error ScheduleNotFound(address beneficiary);
    error ScheduleNotRevocable();
    error ScheduleAlreadyRevoked();
    error NothingToRelease();
    error UnauthorizedCaller();
    error UnsupportedFeeOnTransferToken();

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event ScheduleCreated(
        address indexed beneficiary,
        uint128 totalAmount,
        uint64 start,
        uint64 cliff,
        uint64 duration,
        bool revocable
    );
    event TokensReleased(address indexed beneficiary, uint128 amount);
    event ScheduleRevoked(address indexed beneficiary, uint128 vestedPaid, uint128 unvestedRefunded);

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    IERC20 public immutable token;
    address public treasurySafe;

    uint256 public totalAllocated;
    uint256 public totalReleased;

    mapping(address beneficiary => Schedule schedule) public schedules;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor(address token_, address initialOwner_, address treasurySafe_) Ownable(initialOwner_) {
        if (token_ == address(0) || initialOwner_ == address(0) || treasurySafe_ == address(0)) {
            revert InvalidAddress();
        }
        token = IERC20(token_);
        treasurySafe = treasurySafe_;
    }

    /*//////////////////////////////////////////////////////////////
                            VESTING LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Create a new cliff + linear vesting schedule funded by the caller
    function createSchedule(
        address beneficiary,
        uint128 amount,
        uint64 start,
        uint64 cliffDuration,
        uint64 duration,
        bool revocable
    ) external onlyOwner nonReentrant {
        if (beneficiary == address(0)) revert InvalidAddress();
        if (amount == 0 || duration == 0 || cliffDuration > duration) revert InvalidScheduleParams();
        if (schedules[beneficiary].totalAmount != 0) revert ScheduleAlreadyExists(beneficiary);

        uint64 cliffTimestamp = start + cliffDuration;

        schedules[beneficiary] = Schedule({
            totalAmount: amount,
            released: 0,
            start: start,
            cliff: cliffTimestamp,
            duration: duration,
            revocable: revocable,
            revoked: false
        });

        totalAllocated += amount;

        uint256 balBefore = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = token.balanceOf(address(this)) - balBefore;
        if (received != amount) revert UnsupportedFeeOnTransferToken();

        emit ScheduleCreated(beneficiary, amount, start, cliffTimestamp, duration, revocable);
    }

    /// @notice Release currently vested tokens to the beneficiary
    function release(address beneficiary) external nonReentrant returns (uint128 releasable) {
        if (msg.sender != beneficiary && msg.sender != owner()) revert UnauthorizedCaller();
        Schedule storage s = schedules[beneficiary];
        if (s.totalAmount == 0) revert ScheduleNotFound(beneficiary);

        uint128 vested = _vestedAmount(s, uint64(block.timestamp));
        releasable = vested - s.released;
        if (releasable == 0) revert NothingToRelease();

        s.released = vested;
        totalReleased += releasable;

        token.safeTransfer(beneficiary, releasable);
        emit TokensReleased(beneficiary, releasable);
    }

    /// @notice Revoke a revocable schedule, settling vested tokens to beneficiary and refunding unvested to treasurySafe
    function revoke(address beneficiary) external onlyOwner nonReentrant {
        Schedule storage s = schedules[beneficiary];
        if (s.totalAmount == 0) revert ScheduleNotFound(beneficiary);
        if (!s.revocable) revert ScheduleNotRevocable();
        if (s.revoked) revert ScheduleAlreadyRevoked();

        uint128 vested = _vestedAmount(s, uint64(block.timestamp));
        uint128 unreleasedVested = vested - s.released;
        uint128 refund = s.totalAmount - vested;

        s.revoked = true;
        s.released = vested;
        s.totalAmount = vested;

        totalAllocated -= refund;
        totalReleased += unreleasedVested;

        if (unreleasedVested > 0) {
            token.safeTransfer(beneficiary, unreleasedVested);
            emit TokensReleased(beneficiary, unreleasedVested);
        }
        if (refund > 0) {
            token.safeTransfer(treasurySafe, refund);
        }

        emit ScheduleRevoked(beneficiary, unreleasedVested, refund);
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function vestedAmount(address beneficiary, uint64 timestamp) external view returns (uint128) {
        return _vestedAmount(schedules[beneficiary], timestamp);
    }

    function releasableAmount(address beneficiary) external view returns (uint128) {
        Schedule memory s = schedules[beneficiary];
        return _vestedAmount(s, uint64(block.timestamp)) - s.released;
    }

    function _vestedAmount(Schedule memory s, uint64 timestamp) internal pure returns (uint128) {
        if (s.totalAmount == 0) return 0;
        if (s.revoked) return s.released;
        if (timestamp < s.cliff) return 0;
        uint64 end = s.start + s.duration;
        if (timestamp >= end) return s.totalAmount;

        uint256 elapsed = uint256(timestamp - s.start);
        return uint128((uint256(s.totalAmount) * elapsed) / uint256(s.duration));
    }
}
