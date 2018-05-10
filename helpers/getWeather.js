export const getWeather = async location => {
  const { latitude, longitude } = location.coords;
  const appId = "INSERT YOUR APPID OF OPENWEATHERMAP";

  console.log(location);
  const baseUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric`;
  const response = await fetch(baseUrl);
  return await response.json();
};
