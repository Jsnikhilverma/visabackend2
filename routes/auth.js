const express = require("express");
const router = express.Router();
const {
  sendOTP,
  verifyOTP,
  getUserById,
} = require("../controllers/authController");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/user/:id", getUserById);

module.exports = router;
