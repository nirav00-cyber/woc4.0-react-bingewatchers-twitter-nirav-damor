import React from 'react'
import './Footer.css';
import {FaGithub} from "react-icons/fa";
function Layout(props) {
    return (
        <>
            <div className="footer-container">
                <div className='footer-p1'>
                    <p>About</p>

                </div>
                <div className='footer-p2'>
                    <p>&copy; 2022 BingeWatcher's Twitter</p>
                </div>
                <div className='footer-p3'>
                    <FaGithub className='github-icon'></FaGithub>
                </div>
            </div>
        </>
    )
}

export default Layout;
