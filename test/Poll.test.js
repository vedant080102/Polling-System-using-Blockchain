const assert = require("assert")
const ganache = require("ganache-cli")
const { describe } = require("mocha")
const { it } = require("mocha")
const Web3 = require("web3")

const web3 = new Web3(ganache.provider())
const {
    // bytecode,
    interface,
    bytecode1,
    interface1
} = require("../compile")

let accounts;
let factory;
const initStr = "Hi there!"

beforeEach(async () => {
    //get a list of all acounts
    //use one of those accounts to deploy  the contacts
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(interface1)
        .deploy({
            data: bytecode1,
            arguments: []
        })
        .send({
            from: accounts[0],
            gas: "3000000"
        });

    // console.log(inbox)

})

describe("Inbox", () => {

    // this.timeout(0);

    it("deploys a contract", () => {
        assert.ok(factory.options.address)
    });

    it("Create unique polls", async () => {
        await factory.methods.createPoll(['a','b','c']).send({from: accounts[1], gas:"3000000"});
    });

    it("Get individual poll data", async () => {
        createNewPoll(accounts[1], 1);
        createNewPoll(accounts[2], 2);
        createNewPoll(accounts[3], 3);
        createNewPoll(accounts[4], 4);

/*         await factory.methods.createPoll(['a','b','c']).send({from: accounts[1], gas:"3000000"});

        const contAdd = await factory.methods.getDeployedPolls().call({from: accounts[1]});
        console.log("Address: ", contAdd);

        var cont = new web3.eth.Contract(interface, contAdd);
    
        await cont.methods.enter("a").send({
            from: accounts[5]
        });
        await cont.methods.enter("b").send({
            from: accounts[2]
        });
        await cont.methods.enter("b").send({
            from: accounts[3]
        });
        await cont.methods.enter("b").send({
            from: accounts[4]
        });
        const res = await cont.methods.pickWinner().call({
            from: accounts[1]
        });

        const res1 = await cont.methods.getVoters().call();


        console.log("Result:", res);
        console.log("Voters:", res1);
 */    
    });


    // it("has a default msg",async()=>{
    //     const message = await inbox.methods.message().call() 
    //     assert.equal(message,initStr)
    // })


    // it("can change msg",async()=>{
    // await inbox.methods.setMessage("bye").send({from:accounts[0]})

    // const message = await inbox.methods.message().call() 
    //     assert.equal(message,"bye")
    // })
})

const createNewPoll = async (creatorAccount, ind) => {
    await factory.methods.createPoll(['a','b','c']).send({from: creatorAccount, gas:"3000000"});

    const contAdd = await factory.methods.getDeployedPolls().call({from: creatorAccount});
    console.log("Address: ", contAdd);

    var cont = new web3.eth.Contract(interface, contAdd);

    let votes = ['a','b','c']

    for (let i = 1; i < 6; i++) {
        if (ind == i) continue;
        await cont.methods.enter(votes[Math.floor(3 * Math.random())]).send({
            from: accounts[i]
        });
    }
    
    const res = await cont.methods.pickWinner().call({
        from: creatorAccount
    });

    const res1 = await cont.methods.getVoters().call();


    console.log("\nNew Poll:")

    console.log("Result:", res);
    console.log("Voters:", res1);
}


// class Car{
//     park(){
//         return "stopped"
//     }
//     drive(){
//         return "vroom"
//     }
// }

// let car
// beforeEach(()=>{
//     car = new Car();
// })

// describe("Car",()=>{

//     it("can park",()=>{

//         assert.equal(car.park(),"stopped")
//     })
//     it("can drive",()=>{

//         assert.equal(car.drive(),"vroom")
//     })
// })