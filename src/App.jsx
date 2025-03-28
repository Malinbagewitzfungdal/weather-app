import { useEffect, useState } from "react";
import { getUserLocation } from "./services/location";
import { getWeather } from "./services/weather";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserLocation()
      .then(({ latitude, longitude }) => getWeather(latitude, longitude))
      .then(setWeather)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Väderapp</h1>
      {weather ? (
        <div>
          <h2>{weather.city}</h2>
          <p>{weather.date} - {weather.time}</p>
          <img src={weather.icon} alt={weather.weather} />
          <p>{weather.temperature}°C - {weather.weather}</p>
        </div>
      ) : error ? (
        <p>Fel: {error}</p>
      ) : (
        <p>Hämtar väder...</p>
      )}
    </div>
  );
}

export default App;
