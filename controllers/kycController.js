const { default: mongoose } = require("mongoose");
const Kyc = require("../models/Kyc");

exports.submitKyc = async (req, res) => {
  try {
    const { firstName, lastName, address, pincode } = req.body;

    const adharFrontImg = req.files?.adharFrontImg?.[0]?.path;
    const adharBackImg = req.files?.adharBackImg?.[0]?.path;
    const panCardImg = req.files?.panCardImg?.[0]?.path;

    if (!adharFrontImg || !adharBackImg || !panCardImg) {
      return res.status(400).json({ message: "All images are required" });
    }
    const newKyc = new Kyc({
      userId: req.user.id, // You must be setting this from auth middleware
      firstName,
      lastName,
      address,
      pincode,
      adharFrontImg,
      adharBackImg,
      panCardImg,
    });

    await newKyc.save();
    res
      .status(201)
      .json({ message: "KYC submitted successfully", data: newKyc });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getKyc = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming userId is set from auth middleware

    const kycDetails = await Kyc.findOne({ userId });

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
    const kycDetails = await Kyc.findById(kycId);

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
