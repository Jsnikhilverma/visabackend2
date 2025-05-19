const Passport = require("../models/Passport");
const User = require("../models/User");
exports.applyPassport = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth } = req.body;
    const { kycId } = req.params; // Extract kycId from params
    const userId = req.userId;

    const userImg = req.files?.userImg?.[0]?.path;
    const adharFrontImg = req.files?.adharFrontImg?.[0]?.path;
    const adharBackImg = req.files?.adharBackImg?.[0]?.path;
    const panCardImg = req.files?.panCardImg?.[0]?.path;

    if (!userImg || !adharFrontImg || !adharBackImg || !panCardImg) {
      return res.status(400).json({ message: "All images are required" });
    }

    const passport = new Passport({
      kycId,
      firstName,
      lastName,
      dateOfBirth,
      userImg,
      adharFrontImg,
      adharBackImg,
      panCardImg,
    });

    await passport.save();
    const savedPass = passport._id.toString();

    const user = await User.findById(userId);
    const onlyPassport = await Passport.findById(savedPass);

    console.log(onlyPassport, "OnlyPassport");

    user.applypassportId = savedPass;
    await user.save();
    console.log(user);

    res.status(201).json({
      message: "Passport application submitted successfully",
      data: passport,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllPassports = async (req, res) => {
  try {
    const passports = await Passport.find({});
    res.status(200).json({ data: passports });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getPassportById = async (req, res) => {
  const { passportId } = req.params;
  try {
    const passport = await Passport.findById(passportId);
    if (!passport) {
      return res.status(404).json({ message: "Passport not found" });
    }
    res.status(200).json({ data: passport });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updatePassportStatus = async (req, res) => {
  const { passportId } = req.params;
  const { status } = req.query;
  const { reason } = req.body;

  // Basic validation
  if (!passportId || !status) {
    return res
      .status(400)
      .json({ message: "Passport ID and status are required" });
  }

  // Validate status value
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Status must be either pending, approved, or rejected",
    });
  }

  // Require reason in all cases
  if (!reason || reason.trim() === "") {
    return res.status(400).json({
      message: "Reason is required for status update",
    });
  }

  try {
    const updateData = {
      status,
      reason,
    };

    const updatedPassport = await Passport.findByIdAndUpdate(
      passportId,
      updateData,
      { new: true }
    );

    if (!updatedPassport) {
      return res.status(404).json({ message: "Passport not found" });
    }

    res.status(200).json({
      message: `Passport status updated to ${status}`,
      data: updatedPassport,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// admin

exports.getAllPassportsadmin = async (req, res) => {
  try {
    const passports = await Passport.find({});
    res.status(200).json({ data: passports });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get passport by id

exports.getPassportByIdadmin = async (req, res) => {
  const { passportId } = req.params;
  try {
    const passport = await Passport.findById(passportId);
    if (!passport) {
      return res.status(404).json({ message: "Passport not found" });
    }
    res.status(200).json({ data: passport });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.assignExpertToPassport = async (req, res) => {
  const { passportId, expertId } = req.params;

  if (!passportId || !expertId) {
    return res
      .status(400)
      .json({ message: "KYC ID and Expert ID are required" });
  }

  try {
    const passport = await Passport.findById(passportId);

    if (!passport) {
      return res.status(404).json({ message: "passport not found" });
    }

    passport.expertId = expertId; // Assuming this field exists in the model
    await passport.save();

    res.status(200).json({
      message: "Expert assigned to passport successfully",
      data: passport,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all KYCs assigned to a specific expert
exports.getPassportByExpertId = async (req, res) => {
  const { expertId } = req.params;

  if (!expertId) {
    return res.status(400).json({ message: "Expert ID is required" });
  }

  try {
    const passport = await Passport.find({ expertId });

    if (!passport || passport.length === 0) {
      return res.status(404).json({ message: "No KYC found for this expert" });
    }

    res
      .status(200)
      .json({ message: "passport fetched successfully", data: passport });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
