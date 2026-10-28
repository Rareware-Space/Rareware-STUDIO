// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title RarePayRouter
/// @author Rareware Studio (ARZ)
/// @notice Non-custodial invoice checkout router for BSC and opBNB with explicit decimal verification.
contract RarePayRouter is Ownable2Step, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error InvalidAddress();
    error ZeroAmount();
    error InvoiceAlreadyPaid(bytes32 invoiceId);
    error InvoiceExpired(uint64 deadline, uint64 currentTimestamp);
    error TokenNotAllowed(address token);
    error TokenDecimalsMismatch(uint8 actualDecimals, uint8 expectedDecimals);
    error IncorrectNativePayment(uint256 sent, uint256 required);
    error NativeTransferFailed();
    error UnsupportedFeeOnTransferToken();

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event TokenAllowlistUpdated(address indexed token, bool allowed);
    event InvoicePaid(
        bytes32 indexed invoiceId,
        address indexed payer,
        address indexed merchantSafe,
        address token,
        uint256 amount,
        uint8 tokenDecimals,
        uint64 timestamp
    );

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    mapping(bytes32 invoiceId => bool paid) public invoiceSettled;
    mapping(address token => bool allowed) public allowedTokens;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor(address initialOwner, address[] memory initialTokens) Ownable(initialOwner) {
        if (initialOwner == address(0)) revert InvalidAddress();
        for (uint256 i = 0; i < initialTokens.length; ) {
            if (initialTokens[i] == address(0)) revert InvalidAddress();
            allowedTokens[initialTokens[i]] = true;
            emit TokenAllowlistUpdated(initialTokens[i], true);
            unchecked {
                ++i;
            }
        }
    }

    /*//////////////////////////////////////////////////////////////
                            PAYMENT FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Pay an invoice in native BNB directly to the merchant Safe
    function payNativeInvoice(
        bytes32 invoiceId,
        address merchantSafe,
        uint256 amountWei,
        uint64 deadline
    ) external payable nonReentrant {
        if (merchantSafe == address(0)) revert InvalidAddress();
        if (amountWei == 0) revert ZeroAmount();
        if (invoiceSettled[invoiceId]) revert InvoiceAlreadyPaid(invoiceId);
        if (block.timestamp > deadline) revert InvoiceExpired(deadline, uint64(block.timestamp));
        if (msg.value != amountWei) revert IncorrectNativePayment(msg.value, amountWei);

        invoiceSettled[invoiceId] = true;

        (bool success, ) = merchantSafe.call{ value: amountWei }("");
        if (!success) revert NativeTransferFailed();

        emit InvoicePaid(invoiceId, msg.sender, merchantSafe, address(0), amountWei, 18, uint64(block.timestamp));
    }

    /// @notice Pay an invoice in an allowlisted ERC-20 token (e.g., 18-decimal BSC USDT/USDC)
    /// @dev Enforces dynamic decimals() check to prevent 6-decimal vs 18-decimal mispricing bugs.
    function payTokenInvoice(
        bytes32 invoiceId,
        address merchantSafe,
        address token,
        uint256 amount,
        uint8 expectedDecimals,
        uint64 deadline
    ) external nonReentrant {
        if (merchantSafe == address(0)) revert InvalidAddress();
        if (amount == 0) revert ZeroAmount();
        if (invoiceSettled[invoiceId]) revert InvoiceAlreadyPaid(invoiceId);
        if (block.timestamp > deadline) revert InvoiceExpired(deadline, uint64(block.timestamp));
        if (!allowedTokens[token]) revert TokenNotAllowed(token);

        uint8 actualDecimals = IERC20Metadata(token).decimals();
        if (actualDecimals != expectedDecimals) {
            revert TokenDecimalsMismatch(actualDecimals, expectedDecimals);
        }

        invoiceSettled[invoiceId] = true;

        uint256 balBefore = IERC20(token).balanceOf(merchantSafe);
        IERC20(token).safeTransferFrom(msg.sender, merchantSafe, amount);
        uint256 received = IERC20(token).balanceOf(merchantSafe) - balBefore;
        if (received != amount) revert UnsupportedFeeOnTransferToken();

        emit InvoicePaid(
            invoiceId,
            msg.sender,
            merchantSafe,
            token,
            amount,
            actualDecimals,
            uint64(block.timestamp)
        );
    }

    /*//////////////////////////////////////////////////////////////
                             ADMIN CONTROLS
    //////////////////////////////////////////////////////////////*/

    function setTokenAllowed(address token, bool allowed) external onlyOwner {
        if (token == address(0)) revert InvalidAddress();
        allowedTokens[token] = allowed;
        emit TokenAllowlistUpdated(token, allowed);
    }
}
