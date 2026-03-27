# Smart Intent-Based Travel Assistant with Emotion-Adaptive UI & Trust Scoring

---

## 1. Problem Statement

Modern travel planning platforms require users to manually search, filter, and compare multiple options across flights, hotels, and local conditions. This process is time-consuming, cognitively demanding, and inefficient—especially when users have urgency, limited information, or unclear preferences.

Additionally, existing systems lack:

* The ability to understand **user intent from minimal natural language input**
* Context awareness such as **urgency or emotional state**
* Mechanisms to evaluate and communicate the **reliability of recommendations**
* Integration of **real-world contextual data** (e.g., weather, time) within decision-making interfaces

As a result, users are forced to navigate fragmented systems instead of interacting with a unified, intelligent assistant.

---

## 2. Solution Overview

The proposed system is a **Smart Intent-Based Travel Assistant** that transforms minimal user input into structured travel plans through an intelligent, adaptive interface.

The system operates through a sequential pipeline:

1. **Intent Extraction**

   * Accepts natural language input (e.g., “Cheap trip to Delhi tomorrow”)
   * Converts input into structured data including destination, date, budget, and urgency

2. **Action Generation**

   * Maps extracted intent to relevant travel options
   * Retrieves and filters flight and hotel data (mock or API-based)

3. **Emotion-Adaptive User Interface**

   * Dynamically adjusts layout and emphasis based on detected urgency
   * Highlights critical options for time-sensitive queries

4. **Trust Scoring Mechanism**

   * Assigns confidence indicators (e.g., high, medium, low)
   * Helps users quickly evaluate the reliability of recommendations

5. **Reality Context Integration**

   * Enriches results with real-world information such as weather and local time
   * Improves decision-making with contextual awareness

The system delivers a **complete interaction loop**:
Input → Understanding → Decision Support → Contextual Output

---

## 3. Tech Stack

### Frontend

* React.js (Component-based UI development)
* Tailwind CSS (Utility-first styling)
* Framer Motion (UI transitions and animations)

### Backend

* Node.js (Runtime environment)
* Express.js (API framework)

### AI / NLP

* OpenAI API (for intent extraction and natural language understanding)
  *Alternative:* Rule-based keyword extraction for fallback or offline usage

### Data Sources

* Mock JSON datasets for flights and hotels (for reliability and speed)
* OpenWeatherMap API (weather data)
* TimeZoneDB API (local time data)

### Development Tools

* Git & GitHub (version control and submission)
* Postman / Thunder Client (API testing)

---

## 4. Features

### 4.1 Intent Prediction Engine

* Extracts structured data from minimal user input
* Supports parameters such as destination, date, budget, and urgency
* Designed for robustness with incomplete or ambiguous queries

### 4.2 Smart Travel Recommendations

* Displays filtered flight and hotel options
* Categorizes results based on budget and urgency
* Presents data in a clean, card-based interface

### 4.3 Emotion-Adaptive Interface

* Detects urgency indicators (e.g., “ASAP”, “urgent”, “tomorrow”)
* Dynamically modifies UI layout:

  * Highlights time-sensitive options
  * Reduces visual clutter for faster decision-making

### 4.4 Trust Scoring System

* Assigns qualitative trust indicators to each recommendation:

  * High Trust
  * Medium Trust
  * Low Trust
* Based on rule-based evaluation of consistency, pricing, and source reliability

### 4.5 Reality Context Layer

* Integrates real-time environmental data:

  * Weather conditions at destination
  * Local time information
* Provides contextual awareness alongside recommendations

### 4.6 End-to-End Interaction Flow

* Seamless pipeline from user input to actionable output
* Real-time response with minimal latency
* Designed for demonstration clarity and usability

---

## 5. Run Instructions

### Prerequisites

Ensure the following are installed:

* Node.js (v16 or above)
* npm or yarn
* Git

---

### 5.1 Clone Repository

```bash
git clone https://github.com/your-username/interntrax-ai.git
cd interntrax-ai
```

---

### 5.2 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_api_key_here
WEATHER_API_KEY=your_openweather_key
TIMEZONE_API_KEY=your_timezone_key
PORT=5000
```

Start the backend server:

```bash
npm start
```

Server will run on:
`http://localhost:5000`

---

### 5.3 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on:
`http://localhost:3000`

---

### 5.4 Application Usage

1. Open the frontend in a browser
2. Enter a natural language query, for example:

   * “Cheap trip to Delhi tomorrow”
   * “Luxury hotel in Goa ASAP”
3. Observe:

   * Extracted intent (structured output)
   * Recommended flights and hotels
   * Trust indicators
   * UI changes based on urgency
   * Weather and local time information

---

### 5.5 Build for Production (Optional)

```bash
npm run build
```

---

## 6. Submission Notes

* The project is fully developed within the hackathon timeframe
* All components are integrated into a working prototype
* The system prioritizes clarity, usability, and demonstrability
* A short demo video (2–3 minutes) showcases the complete interaction flow

---

## 7. Conclusion

This project demonstrates how **intent-driven systems**, combined with **adaptive interfaces and contextual intelligence**, can significantly improve user experience in travel planning.

It provides a scalable foundation for future extensions such as real-time booking integration, personalization, and multi-modal interaction.

---
