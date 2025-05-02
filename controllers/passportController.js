const Passport = require("../models/Passport");

exports.applyPassport = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth } = req.body;
    const { kycId } = req.params; // Extract kycId from params

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

  if (!passportId || !status) {
    return res
      .status(400)
      .json({ message: "Passport ID and status are required" });
  }
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Status must be either pending, approved, or rejected",
    });
  }

  try {
    const updatedPassport = await Passport.findByIdAndUpdate(
      passportId,
      { status },
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
