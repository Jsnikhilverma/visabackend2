const { default: mongoose } = require("mongoose");
const Kyc = require("../models/Kyc");
const User = require("../models/User");
const uploadService = require("../utils/cloudinary");
exports.submitKyc = async (req, res) => {
  try {
    const user_id = req.userId;
    const { firstName, email, country, nationality, address, pincode } =
      req.body;
    // console.log(user_id);
    // console.log(req.files.panCardImg);
    const fileFields = Object.keys(req.files);
    console.log(fileFields);
    let uploaderUrls = [];
    if (fileFields) {
      const filePaths = [];
      fileFields.forEach((fileName) => {
        filePaths.push(req.files[fileName][0].path);
      });
      const result = await uploadService.uploadMultipleFilesOnCloudinary(
        filePaths
      );
      console.log(result);

      if (result) {
        uploaderUrls = result;
      }
      console.log(result);
    }
    const documents = {};
    if (fileFields.length === uploaderUrls.length) {
      fileFields.forEach((field, index) => {
        documents[field] = uploaderUrls[index]?.secure_url;
      });
    }

    // return res.status(200).json({ message: "file uploaded" });

    const newKyc = new Kyc({
      userId: req.userId, // You must be setting this from auth middleware
      firstName,
      email,
      country,
      nationality,
      address,
      pincode,
      documents,
    });

    await newKyc.save();

    // console.log(newKyc._id.toString(), user_id);
    const user = await User.findById(user_id);
    // console.log(user);
    const kyc = await Kyc.findById(newKyc._id.toString());
    // console.log(kyc, "kyc");

    user.kycId = newKyc._id.toString();
    await user.save();
    // console.log(user, "user");

    res
      .status(201)
      .json({ message: "KYC submitted successfully", data: newKyc });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getKyc = async (req, res) => {
  try {
    const userId = req.userid; // Assuming userId is set from auth middleware
    
    const kycDetails = await Kyc.findOne({ userId }).populate(
      "userId",
      "name mobile"
    );

    if (!kycDetails) {
      return res.status(404).json({ message: "KYC details not found" });
    }

    res
      .status(200)
      .json({ message: "KYC details fetched successfully", data: kycDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllKyc = async (req, res) => {
  try {
    const kycs = await Kyc.find({}).populate("userId", "email");

    if (!kycs || kycs.length === 0) {
      return res.status(404).json({ message: "No KYC details found" });
    }

    res
      .status(200)
      .json({ message: "KYC details fetched successfully", data: kycs });
  } catch (error) {
    console.log(eror);

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.toggleKyc = async (req, res) => {
  const { kycId } = req.params;
  const status = req.query.status;

  if (!kycId) {
    return res.status(400).json({ message: "KYC ID is required" });
  }

  try {
    const kyc = await Kyc.findById(kycId);
    // console.log(kyc, "kkk");

    kyc.status = status;
    await kyc.save();

    res.status(200).json({ message: `status updated successfully`, data: kyc });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.getKycById = async (req, res) => {
  const { kycId } = req.params;

  if (!kycId) {
    return res.status(400).json({ message: "KYC ID is required" });
  }

  try {
    const kycDetails = await Kyc.findById(kycId).populate(
      "userId",
      "name mobile email "
    );;

    if (!kycDetails) {
      return res.status(404).json({ message: "KYC details not found" });
    }

    res
      .status(200)
      .json({ message: "KYC details fetched successfully", data: kycDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
