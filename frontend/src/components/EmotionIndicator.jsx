import React from "react";
import { motion } from "framer-motion";

const config = {
  high:   { label: "Urgent Mode", color: "#ef4444", bg: "rgba(239,68,68,0.1)", emoji: "🚨", desc: "Showing fastest options first" },
  medium: { label: "Normal Mode", color: "#6366f1", bg: "rgba(99,102,241,0.1)", emoji: "✈️", desc: "Balanced results" },
  low:    { label: "Relaxed Mode", color: "#10b981", bg: "rgba(16,185,129,0.1)", emoji: "🌴", desc: "Showing all options" },
};

export default function EmotionIndicator({ urgency }) {
  const c = config[urgency] || config.medium;
  return (
    <motion.div
      key={urgency}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: c.bg,
        border: `1px solid ${c.color}40`,
        borderRadius: 30,
        padding: "8px 18px",
        boxShadow: urgency === "high" ? `0 0 20px ${c.color}30` : "none",
      }}
      className={urgency === "high" ? "animate-urgent" : ""}
    >
      <span style={{ fontSize: 18 }}>{c.emoji}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: c.color, fontFamily: "'Syne', sans-serif" }}>{c.label}</div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{c.desc}</div>
      </div>
    </motion.div>
  );
}
