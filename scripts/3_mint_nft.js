// This is a script for minting a NFT tokenURI to someone(receiver)
async function main() {
	const NFT = require("../frontend/src/contracts/NFT.json");
	const [signer] = await ethers.getSigners();
	const receiver = await signer.getAddress();
	console.log("Sender:", receiver);

	const nft = await ethers.getContractAt("NFT", NFT.address, signer);
	console.log(nft);
	await nft.mint(receiver);
}

main().then(() => process.exit())
	.catch(console.error);