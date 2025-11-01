const nodemailer = require("nodemailer");

async function send_bulk_emails() {
  const recipients = [
    "sunnysolanki74860@gmail.com",
    "manav.bhavsar28@gmail.com",
    "pithvaamish0011@gmail.com",
    "tryharshil@gmail.com",
  ];

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "vikasv.contact@gmail.com",
      pass: "audj qabx yfxy fuif",
    },
  });

  for (const email of recipients) {
    try {
      const info = await transporter.sendMail({
        from: '"Your Name" <your_email@gmail.com>',
        to: email,
        subject: "Hello from Node.js!",
        text: `Hi ${email}, this is a test email sent using Node.js.`,
        html: `<p>Hi <b>${email}</b>, this is a <i>test email</i> sent using Node.js.</p>`,
      });
      console.log(`✅ Email sent to ${email}: ${info.messageId}`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${email}:`, error.message);
    }
  }

  console.log("All emails processed.");
}

send_bulk_emails();
