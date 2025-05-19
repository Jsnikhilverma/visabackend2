const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    referredBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referredTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referralCode: {
      type: String,
      trim: true,
      required: true,
      index: true, // Consider adding unique: true if needed
    },
    points: {
      type: Number,
      default: 0, // optional: set a default if it applies
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Referral", referralSchema);
