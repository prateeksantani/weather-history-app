import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('New York'); // Initial city value
  const [date, setDate] = useState('2024-02-20'); // Initial date value
  const apiKey = '8bb13baffb874e89a4a74143242702';
  const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null); // Reset weatherData to null on error
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather History</h1>
      <label htmlFor="cityInput">Enter City:</label>
      <input 
        type="text" 
        id="cityInput" 
        value={city} 
        onChange={handleCityChange} 
      />
      <br />
      <label htmlFor="dateInput">Enter Date:</label>
      <input 
        type="date" 
        id="dateInput" 
        value={date} 
        onChange={handleDateChange} 
        min="2024-01-01" 
        max="2024-12-31" 
      />
      <br />
      {weatherData && weatherData.forecast ? (
        <div>
          <p>Date: {weatherData.forecast.forecastday[0].date}</p>
          <p>Average Temperature: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C</p>
          <p>Condition: {weatherData.forecast.forecastday[0].day.condition.text}</p>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default App;
