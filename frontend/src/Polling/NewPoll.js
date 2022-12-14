import factory from "../abi/factory"
import web3 from "./../web3";
import {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

export default function NewPoll() {

    const [pollName, setPollName] = useState("");
    const [question, setquestion] = useState("");
    const [deadline, setdeadline] = useState();
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");

    const history = useHistory();

    const create = async () => {

        if(window.ethereum) {
            // Do something 
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(res=>{
                    // Return the address of the wallet
                    console.log(res)
            })
        } else {
            alert("install metamask extension!!")
        }

        let accounts = await web3.eth.getAccounts();
        let inp = {
            name: pollName,
            optios: [option1, option2, option3, option4]
        }

        await factory.methods.createPoll(inp.optios, inp.name, question, deadline).send({from:accounts[0], gas:"3000000"});

        const contAdd = await factory.methods.getMyDeployedPolls().call({from: accounts[0]});

        console.log("Contract:", contAdd);

        window.alert("Your poll has been created. 🎉");
        setTimeout(() => history.push("/"), 5000);
    }

    useEffect(()=>console.log("Deadline", deadline), [deadline]);

    return <>
        <div className="container my-4">
            <div className="flex flex-column">
                <h2 className="mb-5">Create a New Poll</h2>
                <div className="rounded-3 shadow light-bg p-4">
                    <form action="submit" onSubmit={e => e.preventDefault()}>
                        <div className="row">
                            {/* <div className="col-12 flex"> */}
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter the Name of the Poll*</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Poll Tool's poll" onChange={(e) => setPollName(e.target.value)} required/>
                                {/* </div> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter the poll question*</label>
                                <input type="text" className="form-control" id="pol-quest" placeholder="Who is this?" onChange={(e) => setquestion(e.target.value)} required/>
                            </div>
                            {/* <div className="col-12 flex"> */}
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Duration of the Poll</label>
                                <input type={"datetime-local"} min={new Date().toISOString().slice(0, -8)} className="form-control" onChange={(e)=> setdeadline(e.target.value)} required/>
                                {/* </div> */}
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Choices to be filled*</label>
                                <div className="col-12 col-md-6 mb-2">
                                    <input type='text' className="form-control" id="option1" placeholder="Option1" onChange={(e)=> setOption1(e.target.value)} required/>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <input type='text' className="form-control" id="option2" placeholder="Option2" onChange={(e)=> setOption2(e.target.value)} required/>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <input type='text' className="form-control" id="option3" placeholder="Option3" onChange={(e)=> setOption3(e.target.value)} required/>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <input type='text' className="form-control" id="option4" placeholder="Option4" onChange={(e)=> setOption4(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-12 flex mt-3">
                                <button className="btn blue-outline-btn" onClick={create}>Create Poll</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}