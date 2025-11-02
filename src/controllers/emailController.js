const emailService = require("../services/emailService");

/**
 * Handle bulk email sending
 */
async function sendBulkEmails(req, res) {
  try {
    const { recipients, subject, text, html } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        error: "Recipients array is required and must not be empty",
      });
    }

    const results = await emailService.sendBulkEmails(recipients, {
      subject,
      text,
      html,
    });

    res.json({ results });
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    res.status(500).json({
      error: "Failed to send emails",
      message: error.message,
    });
  }
}

/**
 * Handle single email sending
 */
async function sendEmail(req, res) {
  try {
    const { to, subject, text, html, from } = req.body;

    if (!to) {
      return res.status(400).json({
        error: "Recipient email (to) is required",
      });
    }

    const info = await emailService.sendEmail({
      to,
      subject,
      text,
      html,
      from,
    });

    res.json({
      success: true,
      messageId: info.messageId,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      error: "Failed to send email",
      message: error.message,
    });
  }
}

/**
 * Handle user registration with email notification
 */
async function registerUser(req, res) {
  try {
    // Accept both camelCase and PascalCase for flexibility
    const { 
      name, 
      email, 
      CompanyName, 
      companyName, 
      MobileNumber, 
      mobileNumber,
      Password,
      password 
    } = req.body;

    const finalCompanyName = CompanyName || companyName;
    const finalMobileNumber = MobileNumber || mobileNumber;
    const finalPassword = Password || password;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required",
      });
    }

    // TODO: Save to database if needed

    // Send registration notification email
    await emailService.sendRegistrationEmail({
      name,
      email,
      CompanyName: finalCompanyName,
      MobileNumber: finalMobileNumber,
      Password: finalPassword,
    });

    res.json({
      message: "Registration successful! Email sent.",
      user: {
        name,
        email,
        CompanyName: finalCompanyName,
        MobileNumber: finalMobileNumber,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      error: "Registration failed",
      message: error.message,
    });
  }
}

module.exports = {
  sendBulkEmails,
  sendEmail,
  registerUser,
};
