const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    passportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },

    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
    },

    country: { type: String, required: true },
    visaType: { type: String, required: true },
    travelDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    travelPurpose: { type: String },
    accommodation: { type: String },
    hasInvitation: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    reason: { type: String },
    adminreason: { type: String },

    documents: {
      photo: { type: String },
      bankStatement: { type: String },
      invitation: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    priority: {
      type: Boolean,
      default: false,
    },
    priorityReason: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisaApplication", visaSchema);
