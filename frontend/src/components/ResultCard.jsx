import React from "react";
import { motion } from "framer-motion";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import { useApp } from "../context/AppContext";

export default function ResultCard({ type, items }) {
  const { urgency } = useApp();
  const isFlights = type === "flights";
  const icon = isFlights ? "✈️" : "🏨";
  const label = isFlights ? "Flights" : "Hotels";

  if (!items || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ marginBottom: 32 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#f0f0f5" }}>
          {label}
        </h2>
        <span style={{
          background: "rgba(99,102,241,0.15)", color: "#a5b4fc",
          borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600,
        }}>{items.length} found</span>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {items.map((item, i) =>
          isFlights ? (
            <FlightCard key={item.id || i} flight={item} index={i} urgency={urgency} />
          ) : (
            <HotelCard key={item.id || i} hotel={item} index={i} />
          )
        )}
      </div>
    </motion.div>
  );
}
