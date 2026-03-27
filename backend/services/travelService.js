const mockData = require("../data/mockData.json");
const { formatDate } = require("../utils/dateFormatter");

exports.getResults = (intent) => {
  const { destination, budget, urgency, date, travelers, tripType } = intent;

  let flights = mockData.flights
    .filter((f) => f.destination.toLowerCase() === destination.toLowerCase())
    .map((f) => ({
      ...f,
      price: adjustPrice(f.price, budget, travelers),
      trustScore: getTrustScore(f, budget, urgency),
      date: formatDate(date),
    }));

  let hotels = mockData.hotels
    .filter((h) => h.city.toLowerCase() === destination.toLowerCase())
    .map((h) => ({
      ...h,
      price: adjustPrice(h.pricePerNight, budget, travelers),
      trustScore: getTrustScore(h, budget, urgency),
    }));

  // Fallback: generic results if no destination match
  if (!flights.length) {
    flights = mockData.flights.slice(0, 3).map((f) => ({
      ...f,
      destination,
      price: adjustPrice(f.price, budget, travelers),
      trustScore: getTrustScore(f, budget, urgency),
      date: formatDate(date),
    }));
  }
  if (!hotels.length) {
    hotels = mockData.hotels.slice(0, 3).map((h) => ({
      ...h,
      city: destination,
      price: adjustPrice(h.pricePerNight, budget, travelers),
      trustScore: getTrustScore(h, budget, urgency),
    }));
  }

  // Sort by urgency
  if (urgency === "high") {
    flights.sort((a, b) => a.duration - b.duration);
    hotels.sort((a, b) => b.trustScore.score - a.trustScore.score);
  } else if (budget === "cheap") {
    flights.sort((a, b) => a.price - b.price);
    hotels.sort((a, b) => a.price - b.price);
  }

  return {
    flights: tripType === "hotel" ? [] : flights.slice(0, 4),
    hotels: tripType === "flight" ? [] : hotels.slice(0, 4),
    meta: { destination, budget, urgency, date, travelers },
  };
};

function adjustPrice(base, budget, travelers) {
  const multiplier = budget === "cheap" ? 0.7 : budget === "luxury" ? 1.8 : 1;
  return Math.round(base * multiplier * (travelers || 1));
}

function getTrustScore(item, budget, urgency) {
  let score = item.rating || 4.0;
  const reviews = item.reviews || 500;

  if (reviews > 1000) score += 0.3;
  if (budget === "cheap" && item.price > 15000) score -= 0.5;
  if (urgency === "high" && item.duration > 4) score -= 0.2;

  score = Math.min(5, Math.max(1, score));

  let label, badge;
  if (score >= 4.3) { label = "Trusted"; badge = "✅"; }
  else if (score >= 3.5) { label = "Medium"; badge = "⚠️"; }
  else { label = "Risky"; badge = "❌"; }

  return { score: parseFloat(score.toFixed(1)), label, badge };
}
