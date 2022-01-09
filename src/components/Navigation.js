import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom'

function Navigation()
{
    const [isToggle, setIsToggle] = useState(false);
    const { logout } = useAuth();
    const history = useHistory();
    const logoutHandler = async () =>
    {
        
        try
        {
            await logout();
            history.push('/login')
        } catch (error)
        {
            console.log(error);
        }
    }
    const toggleHandler = () =>
    {
        setIsToggle((prevState) => !prevState);
    }

    let toggleClass = `toggle-button ${ isToggle ? 'active' : '' }`;
    let navbarClass = `navbar-links ${ isToggle ? 'active' : '' }`;
       return (
        <header className='navbar'>
            <Link to='/'>
                <div className='logo'>
                    BingeWatcher's Twitter
                </div>
            </Link>
               <div className={toggleClass}
               onClick={toggleHandler}>
                
                <span className='bar' />
                <span className='bar'/>
                <span className='bar'/>
            </div>
               <nav className={navbarClass}>
                <ul>
                    <li>
                        <Link to='/home'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/trending'>
                            Trending
                        </Link>
                    </li>
                    <li>
                        <Link to='/login'>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile'>
                            Profile
                        </Link>
                    </li>
                     <li>
                        <button onClick={logoutHandler}>
                            Logout
                        </button>
                    </li> 
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;
