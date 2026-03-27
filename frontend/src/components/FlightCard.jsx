import React from "react";
import { motion } from "framer-motion";

const trustStyle = {
  "✅": { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  "⚠️": { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  "❌": { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
};

export default function FlightCard({ flight, index, urgency }) {
  const ts = trustStyle[flight.trustScore?.badge] || trustStyle["⚠️"];
  const isTopPick = index === 0 && urgency === "high";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        background: isTopPick
          ? "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(99,102,241,0.05))"
          : "rgba(255,255,255,0.03)",
        border: isTopPick ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: 20,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {isTopPick && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          color: "#fff", fontSize: 10, fontWeight: 800,
          padding: "4px 12px", borderBottomLeftRadius: 10,
          fontFamily: "'Syne', sans-serif", letterSpacing: 1,
        }}>FASTEST PICK</div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#f0f0f5", fontFamily: "'Syne', sans-serif" }}>
            {flight.airline}
          </div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            {flight.origin} → {flight.destination}
          </div>
        </div>
        <div style={{
          background: ts.bg, border: `1px solid ${ts.border}`,
          borderRadius: 20, padding: "4px 12px",
          fontSize: 12, color: ts.color, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 4,
        }}>
          {flight.trustScore?.badge} {flight.trustScore?.label}
        </div>
      </div>

      {/* Time row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{flight.departure}</div>
          <div style={{ fontSize: 10, color: "#666" }}>DEP</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 10, color: "#555", marginBottom: 4 }}>
            {flight.duration}h {flight.stops === 0 ? "• Non-stop" : `• ${flight.stops} stop`}
          </div>
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.1)", position: "relative" }}>
            <div style={{ position: "absolute", right: 0, top: -3, width: 6, height: 6, background: "#6366f1", borderRadius: "50%" }} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{flight.arrival}</div>
          <div style={{ fontSize: 10, color: "#666" }}>ARR</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: "#666" }}>RATING</div>
            <div style={{ fontSize: 14, color: "#f59e0b", fontWeight: 600 }}>★ {flight.trustScore?.score}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#666" }}>DATE</div>
            <div style={{ fontSize: 12, color: "#a0a0b5" }}>{flight.date}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#f0f0f5", fontFamily: "'Syne', sans-serif" }}>
            ₹{flight.price?.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: 10, color: "#666" }}>per person</div>
        </div>
      </div>
    </motion.div>
  );
}
