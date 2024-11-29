document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    const weatherApiKey = '768f0167ea0fddd766b125f66b1fef33';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
  
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat={LAT}&lon={LON}&appid=${weatherApiKey}`;
  
    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
  
        const weatherInfo = `
          <h2>Weather in ${city}</h2>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
        `;
  
        // Fetch air quality using latitude and longitude
        fetch(airQualityUrl.replace('{LAT}', lat).replace('{LON}', lon))
          .then(res => res.json())
          .then(airData => {
            const airQuality = airData.list[0].main.aqi; // Air quality index
            const airInfo = `
              <p>Air Quality Index: ${airQuality} (1 = Good, 5 = Bad)</p>
            `;
            document.getElementById('result').innerHTML = weatherInfo + airInfo;
          });
      })
      .catch(error => {
        document.getElementById('result').innerHTML = `<p>Error fetching data. Try again!</p>`;
      });
  });
  
