const mongoose = require("mongoose");

const onlypassportSchema = new mongoose.Schema({
  passportFrontImg: { type: String },
  passportBackImg: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("OnlyPassport", onlypassportSchema);
