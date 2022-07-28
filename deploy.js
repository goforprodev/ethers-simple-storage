const ethers = require("ethers");
const fs = require("fs-extra");

const RPC_SERVER = "http://127.0.0.1:7545";
const PRIVATE_KEY =
  "711c38d35ac0bbdaea620c221af63dd45c462040404e625de89099835a92d1df";

async function main() {
  //connect to blockchain
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
  // connect wallet
  const wallet = new ethers.Wallet(
    "186cd67dcb869fe760b3372cae50d02160f7464e5358e9caa9a3c6ab0264d724",
    provider
  );

  // get abi of contract
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  // get bin -> binary of contract
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // create a contract factory
  // a contract factory is an object used to deploy contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying please wait... 😊");

  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  // console.log(contract);
  //deployment receipt
  // const deploymentReceipt = await contract.deployTransaction.wait(1)
  // console.log(deploymentReceipt)

  //deployment with transaction data
  // console.log("lets deploy with transaction data");
  // const nonce = await wallet.getTransactionCount();
  // const tx = {
  // 	nonce: nonce,
  // 	gasPrice: 20000000000,
  // 	gasLimit: 6721975,
  // 	to: null,
  // 	value: 0,
  // 	data: "0x608060405234801561001057600080fd5b506107a1806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632e64cec11461006757806343ede4ae146100855780636057361d146100a35780636f760f41146100bf5780638bab8dd5146100db5780639e7a13ad1461010b575b600080fd5b61006f61013c565b60405161007c919061055a565b60405180910390f35b61008d610146565b60405161009a919061055a565b60405180910390f35b6100bd60048036038101906100b8919061049d565b61014c565b005b6100d960048036038101906100d49190610441565b610156565b005b6100f560048036038101906100f091906103f8565b6101e6565b604051610102919061055a565b60405180910390f35b6101256004803603810190610120919061049d565b610214565b604051610133929190610575565b60405180910390f35b6000600254905090565b60025481565b8060028190555050565b600160405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101bc9291906102d0565b505050806000836040516101d09190610543565b9081526020016040518091039020819055505050565b6000818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6001818154811061022457600080fd5b906000526020600020906002020160009150905080600001549080600101805461024d9061066e565b80601f01602080910402602001604051908101604052809291908181526020018280546102799061066e565b80156102c65780601f1061029b576101008083540402835291602001916102c6565b820191906000526020600020905b8154815290600101906020018083116102a957829003601f168201915b5050505050905082565b8280546102dc9061066e565b90600052602060002090601f0160209004810192826102fe5760008555610345565b82601f1061031757805160ff1916838001178555610345565b82800160010185558215610345579182015b82811115610344578251825591602001919060010190610329565b5b5090506103529190610356565b5090565b5b8082111561036f576000816000905550600101610357565b5090565b6000610386610381846105ca565b6105a5565b9050828152602081018484840111156103a2576103a1610734565b5b6103ad84828561062c565b509392505050565b600082601f8301126103ca576103c961072f565b5b81356103da848260208601610373565b91505092915050565b6000813590506103f281610754565b92915050565b60006020828403121561040e5761040d61073e565b5b600082013567ffffffffffffffff81111561042c5761042b610739565b5b610438848285016103b5565b91505092915050565b600080604083850312156104585761045761073e565b5b600083013567ffffffffffffffff81111561047657610475610739565b5b610482858286016103b5565b9250506020610493858286016103e3565b9150509250929050565b6000602082840312156104b3576104b261073e565b5b60006104c1848285016103e3565b91505092915050565b60006104d5826105fb565b6104df8185610606565b93506104ef81856020860161063b565b6104f881610743565b840191505092915050565b600061050e826105fb565b6105188185610617565b935061052881856020860161063b565b80840191505092915050565b61053d81610622565b82525050565b600061054f8284610503565b915081905092915050565b600060208201905061056f6000830184610534565b92915050565b600060408201905061058a6000830185610534565b818103602083015261059c81846104ca565b90509392505050565b60006105af6105c0565b90506105bb82826106a0565b919050565b6000604051905090565b600067ffffffffffffffff8211156105e5576105e4610700565b5b6105ee82610743565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561065957808201518184015260208101905061063e565b83811115610668576000848401525b50505050565b6000600282049050600182168061068657607f821691505b6020821081141561069a576106996106d1565b5b50919050565b6106a982610743565b810181811067ffffffffffffffff821117156106c8576106c7610700565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61075d81610622565b811461076857600080fd5b5056fea264697066735822122048a2d624417a2bab276f643e8db7769bfeecbf602d12017d7bb9514e1879d7a064736f6c63430008070033",
  // 	chainId: 1337,
  // };
  // // const signedTxResponse = await wallet.signTransaction(tx)
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);
  // console.log(sentTxResponse);

  // Interact with contracts functions
  // get-number
  const currentFavouriteNumber = await contract.retrieve();
  console.log(currentFavouriteNumber.toString());
  // when we call a contract function we get a transaction response
  const transactionResponse = await contract.store("7")  //always pass contract variables as strings
  // when we wait for a transaction to be mined we get a transaction receipt
  const transactionReceipt = await transactionResponse.wait(1); // (1) is the number of blocks to wait for
  const newFavouriteNumber = await contract.retrieve();
  console.log(newFavouriteNumber.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
