const OnlyPassport = require("../models/onlyPassport");
const User = require("../models/User");

exports.createOnlyPassport = async (req, res) => {
  try {
    const { kycId } = req.params;
    const passportFrontImg = req.files?.passportFrontImg?.[0]?.path;
    const userId = req.userId;
    console.log(userId);

    const {
      Fullname,
      PassportNumber,
      IssuingCountry,
      PlaceofIssue,
      DateofIssue,
      DateofExpiry,
      DateofBirth,
      Nationality,
      Gender,
      PassportType,
    } = req.body;

    // if (
    //   !kycId ||
    //   !Fullname ||
    //   !passportFrontImg ||
    //   !PassportNumber ||
    //   !IssuingCountry ||
    //   !PlaceofIssue ||
    //   !DateofIssue ||
    //   !DateofExpiry ||
    //   !DateofBirth ||
    //   Nationality ||
    //   Gender ||
    //   PassportType
    // ) {
    //   return res
    //     .status(400)
    //     .json({ message: "All fields including images are required" });
    // }

    const newPassport = new OnlyPassport({
      kycId,
      passportFrontImg,
      Fullname,
      PassportNumber,
      IssuingCountry,
      PlaceofIssue,
      DateofBirth,
      DateofIssue,
      DateofExpiry,
      Nationality,
      Gender,
      PassportType,
    });

    const savedPassport = await newPassport.save();
    const savedPass = savedPassport._id.toString();

    const user = await User.findById(userId);
    const onlyPassport = await OnlyPassport.findById(savedPass);

    console.log(onlyPassport, "OnlyPassport");

    user.onlyPassportId = savedPass;
    await user.save();

    // console.log(user, "user");

    res.status(201).json({
      message: "Passport application submitted successfully",
      data: savedPassport,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getOnlyPassports = async (req, res) => {
  try {
    const passports = await OnlyPassport.find({});
    res.status(200).json({ data: passports });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateOnlyPassportStatus = async (req, res) => {
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
    const updatedPassport = await OnlyPassport.findByIdAndUpdate(
      passportId,
      { status },
      { new: true }
    );

    if (!updatedPassport) {
      return res.status(404).json({ message: "Passport not found" });
    }

    res.status(200).json({
      message: "Passport status updated successfully",
      data: updatedPassport,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
