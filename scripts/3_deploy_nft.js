// This is a script for deploying the NFT contracts.
async function main() {
	if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

	const [deployer] = await ethers.getSigners();
	console.log(
		"Deploy the contract by",
		await deployer.getAddress()
	);
	console.log("Account balance:", (await deployer.getBalance()).toString());

	const contract = await ethers.getContractFactory("NFT")
		.then(factory => factory.deploy())
		.then(job => job.deployed())
		.catch(console.error);

	console.log("Contract address:", contract.address);
	// Contract address: 0x0A152eedD3F47B741B7343e9dC91c33783A0011c
	// Contract address: 0x008C69cDC8f3aE22a666d3f9c988Bf06623c637a

	saveFrontendFiles(contract, "NFT");
}

function saveFrontendFiles(contract, contractName) {
	const fs = require("fs");
	const contractsDir = __dirname + "/../frontend/src/contracts";
	if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

	const contractArtifact = artifacts.readArtifactSync(contractName);
	contractArtifact.address = contract.address;
	fs.writeFileSync(
		`${contractsDir}/${contractName}.json`,
		JSON.stringify(contractArtifact, null, 2) 
	);
}

main().then(() => process.exit())
	.catch(console.error);