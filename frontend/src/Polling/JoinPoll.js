import { useState } from "react";
import { useHistory } from "react-router-dom"
import factory from "../abi/factory"
import web3 from "./../web3";

export default function JoinPoll() {

    const history = useHistory();

    const [pollName, setPollName] = useState("");
    const [pollAddress, setPollAddress] = useState("");

    const join = async () => {
        const allPolls = await factory.methods.getAllPolls().call();
        let found = false, pollAdd = '';
        console.log("All Polls: ", allPolls);

        for (let i = 0; i < allPolls.length; i++) {
            if (pollName == allPolls[i][0]) {
                setPollAddress(allPolls[i][1]);
                found = true;
                pollAdd = allPolls[i][1];
                // console.log(pollAddress);
                history.push(`/vote/${pollAdd}`);
            }
        }
        if (!found) {
            alert("Invalid Poll ❌, Please try again!");
        }

    }

    return <>
        <div className="container my-4">
            <div className="flex flex-column">
                <h2 className="mb-5">Join a Poll</h2>
                <div className="rounded-3 shadow light-bg p-4">
                    <div className="row">
                        {/* <div className="col-12 flex"> */}
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Enter the Name of the Poll</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Poll Tool's poll" onChange={(e)=> setPollName(e.target.value)}/>
                            {/* </div> */}
                        </div>
                        {/* <div className="col-12 flex"> */}
                        {/* <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Duration of the Poll</label>
                            <input type={"datetime-local"} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                        </div> */}
                        <div className="col-12 flex mt-3">
                            <button className="btn blue-outline-btn" onClick={join}>Join Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}