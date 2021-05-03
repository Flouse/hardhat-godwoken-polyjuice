// This configuration file is always executed on startup before anything else happens.
import dotenv from "dotenv";
dotenv.config();
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";

// This task imports a Hardhat task definition, that can be used for testing the frontend.
import "./tasks/faucet";
import { task } from "hardhat/config";

// task action function receives the Hardhat Runtime Environment as second argument
task("accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, { web3 }) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

// Creating a task by calling the task function.
// It will return a TaskDefinition object, 
// which can be used to define the task's parameters.
// see also: https://hardhat.org/guides/create-task.html#advanced-usage
task("hello", "Prints 'Hello, World!' after a second", async (taskArguments, hre, runSuper) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Hello");
    setTimeout(() => {
      console.log("World");
      resolve();
    }, 1000);
  });
});

export default {
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
      }, 
      { version: "0.7.5" }
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
    },
    polyjuice: { //TODO:
      url: "",
      accounts: [],
    }
  }
};