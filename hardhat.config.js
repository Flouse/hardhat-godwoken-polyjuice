require('dotenv').config()
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
      // gas: "auto",      // Its value should be "auto" or a number. If a number is used, it will be the gas limit used by default in every transaction. If "auto" is used, the gas limit will be automatically estimated. Default value: The same value as blockGasLimit
      // gasPrice: 8000000000,    // Its value should be "auto" or a number. This parameter behaves like gas. Default value: 8000000000
      chainId: 1337   // https://hardhat.org/metamask-issue.html - MetaMask mistakenly assumes all networks in http://localhost:8545 to have a chain id of 1337
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 20000000000,
      gasMultiplier: 2,
    }
  }
};
