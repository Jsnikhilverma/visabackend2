const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authenticate");
const {
  createOrUpdateProfile,
  getProfile,
  deleteProfile,
  getProfileByUserId,
} = require("../controllers/userProfileController");

// Protected Routes
router.put("/add", auth, createOrUpdateProfile);
router.get("/all", auth, getProfile);
router.delete("/delete", auth, deleteProfile);
router.get("/:userId", auth, getProfileByUserId);

module.exports = router;
