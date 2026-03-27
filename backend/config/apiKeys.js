require("dotenv").config({ path: "../../.env" });

module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || "",
};
