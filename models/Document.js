const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    document_name: {
      type: String,
      required: true,
      trim: true,
    },
    document_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

module.exports = mongoose.model("Document", documentSchema);
