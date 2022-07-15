const ethers = require("ethers")
const fs = require('fs-extra')

const RPC_SERVER = "http://127.0.0.1:7545"
const PRIVATE_KEY = "d8eab535b27299c2c9acb19b860d73f83e7381a3049bd4edb1e32d335916fb78"

async function main(){
	//connect to blockchain
	const provider = new ethers.providers.JsonRpcProvider("http://172.24.144.1:7545")
	// connect wallet
	const wallet = new ethers.Wallet(PRIVATE_KEY,provider)

	// get abi of contract
	const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf-8")
	// get bin -> binary of contract
	const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf-8")

	// create a contract factory
	// a contract factory is an object used to deploy contract
	const contractFactory = new ethers.ContractFactory(abi,binary,wallet)
	console.log("deploying please wait... 😊")

	const contract = await contractFactory.deploy()
	console.log(contract)
}

main().then(() => process.exit(0))
        .catch((error)=>{
            console.error(error);
            process.exit(1);
        })