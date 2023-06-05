import './Header.scss';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function Header() {

    // Logging out the user from Auth0 and check if user is logged in or not.
    const { logout, isAuthenticated } = useAuth0();

    return (
        <div className='header-container'>
            <div className='logo-container'>
                <BsFillCloudSunFill className='logo'/>
                <div className='logo-name'> WEATHER FORECAST </div>
            </div>
            <div className='tab-container'>
                <Link to='/' className='tab-link'>
                    <div className='tab'> LANDING </div>
                </Link>
                {
                    isAuthenticated &&
                    <>
                        <Link  to='/home' className='tab-link'>
                            <div className='tab'> HOME </div>
                        </Link>
                        <Link to='/weather' className='tab-link'>
                                <div className='tab'> WEATHER </div>
                        </Link>
                    </>
                }
            </div>
            {
                isAuthenticated && 
                <div className='logout-button' onClick={() => logout()}>
                    <span> LOGOUT </span>
                </div>
            }
        </div>
    )
}