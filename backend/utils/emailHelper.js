const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Or use another email service
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        text: message,
    });
};

module.exports = { sendEmail };
