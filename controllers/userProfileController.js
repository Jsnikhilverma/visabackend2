// const UserProfile = require("../models/UserProfile");
const User = require("../models/User");

// @desc    Create or Update User Profile
// @route   POST /api/profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    console.log("User ID:", req.userId); // Debug log
    const uid = req.userId;
    const profileData = { ...req.body };
    console.log(profileData, "data");

    const profile = await User.findByIdAndUpdate(
      uid,
      {
        $set: {
          profile: profileData,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get User Profile
// @route   GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    // const profile = await UserProfile.findOne({ userId: req.user.id });
    const profile = await User.find().populate("userId");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await User.findOne({ id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// @desc    Delete User Profile
// @route   DELETE /api/profile
exports.deleteProfile = async (req, res) => {
  try {
    await User.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
