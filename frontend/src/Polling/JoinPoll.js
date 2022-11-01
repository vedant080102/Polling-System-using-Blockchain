import { useHistory } from "react-router-dom"

export default function JoinPoll() {

    const history = useHistory();

    return <>
        <div className="container my-4">
            <div className="flex flex-column">
                <h2 className="mb-5">Join a Poll</h2>
                <div className="rounded-3 shadow light-bg p-4">
                    <div className="row">
                        {/* <div className="col-12 flex"> */}
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Enter the Name of the Poll</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Poll Tool's poll"/>
                            {/* </div> */}
                        </div>
                        {/* <div className="col-12 flex"> */}
                        {/* <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Duration of the Poll</label>
                            <input type={"datetime-local"} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                        </div> */}
                        <div className="col-12 flex mt-3">
                            <button className="btn blue-outline-btn" onClick={()=> history.push("/vote/9909909")}>Join Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}