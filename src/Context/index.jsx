import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState([]);
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState("Jaipur");
    const [location, setLocation] = useState("");

    // Fetch API
    const fetchWeatherData = async () => {
        // Determine if `place` is a city name or coordinates
        const isCoordinates = typeof place === "object" && place.lat && place.lon;
    
        const options = {
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            params: isCoordinates
                ? { lat: place.lat, lon: place.lon, units: "metric", appid: import.meta.env.VITE_API_KEY }
                : { q: place, units: "metric", appid: import.meta.env.VITE_API_KEY },
        };
    
        try {
            const response = await axios(options);
            console.log(response.data);
            setWeather(response.data);
            setLocation(response.data.name);
            setValues(Object.values(response.data.main));
        } catch (error) {
            alert("This place does not exist or an error occurred while fetching data.");
            console.error("Error fetching weather data:", error);
        }
    };
    

    useEffect(() => {
        if (place) {
            fetchWeatherData();
        }
    }, [place]);

    useEffect(() => {
        console.log(values); // Log values whenever they update
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            location,
            place,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
