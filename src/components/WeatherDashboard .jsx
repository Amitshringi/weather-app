import React, { useEffect, useState } from "react";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const cities = [
    { name: "Mumbai", lat: 19.076, lon: 72.8777 },
    { name: "Delhi", lat: 28.7041, lon: 77.1025 },
    { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
    { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
    { name: "Pune", lat: 18.5204, lon: 73.8567 },
    // { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  ];

  const fetchWeatherData = async () => {
    try {
      const responses = await Promise.all(
        cities.map(city =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
          ).then(response => response.json())
        )
      );

      setWeatherData(
        responses.map((data, index) => ({
          name: cities[index].name,
          temp: data.main?.temp || "N/A",
          condition: data.weather[0]?.description || "N/A",
          icon: data.weather[0]?.icon || "default_icon",
        }))
      );
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem",  }}>
      {weatherData.map((city, index) => (
        <div key={index} className="city-card" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", textAlign: "center", width: "150px" }}>
          <h3>{city.name}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
            alt={city.condition}
          />
          <p>Temperature: {city.temp ? `${city.temp}°C` : "Data not available"}</p>
          <p>Condition: {city.condition || "Data not available"}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherComponent;
