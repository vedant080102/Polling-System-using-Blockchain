const path = require("path")
const fs = require("fs")
const solc = require("solc")

const inboxPath = path.resolve(__dirname, "contract", "Poll.sol")
const source = fs.readFileSync(inboxPath, 'utf-8');



var input = {
    language: 'Solidity',
    sources: {
        'Poll.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output.contracts["Poll.sol"].Inbox.evm)

module.exports = {
    interface: output.contracts["Poll.sol"].Poll.abi,
    bytecode: output.contracts["Poll.sol"].Poll.evm.bytecode.object,
    interface1: output.contracts["Poll.sol"].PollFactory.abi,
    bytecode1: output.contracts["Poll.sol"].PollFactory.evm.bytecode.object
}