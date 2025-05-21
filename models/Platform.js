const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    email : {
      type: String,
      required: true,
    },
    mobile : {
      type: String,
      required: true,
    },
    address : {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Platform", platformSchema); 