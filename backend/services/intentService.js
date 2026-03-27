const { OPENAI_API_KEY } = require("../config/apiKeys");

exports.extractIntent = async (query) => {
  // Try OpenAI first
  if (OPENAI_API_KEY) {
    try {
      const OpenAI = require("openai");
      const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a travel intent extractor. Extract travel intent from user input and return ONLY a valid JSON object with these fields:
- destination (string, city name, default "Mumbai" if unclear)
- date (string, ISO date YYYY-MM-DD, use tomorrow if "tomorrow", next week if vague)
- budget (string: "cheap" | "moderate" | "luxury")
- urgency (string: "high" | "medium" | "low")
- travelers (number, default 1)
- tripType (string: "flight" | "hotel" | "both", default "both")
Return ONLY the JSON, no explanation.`,
          },
          { role: "user", content: query },
        ],
        temperature: 0.2,
      });

      const text = response.choices[0].message.content.trim();
      return JSON.parse(text);
    } catch (e) {
      console.log("OpenAI failed, falling back to keyword parser:", e.message);
    }
  }

  // Fallback: keyword-based parser
  return keywordParser(query);
};

function keywordParser(query) {
  const q = query.toLowerCase();

  // Destination detection
  const cities = [
    "delhi", "mumbai", "bangalore", "bengaluru", "chennai", "kolkata",
    "hyderabad", "pune", "goa", "jaipur", "agra", "varanasi",
    "kerala", "manali", "shimla", "dubai", "london", "paris",
    "new york", "singapore", "bangkok", "bali", "tokyo",
  ];
  let destination = "Mumbai";
  for (const city of cities) {
    if (q.includes(city)) {
      destination = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }

  // Date detection
  const today = new Date();
  let date = new Date(today);
  date.setDate(date.getDate() + 3);

  if (q.includes("tomorrow")) {
    date = new Date(today);
    date.setDate(date.getDate() + 1);
  } else if (q.includes("today")) {
    date = today;
  } else if (q.includes("next week")) {
    date.setDate(today.getDate() + 7);
  } else if (q.includes("weekend")) {
    const day = today.getDay();
    const daysUntilSat = (6 - day + 7) % 7 || 7;
    date.setDate(today.getDate() + daysUntilSat);
  }

  // Budget detection
  let budget = "moderate";
  if (q.includes("cheap") || q.includes("budget") || q.includes("affordable") || q.includes("low cost")) budget = "cheap";
  else if (q.includes("luxury") || q.includes("premium") || q.includes("business class") || q.includes("5 star")) budget = "luxury";

  // Urgency detection
  let urgency = "medium";
  if (q.includes("urgent") || q.includes("asap") || q.includes("emergency") || q.includes("fast") || q.includes("immediately") || q.includes("today") || q.includes("now")) urgency = "high";
  else if (q.includes("flexible") || q.includes("whenever") || q.includes("no rush")) urgency = "low";

  // Travelers
  let travelers = 1;
  const travelMatch = q.match(/(\d+)\s*(people|persons|travelers|passengers|adults|pax)/);
  if (travelMatch) travelers = parseInt(travelMatch[1]);
  if (q.includes("couple") || q.includes("two of us")) travelers = 2;
  if (q.includes("family")) travelers = 4;

  // Trip type
  let tripType = "both";
  if (q.includes("flight") || q.includes("fly")) tripType = "flight";
  if (q.includes("hotel") || q.includes("stay") || q.includes("accommodation")) tripType = "hotel";

  return {
    destination,
    date: date.toISOString().split("T")[0],
    budget,
    urgency,
    travelers,
    tripType,
  };
}
