import { useEffect, useState } from "react";
import { getUserLocation } from "../services/location";
import { getWeather, getForecast } from "../services/weather";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserLocation()
      .then(({ latitude, longitude }) => {
        setLocation({ latitude, longitude });
        return Promise.all([getWeather(latitude, longitude), getForecast(latitude, longitude)]);
      })
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
      })
      .catch((err) => setError(err.message));
  }, []);

  return { weather, forecast, location, error };
};

export default useWeather;