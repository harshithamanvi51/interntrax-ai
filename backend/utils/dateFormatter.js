exports.formatDate = (dateStr) => {
  if (!dateStr) return new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

exports.getDaysFromNow = (dateStr) => {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `In ${diff} days`;
};
