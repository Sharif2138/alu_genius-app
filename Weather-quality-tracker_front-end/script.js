// frontend/app.js
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return alert("Please enter a city");
  
    try {
      // Fetch weather data
      const weatherResponse = await fetch(`/api/weather?city=${city}`);
      const weatherData = await weatherResponse.json();
  
      if (weatherData.error) throw new Error(weatherData.error);
  
      // Fetch air quality data
      const { lat, lon } = weatherData.coord;
      const airQualityResponse = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`);
      const airQualityData = await airQualityResponse.json();
  
      if (airQualityData.error) throw new Error(airQualityData.error);
  
      // Display results
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = `
        <p><strong>City:</strong> ${weatherData.city}</p>
        <p><strong>Temperature:</strong> ${weatherData.temperature} °C</p>
        <p><strong>Description:</strong> ${weatherData.description}</p>
        <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weatherData.wind_speed} m/s</p>
        <p><strong>Air Quality:</strong> ${airQualityData.air_quality}</p>
        <p><strong>Category:</strong> ${airQualityData.category}</p>
        <p><strong>Dominant Pollutant:</strong> ${airQualityData.dominant_pollutant}</p>
      `;
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
  