const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const {interface,bytecode}=require("./compile")

const provider = new HDWalletProvider(
    'reflect burden brass raccoon gorilla roof fun sheriff crucial push quality control',
    // "https://rinkeby.infura.io/v3/88d27d0f848744f0a7d57ecde51366cb"
)

const web3=new Web3(provider)

const deploy = async()=>{
    const accounts=await web3.eth.getAccounts();
    console.log(accounts)
    console.log("Attempting to deploy from acc",accounts[0])

    const result=await new web3.eth.Contract(interface)
    .deploy({data:bytecode,arguments:["Hi There!"]})
    .send({gas:"1000000",from:accounts[0]});

    console.log(result)
    console.log("contract deployed to", result.options.address)

}

deploy()