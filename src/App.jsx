import useWeather from "./hooks/useWeather";
import Weather from "./components/Weather";
import WeatherForecast from "./components/WeatherForecast";

function App() {
  const { weather, forecast, location, error } = useWeather();

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Väderapp</h1>
      {weather ? (
        // Använder Weather-komponenten här
        <Weather weather={weather} />
      ) : error ? (
        <p>Fel: {error}</p>
      ) : (
        <p>Hämtar väder...</p>
      )}

      {/* 5-dagarsprognosen */}
      {location && <WeatherForecast forecast={forecast} />}
    </div>
  );
}

export default App;