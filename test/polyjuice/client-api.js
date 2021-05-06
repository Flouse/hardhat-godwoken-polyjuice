// import { RawL2Transaction } from '@godwoken-examples/godwoken';
const axios = require('axios');
// import { StringifyOptions } from 'node:querystring';
// import { OpType } from '../types/polyjuice';

axios.defaults.withCredentials = true;

class Api {

	base_url = "";

	constructor() {
		this.base_url = "http://192.168.31.143:6101"; // server api endpoint
	}

	async getRollupTypeHash() {
		let res = await axios.get(`${this.base_url}/get_rollup_type_hash`, {
			params: {
			}
		});
		return res.data;
	};

	async getEthAccountLockConfig() {
		let res = await axios.get(`${this.base_url}/get_eth_acccount_lock`, {
			params: {
			}
		});
		return res.data;
	};

	async getBalance(eth_address) {
		let res = await axios.get(`${this.base_url}/get_layer2_balance`, {
			params: { eth_address }
		});
		return res.data;
	};

	async deposit(eth_address) {
		let res = await axios.get(`${this.base_url}/deposit`, {
			params: { eth_address }
		});
		return res.data;
	};

	async transfer(to_id, amount, fee, eth_address) {
		let res = await axios.post(`${this.base_url}/transfer`, {
			data: {
				to_id: to_id,
				amount: amount,
				fee: fee,
				eth_address: eth_address,
			}
		});
		return res.data;
	}

	// async deployContract(contract_code: string, eth_address: StringifyOptions) {
	// 	let res = await axios.post(`${this.base_url}/deploy_contract`, {
	// 		data: {
	// 			contract_code: contract_code,
	// 			eth_address: eth_address,
	// 		}
	// 	});
	// 	return res.data;
	// };

	// async sendL2Transaction(raw_l2tx: RawL2Transaction, signature: string, type: OpType, l2_script_args?: string) {
	// 	let res = await axios.post(`${this.base_url}/send_l2_tx`, {
	// 		data: {
	// 			raw_l2tx: raw_l2tx,
	// 			signature: signature,
	// 			type: type,
	// 			l2_script_args: l2_script_args
	// 		}
	// 	});
	// 	return res.data;
	// };
}

module.exports = Api;