const mongoose = require("mongoose");

const onlypassportSchema = new mongoose.Schema({
  PassportNumber: { type: String, required: true },
  IssuingCountry: { type: String, required: true },
  PlaceofIssue: { type: String, required: true },
  DateofIssue: { type: Date, required: true },
  DateofExpiry: { type: Date, required: true },
  Fullname: { type: String, required: true },
  DateofBirth: { type: Date, required: true },
  Nationality: { type: String, required: true },
  Gender: { type: String, required: true },
  PassportType: { type: String, required: true },
  passportFrontImg: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("OnlyPassport", onlypassportSchema);
