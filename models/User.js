const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: String, unique: true, sparse: true },
    password: { type: String, select: false },
    referredBy: [
      { type: mongoose.Types.ObjectId, ref: "User", required: false },
    ],
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
    kycId: String,
    onlyPassportId: String,
    applypassportId: String,
    visaApplicationId: String,

    // Embedded UserProfile fields
    profile: {
      fullName: { type: String },
      passportNumber: { type: String },
      nationality: { type: String },
      dateOfBirth: { type: Date },
      phone: { type: String },
      address: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
