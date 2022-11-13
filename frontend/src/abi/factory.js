import Web3 from 'web3'
import abi from './factory_abi.json'

const web3 = new Web3(Web3.givenProvider);
const address = '0xb3b6720e9fD82c43aA1e37246Cd440e7F0D86164';

/* 
const abi = [{
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "allPolls",
    "outputs": [{
        "internalType": "string",
        "name": "name",
        "type": "string"
    }, {
        "internalType": "address",
        "name": "pollAddress",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "string[]",
        "name": "options",
        "type": "string[]"
    }, {
        "internalType": "string",
        "name": "name",
        "type": "string"
    }],
    "name": "createPoll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "deployedPolls",
    "outputs": [{
        "internalType": "string",
        "name": "name",
        "type": "string"
    }, {
        "internalType": "address",
        "name": "pollAddress",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getAllPolls",
    "outputs": [{
        "components": [{
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {
            "internalType": "address",
            "name": "pollAddress",
            "type": "address"
        }],
        "internalType": "struct PollFactory.PollData[]",
        "name": "",
        "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getMyDeployedPolls",
    "outputs": [{
        "components": [{
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {
            "internalType": "address",
            "name": "pollAddress",
            "type": "address"
        }],
        "internalType": "struct PollFactory.PollData",
        "name": "",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}] 
*/

export default new web3.eth.Contract(abi, address);