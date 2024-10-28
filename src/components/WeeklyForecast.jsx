import React, { useEffect, useState } from "react";
import axios from "axios";

const WeeklyForecast = ({ lat, lon }) => {
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyWeather = async () => {
        const appid = import.meta.env.VITE_API_KEY; // Ensure this is correct
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${appid}`
          );
          setWeeklyWeather(response.data.daily);
        } catch (error) {
          console.error("Error fetching weekly data: ", error.response ? error.response.data : error.message);
          setError("Could not fetch weather data.");
        }
      };

    if (lat && lon) {
      fetchWeeklyWeather();
    }
  }, [lat, lon]);

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div className="flex justify-center gap-8 flex-wrap w-[60%]">
      {weeklyWeather.map((day, index) => (
        <MiniCard
          key={index}
          time={day.dt * 1000} // Convert Unix timestamp to milliseconds
          temp={day.temp.day} // Use day temperature
          iconString={day.weather[0].description} // Weather condition description
        />
      ))}
    </div>
  );
};

export default WeeklyForecast;
