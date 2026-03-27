import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [intent, setIntent] = useState(null);
  const [results, setResults] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const urgency = intent?.urgency || "medium";

  return (
    <AppContext.Provider
      value={{
        intent, setIntent,
        results, setResults,
        weather, setWeather,
        loading, setLoading,
        error, setError,
        query, setQuery,
        urgency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
