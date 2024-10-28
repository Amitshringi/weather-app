import { useState, useEffect } from "react"; // Ensure useEffect is imported
import "./App.css";
import searchIcon from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard, WeatherDashboard, WeeklyForecast } from "./components"; // Import WeeklyForecast

function App() {
  const [input, setInput] = useState("");
  const { weather, setPlace } = useStateContext();

  const submitCity = async () => {
    const appid = import.meta.env.VITE_API_KEY; // Use environment variable for API key
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${appid}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPlace({ lat, lon }); // Update based on latitude and longitude
      } else {
        alert("City not found. Please enter a valid city name.");
      }
      setInput("");
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("An error occurred while fetching location. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center bg-gradient-to-r from-blue-700 to-purple-800 shadow-lg">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
        <div className="bg-white w-[20rem] overflow-hidden shadow-md rounded-lg flex items-center p-2 gap-2 transition-all hover:shadow-xl">
          <img src={searchIcon} alt="Search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") submitCity();
            }}
            type="text"
            placeholder="Search City by Name"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout />

      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={weather?.name}
          windspeed={weather?.wind?.speed}
          humidity={weather?.main?.humidity}
          temperature={weather?.main?.temp}
          iconString={weather?.weather?.[0]?.icon}
          conditions={weather?.weather?.[0]?.main}
          minTemp={weather?.main?.temp_min}
          maxTemp={weather?.main?.temp_max}
          feelLike={weather?.main?.feels_like}
        />

        <WeatherDashboard />

        {/* Weekly Weather Forecast Section */}
        <h2 className="text-center font-semibold text-2xl mt-6">Weekly Forecast</h2>
        <WeeklyForecast lat={weather?.coord?.lat} lon={weather?.coord?.lon} /> {/* Pass lat and lon */}

        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {weather?.forecast?.slice(1, 7).map((forecast, index) => (
            <MiniCard
              key={index}
              time={forecast.datetime}
              temp={forecast.temp}
              iconString={forecast.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
