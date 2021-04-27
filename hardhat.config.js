require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

module.exports = {
  // Support Multiple Solidity versions
  // https://hardhat.org/guides/compile-contracts.html#multiple-solidity-versions
  solidity: {
    compilers: [
      { // for uniswap-v2-core contracts
        version: "0.5.16"
      },
      { // for uniswap-v2-periphery contracts
        version: "0.6.6",
        settings: {}
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 1337   // https://hardhat.org/metamask-issue.html - MetaMask mistakenly assumes all networks in http://localhost:8545 to have a chain id of 1337
    }
  }
};
