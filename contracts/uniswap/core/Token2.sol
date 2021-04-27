//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity =0.5.16;

// We import this library to be able to use console.log
import "@openzeppelin/contracts-v2/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-v2/token/ERC20/ERC20.sol";

/// @title Token 2 = TK2
contract Token2 is ERC20Detailed, ERC20 {
	  constructor() ERC20Detailed('Token 2', 'TK2', 18) public {}
}