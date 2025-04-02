const WeatherForecast = ({ forecast }) => {
    return (
      <div>
        <h2>5-dagarsprognos</h2>
        {forecast.length > 0 ? (
          <div className="forecast-container">
            {forecast.map((day) => (
              <div key={day.date} className="forecast-day">
                <p>{day.date}</p>
                <img src={day.icon} alt="Väderikon" />
                <p>Min: {day.minTemp}°C</p>
                <p>Max: {day.maxTemp}°C</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Hämtar prognos...</p>
        )}
      </div>
    );
  };
  
  export default WeatherForecast;
  