const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    passportNumber: { type: String },
    nationality: { type: String },
    dateOfBirth: { type: Date },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
