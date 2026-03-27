import api from "../utils/api";

export async function extractIntent(query) {
  const res = await api.post("/api/intent/extract", { query });
  return res.data.intent;
}

export async function getTravelResults(intent) {
  const res = await api.post("/api/intent/results", { intent });
  return res.data.results;
}

export async function getWeather(city) {
  const res = await api.get(`/api/intent/weather/${encodeURIComponent(city)}`);
  return res.data.weather;
}
