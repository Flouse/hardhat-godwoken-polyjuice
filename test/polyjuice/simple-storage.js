
// Contract Address:
// 0x0500000000000000000000000000000000000000

const SimpleContract = {
	"address": "0x0500000000000000000000000000000000000000",
	"contract_name": "SimpleStorage",
	"abi": [{"inputs":[],"stateMutability":"payable","type":"constructor"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"payable","type":"function"}],
}



// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // console.log(process.env.GODWOKEN_RPC_URL)

  const simplestorage = new hre.web3.eth.Contract( SimpleContract.abi, SimpleContract.address );

    simplestorage.methods.get().call({
      from: "0x788797Ac0d13299A2dFE0E0A72c05B05d1c8b0EA"
    }).then(console.log);

  function get() {
      simplestorage.methods.get().call({from: ethereum.selectedAddress});
  }

  function set() {
      simplestorage.methods.set('0x0d10').send({
        from: ethereum.selectedAddress,
        gas: 5000000,
        value: '0'
      });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


//////////////////////////////////////////////////////////////////////////////////////////////////
// ethers
// pass a provider when initiating a contract for read only queries
// const contract = new ethers.Contract(SimpleContract.address, SimpleContract.abi, provider);
// const value = await contract.getValue();


// pass a signer to create a contract instance for state changing operations
// const contract = new ethers.Contract(contractAddress, abi, signer);
// const tx = await contract.changeValue(33);

// wait for the transaction to be mined
// const receipt = await tx.wait();