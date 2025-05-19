const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    documents: {
      adharFrontImg: String,
      adharBackImg: String,
      panCardImg: String,
    },
    isApproved:{
      type:Boolean,
      index:true,
      default:function(){
        return this.status==="approved";
      }
    }
  },
  { timestamps: true,versionKey:false }
);

module.exports = mongoose.model("Kyc", kycSchema);
