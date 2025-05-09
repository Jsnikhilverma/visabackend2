const express = require("express");
const router = express.Router();
const {
  getAllKyc,
  getKycById,
  toggleKyc,
} = require("../controllers/kycController");
const { authenticate } = require("../middlewares/adminauth");

router.get("/details", authenticate, getAllKyc);
router.get("/details/:kycId", authenticate, getKycById);
router.put("/status/:kycId", authenticate, toggleKyc);

module.exports = router;
