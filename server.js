require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", routes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is working! Visit /api for API information.");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  console.log(`API available at http://127.0.0.1:${PORT}/api`);
});