import logo from '../media/poll.svg';
import {Link} from "react-router-dom";


export default function MyNavbar() {
    return <header className="App-header">
        <h1 className='text-center'>
            <Link id='brand-name' to='/'>
                <img className='mx-3' src={logo} alt="Logo" height={50} width={50}/>
                Polling Tool
            </Link>
        </h1>
    </header>
}