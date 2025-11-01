require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending route
app.post("/send-email", async (req, res) => {
  const { recipients, subject, text, html } = req.body;
  if (!recipients || recipients.length === 0)
    return res.status(400).json({ error: "Recipients array required" });

  const results = [];

  for (const email of recipients) {
    try {
      const info = await transporter.sendMail({
        from: `"Vikas V" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject || "No Subject",
        text: text || `Hi ${email}, this is a test email.`,
        html: html || `<p>Hi <b>${email}</b>, this is a test email.</p>`,
      });
      results.push({ email, success: true, messageId: info.messageId });
    } catch (err) {
      results.push({ email, success: false, error: err.message });
    }
  }

  res.json({ results });
  
});

// Listen on all network interfaces
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);
