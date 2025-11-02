const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// Bulk email sending route
router.post("/send-email", emailController.sendBulkEmails);

// Single email sending route
router.post("/send-single-email", emailController.sendEmail);

// User registration route
router.post("/register", emailController.registerUser);

// Health check for email routes (useful for testing)
router.get("/test", (req, res) => {
  res.json({
    message: "Email routes are working!",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
