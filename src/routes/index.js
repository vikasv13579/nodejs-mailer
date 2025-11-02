const express = require("express");
const router = express.Router();
const emailRoutes = require("./emailRoutes");

// Health check route
router.get("/", (req, res) => {
  try {
    res.json({
      message: "Email API Server is working!",
      version: "1.0.0",
      endpoints: {
        bulkEmail: "POST /api/email/send-email",
        singleEmail: "POST /api/email/send-single-email",
        register: "POST /api/email/register",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mount email routes
router.use("/email", emailRoutes);

module.exports = router;
