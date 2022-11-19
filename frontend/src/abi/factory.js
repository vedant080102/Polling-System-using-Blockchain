import Web3 from 'web3'
import abi from './factory_abi.json'

const web3 = new Web3(Web3.givenProvider);
const address = '0xF223906C585303199475FE26191E6Ff71D2E66da';

export default new web3.eth.Contract(abi, address);