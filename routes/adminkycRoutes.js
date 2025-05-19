const express = require("express");
const router = express.Router();
const {
  getAllKyc,
  getKycById,
  toggleKyc,
  assignExpertToKyc,
} = require("../controllers/kycController");
const { authenticate } = require("../middlewares/adminauth");

router.get("/details", authenticate, getAllKyc);
router.get("/details/:kycId", authenticate, getKycById);
router.put("/status/:kycId", toggleKyc);
router.put("/assign-expert/:kycId/:expertId", authenticate, assignExpertToKyc);
module.exports = router;
