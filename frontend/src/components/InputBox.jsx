import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

const SUGGESTIONS = [
  "Cheap trip to Delhi tomorrow",
  "Luxury weekend in Goa for 2",
  "Urgent flight to Mumbai today",
  "Budget hotels in Jaipur next week",
  "Family trip to Dubai in April",
];

export default function InputBox({ onSearch }) {
  const { loading } = useApp();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !loading) onSearch(value.trim());
  };

  const handleSuggestion = (s) => {
    setValue(s);
    inputRef.current?.focus();
  };

  const isUrgent = /urgent|asap|today|fast|emergency/i.test(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ width: "100%", maxWidth: 680 }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            position: "relative",
            borderRadius: 16,
            background: "rgba(255,255,255,0.04)",
            border: `2px solid ${isUrgent ? "rgba(239,68,68,0.6)" : focused ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.08)"}`,
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: isUrgent
              ? "0 0 30px rgba(239,68,68,0.2)"
              : focused
              ? "0 0 30px rgba(99,102,241,0.2)"
              : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", padding: "4px 4px 4px 20px", gap: 12 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{isUrgent ? "🚨" : "✈️"}</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder='Try: "Cheap trip to Goa this weekend"'
              disabled={loading}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f0f0f5",
                fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                padding: "14px 0",
              }}
            />
            <motion.button
              type="submit"
              disabled={!value.trim() || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: isUrgent
                  ? "linear-gradient(135deg, #ef4444, #dc2626)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                cursor: value.trim() && !loading ? "pointer" : "not-allowed",
                opacity: !value.trim() || loading ? 0.5 : 1,
                transition: "background 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Searching..." : isUrgent ? "🚨 Find Fast" : "Search →"}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Suggestions */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
          >
            {SUGGESTIONS.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleSuggestion(s)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#a0a0b5",
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(99,102,241,0.15)";
                  e.target.style.color = "#c4c4ff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.05)";
                  e.target.style.color = "#a0a0b5";
                }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
