// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// --- Configure your email transporter ---
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // e.g., smtp.gmail.com
  port: 587, // 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- Function to send registration email ---
function sendRegistrationEmail(user) {
  let mailOptions = {
    from: `"My Website" <${process.env.EMAIL_USER}>`, // must match Gmail
    to: process.env.EMAIL_USER, // your email
    subject: "New User Registration",
    html: `<h2>New User Registered</h2>
           <p><strong>Name:</strong> ${user.name}</p>
           <p><strong>Email:</strong> ${user.email}</p>
           <p><strong>Email:</strong> ${user.CompanyName}</p>
           <p><strong>Email:</strong> ${user.MobileNumber}</p>
           <p><strong>Email:</strong> ${user.Password}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email:", error);
    }
    console.log("Email sent successfully:", info);
  });
}

// --- Registration route ---
app.post("/register", (req, res) => {
  const { name, email, CompanyName, MobileNumber, Password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // TODO: Save to database if needed

  // Send email
  sendRegistrationEmail({ name, email, CompanyName, MobileNumber, Password });

  res.json({ message: "Registration successful! Email sent." });
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
