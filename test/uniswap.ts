import { ethers } from "hardhat";
import { Signer } from "ethers";

describe("Token", function () {
	let accounts: Signer[];

	beforeEach(async function () {
		accounts = await ethers.getSigners();
	});

	it("should do something right", function () {
		
	})
})


// descrbe("uniswap contract", function() {
// 	if("Deployment should assign the total supply of tokens to the owner")
// });