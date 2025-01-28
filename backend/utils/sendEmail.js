const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async function (email, subject, message) {
  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,  // true for 465, false for other ports (use 587 for TLS)
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Send mail with defined transport object
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL, // sender address
      to: email,                         // recipient email
      subject: subject,                  // subject line
      html: message,                     // HTML body content
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = { sendEmail };
