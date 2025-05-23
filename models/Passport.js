const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
  },
  kycId: { type: String, required: true },
  firstName: String,
  lastName: String,
  dateOfBirth: String,
  userImg: String,
  adharFrontImg: String,
  adharBackImg: String,
  panCardImg: String,
  reason: { type: String },
  adminreason: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Passport", passportSchema);
