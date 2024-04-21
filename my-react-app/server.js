require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3001;

const API_URL = "http://api.weatherstack.com/current";
const API_KEY = process.env.WEATHER_API_KEY;

app.use(express.json());

app.get('/weather', async (req, res) => {
    const { query } = req.query;
    const url = `${API_URL}?access_key=${API_KEY}&query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
