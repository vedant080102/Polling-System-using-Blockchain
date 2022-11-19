import { useState } from "react";
import { useHistory } from "react-router-dom"
import factory from "../abi/factory"

export default function JoinPoll() {

    const history = useHistory();

    const [pollName, setPollName] = useState("");
    // const [pollAddress, setPollAddress] = useState("");

    const join = async () => {
        const allPolls = await factory.methods.getAllPolls().call();
        let found = false, pollAdd = '';
        console.log("All Polls: ", allPolls);

        for (let i = 0; i < allPolls.length; i++) {
            if (pollName === allPolls[i][0]) {
                // setPollAddress(allPolls[i][1]);
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
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Enter the Name of the Poll</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Poll Tool's poll" onChange={(e)=> setPollName(e.target.value)}/>
                        </div>
                        <div className="col-12 flex mt-3">
                            <button className="btn blue-outline-btn" onClick={join}>Join Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}