import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('New York'); // Initial city value
  const [startDate, setStartDate] = useState('2024-02-20'); // Initial start date value
  const [endDate, setEndDate] = useState('2024-02-25'); // Initial end date value
  const apiKey = '8bb13baffb874e89a4a74143242702';
  const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${startDate}&enddate=${endDate}`;

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

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
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
      <label htmlFor="startDateInput">Start Date:</label>
      <input 
        type="date" 
        id="startDateInput" 
        value={startDate} 
        onChange={handleStartDateChange} 
        min="2024-01-01" 
        max={endDate} 
      />
      <br />
      <label htmlFor="endDateInput">End Date:</label>
      <input 
        type="date" 
        id="endDateInput" 
        value={endDate} 
        onChange={handleEndDateChange} 
        min={startDate} 
        max="2024-12-31" 
      />
      <br />
      {weatherData && weatherData.forecast ? (
        <div>
          {weatherData.forecast.forecastday.map((day, index) => (
            <div key={index}>
              <p>Date: {day.date}</p>
              <p>Average Temperature: {day.day.avgtemp_c}°C</p>
              <p>Condition: {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default App;
