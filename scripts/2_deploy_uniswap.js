async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "[Warning]: You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log("Deploying the contracts with the account:", address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

	// getContractFactory("uniswap/core/UniswapV2Factory") and deploy
  const Factory = await ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(address);
  await factory.deployed();
  console.log("UniswapV2Factory address:", factory.address);

  // deploy token1 and token2 - contracts/uniswap/core/Token{1,2}.sol
  let token1Address, token2Address;
  if (network.name === "mainnet") {
    token1Address = ""; token2Addres = "";
  } else {
    const token1 = await ethers.getContractFactory("Token1")
      .then(contract => contract.deploy())
      .then(deployJob => deployJob.deployed())
      .catch(e => console.error("Error occurred while deploying Token1", e));
    token1Address = token1.address;
    const token2 = await ethers.getContractFactory("Token2")
      .then(contract => contract.deploy())
      .then(deployJob => deployJob.deployed())
      .catch(e => console.error("Error occurred while deploying Token2", e));
    token2Address = token2.address;
  }
  await factory.createPair(token1Address, token2Address);

  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(factory);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
