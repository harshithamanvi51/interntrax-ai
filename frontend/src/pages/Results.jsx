import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import ResultCard from "../components/ResultCard";
import EmotionIndicator from "../components/EmotionIndicator";

export default function Results() {
  const navigate = useNavigate();
  const { intent, results, weather, query, urgency, loading } = useApp();

  if (!intent || !results) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#666", marginBottom: 16 }}>No results yet.</p>
          <button onClick={() => navigate("/")} style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px",
            cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 700,
          }}>← Go Back</button>
        </div>
      </div>
    );
  }

  const budgetColor = intent.budget === "cheap" ? "#10b981" : intent.budget === "luxury" ? "#f59e0b" : "#6366f1";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", padding: "0 0 60px" }}>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, backdropFilter: "blur(20px)", zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          }}>✈️</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f0f0f5" }}>InternTrax AI</span>
        </div>
        <button onClick={() => navigate("/")} style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#a0a0b5", borderRadius: 10, padding: "8px 16px",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        }}>← New Search</button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>

        {/* Query + Emotion */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 8 }}>Results for</p>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 4vw, 32px)",
            color: "#f0f0f5", marginBottom: 16, lineHeight: 1.2,
          }}>"{query}"</h1>
          <EmotionIndicator urgency={urgency} />
        </motion.div>

        {/* Intent Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 20, marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 12, color: "#555", fontWeight: 600, letterSpacing: 1, marginBottom: 14, textTransform: "uppercase" }}>
            🧠 Extracted Intent
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[
              { label: "Destination", value: intent.destination, icon: "📍" },
              { label: "Date", value: intent.date, icon: "📅" },
              { label: "Budget", value: intent.budget, icon: "💰", color: budgetColor },
              { label: "Urgency", value: intent.urgency, icon: "⚡", color: urgency === "high" ? "#ef4444" : urgency === "low" ? "#10b981" : "#6366f1" },
              { label: "Travelers", value: `${intent.travelers} person${intent.travelers > 1 ? "s" : ""}`, icon: "👥" },
            ].map((item) => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: "10px 16px", minWidth: 120,
              }}>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>{item.icon} {item.label}</div>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                  color: item.color || "#f0f0f5", textTransform: "capitalize",
                }}>{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weather Card */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.06))",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: 16, padding: 18, marginBottom: 28,
              display: "flex", alignItems: "center", gap: 16,
            }}
          >
            <div style={{ fontSize: 36 }}>{weather.icon}</div>
            <div>
              <div style={{ fontSize: 12, color: "#555", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                🌤️ Weather in {intent.destination}
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div>
                  <span style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#f0f0f5" }}>{weather.temp}°C</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, color: "#a0a0b5", textTransform: "capitalize" }}>{weather.description}</span>
                  <span style={{ fontSize: 11, color: "#555" }}>Humidity: {weather.humidity}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trust Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
        >
          <span style={{ fontSize: 12, color: "#555" }}>Trust score:</span>
          {[
            { badge: "✅", label: "Trusted", color: "#10b981" },
            { badge: "⚠️", label: "Medium",  color: "#f59e0b" },
            { badge: "❌", label: "Risky",   color: "#ef4444" },
          ].map((t) => (
            <span key={t.label} style={{ fontSize: 12, color: t.color }}>
              {t.badge} {t.label}
            </span>
          ))}
        </motion.div>

        {/* Results */}
        <ResultCard type="flights" items={results.flights} />
        <ResultCard type="hotels"  items={results.hotels}  />

        {/* No results fallback */}
        {(!results.flights?.length && !results.hotels?.length) && (
          <div style={{ textAlign: "center", padding: 60, color: "#555" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p>No results found. Try a different destination.</p>
          </div>
        )}
      </div>
    </div>
  );
}
