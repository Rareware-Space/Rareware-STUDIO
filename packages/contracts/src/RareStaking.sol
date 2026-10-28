// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title RareStaking
/// @author Rareware Studio (ARZ)
/// @notice Timestamp-based staking rewards contract with strict principal/reward isolation.
contract RareStaking is Ownable2Step, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error InvalidAddress();
    error ZeroAmount();
    error ZeroDuration();
    error InsufficientStakedBalance(uint256 requested, uint256 available);
    error RewardRateZero();
    error UnsupportedFeeOnTransferToken();

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardNotified(uint256 rewardAmount, uint256 rewardRate, uint64 periodFinish);

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    uint256 private constant PRECISION = 1e18;

    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    uint64 public rewardsDuration;
    uint64 public periodFinish;
    uint64 public lastUpdateTime;

    uint256 public rewardRate;
    uint256 public rewardPerTokenStored;
    uint256 public rewardReserve;
    uint256 public totalStaked;

    mapping(address user => uint256 staked) public balanceOf;
    mapping(address user => uint256 paidPerToken) public userRewardPerTokenPaid;
    mapping(address user => uint256 accrued) public rewards;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor(
        address stakingToken_,
        address rewardsToken_,
        address initialOwner_,
        uint64 rewardsDuration_
    ) Ownable(initialOwner_) {
        if (stakingToken_ == address(0) || rewardsToken_ == address(0) || initialOwner_ == address(0)) {
            revert InvalidAddress();
        }
        if (rewardsDuration_ == 0) revert ZeroDuration();

        stakingToken = IERC20(stakingToken_);
        rewardsToken = IERC20(rewardsToken_);
        rewardsDuration = rewardsDuration_;
    }

    /*//////////////////////////////////////////////////////////////
                           MODIFIER / ACCOUNTING
    //////////////////////////////////////////////////////////////*/
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function lastTimeRewardApplicable() public view returns (uint64) {
        uint64 nowTs = uint64(block.timestamp);
        return nowTs < periodFinish ? nowTs : periodFinish;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        uint256 elapsed = uint256(lastTimeRewardApplicable() - lastUpdateTime);
        return rewardPerTokenStored + ((elapsed * rewardRate * PRECISION) / totalStaked);
    }

    function earned(address account) public view returns (uint256) {
        uint256 delta = rewardPerToken() - userRewardPerTokenPaid[account];
        return ((balanceOf[account] * delta) / PRECISION) + rewards[account];
    }

    /*//////////////////////////////////////////////////////////////
                            STAKER ACTIONS
    //////////////////////////////////////////////////////////////*/

    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        if (amount == 0) revert ZeroAmount();

        uint256 balBefore = stakingToken.balanceOf(address(this));
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = stakingToken.balanceOf(address(this)) - balBefore;
        if (received != amount) revert UnsupportedFeeOnTransferToken();

        totalStaked += amount;
        balanceOf[msg.sender] += amount;

        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) public nonReentrant updateReward(msg.sender) {
        if (amount == 0) revert ZeroAmount();
        uint256 userBal = balanceOf[msg.sender];
        if (amount > userBal) revert InsufficientStakedBalance(amount, userBal);

        totalStaked -= amount;
        balanceOf[msg.sender] = userBal - amount;

        stakingToken.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function claimReward() public nonReentrant updateReward(msg.sender) returns (uint256 reward) {
        reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardReserve -= reward;
            rewardsToken.safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    function exit() external {
        withdraw(balanceOf[msg.sender]);
        claimReward();
    }

    /*//////////////////////////////////////////////////////////////
                             ADMIN ACTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Fund and start/extend a reward emission period
    function notifyRewardAmount(uint256 rewardAmount) external onlyOwner nonReentrant updateReward(address(0)) {
        if (rewardAmount == 0) revert ZeroAmount();

        uint256 balBefore = rewardsToken.balanceOf(address(this));
        rewardsToken.safeTransferFrom(msg.sender, address(this), rewardAmount);
        uint256 received = rewardsToken.balanceOf(address(this)) - balBefore;
        if (received != rewardAmount) revert UnsupportedFeeOnTransferToken();

        rewardReserve += rewardAmount;
        uint64 nowTs = uint64(block.timestamp);

        if (nowTs >= periodFinish) {
            rewardRate = rewardAmount / uint256(rewardsDuration);
        } else {
            uint256 remaining = uint256(periodFinish - nowTs);
            uint256 leftover = remaining * rewardRate;
            rewardRate = (rewardAmount + leftover) / uint256(rewardsDuration);
        }

        if (rewardRate == 0) revert RewardRateZero();

        lastUpdateTime = nowTs;
        periodFinish = nowTs + rewardsDuration;

        emit RewardNotified(rewardAmount, rewardRate, periodFinish);
    }
}
