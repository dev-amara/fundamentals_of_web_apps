import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('');

    const { capital } = country;

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY;

        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;

        axios.get(url).then((response) => setWeather(response.data.current));
    }, [capital]);

    const { wind_dir, weather_descriptions, wind_speed, weather_icons, temperature } = weather;

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <div>
                <div>
                    <b>temperature:</b> {temperature} Celcius
                </div>
                <div>
                    <img src={weather_icons} alt={weather_descriptions} />
                </div>
                <div>
                    <b> wind: </b>
                    {wind_speed} mph direction {wind_dir}
                </div>
            </div>
        </div>
    );
};

export default Weather;
