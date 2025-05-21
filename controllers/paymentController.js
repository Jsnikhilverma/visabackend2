const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Payment = require("../models/paymentStore");
const User = require("../models/User");

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_eaw8FUWQWt0bHV",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "Jhlpu6muzYAauO7BnHj3bbTz",
});

// Create a Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("Creating order with amount:", amount);

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating order", error });
  }
};

// Verify Razorpay payment

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      product_id,
    } = req.body;

    const user_id = req.userId;

    // Step 1: Verify Signature
    const hmac = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET || "Jhlpu6muzYAauO7BnHj3bbTz"
    );
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    const paymentStatus =
      generatedSignature === razorpay_signature ? "success" : "failed";

    // Step 2: Save to MongoDB
    await Payment.create({
      user: user_id,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      product_id,
      amount: amount / 100,
      status: paymentStatus,
    });

    // Step 3: Respond
    if (paymentStatus === "success") {
      res
        .status(200)
        .json({ success: true, message: "Payment verified and stored" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error verifying payment", error });
  }
};
