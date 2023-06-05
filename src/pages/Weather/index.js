import './styles.scss';
import Header from '../../components/Header/Header';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Context } from '../../App';
import { Link } from 'react-router-dom';

export default function Weather() {

    // Check if user is logged in or not.
    const { isAuthenticated } = useAuth0();

    // Handles the data fetch from API
    const [ data, setData ] = useState({});

    // Handles the inputted value in Display Weather button in Home Page
    const [ location, setLocation ] = useContext(Context);

    // Checks if the user's device is in mobile size.
    const [ deviceWidth, setDeviceWidth ] = useState(false);
  
    // API calls for fetching the Weather API
    const getWeatherLocation = () => {
        if(!!location){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=97b75d478a2cde9f632cc4b03c44cfe1`;
            axios.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    // Calls the function for fetching Weather API and checks the user's device if mobile. 
    useEffect(() => {
        getWeatherLocation();
        if (window.innerWidth < 500) {
            setDeviceWidth(true);
        }
    }, []);

    return (
        <div className='weather-container'>
            <Header />
            {
                isAuthenticated &&
                ( !!data.name ?
                <div className='weather-content-container'>
                    <div className='weather-table-container'>
                        <div className='weather-cont'>
                            <div className='weather-today'> Todays Weather in { data.name } </div>
                            <div className='weather-today'> {new Date().toLocaleString() + ""} </div>
                        </div>
                        <div className='weather-detail'>
                            <div className='weather-cont'>
                                <div className='weather-temp'> Temperature (F) </div>
                                <div className='weather-info'> { data.main && data.main.temp } </div>
                            </div>
                            {
                                !deviceWidth ?
                                <>
                                    <div className='weather-cont'>
                                        <div className='weather-temp'> Description </div>
                                        <div className='weather-info'> { data.weather && data.weather[0].description } </div>
                                    </div>
                                    <div className='weather-cont'>
                                        <div className='weather-temp'> Main </div>
                                        <div className='weather-info'> { data.weather && data.weather[0].main } </div>
                                    </div>
                                    <div className='weather-cont'>
                                        <div className='weather-temp'> Pressure </div>
                                        <div className='weather-info'> { data.main && data.main.pressure } </div>
                                    </div>
                                    <div className='weather-cont'>
                                        <div className='weather-temp'> Humidity </div>
                                        <div className='weather-info'> { data.main && data.main.humidity } </div>
                                    </div>
                                </>
                                : null
                            }
                        </div>
                    </div>
                    <Link to='/home' className='weather-back-button-link'>
                        <div className='weather-back-button' onClick={() => {setLocation('')}}>
                            <span> Back </span>
                        </div>
                    </Link>
                </div>
                :
                <div className='weather-content-container'>
                    <div className='weather-warning'> No data found. Click Back button and try again</div>
                    <Link to='/home' className='weather-back-button-link'>
                        <div className='weather-back-button' onClick={() => {setLocation('')}}>
                            <span> Back </span>
                        </div>
                    </Link>
                </div>
                )
            }
        </div>
    )
}