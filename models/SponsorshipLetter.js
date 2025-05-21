const mongoose = require("mongoose");

const sponsorshipSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    email: String,
    relationship: String,
    applicantName: String,
    visaPurpose: String,
    sponsorshipDetails: String,
    issueDate: String,
    notes: String,
    uploadedFile: {
      filename: String,
      fileType: String,
      filePath: String, // Cloudinary URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SponsorshipLetter", sponsorshipSchema);
