// components/Weather.jsx
const Weather = ({ weather }) => {
    return (
      <div>
        <h2>{weather.city}</h2>
        <p>{weather.date} - {weather.time}</p>
        <img src={weather.icon} alt={weather.weather} />
        <p>{weather.temperature}°C - {weather.weather}</p>
      </div>
    );
  };
  
  export default Weather;
  