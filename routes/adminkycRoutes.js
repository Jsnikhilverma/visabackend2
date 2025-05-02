const express = require("express");
const router = express.Router();
const { getAllKyc, getKycById } = require("../controllers/kycController");
const { authenticate } = require("../middlewares/adminauth");

router.get("/details", authenticate, getAllKyc);
router.get("/details/:kycId", authenticate, getKycById);

module.exports = router;
