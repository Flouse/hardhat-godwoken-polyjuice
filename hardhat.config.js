require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

module.exports = {
  solidity: "0.7.3",  // solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337   // https://hardhat.org/metamask-issue.html - MetaMask mistakenly assumes all networks in http://localhost:8545 to have a chain id of 1337
    }
  }
};
