import './styles.scss';
import Header from '../../components/Header/Header';
import { useAuth0 } from '@auth0/auth0-react';

export default function Landing() {

    // Redirecting Login Page provided by Auth0 and check if user is logged in or not.
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        <div className='landing-container'>
            <Header />
            <div className='landing-content-container'>
                <div className='landing-greeting'>
                    Hello, World! <br />
                    Welcome to the weather forecast web application. Please login with your Github user to use the application and view the weather in your city.
                </div>
                {/* If the user is not logged in the login button will not dispalyed */}
                {
                    !isAuthenticated &&
                    <div className='login-button' onClick={() => loginWithRedirect()}>
                        <span> LOGIN </span>
                    </div>
                }
            </div>
        </div>
    )
}