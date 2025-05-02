const UserProfile = require("../models/UserProfile");

// @desc    Create or Update User Profile
// @route   POST /api/profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const profileData = { ...req.body, userId: req.user.id };

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user.id },
      profileData,
      { new: true, upsert: true }
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
    const profile = await UserProfile.find().populate("userId");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await UserProfile.findOne({ userId });
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
    await UserProfile.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
