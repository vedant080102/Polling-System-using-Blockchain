import logo from '../media/poll.svg';
import React from 'react'
import {Link} from "react-router-dom";


class MyNavbar extends React.Component {
    
    constructor() {
        super()
        // this.state = {
        //     style: {
        //         transform: 'translateX(-100%)'
        //     }
        // }
    }
    
    // componentDidMount() {
    //     document.addEventListener("scroll", function () {
    //         const navbar = document.querySelector(".App-header nav");
    //         const navbarHeight = 100;
        
    //         const distanceFromTop = Math.abs(
    //             // window.pageYOffset + navbar.getBoundingClientRect().top
    //             document.body.getBoundingClientRect().top
    //             // document.querySelector(".wrapper").getBoundingClientRect().top
    //         );
    //         // console.log(distanceFromTop , navbarHeight);
        
    //         if (distanceFromTop >= navbarHeight) {
    //             document.getElementsByClassName('nav-filler')[0].style.display = 'block';
    //             navbar.classList.add("fixed-top");
    //         }
    //         else {
    //             navbar.classList.remove("fixed-top");
    //             document.getElementsByClassName('nav-filler')[0].style.display = 'none';
    //         }
        
    //     });
    // }

    // menuCancel = () => {
    //     this.setState({
    //         style:{
    //             transform: 'translateX(-100%)'
    //         }
    //     });
    //     document.body.style.backgroundColor = "white";
    //     document.body.style.overflow = "overlay";
    // }

    render() {
        return (
            <header className="App-header">
                {/* <nav> */}
                    <h1 className='text-center'>
                        <Link id='brand-name' onClick={this.menuCancel} to='/'>
                            <img className='mx-3' src={logo} alt="Logo" height={50} width={50}/>
                            Polling Tool
                        </Link>
                    </h1>
                {/* </nav> */}
            </header>
        );
    }
}

export default MyNavbar;