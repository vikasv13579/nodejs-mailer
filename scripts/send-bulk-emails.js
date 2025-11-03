/**
 * Standalone script to send bulk emails with attachment
 * Usage: node scripts/send-bulk-emails.js
 */
require("dotenv").config();
const path = require("path");
const emailService = require("../src/services/emailService");

async function sendBulkEmails() {
  const recipients = [
   
   
  ];

  // ✅ Use your actual local file path for the resume (converted from file:///)
  const resumePath = "D:\\_vikas_resume_.pdf";

  const emailData = {
    subject: "Application for Frontend Developer Position — Vikas Verma",
    text: `
Hello HR Team,

I am writing to express my interest in the Frontend Developer position. With over 3 years of professional experience in front-end development, I have honed my expertise in building responsive, user-friendly, and scalable web applications.

My core skills include React.js, Next.js, JavaScript, TypeScript, Redux, and API integration, along with hands-on experience in Node.js and MySQL for full-stack development.

I am confident that my technical skills, problem-solving ability, and collaborative approach would allow me to contribute effectively to your team. I have attached my resume for your review and would welcome the opportunity to discuss how my background aligns with your requirements.

Thank you for your time and consideration.

Best regards,  
Vikas Verma  
7082970065
    `,
    html: `
      <p>Hello HR Team,</p>
      <p>
        I am writing to express my interest in the <b>Frontend Developer</b> position. With over 3 years of professional experience in front-end development, I have honed my expertise in building responsive, user-friendly, and scalable web applications.
      </p>
      <p>
        My core skills include <b>React.js, Next.js, JavaScript, TypeScript, Redux</b>, and <b>API integration</b>, along with hands-on experience in <b>Node.js</b> and <b>MySQL</b> for full-stack development.
      </p>
      <p>
        I am confident that my technical skills, problem-solving ability, and collaborative approach would allow me to contribute effectively to your team.
      </p>
      <p>
        I have attached my <b>resume</b> for your review and would welcome the opportunity to discuss how my background aligns with your requirements.
      </p>
      <p>
        Thank you for your time and consideration.
      </p>
      <p>
        Best regards,<br/>
        <b>Vikas Verma</b><br/>
        7082970065
      </p>
    `,
    attachments: [
      {
        filename: "Vikas_Verma_Resume.pdf",
        path: resumePath, // 👈 local file path used here
        contentType: "application/pdf"
      },
    ],
  };

  try {
    const results = await emailService.sendBulkEmails(recipients, emailData);

    results.forEach((result) => {
      if (result.success) {
        console.log(`✅ Email sent to ${result.email}: ${result.messageId}`);
      } else {
        console.error(
          `❌ Failed to send email to ${result.email}:`,
          result.error
        );
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
