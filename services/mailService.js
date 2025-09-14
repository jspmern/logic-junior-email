const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

function getTemplate({ name, email, message }) {
  // You can further customize this HTML template
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9f9f9;border-radius:8px;">
      <h2 style="color:#2ec4b6;">New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#fff;padding:16px;border-radius:4px;border:1px solid #eee;">${message.replace(/\n/g,'<br>')}</div>
      <hr>
      <p style="font-size:12px;color:#888;">Logic Junior Contact Service</p>
    </div>
  `;
}

async function sendContactMail({ name, email, message }) {
  const mailOptions = {
    from: `Logic Junior Contact <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    subject: 'New Contact Request from Logic Junior',
    html: getTemplate({ name, email, message })
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { sendContactMail };
