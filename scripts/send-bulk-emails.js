/**
 * Standalone script to send bulk emails
 * Usage: node scripts/send-bulk-emails.js
 */
require("dotenv").config();
const emailService = require("../src/services/emailService");

async function sendBulkEmails() {
  const recipients = [
    "sunnysolanki74860@gmail.com",
    "manav.bhavsar28@gmail.com",
    "pithvaamish0011@gmail.com",
    "tryharshil@gmail.com",
  ];

  const emailData = {
    subject: "Hello from Node.js!",
    text: "Hi, this is a test email sent using Node.js.",
    html: "<p>Hi, this is a <i>test email</i> sent using Node.js.</p>",
  };

  try {
    const results = await emailService.sendBulkEmails(recipients, emailData);

    results.forEach((result) => {
      if (result.success) {
        console.log(`✅ Email sent to ${result.email}: ${result.messageId}`);
      } else {
        console.error(`❌ Failed to send email to ${result.email}:`, result.error);
      }
    });

    console.log("All emails processed.");
  } catch (error) {
    console.error("Error in bulk email script:", error);
  }
}

// Run if executed directly
if (require.main === module) {
  sendBulkEmails();
}

module.exports = sendBulkEmails;
