const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage Contract on Ethereum", function () {
	let contract;
	let owner, addr1, addr2;

	beforeEach(async function () {
		contract = await ethers.getContractFactory("SimpleStorage")
			.then(factory => factory.deploy())
			.then(job => job.deployed())
			.catch(e => console.error(e));
		[owner, addr1, addr2] = await ethers.getSigners();
	});

	describe("Methods", function () {
		it("Should init value to 123", async function () {
			expect(await contract.get()).to.equal(123);
		});

		it("Should update value after set", async function () {
			await contract.set(100);
			expect(await contract.get()).to.equal(100);
			await contract.set("1010");
			expect(await contract.get()).to.equal(1010);
		});
	});
});