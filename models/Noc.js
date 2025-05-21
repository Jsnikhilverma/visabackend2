const mongoose = require("mongoose");

const nocSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    purpose: String,
    issueDate: String,
    authority: String,
    designation: String,
    remarks: String,
    uploadedFile: {
      filename: String,
      fileType: String,
      filePath: String, // Cloudinary URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Noc", nocSchema);
