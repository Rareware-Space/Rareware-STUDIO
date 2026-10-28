// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { RarePayRouter } from "../src/RarePayRouter.sol";
import { RareToken } from "../src/RareToken.sol";

contract RarePayRouterTest is Test {
    RarePayRouter internal router;
    RareToken internal mockBscUsdt;

    address internal owner = makeAddr("owner");
    address internal merchantSafe = makeAddr("merchantSafe");
    address internal payer = makeAddr("payer");

    function setUp() public {
        // BSC USDT uses 18 decimals
        mockBscUsdt = new RareToken("Binance-Peg USDT", "USDT", 1_000_000 ether, payer);

        address[] memory initialTokens = new address[](1);
        initialTokens[0] = address(mockBscUsdt);
        router = new RarePayRouter(owner, initialTokens);
    }

    function test_PayTokenInvoice_18DecimalsSuccess() public {
        bytes32 invoiceId = keccak256("INV-2026-0001");
        uint256 amount = 250 ether; // 250 USDT (18 decimals on BSC)
        uint64 deadline = uint64(block.timestamp + 1 hours);

        vm.startPrank(payer);
        mockBscUsdt.approve(address(router), amount);
        router.payTokenInvoice(invoiceId, merchantSafe, address(mockBscUsdt), amount, 18, deadline);
        vm.stopPrank();

        assertTrue(router.invoiceSettled(invoiceId));
        assertEq(mockBscUsdt.balanceOf(merchantSafe), amount);
    }

    function test_RevertWhen_WrongDecimalAssumptionPassed() public {
        bytes32 invoiceId = keccak256("INV-2026-0002");
        uint64 deadline = uint64(block.timestamp + 1 hours);

        vm.startPrank(payer);
        mockBscUsdt.approve(address(router), 250e6);
        vm.expectRevert(
            abi.encodeWithSelector(RarePayRouter.TokenDecimalsMismatch.selector, 18, 6)
        );
        router.payTokenInvoice(invoiceId, merchantSafe, address(mockBscUsdt), 250e6, 6, deadline);
        vm.stopPrank();
    }

    function test_PayNativeInvoice_Success() public {
        bytes32 invoiceId = keccak256("INV-2026-0003");
        uint256 amountWei = 1.5 ether;
        uint64 deadline = uint64(block.timestamp + 1 hours);

        vm.deal(payer, 2 ether);
        vm.prank(payer);
        router.payNativeInvoice{ value: amountWei }(invoiceId, merchantSafe, amountWei, deadline);

        assertTrue(router.invoiceSettled(invoiceId));
        assertEq(merchantSafe.balance, amountWei);
    }
}
