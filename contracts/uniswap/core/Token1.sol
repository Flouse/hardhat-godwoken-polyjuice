//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity =0.5.16;

// We import this library to be able to use console.log
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Token 1 = TK1
contract Token1 is ERC20Detailed, ERC20 {
	  constructor() ERC20Detailed('Token 1', 'TK1', 18) public {}
}