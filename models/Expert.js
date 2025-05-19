const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: String,
    password: String,
    role: { type: String, default: "expert" },

    profilePhoto: String,
    governmentId: String,
    idWithSelfie: String,
    experienceYears: String,
    expertise: String,
    countries: String,
    certifications: String,
    companyName: String,
    officeAddress: String,
    workingHours: String,
    termsAccepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expert", expertSchema);
