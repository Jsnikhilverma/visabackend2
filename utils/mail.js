const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

async function sendEmail(email, subject, message) {
  try {
    console.log("Sending email to:", email);

    // Creat
    // ze transporter using your SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // or 465 for SSL
      //     secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(transporter);

    // Email options
    const mailOptions = {
      from: "AXE VISA",
      to: email,
      subject: subject,
      html: `<p>${message}</p>`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("Email sending failed:", err);
    return { success: false, error: err.message };
  }
}

exports.sendEmail = sendEmail;

// Example usage

// sendEmail("jsnikhil00@gmail.com", "Hello", "This is a test message.")
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));
