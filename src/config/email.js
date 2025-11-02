const nodemailer = require("nodemailer");

// Check if email credentials are set
const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS;

// Create and export email transporter (even if credentials missing - won't block startup)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: hasEmailConfig ? {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  } : {
    user: "dummy",
    pass: "dummy",
  },
  connectionTimeout: 10000, // 10 seconds timeout
  greetingTimeout: 5000,
  socketTimeout: 10000,
  // Don't verify connection on startup - verify on first use
  tls: {
    rejectUnauthorized: false
  }
});

if (!hasEmailConfig) {
  console.warn("⚠️  WARNING: EMAIL_USER or EMAIL_PASS not set. Email functionality will fail.");
  console.warn("Set these in Render dashboard → Environment tab");
}

module.exports = transporter;
