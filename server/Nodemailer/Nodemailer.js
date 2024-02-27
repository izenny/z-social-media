const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const sendEmail = async ({ to, subject, text }) => {
  console.log('Email:', process.env.EMAIL);
  console.log('lkjhgfasdfg');
  console.log('Password:', process.env.PASSWORD);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mernstackprojectss@gmail.com', // Your Gmail address
      pass: 'kuej eyps tuyo udoc',// Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };
try{
  await transporter.sendMail(mailOptions);
  console.log('Email sent successfully');
}catch(err){
  console.error('Error sending email:', err);
}
  
};

module.exports = sendEmail;
