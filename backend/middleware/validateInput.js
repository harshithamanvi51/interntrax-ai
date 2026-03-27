module.exports = (req, res, next) => {
  const { query } = req.body;
  if (!query || typeof query !== "string" || query.trim().length < 3) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid travel query (at least 3 characters)",
    });
  }
  req.body.query = query.trim();
  next();
};
