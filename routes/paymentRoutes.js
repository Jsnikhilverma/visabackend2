const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Middleware
const { auth } = require("../middlewares/authenticate");

router.post("/create-order", auth, paymentController.createOrder);
router.post("/verify-payment", paymentController.verifyPayment);

module.exports = router;
