const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserStatus } = require("../controllers/authController");
const { authenticate } = require("../middlewares/adminauth");
const {
  createOrUpdateProfile,
  getProfile,
  deleteProfile,
  getProfileByUserId,
} = require("../controllers/userProfileController");

router.get("/users", authenticate, getAllUsers);
router.post("/add", authenticate, createOrUpdateProfile);
router.get("/all", authenticate, getProfile);
router.delete("/delete", authenticate, deleteProfile);
router.get("/:userId", authenticate, getProfileByUserId);
router.patch("/updateUserStatus/:userId", authenticate, updateUserStatus);

module.exports = router;
