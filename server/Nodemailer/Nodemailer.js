const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mernprojectss@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'mernprojectss@gmail.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
