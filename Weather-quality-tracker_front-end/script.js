import weatherApiKey from './api_key.js';

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  // Clear previous results
  document.getElementById('result').innerHTML = 'Loading...';

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found!');
      }
      return response.json();
    })
    .then(data => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const weatherInfo = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
      `;

      // Fetch air quality using latitude and longitude
      const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
      fetch(airQualityUrl)
        .then(res => res.json())
        .then(airData => {
          const airQuality = airData.list[0].main.aqi; // Air Quality Index
          const airInfo = `
            <p>Air Quality Index: ${airQuality} (1 = Good, 5 = Bad)</p>
          `;
          document.getElementById('result').innerHTML = weatherInfo + airInfo;
        })
        .catch(() => {
          document.getElementById('result').innerHTML = weatherInfo + '<p>Could not fetch air quality data.</p>';
        });
    })
    .catch(error => {
      document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
