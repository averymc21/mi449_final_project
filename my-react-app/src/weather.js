import React, { useState } from 'react';

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async () => {
        const apiKey = '629bdae43dd08e0069e765912dd61328'; // Replace with your OpenWeatherMap API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
        const data = await response.json();
        setWeatherData(data);
    };

    return (
        <div>
            <h1>Weather App</h1>

            <input 
                type="text" 
                value={city} 
                placeholder="Enter city name" 
                onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={fetchWeather}>Fetch Weather</button>

            {weatherData && (
                <div>
                    <h2>Current Weather in {city}</h2>
                    <p>Temperature: {weatherData.main.temp}°F</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
