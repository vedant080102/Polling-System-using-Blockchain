import { useHistory } from "react-router-dom";
// import Footer from "../base/Footer";

export default function Home() {

    const history = useHistory();

    return <>
        <div className="container my-4">
            <div className="flex flex-column">
                <h2 className="mb-5">Welcome</h2>
                <div className="rounded-3 shadow light-bg p-4">
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut facilis eius et quas. Autem repudiandae rem fugit mollitia est error! */}
                    <div className="row">
                        <div className="col-12 col-md-6 flex">
                            <button className="btn blue-outline-btn" onClick={()=> history.push("/join-poll")}>
                                <i className="fas fa-poll me-2"></i>Join Existing Poll
                            </button>
                        </div>
                        <div className="col-12 col-md-6 flex">
                            <button className="btn blue-outline-btn" onClick={()=> history.push("/new-poll")}>
                                <i className="fas fa-plus me-2"></i>Create a New Poll
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}