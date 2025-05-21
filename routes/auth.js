const express = require("express");
const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  getUserById,
  signup,
  login,
} = require("../controllers/authController");

const { getVisaRequirements } = require("../controllers/PublicController.js");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/user/:id", getUserById);
router.post("/signup", signup);
router.post("/login", login);

// public routes

router.post("/get-visa-requirements", getVisaRequirements);

module.exports = router;
