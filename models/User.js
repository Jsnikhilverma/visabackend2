const mongoose = require("mongoose");
const onlyPassport = require("./onlyPassport");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
  kycId: String,
  onlyPassportId: String,
  applypassportId: String,
  visaApplicationId: String,
});

module.exports = mongoose.model("User", userSchema);
