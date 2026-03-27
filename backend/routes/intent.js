const express = require("express");
const router = express.Router();
const { extractIntent, getTravelResults, getWeather } = require("../controllers/intentController");
const validateInput = require("../middleware/validateInput");

router.post("/extract", validateInput, extractIntent);
router.post("/results", getTravelResults);
router.get("/weather/:city", getWeather);

module.exports = router;
