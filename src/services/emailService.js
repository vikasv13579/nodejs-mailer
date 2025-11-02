const transporter = require("../config/email");

/**
 * Send email to single or multiple recipients
 * @param {Object} options - Email options
 * @param {string|string[]} options.to - Recipient email(s)
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @param {string} [options.from] - Sender email (defaults to env EMAIL_USER)
 * @returns {Promise} Send mail promise
 */
async function sendEmail({ to, subject, text, html, from }) {
  const mailOptions = {
    from: from || `"Vikas V" <${process.env.EMAIL_USER}>`,
    to,
    subject: subject || "No Subject",
    text: text || "",
    html: html || "",
  };

  return await transporter.sendMail(mailOptions);
}

/**
 * Send bulk emails to multiple recipients
 * @param {string[]} recipients - Array of email addresses
 * @param {Object} emailData - Email content (subject, text, html)
 * @returns {Promise<Array>} Array of results for each recipient
 */
async function sendBulkEmails(recipients, emailData) {
  const results = [];

  for (const email of recipients) {
    try {
      const info = await sendEmail({
        to: email,
        ...emailData,
      });
      results.push({
        email,
        success: true,
        messageId: info.messageId,
      });
    } catch (error) {
      results.push({
        email,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
}

/**
 * Send registration notification email
 * @param {Object} user - User registration data
 * @returns {Promise} Send mail promise
 */
async function sendRegistrationEmail(user) {
  const { name, email, CompanyName, MobileNumber, Password } = user;

  const mailOptions = {
    from: `"My Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to admin
    subject: "New User Registration",
    html: `
      <h2>New User Registered</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company Name:</strong> ${CompanyName || "N/A"}</p>
      <p><strong>Mobile Number:</strong> ${MobileNumber || "N/A"}</p>
      <p><strong>Password:</strong> ${Password ? "******" : "N/A"}</p>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
  sendBulkEmails,
  sendRegistrationEmail,
};
