// ckt address

// ckt address 与 eth address 的关联关系
// Your EthAddress: {selectedAddress}
const selectedAddress = "0x788797ac0d13299a2dfe0e0a72c05b05d1c8b0ea";

const Api = require("./client-api");
const api = new Api();

// get balance
api.getBalance(selectedAddress)
  .then(data => console.log(data));

return;

const L1_user_ckb_devnet_addr = "ckt1qyqf22qfzaer95xm5d2m5km0f6k288x9warqnhsf4m";
api.getBalance(L1_user_ckb_devnet_addr).then(data => {
  console.log("user_ckb_devnet_balance:", data)
  // { status: 'failed', error: 'account not exits. deposit first.' }
});

// deposit
api.deposit(selectedAddress).then(data => {
  console.log("deposit response:", data);
  // deposit response: {
  //   status: 'ok',
  //   data: {
  //     eth_address: '0x788797ac0d13299a2dfe0e0a72c05b05d1c8b0ea',
  //     account_id: '0x4'
  //   }
  // }
}).catch(e => console.error(e));

