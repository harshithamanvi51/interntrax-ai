const intentService = require("../services/intentService");
const travelService = require("../services/travelService");
const axios = require("axios");
const { OPENWEATHER_API_KEY } = require("../config/apiKeys");

exports.extractIntent = async (req, res, next) => {
  try {
    const { query } = req.body;
    const intent = await intentService.extractIntent(query);
    res.json({ success: true, intent });
  } catch (err) {
    next(err);
  }
};

exports.getTravelResults = async (req, res, next) => {
  try {
    const { intent } = req.body;
    const results = travelService.getResults(intent);
    res.json({ success: true, results });
  } catch (err) {
    next(err);
  }
};

exports.getWeather = async (req, res, next) => {
  try {
    const { city } = req.params;
    const apiKey = OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.json({
        success: true,
        weather: { temp: 28, description: "Partly cloudy", icon: "⛅", humidity: 60 },
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = response.data;
    res.json({
      success: true,
      weather: {
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: getWeatherEmoji(data.weather[0].main),
        humidity: data.main.humidity,
      },
    });
  } catch (err) {
    res.json({
      success: true,
      weather: { temp: 28, description: "Partly cloudy", icon: "⛅", humidity: 60 },
    });
  }
};

function getWeatherEmoji(main) {
  const map = {
    Clear: "☀️", Clouds: "⛅", Rain: "🌧️", Drizzle: "🌦️",
    Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Fog: "🌫️",
  };
  return map[main] || "🌡️";
}
