// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @title RareToken
/// @author Rareware Studio (ARZ)
/// @notice Fixed-supply ERC-20 with EIP-2612 Permit and burn capability. Mints 100% of supply once to the Treasury Safe.
contract RareToken is ERC20, ERC20Burnable, ERC20Permit {
    error InvalidTreasuryAddress();
    error ZeroInitialSupply();

    uint256 public immutable maxSupply;
    address public immutable initialTreasurySafe;

    /// @param name_ Token name
    /// @param symbol_ Token symbol
    /// @param maxSupply_ Exact fixed total supply in wei (18 decimals)
    /// @param treasurySafe_ Safe multisig address receiving the initial supply
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        address treasurySafe_
    ) ERC20(name_, symbol_) ERC20Permit(name_) {
        if (treasurySafe_ == address(0)) revert InvalidTreasuryAddress();
        if (maxSupply_ == 0) revert ZeroInitialSupply();

        maxSupply = maxSupply_;
        initialTreasurySafe = treasurySafe_;
        _mint(treasurySafe_, maxSupply_);
    }
}
