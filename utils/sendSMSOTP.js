const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMSOTP = async (mobile, otp) => {
  await client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobile,
  });
};

module.exports = sendSMSOTP;
