import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize Supabase client
    const supabaseUrl = 'https://dgvzouuaqkqjqbcxjmgp.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndnpvdXVhcWtxanFiY3hqbWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTA1MTcsImV4cCI6MjAyOTI4NjUxN30.LM9MDJvkwm0wd_Dxt220waXw6zvtxlU1qIMEwzOYFws';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fetchSupabaseData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('weather_data')
                .select('*');

            if (error) {
                throw error;
            }

            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching data from Supabase:', error.message);
        }
    }, [supabase]);

    useEffect(() => {
        fetchSupabaseData();
    }, [fetchSupabaseData]);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        const apiKey = '629bdae43dd08e0069e765912dd61328'; // Replace with your OpenWeatherMap API key

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            setWeatherData(data);

            // Insert real-time weather data into Supabase table
            await supabase.from('weather_data').insert([
                {
                    city_name: data.name,
                    country: data.sys.country,
                    latitude: data.coord.lat,
                    longitude: data.coord.lon,
                    temperature: data.main.temp,
                    weather_description: data.weather[0].main,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                },
            ]);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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

            <button onClick={fetchWeather} disabled={!city || loading}>
                Fetch Weather
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {weatherData && (
                <div>
                    <h2>Current Weather in {city}</h2>
                    <p>Temperature: {weatherData.main.temp}°F</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} mph</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
