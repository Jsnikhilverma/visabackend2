const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    jobTitle: String,
    company: String,
    letter: String,
    uploadedFile: {
      filename: String,
      fileType: String,
      filePath: String, // Cloudinary URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoverLetter", coverLetterSchema);
