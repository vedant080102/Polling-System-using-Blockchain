import Web3 from "web3";

if(window.ethereum){
    // Do something 
    window.ethereum.request({method:'eth_requestAccounts'})
    .then(res=>{
            // Return the address of the wallet
            console.log(res)
    })
}else{
    alert("install metamask extension!!")
}

export default new Web3(Web3.givenProvider);