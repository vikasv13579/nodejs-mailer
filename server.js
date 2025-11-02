require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Try to load routes - if it fails, log error but don't crash
let routes;
try {
  routes = require("./src/routes");
  console.log("✅ Routes module loaded successfully");
} catch (error) {
  console.error("❌ ERROR loading routes module:", error);
  console.error("Stack:", error.stack);
  process.exit(1);
}

const app = express();

// CORS configuration - allow all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: false,
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// Body parser middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request timeout middleware (30 seconds)
app.use((req, res, next) => {
  req.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(408).json({
        error: "Request timeout",
        message: "Request took too long to process"
      });
    }
  });
  next();
});

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Headers:", JSON.stringify(req.headers));
  next();
});

// API routes - NO AUTHENTICATION REQUIRED
app.use("/api", routes);

// Verify routes are loaded
console.log("✅ Routes loaded successfully");
console.log("Available endpoints:");
console.log("  GET  /api");
console.log("  POST /api/email/send-email");
console.log("  POST /api/email/send-single-email");
console.log("  POST /api/email/register");

// Root route
app.get("/", (req, res) => {
  res.send("Server is working! Visit /api for API information.");
});

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// Handle server errors
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API available at http://localhost:${PORT}/api`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ EMAIL_USER set: ${!!process.env.EMAIL_USER}`);
  console.log(`✅ EMAIL_PASS set: ${!!process.env.EMAIL_PASS}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});