const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const intentRoutes = require("./routes/intent");
const errorHandler = require("./middleware/errorHandler");

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/intent", intentRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "InternTrax AI backend running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 InternTrax backend running on http://localhost:${PORT}`);
});
