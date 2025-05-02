const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/adminSignupController");
const { login } = require("../controllers/adminLoginController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
