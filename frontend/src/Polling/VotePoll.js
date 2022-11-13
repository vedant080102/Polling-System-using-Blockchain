import pollAbi from './../abi/poll_abi.json'
import {useParams} from 'react-router-dom'
import web3 from "./../web3";
import { useEffect, useState } from 'react';

export default function VotePoll() {

    const {id} = useParams();
    const [contract, setContract] = useState()
    const [userId, setuserId] = useState()
    const [quest, setquest] = useState()
    const [options, setoptions] = useState([])
    const [voters, setvoters] = useState([]);
    const [result, setresult] = useState("");
    
    const [isAdmin, setisAdmin] = useState(false);

    useEffect(()=> console.log("id:", id),[1]);

    useEffect(()=> getData(), [1]);

    const getData = async () => {
        var cont = new web3.eth.Contract(pollAbi, id);
        setContract(cont);

        const pollData = await cont.methods.getQuestion().call();
        console.log(pollData);
        setquest(pollData.question);
        setoptions(pollData.options);

        window.ethereum.request({method:'eth_requestAccounts'})
        .then(res=>{
                // Return the address of the wallet
                setuserId(res[0]);
                console.log(res)
        })

        try {
            const res__ = await cont.methods.checkIfManager().call();
    
            console.log("res__:", res__);
            setisAdmin(res__);

            if (res__) {
                const vtrs = await cont.methods.getVoters().call();
                console.log("voters:", vtrs);
                setvoters(vtrs);
    
                const winner = await cont.methods.pickWinner().call({from: id});
                setresult(winner);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(async()=> {
    //     if (isAdmin) {
    //         const vtrs = await contract.methods.getVoters().call();
    //         console.log("voters:", vtrs);
    //         setvoters(vtrs);

    //         // try {
    //         //     const winner = await contract.methods.pickWinner().call({from: id});
    //         //     setresult(winner);
    //         // } catch (error) {
    //         //     console.log(error)
    //         // }
    //     }
    // }, [isAdmin]);

    const inputCompo = (option, key) => <div className="col-12 col-md-6 flex mt-3" key={key}>
        <button className="btn blue-outline-btn" onClick={async ()=> {
            await contract.methods.enter(option).send({
                from: userId
            });
        }}>{option}</button>
    </div>


    return <>
        <div className="container my-4">
            <div className="flex flex-column">
                <h2 className="mb-5">Poll</h2>
                <div className="rounded-3 shadow light-bg p-4">
                    <h3>{quest}</h3>
                    {!isAdmin ? <>
                        <span className="text-muted">Select one option to submit</span>
                        <div className="row my-4">
                            {options.map((data, i) => inputCompo(data, i))}
                        </div>
                    </> : <>
                            <h4>Result: {result}</h4>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Voters</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {voters.map((data, i) => 
                                        <td key={i}>data</td>
                                    )}
                                </tr>
                                </tbody>
                        </table>
                    </>
                }

                </div>
            </div>
        </div>
    </>
}