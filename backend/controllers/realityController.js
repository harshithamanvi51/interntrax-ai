const axios = require("axios");
const { OPENWEATHER_API_KEY } = require("../config/apiKeys");

exports.getDestinationInfo = async (city) => {
  try {
    if (!OPENWEATHER_API_KEY) {
      return { temp: 28, description: "Sunny", icon: "☀️", humidity: 55 };
    }
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    return {
      temp: Math.round(res.data.main.temp),
      description: res.data.weather[0].description,
      humidity: res.data.main.humidity,
    };
  } catch {
    return { temp: 28, description: "Sunny", icon: "☀️", humidity: 55 };
  }
};
