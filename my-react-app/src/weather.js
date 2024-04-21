import React, { useState } from 'react';
import { WiCloud, WiDaySunny, WiRain, WiSnow, WiFog, WiThunderstorm, WiShowers } from 'react-icons/wi';
import './weather.css';

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const weatherIcons = {
        Clear: <WiDaySunny size={50} />,
        Clouds: <WiCloud size={50} />,
        Rain: <WiRain size={50} />,
        Snow: <WiSnow size={50} />,
        Fog: <WiFog size={50} />,
        Thunderstorm: <WiThunderstorm size={50} />,
        Drizzle: <WiShowers size={50} />,
    };

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        const apiKey = '629bdae43dd08e0069e765912dd61328';
        const uvApiKey = 'openuv-55lrlva1v501-io';

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            setWeatherData(data);

            // Fetch UV index
            const uvResponse = await fetch(`https://api.openuv.io/api/v1/uv?lat=${data.coord.lat}&lng=${data.coord.lon}`, {
                headers: {
                    'x-access-token': uvApiKey,
                },
            });

            const uvData = await uvResponse.json();
            setUvIndex(uvData.result.uv);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            <img 
                src="/logo.png" 
                alt="Weather Icon" 
                className="mb-3 position-absolute" 
                style={{ width: '300px', height: 'auto', top: '300px' }}   
            />
            <div className="weather-input text-center">
                <input
                    type="text"
                    value={city}
                    placeholder="Enter city name"
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control d-inline-block"
                />
                <button 
                    onClick={fetchWeather} 
                    disabled={!city || loading}
                    className="btn btn-primary mt-2"
                >
                    See Local Weather
                </button>
            </div>

            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-danger">{error}</p>}

            {weatherData && (
                <div className="weather-details mt-4">
                    <div className="text-center mb-4">
                        <h2>Current Weather in {city}</h2>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-3">
                            <div className="weather-detail">
                                {weatherIcons[weatherData.weather[0]?.main] || <WiDaySunny size={50} />}
                                <p>{weatherData.weather[0]?.main}</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="weather-detail">
                                <p>Temperature: {weatherData.main?.temp}°F</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="weather-detail">
                                <p>Humidity: {weatherData.main?.humidity}%</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="weather-detail">
                                <p>Wind Speed: {weatherData.wind?.speed} mph</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <p>UV Index: {uvIndex}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
