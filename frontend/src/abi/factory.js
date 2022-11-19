import Web3 from 'web3'
import abi from './factory_abi.json'

const web3 = new Web3(Web3.givenProvider);
const address = '0x2d58AEee36E04471AA5b9Dea2E16739A59c8a84A';

export default new web3.eth.Contract(abi, address);