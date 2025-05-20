const express = require("express");
const router = express.Router();
const {
  sendOTP,
  verifyOTP,
  getUserById,
  signup,
  login,
} = require("../controllers/authController");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/user/:id", getUserById);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
