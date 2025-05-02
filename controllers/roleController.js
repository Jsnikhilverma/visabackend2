const Admin = require("../models/Admin");

exports.assignRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await Admin.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: `Role updated to ${role} for user ${user.email}` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
