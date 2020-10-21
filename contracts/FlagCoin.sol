// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FlagCoin is ERC20 {
    using SafeMath for uint256;

    constructor() ERC20("Flag1", "FLG1") public {
        _mint(msg.sender, 1000e18);
    }
}

