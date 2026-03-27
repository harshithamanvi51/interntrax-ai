import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import InputBox from "../components/InputBox";
import { extractIntent, getTravelResults, getWeather } from "../services/intentAPI";

export default function Home() {
  const navigate = useNavigate();
  const { setIntent, setResults, setWeather, setLoading, setError, setQuery, loading } = useApp();

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setQuery(query);
    try {
      const intent = await extractIntent(query);
      setIntent(intent);
      const [results, weather] = await Promise.all([
        getTravelResults(intent),
        getWeather(intent.destination).catch(() => null),
      ]);
      setResults(results);
      setWeather(weather);
      navigate("/results");
    } catch (err) {
      setError("Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background blobs */}
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}
      >
        <div style={{
          width: 42, height: 42,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>✈️</div>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 22, color: "#f0f0f5", letterSpacing: -0.5,
        }}>InternTrax AI</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: 8 }}
      >
        <div style={{
          background: "linear-gradient(90deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 20, padding: "4px 14px",
          fontSize: 12, color: "#a5b4fc", letterSpacing: 1, textTransform: "uppercase",
          fontWeight: 600, display: "inline-block",
        }}>Smart Intent-Based Travel Assistant</div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(36px, 6vw, 68px)",
          textAlign: "center", marginBottom: 16, lineHeight: 1.1,
          background: "linear-gradient(135deg, #f0f0f5 0%, #a5b4fc 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}
      >
        Travel Smarter,<br />Not Harder
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ color: "#666", fontSize: 15, marginBottom: 36, textAlign: "center", maxWidth: 480 }}
      >
        Just describe your trip in plain English. Our AI understands intent, detects urgency, and surfaces trusted results — instantly.
      </motion.p>

      <InputBox onSearch={handleSearch} />

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: 32, textAlign: "center" }}
        >
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          <p style={{ color: "#666", fontSize: 13 }}>Extracting intent & finding results…</p>
        </motion.div>
      )}

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: "flex", gap: 12, marginTop: 48, flexWrap: "wrap", justifyContent: "center" }}
      >
        {[
          { icon: "🧠", label: "Intent AI" },
          { icon: "🛡️", label: "Trust Scoring" },
          { icon: "🚨", label: "Emotion-Aware UI" },
          { icon: "🌤️", label: "Live Weather" },
        ].map((f) => (
          <div key={f.label} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20, padding: "6px 14px",
            fontSize: 13, color: "#666",
          }}>
            <span>{f.icon}</span> {f.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
