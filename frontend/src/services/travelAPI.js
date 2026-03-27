import api from "../utils/api";

export async function fetchFlights(destination, budget) {
  const res = await api.get(`/api/flights?destination=${destination}&budget=${budget}`);
  return res.data;
}

export async function fetchHotels(city, budget) {
  const res = await api.get(`/api/hotels?city=${city}&budget=${budget}`);
  return res.data;
}
