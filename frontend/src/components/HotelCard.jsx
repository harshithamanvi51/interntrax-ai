import React from "react";
import { motion } from "framer-motion";

const trustStyle = {
  "✅": { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  "⚠️": { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  "❌": { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
};

export default function HotelCard({ hotel, index }) {
  const ts = trustStyle[hotel.trustScore?.badge] || trustStyle["⚠️"];
  const stars = "★".repeat(hotel.stars || 3) + "☆".repeat(5 - (hotel.stars || 3));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: 20,
        cursor: "pointer",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f0f5", fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>
            {hotel.name}
          </div>
          <div style={{ fontSize: 11, color: "#f59e0b", letterSpacing: 1 }}>{stars}</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>📍 {hotel.city}</div>
        </div>
        <div style={{
          background: ts.bg, border: `1px solid ${ts.border}`,
          borderRadius: 20, padding: "4px 12px",
          fontSize: 12, color: ts.color, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 4,
        }}>
          {hotel.trustScore?.badge} {hotel.trustScore?.label}
        </div>
      </div>

      {/* Amenities */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {(hotel.amenities || []).slice(0, 4).map((a) => (
          <span key={a} style={{
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
            color: "#a5b4fc", borderRadius: 20, padding: "3px 10px", fontSize: 11,
          }}>{a}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, color: "#a0a0b5" }}>
          ★ {hotel.trustScore?.score} <span style={{ color: "#555", fontSize: 11 }}>rating</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#f0f0f5", fontFamily: "'Syne', sans-serif" }}>
            ₹{hotel.price?.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: 10, color: "#666" }}>per night</div>
        </div>
      </div>
    </motion.div>
  );
}
