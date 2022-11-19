import pollAbi from './../abi/poll_abi.json'
import {useHistory, useParams} from 'react-router-dom'
import web3 from "./../web3";
import { useEffect, useState } from 'react';

export default function VotePoll() {

    const {id} = useParams();
    const [contract, setContract] = useState()
    const [userId, setuserId] = useState()
    const [quest, setquest] = useState()
    const [options, setoptions] = useState([])
    const [voters, setvoters] = useState([]);
    const [result, setresult] = useState([]);
    const [isAdmin, setisAdmin] = useState(false);

    const history = useHistory();

    useEffect(()=> {
        console.log("poll id:", id);

        var cont = new web3.eth.Contract(pollAbi, id);
        setContract(cont);
    },[id]);

    useEffect(()=> {(contract != null) ? getData() : console.log("Not initialized yet!")}, [contract]);
    
    useEffect(()=> {isAdmin ? getResult() : console.log("Not admin")}, [isAdmin]);

    // functions
    const getResult = async() => {
        await contract.methods.getVoters().call().then((data)=> {
            console.log("voters:", data);
            setvoters(data);
        }).catch((e) => console.log(e));

        // const winner = 
        await contract.methods.getResult().call({from: userId}).then((data) => {
            console.log("Winner: ", data);
            let res = []
            res.push([options[0], data[0]]);
            res.push([options[1], data[1]]);
            res.push([options[2], data[2]]);
            res.push([options[3], data[3]]);
            setresult(res);
            // console.log(res);
        }).catch((e) => console.log(e));
    }

    const getData = async () => {
        const pollData = await contract.methods.getQuestion().call();
        console.log(pollData);
        setquest(pollData.question);
        setoptions(pollData.options);

        window.ethereum.request({method:'eth_requestAccounts'})
        .then((res)=>{
                // Return the address of the wallet
                setuserId(res[0]);
                console.log("userId:", res[0]);
                // console.log(res);

                let check = async () => await contract.methods.checkIfManager().call({from: res[0]}).then((data) => {
                    console.log("res__:", data);
                    setisAdmin(data);
                });
                check();
        })
    }

    const sendVote = async (option)=> {
        await contract.methods.enter(option).send({from: userId});
        window.alert("Your vote to the poll has been submitted.");
        setTimeout(() => history.push("/"), 5000);
    }

    const inputCompo = (option, key) => <div className="col-12 col-md-6 flex mt-3" key={key}>
        <button className="btn blue-outline-btn" onClick={() => sendVote(option)}>{option}</button>
    </div>

    return <>
        <div className="container my-4">
            <div className="flex flex-column">
                <h2 className="mb-5">Poll</h2>
                <div className="rounded-3 shadow light-bg p-4">
                    <h3 className='text-center'>{quest}</h3>
                    {!isAdmin ? <>
                        <span className="text-muted">Select one option to submit</span>
                        <div className="row my-4">
                            {options.map((data, i) => inputCompo(data, i))}
                        </div>
                    </> : <>
                        {/* <h4 className='my-3'>Result: {result}</h4> */}
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan="2">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((data, i) => <tr key={i}>
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Voters</th>
                                </tr>
                            </thead>
                            <tbody>
                                {voters.length === 0 ? <tr><td>No voters yet.</td></tr> : voters.map((data, i) => 
                                    <tr key={i}><td>{data}</td></tr>
                                )}
                                </tbody>
                        </table>
                    </>}
                </div>
            </div>
        </div>
    </>
}