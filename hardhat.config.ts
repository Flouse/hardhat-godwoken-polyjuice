// This configuration file is always executed on startup before anything else happens.
import { config } from "dotenv";
config();

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import { task, extendEnvironment } from "hardhat/config";
// This task imports a Hardhat task definition, that can be used for testing the frontend.
import "./tasks/faucet";

import { PolyjuiceProvider } from "./packages/godwoken-polyjuice/polyjuice-http-provider";
import { Web3HTTPProviderAdapter } from "@nomiclabs/hardhat-web3/dist/src/web3-provider-adapter";
// node_modules/@nomiclabs/hardhat-web3/src/web3-provider-adapter.ts

extendEnvironment(hre => {
  if (hre.network.name !== "godwoken-polyjuice") return;
  console.log(hre.network);
  const Web3 = require("web3");
  hre.Web3 = Web3;
  // hre.network.provider is an EIP1193-compatible provider.
  const p = new PolyjuiceProvider(hre.network.provider);
  hre.web3 = new Web3(new Web3HTTPProviderAdapter(p));
});

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
    }, 100);
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
      { version: "0.7.5" }, { version: "0.8.0" }
    ], overrides: {}
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
    "godwoken-polyjuice": { //TODO:
      url: process.env.GODWOKEN_RPC_URL || "http://localhost:8024",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      godwoken: {
        rollup_type_hash: "0x58ebc6527e3cdbe220d235e9ba3bdf2dcdad52544e901994bc3e73f3e0a11fd7",
        eth_account_lock: {
          code_hash: "0x8a1dedd7b68b78a4f8d338b8aa756ed19f3ad4b442559a97720d9fe267c27cbc",
          hash_type: "type"
        }
      }
    }
  }
};