import { BackwardsCompatibilityProviderAdapter} from "hardhat/internal/core/providers/backwards-compatibility";
import { EIP1193Provider } from "hardhat/types/provider";
import { Godwoker, GodwokerOption } from "./util";

export class PolyjuiceProvider extends BackwardsCompatibilityProviderAdapter {
	connected: boolean;
	// requestQueue: Map<string, any>;
	// responseQueue: Map<string, any>;
	// connection: any;
	private provider: EIP1193Provider;
	private godwoker: Godwoker;

	constructor(_provider: EIP1193Provider) {
		console.log("_provider:", _provider);

		const godwoken_rpc_url = process.env.GODWOKEN_RPC_URL || "http://localhost:8024";
		const provider_config: GodwokerOption = {
			godwoken: {
				rollup_type_hash: "0x58ebc6527e3cdbe220d235e9ba3bdf2dcdad52544e901994bc3e73f3e0a11fd7",
				eth_account_lock: {
					code_hash: "0x8a1dedd7b68b78a4f8d338b8aa756ed19f3ad4b442559a97720d9fe267c27cbc",
					hash_type: "type"
				}
			}
		}
		super(godwoken_rpc_url);
		this.provider = _provider;
		this.godwoker = new Godwoker(godwoken_rpc_url, provider_config);
		this.connected = true;
	}

	public async send(payload, callback) {		
		const { method, params } = payload;
		switch (method) {
			case 'eth_call':
				// if (!window.ethereum) {
				// 	alert('PolyjuiceHttpProvider needs a wallet provider such as metamask!');
				// 	break;
				// }

				try {
					const { from, gas, value, data, to } = params[0];
					const t = {
						from: from,
						// || window.ethereum.selectedAddress,
						to: to,
						value: value || 0,
						data: data || '',
						gas: gas
					}
					// todo: use real gas later instead of hard-code one

					const sender_script_hash = this.godwoker.getScriptHashByEthAddress(from);
					const to_id = this.godwoker.ethAddrToAccountId(to);
					const receiver_script_hash = await this.godwoker.getScriptHashByAccountId(to_id);
					console.log(`receiver_hash: ${receiver_script_hash}`);

					const polyjuice_tx = await this.godwoker.assembleRawL2Transaction(t);
					const message = this.godwoker.generateTransactionMessageToSign(polyjuice_tx, sender_script_hash, receiver_script_hash);
					console.log(message);
					// TODO: Seamlessly connect to HTTP, WebSocket, IPC and Injected RPC transports in Node and the Browser! 
					// https://github.com/floating/eth-provider
					// const _signature = await window.ethereum.request({
					// 	method: 'personal_sign',
					// 	params: [message, window.ethereum.selectedAddress],
					// });
					const _signature = await this.provider.request({
						method: "personal_sign",
						params: [message, from] // FIXME: check from or provider.selectedAddress?
					})

					const signature = this.godwoker.packSignature(<string>_signature);

					const run_result = await this.godwoker.gw_executeL2Tranaction(polyjuice_tx, signature);
					console.log(`runResult: ${JSON.stringify(run_result, null, 2)}`);
					break;
				} catch (error) {
					this.connected = false;
					throw error;
				}

			case 'eth_sendTransaction':
				// if (!window.ethereum) {
				// 	alert('PolyjuiceHttpProvider needs a wallet provider such as metamask!');
				// 	break;
				// }
				try {
					const { from, gas, value, data, to } = params[0];
					const t = {
						from: from,
						// || window.ethereum.selectedAddress,
						to: to,
						value: value || 0,
						data: data || '',
						gas: gas
					}

					const sender_script_hash = this.godwoker.getScriptHashByEthAddress(from);
					const to_id = this.godwoker.ethAddrToAccountId(to);
					const receiver_script_hash = await this.godwoker.getScriptHashByAccountId(to_id);

					const polyjuice_tx = await this.godwoker.assembleRawL2Transaction(t);
					const message = this.godwoker.generateTransactionMessageToSign(polyjuice_tx, sender_script_hash, receiver_script_hash);
					const _signature = await this.provider.request({
						method: 'personal_sign',
						params: [message, from], // FIXME: from or window.ethereum.selectedAddress?
					});
					const signature = this.godwoker.packSignature(<string>_signature);
					const tx_hash = await this.godwoker.gw_submitL2Transaction(polyjuice_tx, signature);
					await this.godwoker.waitForTransactionReceipt(<string>tx_hash);
					const run_result = await this.godwoker.gw_getTransactionReceipt(<string>tx_hash);
					console.log(`runResult: ${JSON.stringify(run_result, null, 2)}`);
					break;
				} catch (error) {
					this.connected = false;
					throw error;
				}

			default:
				try {
					console.log("default call");
					
					super.send(payload, callback);
					break;
				} catch (error) {
					this.connected = false;
					throw error;
				}
		}
	}

	// isConnecting(): boolean {
	// 	console.log('isConnecting:', this.connected);
	// 	return this.connected;
	// }
	// supportsSubscriptions(): boolean {
	// 	return false;
	// }
	// reset() {
	// 	throw new Error("Not implemented");
	// }
	// disconnect(code: number, reason: string): void {
	// 	throw new Error("Not implemented");
	// }
	// connect(): void {
	// 	throw new Error("Not implemented");
	// }
	// reconnect(): void {
	// 	throw new Error("Not implemented");
	// }

}