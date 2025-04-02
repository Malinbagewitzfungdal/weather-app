const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

const getWeather = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Kunde inte hämta väderdata");
  const data = await response.json();

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    weather: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    date: new Date().toLocaleDateString("sv-SE"),
    time: new Date().toLocaleTimeString("sv-SE"),
  };
};


const getForecast = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Kunde inte hämta prognosdata");
  const data = await response.json();

  // Filtrera och strukturera prognosdatan
  const dailyForecast = {};

  data.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // YYYY-MM-DD

    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        minTemp: entry.main.temp,
        maxTemp: entry.main.temp,
        icon: entry.weather[0].icon,
      };
    } else {
      dailyForecast[date].minTemp = Math.min(dailyForecast[date].minTemp, entry.main.temp);
      dailyForecast[date].maxTemp = Math.max(dailyForecast[date].maxTemp, entry.main.temp);
    }
  });

  return Object.entries(dailyForecast)
    .slice(0, 5) // Hämtar endast 5 dagar
    .map(([date, details]) => ({
      date,
      minTemp: Math.round(details.minTemp),
      maxTemp: Math.round(details.maxTemp),
      icon: `https://openweathermap.org/img/wn/${details.icon}@2x.png`,
    }));
};



export { getWeather, getForecast };
