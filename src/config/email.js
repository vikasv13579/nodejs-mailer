const nodemailer = require("nodemailer");

// Check if email credentials are set
const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS;

// Create and export email transporter
// Render free tier often blocks port 587, so we use port 465 with SSL
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use service instead of host/port - more reliable
  auth: hasEmailConfig ? {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  } : {
    user: "dummy",
    pass: "dummy",
  },
  // Connection settings optimized for cloud hosting
  connectionTimeout: 15000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
  pool: true,
  maxConnections: 1,
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  }
});

if (!hasEmailConfig) {
  console.warn("⚠️  WARNING: EMAIL_USER or EMAIL_PASS not set. Email functionality will fail.");
  console.warn("Set these in Render dashboard → Environment tab");
}

module.exports = transporter;
