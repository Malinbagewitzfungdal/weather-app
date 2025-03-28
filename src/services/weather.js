const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export const getWeather = async (latitude, longitude) => {
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


