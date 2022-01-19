import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useAuth } from '../../lib/AuthContext';
import { useHistory } from 'react-router-dom'

function Navigation()
{
    const [isToggle, setIsToggle] = useState(false);
    const { logout,currentUser } = useAuth();
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
            <NavLink to='/'>
                <div className='logo'>
                    BingeWatcher's Twitter
                </div>
            </NavLink>
            <div className={toggleClass}
               onClick={toggleHandler}>
                
                <span className='bar' />
                <span className='bar'/>
                <span className='bar'/>
            </div>
               <nav className={navbarClass}>
                <ul>
                    <li>
                        <NavLink to='/home' activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/trending' activeClassName='active'>
                            Trending
                        </NavLink>
                       </li>
                       {currentUser &&
                       <li>
                         <NavLink to={`/userprofile/${currentUser.uid}`} activeClassName='active'>
                            Profile
                        </NavLink>
                    </li>}
                    {!currentUser && <li>
                        <NavLink to='/login' activeClassName='active'>
                            Login
                        </NavLink>
                    </li>}
                    
                     {currentUser && <li>
                        <button onClick={logoutHandler}>
                            Logout
                        </button>
                    </li>} 
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;
