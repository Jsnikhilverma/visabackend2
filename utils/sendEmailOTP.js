const nodemailer = require("nodemailer");

const sendEmailOTP = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "jsnikhil00@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  });
};

module.exports = sendEmailOTP;
