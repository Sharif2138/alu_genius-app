// backend/server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const weatherData = weatherResponse.data;

    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get('/api/air-quality', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Latitude and longitude are required" });

  try {
    const airQualityResponse = await axios.get(
      `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat}&lon=${lon}&key=${process.env.BREEZOMETER_API_KEY}`
    );
    const airQualityData = airQualityResponse.data.data;

    res.json({
      air_quality: airQualityData.indexes.baqi.aqi_display,
      category: airQualityData.indexes.baqi.category,
      dominant_pollutant: airQualityData.dominant_pollutant,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch air quality data" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
