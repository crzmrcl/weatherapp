import './styles.scss';
import Header from '../../components/Header/Header';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { Context } from '../../App';
import { Link } from 'react-router-dom';

export default function Home() {
    // Getting te github user information and check if user is logged in or not.
    const { user, isAuthenticated } = useAuth0();

    // Getting the users inputted value search box in Home Page
    const [ location, setLocation ] = useContext(Context);

    return (
        <div className='home-container'>
            <Header />
            {
                isAuthenticated &&
                <div className='home-content-container'>
                    <div className='home-content'>
                        <div className='home-fullname'> { user?.name } </div>
                        <div className='home-github-link'> https://github.com/{ user?.nickname } </div>
                        <div className='home-search-container'>
                            <BiSearchAlt2 className='home-search-icon' />
                            <input 
                                type='text' 
                                className='home-search-input' 
                                onChange={(e) => {setLocation(e.target.value)}}
                                placeholder='Enter City' 
                            />
                        </div>
                        <Link to='/weather' className='home-display-button-link'>
                            <div className='home-display-button'> 
                                <span> Display Weather </span>
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}